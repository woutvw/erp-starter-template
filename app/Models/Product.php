<?php

namespace App\Models;

use App\Models\Traits\BelongsToCompany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, BelongsToCompany;

    protected $with = ['supplier'];

    protected $fillable = [
        'supplier_id',
        'category_id',
        'sku',
        'name',
        'description',
        'sale_price',
        'purchase_price',
        'quantity',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function category()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class)
            ->wherePivot('quantity', 'price')
            ->withTimestamps();
    }
}
