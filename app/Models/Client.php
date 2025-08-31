<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

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
            if(!isset($client->company_id)){
                $client->company_id = Auth::user()->company->id;
            }
        });
    }
}
