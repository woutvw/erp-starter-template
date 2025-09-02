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

    it('returns only own clients', function () {
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

        $data = [
            'client_id' => $client->id,
            'products' => [
                [
                    'product_id' => $products[0]->id,
                    'quantity' => 2,
                    'price' => $products[0]->sale_price
                ],
                [
                    'product_id' => $products[1]->id,
                    'quantity' => 5,
                    'price' => $products[1]->sale_price
                ],
            ]
        ];

        $this->postJson('/api/orders', $data)
            ->assertCreated()
            ->assertJsonPath('data.client_id', $client->id)
            ->assertJsonCount(2, 'data.products');

        // TODO: check if the product format is correct
        // TODO: check the total price
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
            ->assertJsonCount(2, 'data.products');
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

// describe('Client edit endpoint', function () {
//     it('updates a client if all data is provided', function () {
//         Passport::actingAs(User::factory()->create());

//         $client = Client::factory()->create();
//         $newData = [
//             'name' => fake()->name(),
//             'email' => fake()->email(),
//             'phone' => fake()->phoneNumber(),
//             'address' => fake()->address(),
//             'city' => fake()->city(),
//             'postal_code' => fake()->postcode(),
//             'country' => fake()->country(),
//             'vat' => fake()->bothify('BE####.###.###'),
//         ];

//         $this->putJson("/api/clients/{$client->id}", $newData)
//             ->assertOk()
//             ->assertJsonFragment($newData);

//         $this->assertDatabaseHas('clients', [
//             'id' => $client->id,
//             'name' => $newData['name'],
//             'email' => $newData['email'],
//             'phone' => $newData['phone'],
//             'address' => $newData['address'],
//             'city' => $newData['city'],
//             'postal_code' => $newData['postal_code'],
//             'country' => $newData['country'],
//             'vat' => $newData['vat'],
//         ]);
//     });

//     it('returns 404 if product does not exist', function () {
//         Passport::actingAs(User::factory()->create());

//         $this->putJson("/api/clients/999999", [
//                 'name' => 'Test client',
//             ])
//             ->assertNotFound();
//     });

//     it('returns 404 if product is from different company', function () {
//         Passport::actingAs(User::factory()->create());

//         $client = Client::factory()
//             ->state([
//                 'company_id' => 0
//             ])
//             ->create();

//         $this->putJson("/api/clients/{$client->id}")
//             ->assertNotFound();
//     });

//     it('fails if data is missing', function () {
//         Passport::actingAs(User::factory()->create());

//         $client = Client::factory()->create();

//         $this->putJson("/api/clients/{$client->id}", [])
//             ->assertStatus(422)
//             ->assertJsonValidationErrors(['name']);
//     });

//     it('rejects unauthenticated users', function () {
//         $client = Client::factory()->create();

//         $this->getJson("/api/clients/{$client->id}")
//             ->assertUnauthorized();
//     });
// });

// describe('Client delete endpoint', function () {
//     it('deletes a client when authenticate', function () {
//         Passport::actingAs(User::factory()->create());

//         $client = Client::factory()->create();

//         $this->deleteJson("/api/clients/{$client->id}")
//             ->assertStatus(204);

//         $this->assertDatabaseMissing('clients', [
//             'id' => $client->id
//         ]);
//     });

//     it('rejects unauthenticated users', function () {
//         $client = Client::factory()->create();

//         $this->deleteJson("/api/clients/{$client->id}")
//             ->assertUnauthorized();
//     });

//     it('returns 404 if client is from different company', function () {
//         Passport::actingAs(User::factory()->create());

//         $client = Client::factory()
//             ->state([
//                 'company_id' => 0
//             ])
//             ->create();

//         $this->deleteJson("/api/clients/{$client->id}")
//             ->assertNotFound();
//     });
// });
