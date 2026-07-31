import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface Pharmacy {
  id: number;
  name: string;
  address?: string;
  phone?: string;
}

interface Props {
  pharmacy: Pharmacy;
}

function PharmacyRecommendationCard({ pharmacy }: Props) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-lg font-bold">
            🏥 {pharmacy.name}
          </h3>

          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <MapPin size={16} />
            <span>{pharmacy.address || "Address unavailable"}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <Phone size={16} />
            <span>{pharmacy.phone || "Phone unavailable"}</span>
          </div>

        </div>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Open
        </span>

      </div>

      <Link
        to={`/pharmacies/${pharmacy.id}`}
        className="block mt-5 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-semibold transition"
      >
        View Pharmacy
      </Link>

    </div>
  );
}

export default PharmacyRecommendationCard;