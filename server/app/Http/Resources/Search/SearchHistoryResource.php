<?php

namespace App\Http\Resources\Search;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SearchHistoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'query' => $this->query,
            'filters' => $this->filters,
            'result_count' => $this->result_count,
            'searched_at' => $this->created_at?->toISOString(),
        ];
    }
}