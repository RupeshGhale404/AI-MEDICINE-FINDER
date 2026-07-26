import {
  Pill,
  Building2,
  Bot,
  Package,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

function Services() {
  const services = [
    {
      icon: <Pill size={42} className="text-blue-600" />,
      title: "Medicine Search",
      description:
        "Search medicines instantly with detailed information and availability.",
    },
    {
      icon: <Building2 size={42} className="text-green-600" />,
      title: "Nearby Pharmacies",
      description:
        "Locate nearby pharmacies and check medicine availability.",
    },
    {
      icon: <Bot size={42} className="text-purple-600" />,
      title: "AI Assistant",
      description:
        "Get AI-powered medicine recommendations based on symptoms.",
    },
    {
      icon: <Package size={42} className="text-orange-600" />,
      title: "Inventory Management",
      description:
        "Manage medicine stock, expiry dates, and inventory efficiently.",
    },
    {
      icon: <BarChart3 size={42} className="text-red-600" />,
      title: "Dashboard Analytics",
      description:
        "View statistics, medicine reports, and inventory insights.",
    },
    {
      icon: <ShieldCheck size={42} className="text-cyan-600" />,
      title: "Secure Authentication",
      description:
        "Role-based login system for administrators and users.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Our Services
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            AI Medicine Finder provides modern healthcare tools
            for patients, pharmacies, and administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8"
            >
              <div className="mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-500 leading-7">
                {service.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;