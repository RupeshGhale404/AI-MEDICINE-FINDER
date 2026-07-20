<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'website',
        'phone',
        'address',
    ];

    public function medicines()
    {
        return $this->hasMany(Medicine::class);
    }
}