import { Link } from "react-router-dom";

interface Medicine {
  id: number;
  name: string;
  generic_name: string;
  price: string;
  stock_quantity: number;
}

interface Props {
  sender: "user" | "ai";
  message: string;
  medicines?: Medicine[];
}

function ChatMessage({
  sender,
  message,
  medicines = [],
}: Props) {
  const user = sender === "user";

  return (
    <div
      className={`flex gap-3 mb-8 ${
        user ? "justify-end" : "justify-start"
      }`}
    >
      {!user && (
        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
          🤖
        </div>
      )}

      <div
        className={`max-w-3xl rounded-2xl p-5 shadow ${
          user
            ? "bg-blue-600 text-white"
            : "bg-white"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message}
        </p>

        {!user && medicines.length > 0 && (
          <div className="mt-6">

            <h3 className="font-bold mb-4">
              💊 Recommended Medicines
            </h3>

            <div className="grid gap-4">

              {medicines.map((medicine) => (
                <div
                  key={medicine.id}
                  className="border rounded-xl p-4"
                >
                  <h4 className="text-lg font-bold">
                    {medicine.name}
                  </h4>

                  <p>
                    Generic: {medicine.generic_name}
                  </p>

                  <p>
                    Price: Rs. {medicine.price}
                  </p>

                  <p>
                    Stock: {medicine.stock_quantity}
                  </p>

                  <div className="flex gap-3 mt-4">

                    <Link
                      to={`/medicines/${medicine.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Link>

                    <Link
                      to={`/medicines/${medicine.id}/pharmacies`}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Nearby Pharmacies
                    </Link>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

      {user && (
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
          👤
        </div>
      )}
    </div>
  );
}

export default ChatMessage;