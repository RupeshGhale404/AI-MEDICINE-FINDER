import type { Medicine } from "../../types/Medicine";
import { Link } from "react-router-dom";

type Props = {
  medicine: Medicine;
};

const MedicineCard = ({ medicine }: Props) => {
  const manufacturerName =
    typeof medicine.manufacturer === "string"
      ? medicine.manufacturer
      : medicine.manufacturer?.name ?? "-";

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">

      <h2 className="text-xl font-bold text-blue-600">
        💊 {medicine.name}
      </h2>

      <p className="mt-3">
        <strong>Generic:</strong> {medicine.generic_name}
      </p>

      <p>
        <strong>Manufacturer:</strong> {manufacturerName}
      </p>

      {medicine.category ? (
        <p>
          <strong>Category:</strong> {medicine.category.name}
        </p>
      ) : null}

      <p>
        <strong>Price:</strong> Rs. {medicine.price}
      </p>

      <p>
        <strong>Stock:</strong> {medicine.stock_quantity}
      </p>


      <Link
        to={`/medicines/${medicine.id}`}
        className="
          mt-5
          block
          w-full
          bg-blue-600
          text-white
          py-2
          rounded-lg
          text-center
          hover:bg-blue-700
          transition
        "
      >
        View Details
      </Link>


    </div>
  );
};

export default MedicineCard;