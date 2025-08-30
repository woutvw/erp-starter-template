<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'city',
        'postal_code',
        'country',
        'vat',
    ];

    protected static function booted()
    {
        static::creating(function($client){
            $client->user_id = Auth::user()->id;
        });
    }
}
