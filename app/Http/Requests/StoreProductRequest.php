<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'supplier_id' => 'required', // TODO: more checks
            'name' => 'required',
            'sku' => 'required',
            'description' => 'nullable',
            'sale_price' => 'required',
            'purchase_price' => 'required',
            'quantity' => 'required',
        ];
    }
}
