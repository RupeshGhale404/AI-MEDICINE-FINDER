import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MedicineForm from "../../components/medicine/MedicineForm";
import { createMedicine } from "../../services/medicineService";


export default function AddMedicine() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (data: FormData) => {

    try {

      setLoading(true);

      await createMedicine(data);


      alert("Medicine added successfully");


      navigate("/medicines");


    } catch (error:any) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add medicine"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Add Medicine
      </h1>


      <MedicineForm
        onSubmit={handleSubmit}
        loading={loading}
      />


    </div>

  );

}