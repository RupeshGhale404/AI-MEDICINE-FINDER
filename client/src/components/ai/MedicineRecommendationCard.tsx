import { Link } from "react-router-dom";

interface Medicine {
  id: number;
  name: string;
  generic_name: string;
  price: string;
  stock_quantity: number;
  strength?: string;
  form?: string;
}

interface Props {
  medicine: Medicine;
}

function MedicineRecommendationCard({ medicine }: Props) {
  return (
    <div className="mt-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">

      <div className="p-5">

        <div className="flex items-start justify-between">

          <div>
            <h3 className="text-lg font-bold text-gray-800">
              💊 {medicine.name}
            </h3>

            <p className="text-sm text-gray-500">
              {medicine.generic_name}
            </p>
          </div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            Rs. {medicine.price}
          </span>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-5">

          <div>
            <p className="text-xs text-gray-400">
              Strength
            </p>

            <p className="font-medium">
              {medicine.strength || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Form
            </p>

            <p className="font-medium">
              {medicine.form || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Stock
            </p>

            <p className="font-medium text-green-600">
              {medicine.stock_quantity}
            </p>
          </div>

        </div>

        <Link
          to={`/medicines/${medicine.id}`}
          className="block mt-6 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default MedicineRecommendationCard;