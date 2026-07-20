<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pharmacy extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'owner_name',
        'email',
        'phone',
        'address',
        'city',
        'latitude',
        'longitude',
        'opening_time',
        'closing_time',
        'is_open',
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'opening_time' => 'datetime:H:i',
        'closing_time' => 'datetime:H:i',
        'is_open' => 'boolean',
    ];

    /**
     * A pharmacy has many inventory records.
     */
    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}