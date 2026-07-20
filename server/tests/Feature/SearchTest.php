<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Inventory;
use App\Models\Manufacturer;
use App\Models\Medicine;
use App\Models\Pharmacy;
use App\Models\Role;
use App\Models\SearchHistory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SearchTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_search_returns_matching_inventory_rows(): void
    {
        $category = Category::create([
            'name' => 'Fever Care',
            'description' => 'Medicines for fever related symptoms',
        ]);

        $manufacturer = Manufacturer::create([
            'name' => 'Sun Pharma',
            'slug' => 'sun-pharma',
            'website' => 'https://www.sunpharma.com',
        ]);

        $role = Role::create([
            'name' => 'Pharmacy Owner',
            'slug' => 'pharmacy-owner',
            'description' => 'Owns a pharmacy',
        ]);

        $owner = User::create([
            'role_id' => $role->id,
            'name' => 'Owner One',
            'email' => 'owner@example.com',
            'phone' => '9999999999',
            'password' => 'password',
            'status' => 'active',
        ]);

        $pharmacy = Pharmacy::create([
            'owner_id' => $owner->id,
            'name' => 'Health Hub Pharmacy',
            'registration_number' => 'REG-1001',
            'phone' => '9876543210',
            'email' => 'pharmacy@example.com',
            'address' => 'Main Street',
            'latitude' => 17.385044,
            'longitude' => 78.486671,
            'opening_time' => '09:00:00',
            'closing_time' => '21:00:00',
            'status' => 'approved',
        ]);

        $medicine = Medicine::create([
            'category_id' => $category->id,
            'manufacturer_id' => $manufacturer->id,
            'barcode' => '1234567890123',
            'medicine_code' => 'MED-001',
            'name' => 'Paracetamol',
            'generic_name' => 'Acetaminophen',
            'dosage' => '500 mg',
            'strength' => '500 mg',
            'form' => 'Tablet',
            'description' => 'Used for fever and pain relief',
            'indications' => 'Fever, pain, cold',
            'symptoms' => 'Headache, body ache',
            'price' => 25.00,
            'stock_quantity' => 100,
            'expiry_date' => now()->addYear()->toDateString(),
            'image' => null,
            'prescription_required' => false,
        ]);

        Inventory::create([
            'medicine_id' => $medicine->id,
            'pharmacy_id' => $pharmacy->id,
            'quantity' => 24,
            'selling_price' => 30.00,
        ]);

        $response = $this->getJson('/api/search?query=fever');

        $response->assertOk();
        $response->assertJsonPath('total_results', 1);
        $response->assertJsonFragment([
            'medicine_name' => 'Paracetamol',
        ]);
    }

    public function test_public_suggestions_return_search_terms(): void
    {
        Medicine::create([
            'name' => 'Cetirizine',
            'generic_name' => 'Cetirizine Hydrochloride',
            'dosage' => '10 mg',
            'strength' => '10 mg',
            'form' => 'Tablet',
            'description' => 'Antihistamine medicine',
            'indications' => 'Allergy',
            'symptoms' => 'Sneezing',
            'price' => 10.00,
            'stock_quantity' => 50,
            'expiry_date' => now()->addYear()->toDateString(),
            'image' => null,
            'prescription_required' => false,
        ]);

        $response = $this->getJson('/api/search/suggestions?query=ceti');

        $response->assertOk();
        $response->assertJsonStructure([
            'message',
            'data',
        ]);
    }

    public function test_authenticated_user_can_store_search_history(): void
    {
        $role = Role::create([
            'name' => 'Customer',
            'slug' => 'customer',
            'description' => 'Customer user',
        ]);

        $user = User::create([
            'role_id' => $role->id,
            'name' => 'Test User',
            'email' => 'test-user@example.com',
            'phone' => '9999999999',
            'password' => 'password',
            'status' => 'active',
        ]);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/search/history', [
            'query' => 'paracetamol',
            'filters' => [
                'category' => 'fever care',
            ],
            'result_count' => 1,
        ]);

        $response->assertCreated();
        $response->assertJsonPath('data.query', 'paracetamol');

        $this->assertDatabaseHas('search_histories', [
            'user_id' => $user->id,
            'query' => 'paracetamol',
        ]);
    }
}