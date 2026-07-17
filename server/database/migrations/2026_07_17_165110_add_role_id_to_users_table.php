<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'role_id')) {
                $table->foreignId('role_id')
                      ->after('id')
                      ->constrained('roles')
                      ->cascadeOnDelete();
            }

            if (!Schema::hasColumn('users', 'phone')) {
                $table->string('phone')
                      ->nullable()
                      ->after('email');
            }

            if (!Schema::hasColumn('users', 'status')) {
                $table->enum('status', [
                    'active',
                    'inactive'
                ])
                ->default('active')
                ->after('password');
            }

        });
    }


    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            if (Schema::hasColumn('users', 'role_id')) {
                $table->dropForeign(['role_id']);
                $table->dropColumn('role_id');
            }

            if (Schema::hasColumn('users', 'phone')) {
                $table->dropColumn('phone');
            }

            if (Schema::hasColumn('users', 'status')) {
                $table->dropColumn('status');
            }

        });
    }
};