<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pharmacies', function (Blueprint $table) {

            $table->decimal('latitude', 10, 7)->nullable()->after('city');

            $table->decimal('longitude', 10, 7)->nullable()->after('latitude');

            $table->time('opening_time')->nullable()->after('is_open');

            $table->time('closing_time')->nullable()->after('opening_time');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pharmacies', function (Blueprint $table) {

            $table->dropColumn([
                'latitude',
                'longitude',
                'opening_time',
                'closing_time',
            ]);

        });
    }
};