import {
  Pill,
  Stethoscope,
  MapPin,
  HeartPulse,
} from "lucide-react";

interface Props {
  onSelect: (text: string) => void;
}

const suggestions = [
  {
    icon: "🤒",
    title: "I have fever",
    subtitle: "Get medicine recommendations",
    prompt: "I have fever",
  },
  {
    icon: "😷",
    title: "I have cough",
    subtitle: "Find treatment options",
    prompt: "I have cough",
  },
  {
    icon: "🤕",
    title: "I have headache",
    subtitle: "Possible causes & medicines",
    prompt: "I have headache",
  },
  {
    icon: "💊",
    title: "Paracetamol",
    subtitle: "Uses, dosage & side effects",
    prompt: "What is Paracetamol?",
  },
];

export default function SuggestedQuestions({
  onSelect,
}: Props) {
  return (
    <div className="w-full">

      {/* Features */}

      <div className="grid grid-cols-2 gap-5 mb-12">

        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">

          <HeartPulse
            className="text-blue-600 mb-3"
            size={30}
          />

          <h3 className="font-bold text-lg">
            Symptom Checker
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Describe your symptoms and receive
            medicine recommendations.
          </p>

        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">

          <Pill
            className="text-green-600 mb-3"
            size={30}
          />

          <h3 className="font-bold text-lg">
            Medicine Information
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Learn dosage, precautions and side
            effects.
          </p>

        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">

          <MapPin
            className="text-purple-600 mb-3"
            size={30}
          />

          <h3 className="font-bold text-lg">
            Nearby Pharmacies
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Find pharmacies with medicine in stock.
          </p>

        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">

          <Stethoscope
            className="text-red-600 mb-3"
            size={30}
          />

          <h3 className="font-bold text-lg">
            Health Advice
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Receive AI-powered healthcare guidance.
          </p>

        </div>

      </div>

      {/* Popular */}

      <h2 className="text-xl font-bold mb-5">
        Popular Questions
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {suggestions.map((item) => (

          <button
            key={item.title}
            onClick={() => onSelect(item.prompt)}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-blue-500 hover:shadow-lg"
          >

            <div className="text-3xl mb-3">

              {item.icon}

            </div>

            <h3 className="font-semibold text-lg">

              {item.title}

            </h3>

            <p className="text-sm text-gray-500 mt-2">

              {item.subtitle}

            </p>

          </button>

        ))}

      </div>

    </div>
  );
}