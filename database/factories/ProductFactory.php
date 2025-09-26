<?php

namespace Database\Factories;

use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_id' => 1,
            'supplier_id' => Supplier::factory(),
            'sku' => fake()->bothify('??###??'),
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'sale_price' => fake()->randomFloat(2, 10, 20),
            'purchase_price' => fake()->randomFloat(2, 1, 10),
            'quantity' => fake()->numberBetween(10, 50)
        ];
    }
}
