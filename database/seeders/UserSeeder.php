<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companyId = Company::create([
            'name' => 'KripaJet',
            'vat' => ''
        ]);

        User::create([
            'company_id' => $companyId->id,
            'name' => 'Wout Van Wonterghem',
            'email' => 'woutvanwonterghem@gmail.com',
            'password' => Hash::make('secret')
        ]);
    }
}
