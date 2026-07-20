<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\Medicine;
use App\Models\Pharmacy;
use Illuminate\Http\Request;

class PharmacyController extends Controller
{
    /**
     * Display all pharmacies.
     */
    public function index()
    {
        return response()->json([
            'message' => 'Pharmacies fetched successfully',
            'data' => Pharmacy::latest()->get(),
        ]);
    }

    /**
     * Store pharmacy.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'owner_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'opening_time' => 'nullable',
            'closing_time' => 'nullable',
            'is_open' => 'boolean',
        ]);

        $pharmacy = Pharmacy::create($validated);

        return response()->json([
            'message' => 'Pharmacy created successfully',
            'data' => $pharmacy,
        ], 201);
    }

    /**
     * Show pharmacy.
     */
    public function show(Pharmacy $pharmacy)
    {
        return response()->json([
            'message' => 'Pharmacy fetched successfully',
            'data' => $pharmacy,
        ]);
    }

    /**
     * Update pharmacy.
     */
    public function update(Request $request, Pharmacy $pharmacy)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'owner_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'opening_time' => 'nullable',
            'closing_time' => 'nullable',
            'is_open' => 'boolean',
        ]);

        $pharmacy->update($validated);

        return response()->json([
            'message' => 'Pharmacy updated successfully',
            'data' => $pharmacy,
        ]);
    }

    /**
     * Delete pharmacy.
     */
    public function destroy(Pharmacy $pharmacy)
    {
        $pharmacy->delete();

        return response()->json([
            'message' => 'Pharmacy deleted successfully',
        ]);
    }

    /**
     * Nearby pharmacies that have a medicine.
     */
    public function nearby(Request $request, Medicine $medicine)
    {
        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $latitude = $request->latitude;
        $longitude = $request->longitude;

        $distanceSql = "(6371 * acos(
            cos(radians(?))
            * cos(radians(pharmacies.latitude))
            * cos(radians(pharmacies.longitude) - radians(?))
            + sin(radians(?))
            * sin(radians(pharmacies.latitude))
        ))";

        $inventories = Inventory::query()
            ->join('pharmacies', 'inventories.pharmacy_id', '=', 'pharmacies.id')
            ->where('inventories.medicine_id', $medicine->id)
            ->where('inventories.quantity', '>', 0)
            ->whereNotNull('pharmacies.latitude')
            ->whereNotNull('pharmacies.longitude')
            ->select(
                'inventories.id',
                'inventories.quantity',
                'inventories.selling_price',
                'pharmacies.id as pharmacy_id',
                'pharmacies.name',
                'pharmacies.address',
                'pharmacies.city',
                'pharmacies.phone',
                'pharmacies.email',
                'pharmacies.latitude',
                'pharmacies.longitude',
                'pharmacies.opening_time',
                'pharmacies.closing_time',
                'pharmacies.is_open'
            )
            ->selectRaw("$distanceSql AS distance", [
                $latitude,
                $longitude,
                $latitude
            ])
            ->orderBy('distance')
            ->get();

        return response()->json([
            'message' => 'Nearby pharmacies found successfully.',
            'medicine' => $medicine,
            'data' => $inventories,
        ]);
    }
}