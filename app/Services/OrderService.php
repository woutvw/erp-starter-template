<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;

class OrderService
{
    public function create(array $data): Order
    {
        $order = Order::create($data);

        $this->addProducts($order, $data['products']);

        $order->refreshTotal();

        return $order;
    }

    public function update(Order $order, array $data = []): Order
    {
        $order->update([
            'client_id' => $data['client_id'],
        ]);

        $this->removeProducts($order);
        $this->addProducts($order, $data['products']);

        $order->refreshTotal();

        return $order;
    }

    public function remove(Order $order)
    {
        $this->removeProducts($order);

        $order->delete();
    }

    private function addProducts(Order $order, array $products = []): void
    {
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

        // Reload the relation from DB
        $order->load('products');
    }

    private function removeProducts(Order $order): void
    {
        foreach($order->products as $product){
            $quantity = $product->pivot->quantity;

            $product->increment('quantity', $quantity);
        }

        $order->products()->detach();

        // Reload the relation from DB
        $order->load('products');
    }
}