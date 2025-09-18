<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::orderBy('created_at');

        return OrderResource::collection($orders->paginate(10));
    }

    public function store(StoreOrderRequest $request)
    {
        $order = Order::create($request->validated());

        $products = $request->products;
        foreach($products as $item){
            $product = Product::findOrFail($item['product_id']);

            if ($product->quantity < $item['quantity']) {
                throw new \Exception("Not enough stock for {$product->name}");
            }

            $quantity = $item['quantity'];
            $price = $item['price'];
            $order->products()->attach($product->id, [
                'quantity' => $quantity,
                'price' => $price
            ]);

            $product->decrement('quantity', $quantity);
        }

        $order->refreshTotal();

        return new OrderResource($order);
    }

    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    public function update(Order $order, StoreOrderRequest $request)
    {
        $order->update($request->validated());

        $products = $request->products;
        $updatedProducts = [];
        foreach($products as $product){
            $updatedProducts[$product['product_id']] = [
                'quantity' => $product['quantity'],
                'price' => $product['price']
            ];
        }
        $order->products()->sync($updatedProducts);
        $order->refreshTotal();

        // TODO: calculate total

        return new OrderResource($order);
    }

    public function delete(Order $order)
    {
        $order->delete();

        return response()->noContent();
    }
}
