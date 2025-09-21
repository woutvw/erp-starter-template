<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::orderBy('created_at');

        if($search = $request->search){
            $orders->whereHas('client', function (Builder $query) use ($search) {
                $query->where('name', 'LIKE', '%' . $search . '%');
            });
        }

        return OrderResource::collection($orders->paginate(10));
    }

    public function store(StoreOrderRequest $request, OrderService $service)
    {
        $order = $service->create($request->validated());

        return new OrderResource($order);
    }

    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    public function update(Order $order, StoreOrderRequest $request, OrderService $service)
    {
        $order = $service->update($order, $request->validated());

        return new OrderResource($order);
    }

    public function delete(Order $order, OrderService $service)
    {
        $service->remove($order);

        return response()->noContent();
    }
}
