<?php
use App\Http\Controllers\Api\AIController;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\MedicineController;
use App\Http\Controllers\Api\PharmacyController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\DashboardController;


// Public Home Statistics
Route::get('/home/stats', [DashboardController::class, 'publicStats']);
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

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Smart Medicine Search
Route::get('/search', [SearchController::class, 'searchMedicine']);

// Search Suggestions
Route::get('/search/suggestions', [SearchController::class, 'suggestions']);

// Search History (Optional)
Route::get('/search/history', [SearchController::class, 'history']);
Route::post('/search/history', [SearchController::class, 'storeHistory']);
/*
|--------------------------------------------------------------------------
| AI Assistant
|--------------------------------------------------------------------------
*/

Route::post('/ai/chat', [AIController::class, 'chat']);

// =====================================
// NEW: Get Pharmacies Having a Medicine
// =====================================
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

    // User
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Inventories
    Route::apiResource('inventories', InventoryController::class);
});