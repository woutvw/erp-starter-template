<?php

namespace App\Http\Controllers;

use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::orderBy('name');

        return SupplierResource::collection($suppliers->paginate(10));
    }

    public function show(Supplier $supplier)
    {
        return new SupplierResource($supplier);
    }
}
