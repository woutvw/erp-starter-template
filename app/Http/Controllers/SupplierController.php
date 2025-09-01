<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
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

    public function store(StoreSupplierRequest $request)
    {
        $supplier = Supplier::create($request->validated());

        return new SupplierResource($supplier);
    }

    public function update(Supplier $supplier, StoreSupplierRequest $request)
    {
        $supplier->update($request->validated());

        return new SupplierResource($supplier);
    }

    public function delete(Supplier $supplier)
    {
        $supplier->delete();

        return response()->noContent();
    }
}
