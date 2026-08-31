import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
};

function Home() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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

      <main className="pt-24 bg-gray-50 overflow-hidden relative">
        {/* Subtle parallax background accent */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 pointer-events-none opacity-30"
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
          <div className="absolute top-96 right-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl" />
        </motion.div>

        {/* Hero */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <Hero />
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <Stats />
        </motion.div>

        {/* Services */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Services />
        </motion.div>

        {/* Search Section */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Glow effect behind search */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl blur-xl" />
              
              <SearchBar
                value={query}
                onChange={setQuery}
                onSearch={handleSearch}
                placeholder="Search medicine, disease, symptom or category..."
              />
            </motion.div>
          </div>
        </section>

        {/* Featured Medicines */}
        <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeInUp}
              className="text-blue-600 font-semibold uppercase tracking-wider"
            >
              Medicine Database
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-2"
            >
              Featured Medicines
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg"
            >
              Search and discover medicines available in our healthcare platform.
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-16"
              >
                <div className="relative">
                  <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent" />
                  <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-20" />
                </div>
              </motion.div>
            ) : medicines.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 text-red-500 text-lg"
              >
                No medicines available.
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {medicines.slice(0, 8).map((medicine) => (
                    <motion.div
                      key={medicine.id}
                      variants={scaleIn}
                      whileHover={{ 
                        y: -8, 
                        transition: { duration: 0.25 } 
                      }}
                      className="h-full"
                    >
                      <MedicineCard medicine={medicine} />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={fadeInUp}
                  className="text-center mt-14"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/medicines")}
                    className="relative bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
                  >
                    <span className="relative z-10">View All Medicines</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Featured Pharmacies */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <FeaturedPharmacies />
        </motion.div>

        {/* AI Assistant */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <AISection />
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <Testimonials />
        </motion.div>

        {/* Contact */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Contact />
        </motion.div>
      </main>

      <Footer />
    </>
  );
}

export default Home;