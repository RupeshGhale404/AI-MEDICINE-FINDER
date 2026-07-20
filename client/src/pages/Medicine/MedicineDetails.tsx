import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import { getMedicine } from "../../services/medicineService";
import type { Medicine } from "../../types/Medicine";

const MedicineDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        if (id) {
          const data = await getMedicine(Number(id));
          setMedicine(data);
        }
      } catch (error) {
        console.error("Failed to fetch medicine:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-5xl mx-auto py-20 text-center text-lg">
          Loading medicine...
        </div>
        <Footer />
      </>
    );
  }

  if (!medicine) {
    return (
      <>
        <Navbar />
        <div className="max-w-5xl mx-auto py-20 text-center text-lg">
          Medicine not found.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-blue-600 mb-8">
            💊 {medicine.name}
          </h1>

          <div className="space-y-4 text-lg">

            <p>
              <strong>Generic Name:</strong>{" "}
              {medicine.generic_name ?? "-"}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {medicine.description ?? "-"}
            </p>

            <p>
              <strong>Manufacturer:</strong>{" "}
              {medicine.manufacturer
                ? typeof medicine.manufacturer === "string"
                  ? medicine.manufacturer
                  : medicine.manufacturer.name
                : "-"}
            </p>

            <p>
              <strong>Price:</strong>{" "}
              Rs. {medicine.price}
            </p>

            <p>
              <strong>Stock:</strong>{" "}
              {medicine.stock_quantity}
            </p>

            <p>
              <strong>Expiry Date:</strong>{" "}
              {medicine.expiry_date ?? "-"}
            </p>

          </div>

          <div className="mt-10 flex gap-4">

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Back
            </button>

            <button
              onClick={() =>
                navigate(`/medicines/${medicine.id}/pharmacies`)
              }
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Find Nearby Pharmacy
            </button>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default MedicineDetails;