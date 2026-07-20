<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Medicine\StoreMedicineRequest;
use App\Http\Requests\Medicine\UpdateMedicineRequest;
use App\Models\Medicine;
use Illuminate\Http\Request;
use App\Models\Inventory;


class MedicineController extends Controller
{

    // GET ALL MEDICINES
    public function index(Request $request)
    {

        $query = Medicine::query();


        if($request->filled('search')){

            $search = $request->search;


            $query->where(function($builder) use ($search){

                $builder
                ->where('name','ILIKE',"%{$search}%")
                ->orWhere('generic_name','ILIKE',"%{$search}%");

            });

        }


        $medicines = $query->get();


        return response()->json([

            'message'=>'Medicines fetched successfully',

            'data'=>$medicines

        ]);

    }



    // CREATE MEDICINE
    public function store(StoreMedicineRequest $request)
    {

        $medicine = Medicine::create(
            $request->validated()
        );


        return response()->json([

            'message'=>'Medicine created successfully',

            'data'=>$medicine

        ],201);

    }




    // GET SINGLE MEDICINE
    public function show(string $id)
    {

        $medicine = Medicine::find($id);


        if(!$medicine){

            return response()->json([

                'message'=>'Medicine not found'

            ],404);

        }


        return response()->json([

            'message'=>'Medicine fetched successfully',

            'data'=>$medicine

        ]);

    }





    // UPDATE MEDICINE
    public function update(
        UpdateMedicineRequest $request,
        string $id
    )
    {

        $medicine = Medicine::find($id);



        if(!$medicine){

            return response()->json([

                'message'=>'Medicine not found'

            ],404);

        }



        $medicine->update(
            $request->validated()
        );



        return response()->json([

            'message'=>'Medicine updated successfully',

            'data'=>$medicine

        ]);

    }





    // DELETE MEDICINE
    public function destroy(string $id)
    {

        $medicine = Medicine::find($id);



        if(!$medicine){

            return response()->json([

                'message'=>'Medicine not found'

            ],404);

        }



        $medicine->delete();



        return response()->json([

            'message'=>'Medicine deleted successfully'

        ]);

    }





    // SEARCH AVAILABILITY
    public function searchAvailability(Request $request)
    {

        $request->validate([

            'name'=>'required|string'

        ]);



        $name = $request->name;



        $inventory = Inventory::with([

            'medicine',

            'pharmacy'

        ])
        ->whereHas('medicine',function($query) use ($name){

            $query->where('name','ILIKE',"%{$name}%")
            ->orWhere('generic_name','ILIKE',"%{$name}%");

        })
        ->where('quantity','>',0)
        ->get();



        return response()->json([

            'message'=>'Medicine availability found',

            'data'=>$inventory

        ]);

    }


}