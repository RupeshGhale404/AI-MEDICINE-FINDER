<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    /**
     * Protected Dashboard
     * Requires login
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'message' => 'Dashboard data fetched successfully.',
            'data' => $this->dashboardService->getDashboardData(),
        ]);
    }

    /**
     * Public Homepage Statistics
     * No login required
     */
    public function publicStats(): JsonResponse
    {
        return response()->json(
            $this->dashboardService->getHomeStats()
        );
    }
}