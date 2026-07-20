<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Requests\Search\SearchRequest;
use App\Http\Requests\Search\StoreSearchHistoryRequest;
use App\Http\Requests\Search\SuggestionRequest;

use App\Http\Resources\Search\SearchHistoryResource;
use App\Http\Resources\Search\SearchResultResource;
use App\Http\Resources\Search\SearchSuggestionResource;

use App\Services\SearchService;

use App\Models\Medicine;
use App\Models\Inventory;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct(
        private readonly SearchService $searchService
    ) {
    }

    /**
     * Smart Medicine Search
     */
    public function searchMedicine(SearchRequest $request)
    {
        $filters = $request->validated();

        $results = $this->searchService->search($filters);

        if ($request->user()) {

            $this->searchService->recordHistory(
                $request->user()->id,
                $filters['query'],
                collect($filters)
                    ->except(['query', 'limit'])
                    ->filter()
                    ->toArray(),
                $results->count()
            );
        }

        return response()->json([
            'message' => 'Smart search completed successfully',
            'total_results' => $results->count(),
            'data' => SearchResultResource::collection($results),
        ]);
    }

    /**
     * Search Suggestions
     */
    public function suggestions(SuggestionRequest $request)
    {
        $filters = $request->validated();

        $suggestions = $this->searchService->suggestions(
            $filters['query'],
            $filters['limit'] ?? 10
        );

        return response()->json([
            'message' => 'Search suggestions fetched successfully',
            'data' => SearchSuggestionResource::collection($suggestions),
        ]);
    }

    /**
     * Search History
     */
    public function history(Request $request)
    {
        $history = $this->searchService->history(
            $request->user()?->id
        );

        return response()->json([
            'message' => 'Search history fetched successfully',
            'data' => SearchHistoryResource::collection($history),
        ]);
    }

    /**
     * Store Search History
     */
    public function storeHistory(StoreSearchHistoryRequest $request)
    {
        $validated = $request->validated();

        $history = $this->searchService->recordHistory(
            $request->user()?->id,
            $validated['query'],
            $validated['filters'] ?? null,
            (int) ($validated['result_count'] ?? 0)
        );

        return response()->json([
            'message' => 'Search history saved successfully',
            'data' => new SearchHistoryResource($history),
        ], 201);
    }

    /**
     * Get Pharmacies Having This Medicine
     */
    public function medicinePharmacies(Medicine $medicine)
    {
        $inventories = Inventory::with('pharmacy')
            ->where('medicine_id', $medicine->id)
            ->where('quantity', '>', 0)
            ->get();

        return response()->json([
            'success' => true,
            'medicine' => $medicine->name,
            'data' => $inventories,
        ]);
    }
}