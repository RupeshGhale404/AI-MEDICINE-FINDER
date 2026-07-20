<?php

namespace App\Http\Requests\Medicine;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMedicineRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [

            'name' => [
                'required',
                'string',
                'max:255'
            ],


            'generic_name' => [
                'required',
                'string',
                'max:255'
            ],


            'description' => [
                'nullable',
                'string'
            ],


            'manufacturer' => [
                'nullable',
                'string',
                'max:255'
            ],


            'price' => [
                'required',
                'numeric'
            ],


            'stock_quantity' => [
                'required',
                'integer'
            ],


            'expiry_date' => [
                'required',
                'date'
            ],


            'image' => [
                'nullable',
                'image',
                'max:2048'
            ],

        ];
    }

}