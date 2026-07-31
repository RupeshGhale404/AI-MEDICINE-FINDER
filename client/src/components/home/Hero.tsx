import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Search,
  Bot,
  CheckCircle,
} from "lucide-react";

import FloatingCard from "./FloatingCard";
import HeroStats from "./HeroStats";

import { getHomeStats } from "../../services/homeService";

interface DashboardStats {
  total_users: number;
  total_medicines: number;
  total_pharmacies: number;
  inventory_items: number;
}

function Hero() {
  const [stats, setStats] = useState<DashboardStats>({
    total_users: 0,
    total_medicines: 0,
    total_pharmacies: 0,
    inventory_items: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getHomeStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadStats();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500">

      {/* Background Decorations */}

      <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -top-32 -left-20"></div>

      <div className="absolute w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-white font-medium">

              🚀 AI Powered Healthcare

            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mt-8">

              Find Medicines

              <br />

              <span className="text-yellow-300">

                Anytime.

              </span>

              <br />

              Anywhere.

            </h1>

            <p className="mt-8 text-xl text-blue-100 leading-9 max-w-xl">

              Search medicines instantly, discover nearby pharmacies,
              compare prices, and receive intelligent AI-powered
              healthcare recommendations.

            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/search"
                className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition flex items-center gap-3"
              >
                <Search size={20} />
                Search Medicines
              </Link>

              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-700 transition flex items-center gap-3"
              >
                <Bot size={20} />
                Login
              </Link>

            </div>

            {/* Trust */}

            <div className="grid grid-cols-2 gap-4 mt-10 text-white">

              <div className="flex items-center gap-3">

                <CheckCircle className="text-green-300" />

                Verified Medicines

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle className="text-green-300" />

                Trusted Pharmacies

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle className="text-green-300" />

                AI Recommendation

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle className="text-green-300" />

                Secure Platform

              </div>

            </div>

            {/* Dynamic Stats */}

            <HeroStats
              medicines={stats.total_medicines}
              pharmacies={stats.total_pharmacies}
              users={stats.total_users}
              inventory={stats.inventory_items}
            />

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=80"
              alt="Healthcare"
              className="rounded-3xl shadow-2xl w-full max-w-xl border-8 border-white/20"
            />

            <FloatingCard
              icon="💊"
              title="Medicine Search"
              subtitle="Real-time Results"
              className="-top-5 -left-10"
            />

            <FloatingCard
              icon="🏥"
              title="Nearby Pharmacy"
              subtitle="GPS Enabled"
              className="top-44 -right-12"
            />

            <FloatingCard
              icon="🤖"
              title="AI Assistant"
              subtitle="24/7 Available"
              className="-bottom-5 left-16"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;