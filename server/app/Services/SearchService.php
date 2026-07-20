<?php

namespace App\Services;

use App\Repositories\SearchRepository;
use Illuminate\Support\Collection;

class SearchService
{
    public function __construct(private readonly SearchRepository $repository)
    {
    }

    public function search(array $filters): Collection
    {
        return $this->repository->search($filters);
    }

    public function suggestions(string $query, int $limit = 10): Collection
    {
        return $this->repository->suggestions($query, $limit);
    }

    public function history(?int $userId = null, int $limit = 10): Collection
    {
        return $this->repository->recentHistory($userId, $limit);
    }

    public function recordHistory(?int $userId, string $query, ?array $filters, int $resultCount)
    {
        return $this->repository->recordHistory($userId, $query, $filters, $resultCount);
    }
}