import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import UserLayout from "../../components/user/UserLayout";

import { useAuth } from "../../context/AuthContext";

import {
  deletePharmacy,
  getPharmacy,
} from "../../services/pharmacyService";

import type { Pharmacy } from "../../types/Pharmacy";

function PharmacyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const isAdmin = user?.role.slug === "admin";

  const [loading, setLoading] = useState(true);
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);

  useEffect(() => {
    if (id) {
      loadPharmacy(Number(id));
    }
  }, [id]);

  const loadPharmacy = async (pharmacyId: number) => {
    try {
      const data = await getPharmacy(pharmacyId);
      setPharmacy(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load pharmacy.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isAdmin) {
      alert("Unauthorized.");
      return;
    }

    if (!window.confirm("Delete this pharmacy?")) {
      return;
    }

    try {
      await deletePharmacy(Number(id));

      alert("Pharmacy deleted successfully.");

      navigate("/pharmacies");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  const Layout = isAdmin ? AdminLayout : UserLayout;

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[70vh] text-xl font-semibold">
          Loading pharmacy...
        </div>
      </Layout>
    );
  }

  if (!pharmacy) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[70vh] text-red-500 text-xl font-semibold">
          Pharmacy not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">

          {/* Header */}

          <div className="flex justify-between items-center mb-8">

            <div>
              <h1 className="text-4xl font-bold">
                {pharmacy.name}
              </h1>

              <p className="text-gray-500 mt-2">
                Pharmacy Details
              </p>
            </div>

            {isAdmin && (
              <div className="flex gap-3">

                <Link
                  to={`/pharmacies/edit/${pharmacy.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                >
                  Edit
                </Link>

                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>
            )}

          </div>

          {/* Pharmacy Information */}

          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <h2 className="font-semibold text-gray-700">
                Address
              </h2>

              <p className="mt-2">
                {pharmacy.address}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">
                City
              </h2>

              <p className="mt-2">
                {pharmacy.city}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">
                Phone
              </h2>

              <p className="mt-2">
                {pharmacy.phone}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">
                Email
              </h2>

              <p className="mt-2">
                {pharmacy.email}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">
                Opening Time
              </h2>

              <p className="mt-2">
                {pharmacy.opening_time}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">
                Closing Time
              </h2>

              <p className="mt-2">
                {pharmacy.closing_time}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">
                Latitude
              </h2>

              <p className="mt-2">
                {pharmacy.latitude}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">
                Longitude
              </h2>

              <p className="mt-2">
                {pharmacy.longitude}
              </p>
            </div>

          </div>

          {/* User Notice */}

          {!isAdmin && (
            <div className="mt-10 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700">
                You have read-only access. Contact an administrator to modify this pharmacy.
              </p>
            </div>
          )}

        </div>

      </div>
    </Layout>
  );
}

export default PharmacyDetails;