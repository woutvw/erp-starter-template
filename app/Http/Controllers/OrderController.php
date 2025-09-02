<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::orderBy('create_at');

        return OrderResource::collection($orders->paginate(10));
    }

    public function store(StoreOrderRequest $request)
    {
        $order = Order::create($request->validated());

        $products = $request->products;
        foreach($products as $product){
            $order->products()->attach($product['product_id'], [
                'quantity' => $product['quantity'],
                'price' => $product['price']
            ]);
        }

        return new OrderResource($order);
    }

    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    public function update(Order $order, StoreOrderRequest $request)
    {
        $order->update($request->validated());

        // TODO: update products

        return new OrderResource($order);
    }

    public function delete(Order $order)
    {
        $order->delete();

        return response()->noContent();
    }
}
