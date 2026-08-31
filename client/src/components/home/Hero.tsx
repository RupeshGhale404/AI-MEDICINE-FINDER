import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import MedicalScene from "./MedicalScene";

// ---------- Animation Variants ----------
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

// ---------- Mock Data ----------
const popularSearches = ["Paracetamol", "Vitamin D", "Insulin", "Amoxicillin", "Ibuprofen"];
const allSuggestions = [
  { term: "Paracetamol", type: "Medicine" },
  { term: "Paracetamol 500mg", type: "Dosage" },
  { term: "Fever", type: "Symptom" },
  { term: "Headache", type: "Symptom" },
  { term: "Cough Syrup", type: "Medicine" },
  { term: "Insulin", type: "Medicine" },
  { term: "Diabetes", type: "Condition" },
  { term: "Vitamin D", type: "Supplement" },
  { term: "Amoxicillin", type: "Antibiotic" },
  { term: "Ibuprofen", type: "Painkiller" },
];

const healthTips = [
  "💧 Stay hydrated – drink at least 8 glasses of water daily.",
  "🏃‍♂️ 30 minutes of walking can reduce heart disease risk by 30%.",
  "🛌 7-9 hours of sleep boosts immunity and mental clarity.",
  "🥦 Include leafy greens in your diet for essential vitamins.",
  "🧘‍♀️ Practice mindfulness to reduce stress and anxiety.",
  "☀️ Get 15 minutes of sunlight for natural Vitamin D.",
];

// ---------- Types ----------
interface Suggestion {
  term: string;
  type: string;
}

// ---------- Voice Search (Web Speech API) ----------
declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

const useVoiceRecognition = (onResult: (transcript: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [onResult]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isListening, startListening, stopListening };
};

// ---------- Animated Counter ----------
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !inView.current) {
          inView.current = true;
          const controls = animate(0, value, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (latest) => setDisplayValue(Math.round(latest)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

// ---------- Main Hero Component ----------
function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [tipIndex, setTipIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce suggestions
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored).slice(0, 5));
  }, []);

  // Rotate health tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % healthTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Voice recognition
  const handleVoiceResult = useCallback((transcript: string) => {
    setQuery(transcript);
    setShowSuggestions(true);
    inputRef.current?.focus();
  }, []);

  const { isListening, startListening, stopListening } = useVoiceRecognition(handleVoiceResult);

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setShowSuggestions(false);

    // Save to recent searches
    const updatedRecents = [query.trim(), ...recentSearches.filter((s) => s.toLowerCase() !== query.trim().toLowerCase())].slice(0, 5);
    setRecentSearches(updatedRecents);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecents));

    // Simulate network delay
    setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setLoading(false);
    }, 600);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(new Event("submit") as any);
  };

  const clearInput = () => {
    setQuery("");
    inputRef.current?.focus();
    setShowSuggestions(true);
  };

  // Filtered suggestions based on debounced query
  const filteredSuggestions: Suggestion[] = debouncedQuery
    ? allSuggestions
        .filter((s) => s.term.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .slice(0, 6)
    : popularSearches.slice(0, 5).map((term) => ({ term, type: "Popular" }));

  // Mouse parallax for 3D scene
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

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
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/4 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl"
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

            {/* Search Form with Suggestions */}
            <motion.form
              variants={item}
              onSubmit={handleSearch}
              className="mt-8 max-w-xl mx-auto lg:mx-0"
              aria-label="Medicine search"
            >
              <div ref={searchContainerRef} className="relative">
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-blue-100/70 border border-gray-100 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/40 transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search medicine, disease or symptom..."
                    className="flex-1 px-6 py-4 text-gray-800 placeholder:text-gray-400 outline-none text-base"
                    aria-label="Search query"
                    aria-expanded={showSuggestions}
                    aria-autocomplete="list"
                    aria-controls="search-suggestions"
                    role="combobox"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={clearInput}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Clear search"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  {/* Voice Search Button */}
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 transition-colors ${isListening ? "text-red-500 animate-pulse" : "text-gray-400 hover:text-blue-600"}`}
                    aria-label="Voice search"
                    title="Voice search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m14 0a7 7 0 01-14 0m14 0h-2m-12 0H5m6 0a3 3 0 106 0 3 3 0 00-6 0z" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="m-1.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-label="Search"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                    {loading ? "Searching..." : "Search"}
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                      id="search-suggestions"
                      role="listbox"
                    >
                      {filteredSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion.term)}
                          className="w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between group"
                          role="option"
                          aria-selected={false}
                        >
                          <span className="text-gray-800 font-medium group-hover:text-blue-700">
                            {suggestion.term}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                            {suggestion.type}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-2 justify-center lg:justify-start">
                <span className="text-sm text-gray-500">Recent:</span>
                {recentSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(term);
                      handleSearch(new Event("submit") as any);
                    }}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </motion.div>
            )}

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

            {/* Animated Stats */}
            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <Counter value={10000} suffix="+" /> Medicines
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <Counter value={500} suffix="+" /> Pharmacies
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span> AI Health Assistant
              </div>
            </motion.div>
          </motion.div>

          {/* Right side – 3D Medical Models with Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Soft glow behind the canvas */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-transparent rounded-3xl blur-2xl scale-110" />

            {/* 3D Scene with parallax rotation */}
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
              className="relative bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 shadow-2xl shadow-blue-100/50 overflow-hidden"
            >
              <MedicalScene />
            </motion.div>

            {/* Floating Health Tip Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-5 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-4"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-700"
                >
                  {healthTips[tipIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

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