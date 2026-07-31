import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Hero from "../../components/home/Hero";
import Stats from "../../components/home/Stats";
import Services from "../../components/home/Services";
import FeaturedPharmacies from "../../components/home/FeaturedPharmacies";
import AISection from "../../components/home/AISection";
import Testimonials from "../../components/home/Testimonials";
import Contact from "../../components/home/Contact";
import Footer from "../../components/common/Footer";

import SearchBar from "../../components/common/SearchBar";
import MedicineCard from "../../components/medicine/MedicineCard";

import { getMedicines } from "../../services/medicineService";
import type { Medicine } from "../../types/Medicine";

function Home() {
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] =useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getMedicines();
        setMedicines(data);
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Navbar />

      <main className="pt-24 bg-gray-50">

        {/* Hero */}
        <Hero />

        {/* Statistics */}
        <Stats />

        {/* Services */}
        <Services />

        {/* Search */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={handleSearch}
              placeholder="Search medicine, disease, symptom or category..."
            />
          </div>
        </section>

        {/* Featured Medicines */}
        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="text-center mb-14">

            <span className="text-blue-600 font-semibold uppercase tracking-wider">
              Medicine Database
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-2">
              Featured Medicines
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Search and discover medicines available in our healthcare
              platform.
            </p>

          </div>

          {loading ? (

            <div className="flex justify-center py-16">

              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>

            </div>

          ) : medicines.length === 0 ? (

            <div className="text-center py-16 text-red-500 text-lg">
              No medicines available.
            </div>

          ) : (

            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {medicines.slice(0, 8).map((medicine) => (

                  <MedicineCard
                    key={medicine.id}
                    medicine={medicine}
                  />

                ))}

              </div>

              <div className="text-center mt-14">

                <button
                  onClick={() => navigate("/medicines")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-lg"
                >
                  View All Medicines
                </button>

              </div>

            </>

          )}

        </section>

        {/* Featured Pharmacies */}
        <FeaturedPharmacies />

        {/* AI Assistant */}
        <AISection />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact */}
        <Contact />

      </main>

      <Footer />
    </>
  );
}

export default Home;