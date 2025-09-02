<?php

namespace App\Models;

use App\Models\Traits\BelongsToCompany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, BelongsToCompany;

    protected $fillable = [
        'client_id',
        'status',
        'total_price'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class)
            ->withPivot('quantity', 'price')
            ->withTimestamps();
    }

    public function refreshTotal()
    {
        $this->update([
            'total_price' => $this->calculateTotal()
        ]);
    }

    public function calculateTotal(): float
    {
        return $this->products->sum(function ($product) {
            return $product->pivot->quantity * $product->pivot->price;
        });
    }
}
