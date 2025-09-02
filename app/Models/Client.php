<?php

namespace App\Models;

use App\Models\Scopes\CompanyScope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        static::addGlobalScope(new CompanyScope);

        static::creating(function($client){
            if(!isset($client->company_id)){
                $client->company_id = Auth::user()->company->id;
            }
        });
    }
}
