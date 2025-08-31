<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Laravel\Passport\ClientRepository;

class OauthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // replaces this command: php artisan passport:client --password

        $clients = new ClientRepository();

        $client = $clients->createPasswordGrantClient('Password grant', 'users', true);

        $this->command->info("Password Grant Client created: ID={$client->id}, Secret={$client->secret}");
    }
}
