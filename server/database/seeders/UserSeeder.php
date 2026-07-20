<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRoleId = Role::where('slug', 'admin')->value('id');
        $employeeRoleId = Role::where('slug', 'employee')->value('id');

        /*
        |--------------------------------------------------------------------------
        | Admin User
        |--------------------------------------------------------------------------
        */

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'role_id' => $adminRoleId,
                'name' => 'System Admin',
                'phone' => '9800000000',
                'password' => 'password',
                'status' => 'active',
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | Employee User
        |--------------------------------------------------------------------------
        */

        User::firstOrCreate(
            ['email' => 'employee@example.com'],
            [
                'role_id' => $employeeRoleId,
                'name' => 'Demo Employee',
                'phone' => '9811111111',
                'password' => 'password',
                'status' => 'active',
            ]
        );
    }
}