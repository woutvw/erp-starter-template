<?php

use App\Models\User;
use App\Models\Product;
use App\Models\Supplier;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\RefreshDatabase;

pest()->use(RefreshDatabase::class);

describe('Product list endpoint', function () {
    it('returns products', function () {
        Passport::actingAs(User::factory()->create());

        Product::factory()->count(5)->create();

        $this->getJson('/api/products')
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

    it('returns only own products', function () {
        Passport::actingAs(User::factory()->create());

        Product::factory()
            ->state([
                'company_id' => 0
            ])
            ->count(5)
            ->create();
        Product::factory()
            ->count(5)
            ->create();

        $this->getJson('/api/products')
            ->assertJsonCount(5, 'data');
    });

    it('Returns a 401 if you are not authenticated', function () {
        $this->getJson('/api/products')
            ->assertUnauthorized();
    });
});

describe('Product create endpoint', function () {
    it('saves a product if all data is provided', function () {
        Passport::actingAs(User::factory()->create());

        $data = [
            'supplier_id' => Supplier::factory()->create()->id,
            'sku' => fake()->bothify('??###??'),
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'sale_price' => fake()->randomFloat(2, 1, 1000),
            'purchase_price' => fake()->randomFloat(2, 1, 1000),
            'quantity' => fake()->numberBetween(0, 50)
        ];

        $this->postJson('/api/products', $data)
            ->assertCreated()
            ->assertJsonFragment($data);

        $this->assertDatabaseHas('products', $data);
    });

    it('fails if data is missing', function () {
        Passport::actingAs(User::factory()->create());

        $this->postJson('/api/products', [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['supplier_id', 'sku', 'name', 'sale_price', 'purchase_price', 'quantity']);
    });

    it('rejects unauthenticated users', function () {
        $this->postJson('/api/products', [])
            ->assertUnauthorized();
    });
});

describe('Product view endpoint', function () {
    it('returns a product when authenticated', function () {
        Passport::actingAs(User::factory()->create());

        $product = Product::factory()->create();

        $this->getJson("/api/products/{$product->id}")
            ->assertOk()
            ->assertJsonFragment([
                'id' => $product->id,
                'sku' => $product->sku,
                'name' => $product->name,
                'description' => $product->description,
                'sale_price' => $product->sale_price,
                'purchase_price' => $product->purchase_price,
                'quantity' => $product->quantity
            ]);
    });

    it('returns 404 if product does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->getJson('/api/products/999999')
            ->assertNotFound();
    });

    it('returns 404 if product is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $product = Product::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->getJson("/api/products/{$product->id}")
            ->assertNotFound();
    });

    it('rejects unauthenticated users', function () {
        $product = Product::factory()->create();

        $this->getJson("/api/products/{$product->id}")
            ->assertUnauthorized();
    });
});

describe('Product edit endpoint', function () {
    it('updates a product if all data is provided', function () {
        Passport::actingAs(User::factory()->create());

        $product = Product::factory()->create();
        $newData = [
            'supplier_id' => Supplier::factory()->create()->id,
            'sku' => fake()->bothify('??###??'),
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'sale_price' => fake()->randomFloat(2, 1, 1000),
            'purchase_price' => fake()->randomFloat(2, 1, 1000),
            'quantity' => fake()->numberBetween(0, 50)
        ];

        $this->putJson("/api/products/{$product->id}", $newData)
            ->assertOk()
            ->assertJsonFragment($newData);

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'sku' => $newData['sku'],
            'name' => $newData['name'],
            'description' => $newData['description'],
            'sale_price' => $newData['sale_price'],
            'purchase_price' => $newData['purchase_price'],
            'quantity' => $newData['quantity'],
        ]);
    });

    it('returns 404 if product does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->putJson("/api/products/999999", [
            'name' => 'Test supplier',
        ])
            ->assertNotFound();
    });

    it('returns 404 if product is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $product = Product::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->putJson("/api/products/{$product->id}")
            ->assertNotFound();
    });

    it('fails if data is missing', function () {
        Passport::actingAs(User::factory()->create());

        $product = Product::factory()->create();

        $this->putJson("/api/products/{$product->id}", [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['supplier_id', 'sku', 'name', 'sale_price', 'purchase_price', 'quantity']);
    });

    it('rejects unauthenticated users', function () {
        $supplier = Supplier::factory()->create();

        $this->getJson("/api/products/{$supplier->id}")
            ->assertUnauthorized();
    });
});

describe('Product delete endpoint', function () {
    it('deletes a product when authenticate', function () {
        Passport::actingAs(User::factory()->create());

        $product = Product::factory()->create();

        $this->deleteJson("/api/products/{$product->id}")
            ->assertStatus(204);
    });

    it('rejects unauthenticated users', function () {
        $product = Product::factory()->create();

        $this->deleteJson("/api/products/{$product->id}")
            ->assertUnauthorized();
    });

    it('returns 404 if product is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $product = Product::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->deleteJson("/api/products/{$product->id}")
            ->assertNotFound();
    });
});
