<?php

namespace App\Models;

use App\Models\Scopes\CompanyScope;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
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
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
