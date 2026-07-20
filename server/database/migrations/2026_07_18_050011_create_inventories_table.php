<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventories', function (Blueprint $table) {

            $table->id();

            $table->foreignId('medicine_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->foreignId('pharmacy_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->integer('quantity');

            $table->decimal('selling_price', 10, 2);

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};