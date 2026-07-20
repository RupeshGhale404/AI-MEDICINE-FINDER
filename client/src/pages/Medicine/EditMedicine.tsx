import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MedicineForm from "../../components/medicine/MedicineForm";

import {
  getMedicine,
  updateMedicine,
  type Medicine,
} from "../../services/medicineService";


function EditMedicine() {

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();


  const [medicine, setMedicine] =
    useState<Medicine | null>(null);


  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    const fetchMedicine = async () => {

      try {

        if(id){

          const data = await getMedicine(
            Number(id)
          );

          setMedicine(data);

        }


      } catch(error){

        console.error(error);

      } finally {

        setLoading(false);

      }

    };


    fetchMedicine();


  }, [id]);




  const handleSubmit = async (
    data: FormData
  ) => {

    try {

      if(id){

        await updateMedicine(
          Number(id),
          data
        );


        alert(
          "Medicine updated successfully"
        );


        navigate("/medicines");

      }


    } catch(error){

      console.error(error);

      alert(
        "Failed to update medicine"
      );

    }

  };





  if(loading){

    return (

      <DashboardLayout>

        <div className="p-6">
          Loading medicine...
        </div>

      </DashboardLayout>

    );

  }




  if(!medicine){

    return (

      <DashboardLayout>

        <div className="p-6">
          Medicine not found
        </div>

      </DashboardLayout>

    );

  }





  return (

    <DashboardLayout>


      <div className="p-6">


        <h1 className="text-3xl font-bold mb-6">
          Edit Medicine
        </h1>



        <MedicineForm
          initialData={medicine}
          onSubmit={handleSubmit}
        />


      </div>


    </DashboardLayout>

  );

}



export default EditMedicine;