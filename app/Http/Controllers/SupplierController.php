<?php

namespace App\Http\Controllers;

use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        $suppliers = Supplier::orderBy('name');

        if ($search = $request->search) {
            $suppliers->where('name', 'LIKE', '%' . $search . '%');
        }

        return SupplierResource::collection($suppliers->paginate(10));
    }

    public function show(Supplier $supplier)
    {
        return new SupplierResource($supplier);
    }
}
