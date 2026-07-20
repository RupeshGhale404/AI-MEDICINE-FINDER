<?php

namespace Database\Seeders;

use App\Models\Manufacturer;
use Illuminate\Database\Seeder;

class ManufacturerSeeder extends Seeder
{
    public function run(): void
    {
        $manufacturers = [
            [
                'name' => 'Sun Pharma',
                'slug' => 'sun-pharma',
                'website' => 'https://www.sunpharma.com',
            ],
            [
                'name' => 'Cipla',
                'slug' => 'cipla',
                'website' => 'https://www.cipla.com',
            ],
            [
                'name' => 'Dr. Reddy\'s Laboratories',
                'slug' => 'dr-reddys-laboratories',
                'website' => 'https://www.drreddys.com',
            ],
        ];

        foreach ($manufacturers as $manufacturer) {
            Manufacturer::updateOrCreate(
                ['slug' => $manufacturer['slug']],
                $manufacturer
            );
        }
    }
}