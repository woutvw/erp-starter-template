<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;

pest()->use(RefreshDatabase::class);

describe('Category list endpoint', function () {
    it('Returns categories', function () {
        Passport::actingAs(User::factory()->create());

        Category::factory()
            ->count(5)
            ->create();

        $this->getJson('/api/categories')
            ->assertOk()
            ->assertJsonCount(5, 'data');
    });

    it('returns only own categories', function () {
        Passport::actingAs(User::factory()->create());

        Category::factory()
            ->state([
                'company_id' => 0
            ])
            ->count(7)
            ->create();
        Category::factory()
            ->count(5)
            ->create();

        $this->getJson('/api/categories')
            ->assertJsonCount(5, 'data');
    });

    it('Returns a 401 if you are not authenticated', function () {
        $this->getJson('/api/categories')
            ->assertUnauthorized();
    });
});

describe('Category create endpoint', function () {
    it('saves a category if all data is provided', function () {
        Passport::actingAs(User::factory()->create());

        $data = [
            'name' => fake()->word()
        ];

        $this->postJson('/api/categories', $data)
            ->assertCreated()
            ->assertJsonFragment($data);

        $this->assertDatabaseHas('categories', $data);
    });

    it('fails if name is missing', function () {
        Passport::actingAs(User::factory()->create());

        $this->postJson('/api/categories', [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    });

    it('rejects unauthenticated users', function () {
        $this->postJson('/api/categories', [])
            ->assertUnauthorized();
    });
});

describe('Category view endpoint', function () {
    it('returns a category when authenticated', function () {
        Passport::actingAs(User::factory()->create());

        $category = Category::factory()->create();

        $this->getJson("/api/categories/{$category->id}")
            ->assertOk()
            ->assertJsonFragment([
                // 'id' => $client->id,
                // 'name' => $client->name,
                // 'email' => $client->email,
                // 'phone' => $client->phone,
                // 'address' => $client->address,
                // 'city' => $client->city,
                // 'postal_code' => $client->postal_code,
                // 'country' => $client->country,
                // 'vat' => $client->vat,
            ]);
    });

    it('returns 404 if category does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->getJson('/api/categories/999999')
            ->assertNotFound();
    });

    it('returns 404 if category is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $category = Category::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->getJson("/api/categories/{$category->id}")
            ->assertNotFound();
    });

    it('rejects unauthenticated users', function () {
        $category = Category::factory()->create();

        $this->getJson("/api/categories/{$category->id}")
            ->assertUnauthorized();
    });
});

describe('Category edit endpoint', function () {
    it('updates a category if all data is provided', function () {
        Passport::actingAs(User::factory()->create());

        $category = Category::factory()->create();
        $newData = [
            'name' => fake()->word()
        ];

        $this->putJson("/api/categories/{$category->id}", $newData)
            ->assertOk()
            ->assertJsonFragment($newData);

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => $newData['name']
        ]);
    });

    it('returns 404 if category does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->putJson("/api/categories/999999", [
                'name' => 'Test category',
            ])
            ->assertNotFound();
    });

    it('returns 404 if category is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $category = Category::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->putJson("/api/categories/{$category->id}")
            ->assertNotFound();
    });

    it('fails if data is missing', function () {
        Passport::actingAs(User::factory()->create());

        $category = Category::factory()->create();

        $this->putJson("/api/categories/{$category->id}", [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    });

    it('rejects unauthenticated users', function () {
        $category = Category::factory()->create();

        $this->getJson("/api/categories/{$category->id}")
            ->assertUnauthorized();
    });
});

describe('Category delete endpoint', function () {
    it('deletes a category when authenticate', function () {
        Passport::actingAs(User::factory()->create());

        $category = Category::factory()->create();

        $this->deleteJson("/api/categories/{$category->id}")
            ->assertStatus(204);

        $this->assertDatabaseMissing('categories', [
            'id' => $category->id
        ]);
    });

    it('rejects unauthenticated users', function () {
        $category = Category::factory()->create();

        $this->deleteJson("/api/categories/{$category->id}")
            ->assertUnauthorized();
    });

    it('returns 404 if category is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $category = Category::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->deleteJson("/api/categories/{$category->id}")
            ->assertNotFound();
    });
});

