<?php

namespace App\Http\Requests\Pharmacy;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePharmacyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $pharmacyId = $this->route('pharmacy')?->id;

        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'registration_number' => [
                'sometimes',
                'string',
                'max:100',
                Rule::unique('pharmacies', 'registration_number')->ignore($pharmacyId),
            ],
            'phone' => ['sometimes', 'string', 'max:20'],
            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('pharmacies', 'email')->ignore($pharmacyId),
            ],
            'address' => ['sometimes', 'string', 'max:1000'],
            'latitude' => ['sometimes', 'nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['sometimes', 'nullable', 'numeric', 'between:-180,180'],
            'opening_time' => ['sometimes', 'nullable', 'date_format:H:i'],
            'closing_time' => ['sometimes', 'nullable', 'date_format:H:i', 'after:opening_time'],
        ];
    }
}