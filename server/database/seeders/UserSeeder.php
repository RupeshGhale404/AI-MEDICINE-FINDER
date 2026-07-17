<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $employeeRoleId = Role::where('slug', 'employee')->value('id');

        if (!$employeeRoleId) {
            return;
        }

        User::firstOrCreate(
            ['email' => 'employee@example.com'],
            [
                'role_id' => $employeeRoleId,
                'name' => 'Demo Employee',
                'phone' => '0000000000',
                'password' => 'password',
                'status' => 'active',
            ]
        );
    }
}