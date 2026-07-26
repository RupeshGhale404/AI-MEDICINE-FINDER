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

const Home = () => {
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
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

      <Hero />

      <Stats />

      <Services />

      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        placeholder="Search medicine, disease, symptom, or category..."
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Featured Medicines
          </h2>

          <p className="text-gray-500 mt-3">
            Search and discover medicines available in our system.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            Loading medicines...
          </div>
        ) : medicines.length === 0 ? (
          <div className="text-center py-16 text-red-500">
            No medicines found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {medicines.slice(0, 8).map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
              />
            ))}
          </div>
        )}
      </section>

      <FeaturedPharmacies />

      <AISection />

      <Testimonials />

      <Contact />

      <Footer />
    </>
  );
};

export default Home;