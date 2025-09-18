<?php

use App\Models\Client;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\RefreshDatabase;

pest()->use(RefreshDatabase::class);

describe('Order list endpoint', function () {
    it('returns orders', function () {
        Passport::actingAs(User::factory()->create());

        Order::factory()->count(5)->create();

        $this->getJson('/api/orders')
            ->assertOk()
            ->assertJsonStructure([
                'data',
                'meta' => [
                    'current_page',
                    'from',
                    'last_page',
                    'links',
                    'path',
                    'per_page',
                    'to',
                    'total'
                ]
            ])
            ->assertJsonCount(5, 'data');
    });

    it('returns only own orders', function () {
        Passport::actingAs(User::factory()->create());

        Order::factory()
            ->state([
                'company_id' => 0
            ])
            ->count(7)
            ->create();
        Order::factory()
            ->count(5)
            ->create();

        $this->getJson('/api/orders')
            ->assertJsonCount(5, 'data');
    });

    it('Returns a 401 if you are not authenticated', function () {
        $this->getJson('/api/orders')
            ->assertUnauthorized();
    });
});

describe('Client create endpoint', function () {
    it('saves an order if all data is provided', function () {
        Passport::actingAs(User::factory()->create());

        $client = Client::factory()->create();
        $products = Product::factory()
            ->count(2)
            ->create();

        $totalPrice = $products->sum(function($product){
            return $product->sale_price;
        });

        $data = [
            'client_id' => $client->id,
            'products' => [
                [
                    'product_id' => $products[0]->id,
                    'quantity' => 1,
                    'price' => $products[0]->sale_price
                ],
                [
                    'product_id' => $products[1]->id,
                    'quantity' => 1,
                    'price' => $products[1]->sale_price
                ],
            ]
        ];

        $this->postJson('/api/orders', $data)
            ->assertCreated()
            ->assertJsonPath('data.client_id', $client->id)
            ->assertJsonPath('data.total_price', $totalPrice)
            ->assertJsonCount(2, 'data.products');

        // TODO: check if the product format is correct
    });

    it('updates product quantity when an order is placed', function (){
        Passport::actingAs(User::factory()->create());

        $originalNrOfProducts = rand(1, 5);

        $client = Client::factory()->create();
        $product = Product::factory()
            ->state([
                'quantity' => $originalNrOfProducts
            ])
            ->create();

        $data = [
            'client_id' => $client->id,
            'products' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 1,
                    'price' => $product->sale_price
                ],
            ]
        ];

        $this->postJson('/api/orders', $data)
            ->assertCreated();

        // Refresh product from DB
        $product->refresh();

        // Assert that the quantity was reduced
        expect($product->quantity)->toBe($originalNrOfProducts - 1);
    });

    it('fails if data is missing', function () {
        Passport::actingAs(User::factory()->create());

        $this->postJson('/api/orders', [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['client_id', 'products']);
    });

    it('rejects unauthenticated users', function () {
        $this->postJson('/api/orders', [])
            ->assertUnauthorized();
    });
});

describe('Order view endpoint', function () {
    it('returns an order when authenticated', function () {
        Passport::actingAs(User::factory()->create());

        $order = Order::factory()->create();

        $this->getJson("/api/orders/{$order->id}")
            ->assertOk()
            ->assertJsonPath('data.client_id', $order->client->id)
            ->assertJsonCount($order->products->count(), 'data.products');
    });

    it('returns 404 if order does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->getJson('/api/orders/999999')
            ->assertNotFound();
    });

    it('returns 404 if order is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $order = Order::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->getJson("/api/orders/{$order->id}")
            ->assertNotFound();
    });

    it('rejects unauthenticated users', function () {
        $order = Client::factory()->create();

        $this->getJson("/api/orders/{$order->id}")
            ->assertUnauthorized();
    });
});

describe('Order edit endpoint', function () {
    it('updates an order if all data is provided', function () {
        Passport::actingAs(User::factory()->create());

        $order = Order::factory()->create();
        $products = Product::factory()
            ->count(2)
            ->create();

        $totalPrice = $products->sum(function($product){
            return 2 * $product->sale_price;
        });

        $newData = [
            'client_id' => $order->client->id,
            'products' => [
                [
                    'product_id' => $products[0]->id,
                    'quantity' => 2,
                    'price' => $products[0]->sale_price
                ],
                [
                    'product_id' => $products[1]->id,
                    'quantity' => 2,
                    'price' => $products[1]->sale_price
                ],
            ]
        ];

        $this->putJson("/api/orders/{$order->id}", $newData)
            ->assertOk()
            ->assertJsonPath('data.client_id', $order->client->id)
            ->assertJsonPath('data.total_price', $totalPrice)
            ->assertJsonCount(2, 'data.products');
    });

    it('updates product quantity when an order is updated', function (){

    });

    it('returns 404 if product does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->putJson("/api/orders/999999", [])
            ->assertNotFound();
    });

    it('returns 404 if product is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $order = Order::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->putJson("/api/orders/{$order->id}")
            ->assertNotFound();
    });

    it('fails if data is missing', function () {
        Passport::actingAs(User::factory()->create());

        $order = Order::factory()->create();

        $this->putJson("/api/orders/{$order->id}", [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['client_id','products']);
    });

    it('rejects unauthenticated users', function () {
        $order = Order::factory()->state(['company_id'=>0])->create();

        $this->getJson("/api/orders/{$order->id}")
            ->assertUnauthorized();
    });
});

describe('Order delete endpoint', function () {
    it('deletes an order when authenticate', function () {
        Passport::actingAs(User::factory()->create());

        $order = Order::factory()->create();

        $this->deleteJson("/api/orders/{$order->id}")
            ->assertStatus(204);

        $this->assertDatabaseMissing('orders', [
            'id' => $order->id
        ]);
    });

    it('updates product quantity when an order removed', function (){
        Passport::actingAs(User::factory()->create());

        $originalNrOfProducts = rand(1,5);

        $client = Client::factory()->create();
        $product = Product::factory()->create([
            'quantity' => $originalNrOfProducts,
        ]);

        // Create the order directly with factory
        $order = Order::factory()
            ->hasAttached($product, [
                'quantity' => 2,
                'price' => $product->sale_price,
            ])
            ->create([
                'client_id' => $client->id,
            ]);

        $this->deleteJson("/api/orders/{$order->id}")
            ->assertStatus(204);

        // Refresh product from DB
        $product->refresh();

        // Assert that the quantity was reduced
        expect($product->quantity)->toBe($originalNrOfProducts + 2);
    });

    it('rejects unauthenticated users', function () {
        $order = Order::factory()->create();

        $this->deleteJson("/api/orders/{$order->id}")
            ->assertUnauthorized();
    });

    it('returns 404 if order is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $order = Order::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->deleteJson("/api/orders/{$order->id}")
            ->assertNotFound();
    });
});
