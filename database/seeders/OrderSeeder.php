<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Order;
use App\Models\Product;
use App\Models\Scopes\CompanyScope;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = Client::withoutGlobalScope(CompanyScope::class)->get();
        $products = Product::withoutGlobalScope(CompanyScope::class)
            ->with(['supplier' => fn($q) => $q->withoutGlobalScope(CompanyScope::class)])
            ->get();

        if ($clients->isEmpty() || $products->isEmpty()) {
            $this->command->warn('⚠️ No clients or products found. Skipping order seeding.');
            return;
        }

        // Create 50 fake orders
        for ($i = 0; $i < rand(50, 100); $i++) {
            $client = $clients->random();
            // Random date between 1 year ago and now
            $createdAt = Carbon::now()->subYear(2)->addDays(rand(0, 365 * 2))->addSeconds(rand(0, 86400));

            $order = Order::create([
                'company_id' => $client->company_id,
                'client_id' => $client->id,
                'status' => collect(['pending', 'paid', 'shipped'])->random(),
                'created_at' => $createdAt
            ]);

            // Attach between 1 and 5 products
            $total = 0;
            foreach ($products->random(rand(1, 5)) as $product) {
                $quantity = rand(1, 3);
                $price = $product->sale_price;
                $total += $quantity * $price;

                DB::table('order_product')->insert([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                ]);
            }

            $order->update([
                'total_price' => $total
            ]);
        }
    }
}
