import {
  Building2,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

function FeaturedPharmacies() {
  const pharmacies = [
    {
      name: "Kathmandu Pharmacy",
      location: "New Baneshwor, Kathmandu",
      phone: "9800000001",
      hours: "8:00 AM - 8:00 PM",
    },
    {
      name: "City Pharmacy",
      location: "New Road, Kathmandu",
      phone: "9800000002",
      hours: "9:00 AM - 9:00 PM",
    },
    {
      name: "Lalitpur Medical",
      location: "Jawalakhel, Lalitpur",
      phone: "9800000003",
      hours: "8:30 AM - 8:30 PM",
    },
    {
      name: "Bhaktapur Health Care",
      location: "Bhaktapur",
      phone: "9800000004",
      hours: "7:00 AM - 10:00 PM",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Featured Pharmacies
          </h2>

          <p className="text-gray-500 mt-3">
            Trusted pharmacies available in our healthcare network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {pharmacies.map((pharmacy, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow hover:shadow-xl transition p-6"
            >
              <div className="flex justify-center mb-5">
                <Building2
                  size={50}
                  className="text-blue-600"
                />
              </div>

              <h3 className="text-xl font-bold text-center">
                {pharmacy.name}
              </h3>

              <div className="mt-5 space-y-3 text-gray-600">

                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {pharmacy.location}
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={18} />
                  {pharmacy.phone}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  {pharmacy.hours}
                </div>

              </div>

              <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                View Pharmacy
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedPharmacies;