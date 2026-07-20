import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import { getMedicinePharmacies } from "../../services/pharmacyService";

interface Pharmacy {
  id: number;
  name: string;
  address: string;
}

interface Inventory {
  id: number;
  quantity: number;
  selling_price: number;
  pharmacy: Pharmacy;
}

const NearbyPharmacies = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [medicineName, setMedicineName] = useState("");
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        if (!id) return;

        const response = await getMedicinePharmacies(Number(id));

        setMedicineName(response.medicine);
        setInventories(response.data);
      } catch (error) {
        console.error("Failed to fetch pharmacies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [id]);

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          🏥 Nearby Pharmacies
        </h1>

        <p className="text-gray-600 mb-8">
          Medicine: <strong>{medicineName}</strong>
        </p>

        {loading && (
          <div className="text-center py-10 text-lg">
            Loading pharmacies...
          </div>
        )}

        {!loading && inventories.length === 0 && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-6 text-center">
            No pharmacy currently has this medicine in stock.
          </div>
        )}

        {!loading && inventories.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {inventories.map((inventory) => (

              <div
                key={inventory.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >
                <h2 className="text-2xl font-semibold text-blue-600 mb-3">
                  🏥 {inventory.pharmacy.name}
                </h2>

                <p className="text-gray-600 mb-2">
                  📍 {inventory.pharmacy.address || "Address not available"}
                </p>

                <p className="mb-2">
                  📦 <strong>Stock:</strong> {inventory.quantity}
                </p>

                <p className="mb-4">
                  💰 <strong>Price:</strong> Rs. {inventory.selling_price}
                </p>

                <button
                  onClick={() =>
                    navigate(`/pharmacies/${inventory.pharmacy.id}`)
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  View Pharmacy
                </button>
              </div>

            ))}

          </div>
        )}

      </section>

      <Footer />
    </>
  );
};

export default NearbyPharmacies;