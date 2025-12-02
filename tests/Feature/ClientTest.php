<?php

use App\Models\Client;
use App\Models\User;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\RefreshDatabase;

pest()->use(RefreshDatabase::class);

describe('Client list endpoint', function () {
    it('returns clients', function () {
        Passport::actingAs(User::factory()->create());

        Client::factory()->count(5)->create();

        $this->getJson('/api/clients')
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

        Client::factory()
            ->state([
                'company_id' => 0
            ])
            ->count(7)
            ->create();
        Client::factory()
            ->count(5)
            ->create();

        $this->getJson('/api/clients')
            ->assertJsonCount(5, 'data');
    });

    it('Returns a 401 if you are not authenticated', function () {
        $this->getJson('/api/clients')
            ->assertUnauthorized();
    });
});

describe('Client create endpoint', function () {
    it('saves a client if all data is provided', function () {
        Passport::actingAs(User::factory()->create());

        $data = [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'city' => fake()->city(),
            'postal_code' => fake()->postcode(),
            'country' => fake()->country(),
            'vat' => fake()->bothify('BE####.###.###'),
        ];

        $this->postJson('/api/clients', $data)
            ->assertCreated()
            ->assertJsonFragment($data);

        $this->assertDatabaseHas('clients', $data);
    });

    it('fails if name is missing', function () {
        Passport::actingAs(User::factory()->create());

        $this->postJson('/api/clients', [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    });

    it('rejects unauthenticated users', function () {
        $this->postJson('/api/clients', [])
            ->assertUnauthorized();
    });
});

describe('Client view endpoint', function () {
    it('returns a client when authenticated', function () {
        Passport::actingAs(User::factory()->create());

        $client = Client::factory()->create();

        $this->getJson("/api/clients/{$client->id}")
            ->assertOk()
            ->assertJsonFragment([
                'id' => $client->id,
                'name' => $client->name,
                'email' => $client->email,
                'phone' => $client->phone,
                'address' => $client->address,
                'city' => $client->city,
                'postal_code' => $client->postal_code,
                'country' => $client->country,
                'vat' => $client->vat,
            ]);
    });

    it('returns 404 if client does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->getJson('/api/clients/999999')
            ->assertNotFound();
    });

    it('returns 404 if client is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $client = Client::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->getJson("/api/clients/{$client->id}")
            ->assertNotFound();
    });

    it('rejects unauthenticated users', function () {
        $client = Client::factory()->create();

        $this->getJson("/api/clients/{$client->id}")
            ->assertUnauthorized();
    });
});

describe('Client edit endpoint', function () {
    it('updates a client if all data is provided', function () {
        Passport::actingAs(User::factory()->create());

        $client = Client::factory()->create();
        $newData = [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'city' => fake()->city(),
            'postal_code' => fake()->postcode(),
            'country' => fake()->country(),
            'vat' => fake()->bothify('BE####.###.###'),
        ];

        $this->putJson("/api/clients/{$client->id}", $newData)
            ->assertOk()
            ->assertJsonFragment($newData);

        $this->assertDatabaseHas('clients', [
            'id' => $client->id,
            'name' => $newData['name'],
            'email' => $newData['email'],
            'phone' => $newData['phone'],
            'address' => $newData['address'],
            'city' => $newData['city'],
            'postal_code' => $newData['postal_code'],
            'country' => $newData['country'],
            'vat' => $newData['vat'],
        ]);
    });

    it('returns 404 if product does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->putJson("/api/clients/999999", [
                'name' => 'Test client',
            ])
            ->assertNotFound();
    });

    it('returns 404 if product is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $client = Client::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->putJson("/api/clients/{$client->id}")
            ->assertNotFound();
    });

    it('fails if data is missing', function () {
        Passport::actingAs(User::factory()->create());

        $client = Client::factory()->create();

        $this->putJson("/api/clients/{$client->id}", [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    });

    it('rejects unauthenticated users', function () {
        $client = Client::factory()->create();

        $this->getJson("/api/clients/{$client->id}")
            ->assertUnauthorized();
    });
});

describe('Client delete endpoint', function () {
    it('deletes a client when authenticate', function () {
        Passport::actingAs(User::factory()->create());

        $client = Client::factory()->create();

        $this->deleteJson("/api/clients/{$client->id}")
            ->assertStatus(204);

        $this->assertDatabaseMissing('clients', [
            'id' => $client->id
        ]);
    });

    it('rejects unauthenticated users', function () {
        $client = Client::factory()->create();

        $this->deleteJson("/api/clients/{$client->id}")
            ->assertUnauthorized();
    });

    it('returns 404 if client is from different company', function () {
        Passport::actingAs(User::factory()->create());

        $client = Client::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->deleteJson("/api/clients/{$client->id}")
            ->assertNotFound();
    });
});
