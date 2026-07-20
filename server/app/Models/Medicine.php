<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'generic_name',
        'description',
        'manufacturer',
        'price',
        'stock_quantity',
        'expiry_date',
        'image',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock_quantity' => 'integer',
        'expiry_date' => 'date',
    ];

    /**
     * A medicine can be available in many pharmacies.
     */
    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}