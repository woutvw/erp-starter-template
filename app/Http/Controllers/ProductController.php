<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::orderBy('name');

        if ($search = $request->search) {
            $products->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('sku', 'LIKE', '%' . $search . '%')
                ->orWhere('description', 'LIKE', '%' . $search . '%')
                ->orWhereHas('supplier', function (Builder $query) use ($search) {
                    $query->where('name', 'LIKE', '%' . $search . '%');
                });
        }

        return ProductResource::collection($products->paginate(10));
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->validated());

        return new ProductResource($product);
    }

    public function update(Product $product, StoreProductRequest $request)
    {
        $product->update($request->validated());

        return new ProductResource($product);
    }

    public function delete(Product $product)
    {
        $product->delete();

        return response()->noContent();
    }
}
