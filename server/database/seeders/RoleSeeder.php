<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Full system access'
        ]);

        Role::create([
            'name' => 'Manager',
            'slug' => 'manager',
            'description' => 'Manage company operations'
        ]);

        Role::create([
            'name' => 'Employee',
            'slug' => 'employee',
            'description' => 'Normal employee access'
        ]);
    }
}