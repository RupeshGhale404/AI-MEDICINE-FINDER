import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import GoogleMap from "../../components/google/GoogleMap";

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

  const isAdmin = user?.role?.slug === "admin";

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

  /*
   * Loading state
   */
  if (loading) {
    return (
      <Layout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="text-xl font-semibold text-gray-600">
            Loading pharmacy...
          </div>
        </div>
      </Layout>
    );
  }

  /*
   * Pharmacy not found
   */
  if (!pharmacy) {
    return (
      <Layout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="text-xl font-semibold text-red-500">
            Pharmacy not found.
          </div>
        </div>
      </Layout>
    );
  }

  /*
   * Google Maps address
   *
   * We use the pharmacy address instead of latitude/longitude.
   */
  const mapAddress = [
    pharmacy.address,
    pharmacy.city,
    "Nepal",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Layout>
      <div className="mx-auto max-w-6xl">

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

          {/* ================= HEADER ================= */}

          <div className="border-b border-gray-200 p-8">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>
                <div className="mb-2 flex items-center gap-3">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
                    🏥
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {pharmacy.name}
                    </h1>

                    <p className="mt-1 text-gray-500">
                      Pharmacy Details
                    </p>
                  </div>

                </div>
              </div>

              {/* Admin Actions */}

              {isAdmin && (
                <div className="flex gap-3">

                  <Link
                    to={`/pharmacies/edit/${pharmacy.id}`}
                    className="rounded-lg bg-yellow-500 px-5 py-2.5 font-semibold text-white transition hover:bg-yellow-600"
                  >
                    ✏️ Edit
                  </Link>

                  <button
                    onClick={handleDelete}
                    className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
                  >
                    🗑️ Delete
                  </button>

                </div>
              )}

            </div>

          </div>

          {/* ================= INFORMATION ================= */}

          <div className="p-8">

            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Pharmacy Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Address */}

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                <div className="mb-2 flex items-center gap-2">

                  <span className="text-xl">
                    📍
                  </span>

                  <h3 className="font-semibold text-gray-700">
                    Address
                  </h3>

                </div>

                <p className="text-gray-900">
                  {pharmacy.address}
                </p>

              </div>

              {/* City */}

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                <div className="mb-2 flex items-center gap-2">

                  <span className="text-xl">
                    🏙️
                  </span>

                  <h3 className="font-semibold text-gray-700">
                    City
                  </h3>

                </div>

                <p className="text-gray-900">
                  {pharmacy.city}
                </p>

              </div>

              {/* Phone */}

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                <div className="mb-2 flex items-center gap-2">

                  <span className="text-xl">
                    📞
                  </span>

                  <h3 className="font-semibold text-gray-700">
                    Phone
                  </h3>

                </div>

                <p className="text-gray-900">
                  {pharmacy.phone}
                </p>

              </div>

              {/* Email */}

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                <div className="mb-2 flex items-center gap-2">

                  <span className="text-xl">
                    ✉️
                  </span>

                  <h3 className="font-semibold text-gray-700">
                    Email
                  </h3>

                </div>

                <p className="break-all text-gray-900">
                  {pharmacy.email}
                </p>

              </div>

              {/* Opening Time */}

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                <div className="mb-2 flex items-center gap-2">

                  <span className="text-xl">
                    🕐
                  </span>

                  <h3 className="font-semibold text-gray-700">
                    Opening Time
                  </h3>

                </div>

                <p className="text-gray-900">
                  {pharmacy.opening_time || "-"}
                </p>

              </div>

              {/* Closing Time */}

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                <div className="mb-2 flex items-center gap-2">

                  <span className="text-xl">
                    🕐
                  </span>

                  <h3 className="font-semibold text-gray-700">
                    Closing Time
                  </h3>

                </div>

                <p className="text-gray-900">
                  {pharmacy.closing_time || "-"}
                </p>

              </div>

            </div>

            {/* ================= GOOGLE MAP ================= */}

            <div className="mt-10">

              <div className="mb-5">

                <h2 className="text-2xl font-bold text-gray-900">
                  📍 Pharmacy Location
                </h2>

                <p className="mt-1 text-gray-500">
                  Find this pharmacy on Google Maps.
                </p>

              </div>

              <GoogleMap
                address={mapAddress}
              />

            </div>

            {/* ================= USER NOTICE ================= */}

            {!isAdmin && (
              <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">

                <div className="flex items-start gap-3">

                  <span className="text-xl">
                    ℹ️
                  </span>

                  <div>

                    <h3 className="font-semibold text-blue-800">
                      Read-only access
                    </h3>

                    <p className="mt-1 text-sm text-blue-700">
                      You can view pharmacy information and its
                      location, but only administrators can modify
                      or delete this pharmacy.
                    </p>

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default PharmacyDetails;