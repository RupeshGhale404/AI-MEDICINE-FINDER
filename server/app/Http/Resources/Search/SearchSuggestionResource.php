<?php

namespace App\Http\Resources\Search;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SearchSuggestionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        if (is_string($this->resource)) {
            return [
                'label' => $this->resource,
                'type' => 'suggestion',
            ];
        }

        return [
            'label' => $this->query,
            'type' => 'history',
            'result_count' => $this->result_count,
            'filters' => $this->filters,
        ];
    }
}