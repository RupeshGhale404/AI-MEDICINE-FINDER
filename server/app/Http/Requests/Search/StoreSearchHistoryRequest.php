<?php

namespace App\Http\Requests\Search;

use Illuminate\Foundation\Http\FormRequest;

class StoreSearchHistoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'query' => ['required', 'string', 'max:255'],
            'filters' => ['nullable', 'array'],
            'result_count' => ['nullable', 'integer', 'min:0'],
        ];
    }
}