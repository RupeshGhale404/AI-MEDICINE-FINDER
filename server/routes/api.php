<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AIController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\MedicineController;
use App\Http\Controllers\Api\PharmacyController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\GeocodingController;
/*
|--------------------------------------------------------------------------
| Test Route
|--------------------------------------------------------------------------
*/
Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working!',
    ]);
});

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Public Home Statistics
Route::get('/home/stats', [DashboardController::class, 'publicStats']);

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// AI Assistant (only once)
Route::post('/ai/chat', [AIController::class, 'chat']);

// Smart Medicine Search
Route::get('/search', [SearchController::class, 'searchMedicine']);
Route::get('/search/suggestions', [SearchController::class, 'suggestions']);
Route::get('/search/history', [SearchController::class, 'history']);
Route::post('/search/history', [SearchController::class, 'storeHistory']);

// Pharmacies that have a specific medicine
Route::get('/medicines/{medicine}/pharmacies', [SearchController::class, 'medicinePharmacies']);

// Medicines
Route::apiResource('medicines', MedicineController::class);

// Pharmacies
Route::apiResource('pharmacies', PharmacyController::class);

// Categories
Route::apiResource('categories', CategoryController::class);



/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::apiResource('inventories', InventoryController::class);
});