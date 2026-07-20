<?php

namespace App\Http\Resources\Search;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SearchResultResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $medicine = $this->medicine;
        $pharmacy = $this->pharmacy;

        return [
            'medicine_id' => $medicine->id,
            'medicine_name' => $medicine->name,
            'generic_name' => $medicine->generic_name,
            'barcode' => $medicine->barcode,
            'medicine_code' => $medicine->medicine_code,
            'dosage' => $medicine->dosage,
            'strength' => $medicine->strength,
            'form' => $medicine->form,
            'indications' => $medicine->indications,
            'symptoms' => $medicine->symptoms,
            'category' => $medicine->category?->name,
            'manufacturer' => $medicine->manufacturer?->name,
            'description' => $medicine->description,
            'image' => $medicine->image,
            'prescription_required' => (bool) $medicine->prescription_required,
            'pharmacy' => [
                'id' => $pharmacy->id,
                'name' => $pharmacy->name,
                'address' => $pharmacy->address,
                'latitude' => $pharmacy->latitude,
                'longitude' => $pharmacy->longitude,
                'status' => $pharmacy->status,
            ],
            'available_quantity' => $this->quantity,
            'selling_price' => $this->selling_price,
            'distance_km' => $this->distance_km ?? null,
        ];
    }
}