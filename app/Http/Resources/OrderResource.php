<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $order = parent::toArray($request);

        $order['client'] = new ClientResource($this->client);
        $order['products'] = OrderProductResource::collection($this->products);

        return $order;
    }
}
