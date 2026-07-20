import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import AdminLayout from "../../components/admin/AdminLayout";
import UserLayout from "../../components/user/UserLayout";

import { getPharmacies } from "../../services/pharmacyService";
import type { Pharmacy } from "../../types/Pharmacy";

function Pharmacies() {

  const { user } = useAuth();

  const isAdmin = user?.role.slug === "admin";

  const Layout = isAdmin
    ? AdminLayout
    : UserLayout;

  const [pharmacies, setPharmacies] =
    useState<Pharmacy[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPharmacies();
  }, []);

  const loadPharmacies = async () => {
    try {

      const data = await getPharmacies();

      setPharmacies(data);

    } catch (error) {

      console.error(
        "Failed to load pharmacies:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <Layout>

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

          <div>

            <h1 className="text-4xl font-bold">
              Pharmacies
            </h1>

            <p className="text-gray-600 mt-2">
              Browse registered pharmacies.
            </p>

          </div>

          {isAdmin && (

            <Link
              to="/pharmacies/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              + Add Pharmacy
            </Link>

          )}

        </div>

        {loading ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">
            Loading pharmacies...
          </div>

        ) : pharmacies.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            No pharmacies found.
          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {pharmacies.map((pharmacy) => (

              <div
                key={pharmacy.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >

                <h2 className="text-2xl font-bold text-blue-700">
                  {pharmacy.name}
                </h2>

                <p className="mt-3 text-gray-600">
                  📍 {pharmacy.address}
                </p>

                <p className="text-gray-600">
                  🏙️ {pharmacy.city}
                </p>

                <p className="mt-2">
                  📞 {pharmacy.phone}
                </p>

                <p>
                  📧 {pharmacy.email}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  🕒 {pharmacy.opening_time} - {pharmacy.closing_time}
                </p>

                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/pharmacies/${pharmacy.id}`}
                    className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                  >
                    View
                  </Link>

                  {isAdmin && (

                    <Link
                      to={`/pharmacies/edit/${pharmacy.id}`}
                      className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                    >
                      Edit
                    </Link>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </Layout>

  );

}

export default Pharmacies;