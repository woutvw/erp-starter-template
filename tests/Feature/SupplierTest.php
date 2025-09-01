<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;

pest()->use(RefreshDatabase::class);

describe('Suppliers index endpoint', function(){
    it('returns suppliers', function () {
        $user = User::factory()->create();
        Passport::actingAs($user);

        $this->getJson('/api/suppliers')
            ->assertOk()
            ->assertStatus(200);
    });
});