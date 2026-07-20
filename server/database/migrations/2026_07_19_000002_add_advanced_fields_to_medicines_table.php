<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('medicines', function (Blueprint $table) {
            $table->string('barcode')->nullable()->unique()->after('id');
            $table->string('medicine_code')->nullable()->unique()->after('barcode');
            $table->string('dosage')->nullable()->after('generic_name');
            $table->string('strength')->nullable()->after('dosage');
            $table->string('form')->nullable()->after('strength');
            $table->boolean('prescription_required')->default(false)->after('image');
            $table->foreignId('manufacturer_id')
                ->nullable()
                ->constrained('manufacturers')
                ->nullOnDelete()
                ->after('category_id');
        });

        Schema::table('medicines', function (Blueprint $table) {
            $table->dropColumn('manufacturer');
        });
    }

    public function down(): void
    {
        Schema::table('medicines', function (Blueprint $table) {
            $table->string('manufacturer')->nullable()->after('description');
            $table->dropConstrainedForeignId('manufacturer_id');
            $table->dropColumn([
                'barcode',
                'medicine_code',
                'dosage',
                'strength',
                'form',
                'prescription_required',
            ]);
        });
    }
};