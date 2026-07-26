import { Bot, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function AISection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

          <div>

            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              🤖 AI Powered Healthcare
            </span>

            <h2 className="text-5xl font-bold mt-6 leading-tight">
              Meet Your
              <br />
              AI Medicine Assistant
            </h2>

            <p className="mt-6 text-blue-100 text-lg leading-8">
              Describe your symptoms and receive intelligent medicine
              recommendations from our healthcare database. The AI assistant
              helps you find medicines quickly and locate nearby pharmacies.
            </p>

            <div className="mt-10">

              <Link
                to="/ai"
                className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Try AI Assistant
                <ArrowRight size={20} />
              </Link>

            </div>

          </div>

          {/* Right Side */}

          <div className="bg-white rounded-3xl shadow-2xl p-8 text-gray-800">

            {/* AI */}

            <div className="flex gap-3 mb-6">

              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                <Bot className="text-white" />
              </div>

              <div className="bg-blue-50 rounded-2xl p-4 flex-1">
                <strong>AI Assistant</strong>

                <p className="mt-2">
                  👋 Hello! I'm your AI Medicine Assistant.
                </p>

                <p className="mt-2">
                  Tell me your symptoms and I'll recommend medicines from our database.
                </p>
              </div>

            </div>

            {/* User */}

            <div className="flex gap-3 justify-end mb-6">

              <div className="bg-blue-600 text-white rounded-2xl p-4 max-w-xs">
                I have fever and headache.
              </div>

              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                <User />
              </div>

            </div>

            {/* AI */}

            <div className="flex gap-3">

              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                <Bot className="text-white" />
              </div>

              <div className="bg-green-50 rounded-2xl p-4 flex-1">

                <strong>Recommendation</strong>

                <ul className="mt-3 space-y-2 text-sm">

                  <li>✅ Paracetamol 500mg</li>

                  <li>✅ Drink plenty of water</li>

                  <li>✅ Take adequate rest</li>

                  <li>✅ Consult a doctor if symptoms continue.</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AISection;