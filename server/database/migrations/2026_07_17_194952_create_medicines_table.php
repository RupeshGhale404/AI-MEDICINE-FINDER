<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medicines', function (Blueprint $table) {

            $table->id();

            $table->string('name');
            $table->string('generic_name')->nullable();

            $table->text('description')->nullable();

            $table->string('manufacturer')->nullable();

            $table->decimal('price', 10, 2);

            $table->integer('stock_quantity')
                  ->default(0);

            $table->date('expiry_date')
                  ->nullable();

            $table->string('image')
                  ->nullable();

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medicines');
    }
};