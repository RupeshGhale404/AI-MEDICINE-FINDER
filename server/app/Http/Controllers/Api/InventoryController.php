<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    // GET ALL INVENTORY
    public function index()
    {
        $inventories = Inventory::with(['medicine', 'pharmacy'])->get();

        return response()->json([
            'message' => 'Inventory fetched successfully',
            'data' => $inventories
        ]);
    }

    // CREATE INVENTORY
    public function store(Request $request)
    {
        $request->validate([
            'medicine_id' => 'required|exists:medicines,id',
            'pharmacy_id' => 'required|exists:pharmacies,id',
            'quantity' => 'required|integer|min:0',
            'selling_price' => 'required|numeric|min:0'
        ]);

        $inventory = Inventory::create([
            'medicine_id' => $request->medicine_id,
            'pharmacy_id' => $request->pharmacy_id,
            'quantity' => $request->quantity,
            'selling_price' => $request->selling_price
        ]);

        return response()->json([
            'message' => 'Inventory created successfully',
            'data' => $inventory->load(['medicine', 'pharmacy'])
        ], 201);
    }

    // GET SINGLE INVENTORY
    public function show(string $id)
    {
        $inventory = Inventory::with(['medicine', 'pharmacy'])->find($id);

        if (!$inventory) {
            return response()->json([
                'message' => 'Inventory not found'
            ], 404);
        }

        return response()->json([
            'data' => $inventory
        ]);
    }

    // UPDATE INVENTORY
    public function update(Request $request, string $id)
    {
        $inventory = Inventory::find($id);

        if (!$inventory) {
            return response()->json([
                'message' => 'Inventory not found'
            ], 404);
        }

        $request->validate([
            'medicine_id' => 'sometimes|exists:medicines,id',
            'pharmacy_id' => 'sometimes|exists:pharmacies,id',
            'quantity' => 'sometimes|integer|min:0',
            'selling_price' => 'sometimes|numeric|min:0'
        ]);

        $inventory->update($request->all());

        return response()->json([
            'message' => 'Inventory updated successfully',
            'data' => $inventory->load(['medicine', 'pharmacy'])
        ]);
    }

    // DELETE INVENTORY
    public function destroy(string $id)
    {
        $inventory = Inventory::find($id);

        if (!$inventory) {
            return response()->json([
                'message' => 'Inventory not found'
            ], 404);
        }

        $inventory->delete();

        return response()->json([
            'message' => 'Inventory deleted successfully'
        ]);
    }
}