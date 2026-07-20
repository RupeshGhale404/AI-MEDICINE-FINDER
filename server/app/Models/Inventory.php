<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'medicine_id',
        'pharmacy_id',
        'quantity',
        'selling_price',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'selling_price' => 'decimal:2',
    ];

    /**
     * Inventory belongs to a Medicine.
     */
    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }

    /**
     * Inventory belongs to a Pharmacy.
     */
    public function pharmacy()
    {
        return $this->belongsTo(Pharmacy::class);
    }
}