<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-user {company} {vat} {name} {email} {password}';
    // php artisan app:create-user Apptiek "BE123.456.789" "Wout Van Wonterghem" woutvanwonterghem@gmail.com secret

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new user using commandline';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $companyName = $this->argument('company');
        $vat = $this->argument('vat');
        $company = Company::create([
            'name' => $companyName,
            'vat' => $vat
        ]);

        $name = $this->argument('name');
        $email = $this->argument('email');
        $password = Hash::make($this->argument('password'));

        $user = new User([
            'company_id' => $company->id,
            'name' => $name,
            'email' => $email,
            'password' => $password
        ]);
        $user->save();

        $this->info("An account has been created for $name");
    }
}
