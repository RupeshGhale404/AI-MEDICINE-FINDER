import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MedicalScene from "./MedicalScene";   // ← import the 3D scene

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Soft background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.28, 0.4, 0.28] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-300/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.22, 0.35, 0.22] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute top-1/3 -right-40 w-[580px] h-[580px] bg-indigo-300/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                Trusted Healthcare Platform
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight"
            >
              Find Medicines{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Instantly
              </span>
              <br />
              Near You
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Search thousands of medicines, compare prices across pharmacies,
              and get AI-powered health guidance — all in one place.
            </motion.p>

            {/* Search */}
            <motion.form
              variants={item}
              onSubmit={handleSearch}
              className="mt-8 max-w-xl mx-auto lg:mx-0"
            >
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-blue-100/70 border border-gray-100 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/40 transition-all">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search medicine, disease or symptom..."
                  className="flex-1 px-6 py-4 text-gray-800 placeholder:text-gray-400 outline-none text-base"
                />
                <button
                  type="submit"
                  className="m-1.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </motion.form>

            {/* CTAs */}
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/medicines")}
                className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all"
              >
                Browse Medicines
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/pharmacies")}
                className="px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl border border-gray-200 shadow-sm transition-all"
              >
                Find Pharmacies
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span> 10,000+ Medicines
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span> 500+ Pharmacies
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span> AI Health Assistant
              </div>
            </motion.div>
          </motion.div>

          {/* Right side – 3D Medical Models */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Soft glow behind the canvas */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-transparent rounded-3xl blur-2xl scale-110" />
            
            <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 shadow-2xl shadow-blue-100/50 overflow-hidden">
              <MedicalScene />
            </div>

            {/* Floating labels */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-4 py-2.5 border border-gray-100"
            >
              <p className="text-xs text-gray-500">Interactive</p>
              <p className="font-semibold text-gray-800 text-sm">3D Models</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-gray-300 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;