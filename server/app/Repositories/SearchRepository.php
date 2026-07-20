<?php

namespace App\Repositories;

use App\Models\Inventory;
use App\Models\Medicine;
use App\Models\SearchHistory;
use Illuminate\Support\Collection;

class SearchRepository
{
    public function search(array $filters): Collection
    {
        $query = Inventory::query()
            ->with([
                'medicine.category',
                'medicine.manufacturer',
                'pharmacy.owner',
            ])
            ->where('quantity', '>', 0)
            ->whereHas('medicine', function ($medicineQuery) use ($filters) {
                $search = $filters['query'];
                $searchLike = '%' . mb_strtolower($search) . '%';

                $medicineQuery->where(function ($builder) use ($search) {
                    $like = '%' . mb_strtolower($search) . '%';

                    $builder->whereRaw('LOWER(name) LIKE ?', [$like])
                        ->orWhereRaw('LOWER(generic_name) LIKE ?', [$like])
                        ->orWhereRaw('LOWER(barcode) LIKE ?', [$like])
                        ->orWhereRaw('LOWER(medicine_code) LIKE ?', [$like])
                        ->orWhereRaw('LOWER(dosage) LIKE ?', [$like])
                        ->orWhereRaw('LOWER(strength) LIKE ?', [$like])
                        ->orWhereRaw('LOWER(form) LIKE ?', [$like])
                        ->orWhereRaw('LOWER(indications) LIKE ?', [$like])
                        ->orWhereRaw('LOWER(symptoms) LIKE ?', [$like])
                        ->orWhereHas('category', function ($categoryQuery) use ($search) {
                            $categoryQuery->whereRaw('LOWER(name) LIKE ?', ['%' . mb_strtolower($search) . '%']);
                        })
                        ->orWhereHas('manufacturer', function ($manufacturerQuery) use ($search) {
                            $manufacturerQuery->whereRaw('LOWER(name) LIKE ?', ['%' . mb_strtolower($search) . '%']);
                        });
                });
            });

        if (!empty($filters['category_id'])) {
            $query->whereHas('medicine', function ($medicineQuery) use ($filters) {
                $medicineQuery->where('category_id', $filters['category_id']);
            });
        }

        if (!empty($filters['category'])) {
            $query->whereHas('medicine.category', function ($categoryQuery) use ($filters) {
                $categoryQuery->whereRaw('LOWER(name) LIKE ?', ['%' . mb_strtolower($filters['category']) . '%']);
            });
        }

        if (!empty($filters['manufacturer_id'])) {
            $query->whereHas('medicine', function ($medicineQuery) use ($filters) {
                $medicineQuery->where('manufacturer_id', $filters['manufacturer_id']);
            });
        }

        if (!empty($filters['manufacturer'])) {
            $query->whereHas('medicine.manufacturer', function ($manufacturerQuery) use ($filters) {
                $manufacturerQuery->whereRaw('LOWER(name) LIKE ?', ['%' . mb_strtolower($filters['manufacturer']) . '%']);
            });
        }

        if (isset($filters['availability']) && $filters['availability']) {
            $query->where('quantity', '>', 0);
        }

        if (!empty($filters['price_min'])) {
            $query->where('selling_price', '>=', $filters['price_min']);
        }

        if (!empty($filters['price_max'])) {
            $query->where('selling_price', '<=', $filters['price_max']);
        }

        $lat = $filters['latitude'] ?? null;
        $lng = $filters['longitude'] ?? null;

        if ($lat !== null && $lng !== null) {
            $distanceSql = "(6371 * acos(least(1, greatest(-1, cos(radians(?)) * cos(radians(pharmacies.latitude)) * cos(radians(pharmacies.longitude) - radians(?)) + sin(radians(?)) * sin(radians(pharmacies.latitude))))))";

            $query->join('pharmacies', 'inventories.pharmacy_id', '=', 'pharmacies.id')
                ->select('inventories.*')
                ->selectRaw("{$distanceSql} as distance_km", [$lat, $lng, $lat])
                ->whereNotNull('pharmacies.latitude')
                ->whereNotNull('pharmacies.longitude');

            if (!empty($filters['radius'])) {
                $query->havingRaw('distance_km <= ?', [$filters['radius']]);
            }

            $query->orderBy('distance_km');
        } else {
            $query->orderBy('selling_price');
        }

        $limit = (int) ($filters['limit'] ?? 20);

        return $query->limit($limit)->get();
    }

    public function suggestions(string $query, int $limit = 10): Collection
    {
        $medicineMatches = Medicine::query()
            ->select('name', 'generic_name', 'indications', 'symptoms')
            ->where(function ($builder) use ($query) {
                $like = '%' . mb_strtolower($query) . '%';

                $builder->whereRaw('LOWER(name) LIKE ?', [$like])
                    ->orWhereRaw('LOWER(generic_name) LIKE ?', [$like])
                    ->orWhereRaw('LOWER(indications) LIKE ?', [$like])
                    ->orWhereRaw('LOWER(symptoms) LIKE ?', [$like]);
            })
            ->limit($limit)
            ->get()
            ->flatMap(function ($medicine) {
                return array_filter([
                    $medicine->name,
                    $medicine->generic_name,
                    $medicine->indications,
                    $medicine->symptoms,
                ]);
            });

        return $medicineMatches->unique()->values();
    }

    public function recentHistory(?int $userId = null, int $limit = 10): Collection
    {
        return SearchHistory::query()
            ->when($userId, function ($builder) use ($userId) {
                $builder->where('user_id', $userId);
            })
            ->latest()
            ->limit($limit)
            ->get();
    }

    public function recordHistory(?int $userId, string $query, ?array $filters, int $resultCount): SearchHistory
    {
        return SearchHistory::create([
            'user_id' => $userId,
            'query' => $query,
            'filters' => $filters,
            'result_count' => $resultCount,
        ]);
    }
}