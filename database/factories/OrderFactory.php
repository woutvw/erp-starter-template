<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Client;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => Client::factory(),
            'status' => fake()->randomElement(['pending', 'paid', 'shipped', 'cancelled']),
            'total_price' => 0
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Order $order) {
            $products = Product::factory()
                ->count(rand(1, 5))
                ->create();

            $total = 0;

            foreach ($products as $product) {
                $quantity = rand(1, 3);
                $price = $product->sale_price; // assuming Product has a 'price' field
                $total += $price * $quantity;

                $order->products()->attach($product->id, [
                    'quantity' => $quantity,
                    'price' => $price,
                ]);
            }

            $order->update(['total' => $total]);
        });
    }
}
