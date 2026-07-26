import {
  Pill,
  Building2,
  Users,
  Bot,
} from "lucide-react";

function Stats() {
  const stats = [
    {
      icon: <Pill size={40} className="text-blue-600" />,
      number: "500+",
      title: "Medicines",
    },
    {
      icon: <Building2 size={40} className="text-green-600" />,
      number: "100+",
      title: "Pharmacies",
    },
    {
      icon: <Users size={40} className="text-purple-600" />,
      number: "1000+",
      title: "Users",
    },
    {
      icon: <Bot size={40} className="text-red-600" />,
      number: "24/7",
      title: "AI Assistant",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-gray-800">
            Trusted Healthcare Platform
          </h2>

          <p className="text-gray-500 mt-3">
            Fast medicine search with AI-powered healthcare support.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow hover:shadow-lg transition p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold text-gray-800">
                {item.number}
              </h3>

              <p className="text-gray-500 mt-2">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;