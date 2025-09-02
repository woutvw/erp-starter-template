<?php

use App\Models\User;
use App\Models\Supplier;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\RefreshDatabase;

pest()->use(RefreshDatabase::class);

describe('Supplier list endpoint', function () {
    it('returns suppliers', function () {
        Passport::actingAs(User::factory()->create());

        Supplier::factory()->count(3)->create();

        $this->getJson('/api/suppliers')
            ->assertOk()
            ->assertJsonStructure([
                'data',
                'meta' => [
                    'current_page', 'from', 'last_page', 'links', 'path', 'per_page', 'to', 'total'
                ]
            ])
            ->assertJsonCount(3, 'data');
    });

    it('only returns own suppliers', function () {
        Passport::actingAs(User::factory()->create());

        Supplier::factory()
            ->state([
                'company_id' => 0
            ])
            ->count(3)
            ->create();

        Supplier::factory()
            ->count(3)
            ->create();

        $this->getJson('/api/suppliers')
            ->assertJsonCount(3, 'data');
    });

    it('Returns a 401 if you are not authenticated', function () {
        $this->getJson('/api/suppliers')
            ->assertUnauthorized();
    });
});

describe('Supplier create endpoint', function () {
    it('saves a supplier if all data is provided', function(){
        Passport::actingAs(User::factory()->create());

        $name = fake()->company();

        $this->postJson('/api/suppliers',[
                'name' => $name,
            ])
            ->assertCreated()
            ->assertJsonFragment([
                'name' => $name
            ]);

        $this->assertDatabaseHas('suppliers', [
            'name' => $name,
        ]);
    });

    it('fails if name is missing', function () {
        Passport::actingAs(User::factory()->create());

        $this->postJson('/api/suppliers', [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    });

    it('rejects unauthenticated users', function () {
        $this->postJson('/api/suppliers', [
            'name' => fake()->company(),
        ])->assertUnauthorized();
    });
});

describe('Supplier view endpoint', function () {
    it('returns a supplier when authenticated', function () {
        Passport::actingAs(User::factory()->create());

        $supplier = Supplier::factory()->create();

        $this->getJson("/api/suppliers/{$supplier->id}")
            ->assertOk()
            ->assertJsonFragment([
                'id' => $supplier->id,
                'name' => $supplier->name,
            ]);
    });

    it('returns 404 if supplier does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->getJson('/api/suppliers/999999')
            ->assertNotFound();
    });

    it('returns 404 if supplier is from different company', function () {
        $otherSupplier = Supplier::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->getJson("/api/suppliers/{$otherSupplier->id}")
            ->assertUnauthorized();
    });

    it('rejects unauthenticated users', function () {
        $supplier = Supplier::factory()->create();

        $this->getJson("/api/suppliers/{$supplier->id}")
            ->assertUnauthorized();
    });
});

describe('Supplier edit endpoint', function(){
    it('updates a supplier if all data is provided', function(){
        Passport::actingAs(User::factory()->create());

        $supplier = Supplier::factory()->create();
        $newName = fake()->company();

        $this->putJson("/api/suppliers/{$supplier->id}",[
                'name' => $newName,
            ])
            ->assertOk()
            ->assertJsonFragment([
                'name' => $newName
            ]);

        $this->assertDatabaseHas('suppliers', [
            'id' => $supplier->id,
            'name' => $newName,
        ]);
    });

    it('returns 404 if supplier does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->putJson("/api/suppliers/999999",[
                'name' => 'Test supplier',
            ])
            ->assertNotFound();
    });

    it('returns 404 if supplier is from different company', function () {
        $otherSupplier = Supplier::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->putJson("/api/suppliers/{$otherSupplier->id}",[
                'name' => 'Test supplier',
            ])
            ->assertUnauthorized();
    });

    it('fails if name is missing', function () {
        Passport::actingAs(User::factory()->create());

        $supplier = Supplier::factory()->create();
        $newName = fake()->company();

        $this->putJson("/api/suppliers/{$supplier->id}",[])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    });

    it('rejects unauthenticated users', function () {
        $supplier = Supplier::factory()->create();

        $this->getJson("/api/suppliers/{$supplier->id}")
            ->assertUnauthorized();
    });
});

describe('Supplier delete endpoint', function(){
    it('deletes a supplier when authenticate', function(){
        Passport::actingAs(User::factory()->create());

        $supplier = Supplier::factory()->create();

        $this->deleteJson("/api/suppliers/{$supplier->id}")
            ->assertStatus(204);
    });

    it('returns 404 if supplier does not exist', function () {
        Passport::actingAs(User::factory()->create());

        $this->deleteJson("/api/suppliers/999999")
            ->assertNotFound();
    });

    it('returns 404 if supplier is from different company', function () {
        $otherSupplier = Supplier::factory()
            ->state([
                'company_id' => 0
            ])
            ->create();

        $this->deleteJson("/api/suppliers/{$otherSupplier->id}")
            ->assertUnauthorized();
    });

    it('rejects unauthenticated users', function () {
        $supplier = Supplier::factory()->create();

        $this->deleteJson("/api/suppliers/{$supplier->id}")
            ->assertUnauthorized();
    });
});

