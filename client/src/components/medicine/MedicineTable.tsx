import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import type { Medicine } from "../../services/medicineService";

import {
  deleteMedicine,
} from "../../services/medicineService";

interface Props {
  medicines: Medicine[];

  setMedicines: React.Dispatch<
    React.SetStateAction<Medicine[]>
  >;
}

function MedicineTable({
  medicines,
  setMedicines,
}: Props) {

  const navigate = useNavigate();

  const { user } = useAuth();

  const isAdmin =
    user?.role.slug === "admin";

  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmDelete) return;

    try {

      await deleteMedicine(id);

      setMedicines((prev) =>
        prev.filter(
          (medicine) =>
            medicine.id !== id
        )
      );

      alert(
        "Medicine deleted successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete medicine"
      );

    }

  };

  return (
    <div className="overflow-x-auto">

      <table className="w-full bg-white shadow rounded-lg">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3 text-left">
              ID
            </th>

            <th className="p-3 text-left">
              Medicine
            </th>

            <th className="p-3 text-left">
              Generic
            </th>

            <th className="p-3 text-left">
              Price
            </th>

            <th className="p-3 text-left">
              Stock
            </th>

            <th className="p-3 text-left">
              Expiry
            </th>

            <th className="p-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {medicines.map((medicine) => (

            <tr
              key={medicine.id}
              className="border-t"
            >

              <td className="p-3">
                {medicine.id}
              </td>

              <td className="p-3">
                {medicine.name}
              </td>

              <td className="p-3">
                {medicine.generic_name}
              </td>

              <td className="p-3">
                Rs. {medicine.price}
              </td>

              <td className="p-3">
                {medicine.stock_quantity}
              </td>

              <td className="p-3">
                {medicine.expiry_date}
              </td>

              <td className="p-3 space-x-2">

                <button
                  onClick={() =>
                    navigate(
                      `/medicines/${medicine.id}`
                    )
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View
                </button>

                {isAdmin && (
                  <>
                    <button
                      onClick={() =>
                        navigate(
                          `/medicines/edit/${medicine.id}`
                        )
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          medicine.id
                        )
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MedicineTable;