<?php

namespace App\Models;

use App\Models\Scopes\CompanyScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new CompanyScope);

        static::creating(function($supplier){
            if(!isset($supplier->company_id)){
                $supplier->company_id = Auth::user()->company->id;
            }
        });
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
