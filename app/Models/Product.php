<?php

namespace App\Models;

use App\Models\Scopes\CompanyScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Product extends Model
{
    use HasFactory;

    protected $with = ['supplier'];

    protected $fillable = [
        'supplier_id',
        'sku',
        'name',
        'description',
        'sale_price',
        'purchase_price',
        'quantity',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new CompanyScope);

        static::creating(function($product){
            if(!isset($product->company_id)){
                $product->company_id = Auth::user()->company->id;
            }
        });
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
