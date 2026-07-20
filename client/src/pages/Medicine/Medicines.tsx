import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import AdminLayout from "../../components/admin/AdminLayout";
import UserLayout from "../../components/user/UserLayout";

import MedicineTable from "../../components/medicine/MedicineTable";

import {
  getMedicines,
  type Medicine,
} from "../../services/medicineService";

function Medicines() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const isAdmin = user?.role.slug === "admin";

  const Layout = isAdmin
    ? AdminLayout
    : UserLayout;

  const [medicines, setMedicines] =
    useState<Medicine[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getMedicines();
        setMedicines(data);
      } catch (error) {
        console.error(
          "Failed to fetch medicines:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <Layout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Medicines
        </h1>

        {isAdmin && (
          <button
            onClick={() =>
              navigate("/medicines/add")
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2
              rounded-lg
              transition
            "
          >
            + Add Medicine
          </button>
        )}

      </div>

      {loading ? (
        <div className="text-center py-10">
          Loading medicines...
        </div>
      ) : medicines.length === 0 ? (
        <div className="text-center py-10">
          No medicines found.
        </div>
      ) : (
        <MedicineTable
          medicines={medicines}
          setMedicines={setMedicines}
        />
      )}

    </Layout>
  );
}

export default Medicines;