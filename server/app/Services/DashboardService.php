<?php

namespace App\Services;

use App\Models\User;
use App\Models\Medicine;
use App\Models\Pharmacy;
use App\Models\Inventory;
use Carbon\Carbon;

class DashboardService
{
    /**
     * Protected Dashboard Data
     */
    public function getDashboardData(): array
    {
        return [

            // Statistics
            'total_users' => User::count(),

            'total_medicines' => Medicine::count(),

            'total_pharmacies' => Pharmacy::count(),

            'inventory_items' => Inventory::count(),

            'low_stock' => Medicine::where('stock_quantity', '<', 20)
                ->where('stock_quantity', '>', 0)
                ->count(),

            'out_of_stock' => Medicine::where('stock_quantity', 0)
                ->count(),

            'expired_medicines' => Medicine::whereDate(
                'expiry_date',
                '<',
                Carbon::today()
            )->count(),

            'recent_medicines' => Medicine::latest()
                ->take(5)
                ->get(),

            'recent_pharmacies' => Pharmacy::latest()
                ->take(5)
                ->get(),
        ];
    }

    /**
     * Public Homepage Statistics
     */
    public function getHomeStats(): array
    {
        return [

            'total_users' => User::count(),

            'total_medicines' => Medicine::count(),

            'total_pharmacies' => Pharmacy::count(),

            'inventory_items' => Inventory::count(),

        ];
    }
}