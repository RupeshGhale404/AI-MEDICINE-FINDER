<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [

        'role_id',

        'name',

        'email',

        'phone',

        'password',

        'status',

    ];

    protected $hidden = [

        'password',

        'remember_token',

    ];

    protected function password(): Attribute
    {
        return Attribute::make(

            set: fn($value) => bcrypt($value),

        );
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}