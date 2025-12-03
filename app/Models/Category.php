<?php

namespace App\Models;

use App\Models\Traits\BelongsToCompany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory, BelongsToCompany;

    protected $fillable = [
        'name',
        'minimum_stock'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
