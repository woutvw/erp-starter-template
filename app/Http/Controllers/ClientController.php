<?php

namespace App\Http\Controllers;

use App\Http\Requests\storeClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $clients = Client::orderBy('name');

        if($request->search){
            $clients->where('name','LIKE','%'.$request->search.'%');
        }

        return ClientResource::collection($clients->paginate());
    }

    public function show(Client $client)
    {
        return new ClientResource($client);
    }

    public function store(storeClientRequest $request)
    {
        $client = Client::create($request->validated());

        return new ClientResource($client);
    }
}
