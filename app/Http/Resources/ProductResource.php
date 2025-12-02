<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $arr = parent::toArray($request);

        $arr['supplier'] = new SupplierResource($this->supplier);
        $arr['category'] = new CategoryResource($this->category);

        return $arr;
    }
}
