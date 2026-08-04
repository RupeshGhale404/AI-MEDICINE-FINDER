import { Link } from "react-router-dom";

export interface Medicine {
  id: number;
  name: string;
  generic_name: string;
  price: string;
  stock_quantity: number;
}

export interface ChatMessageProps {
  sender: "user" | "assistant" | "ai";
  message: string;
  medicines?: Medicine[];
}

function ChatMessage({ sender, message, medicines = [] }: ChatMessageProps) {
  const user = sender === "user";

  return (
    <div className={`mb-8 flex gap-3 ${user ? "justify-end" : "justify-start"}`}>
      {!user && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
          🤖
        </div>
      )}

      <div
        className={`max-w-3xl rounded-2xl p-5 shadow ${
          user ? "bg-blue-600 text-white" : "bg-white"
        }`}
      >
        <p className="whitespace-pre-wrap">{message}</p>

        {!user && medicines.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-4 font-bold">💊 Recommended Medicines</h3>

            <div className="grid gap-4">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="rounded-xl border p-4">
                  <h4 className="text-lg font-bold">{medicine.name}</h4>

                  <p>Generic: {medicine.generic_name}</p>
                  <p>Price: Rs. {medicine.price}</p>
                  <p>Stock: {medicine.stock_quantity}</p>

                  <div className="mt-4 flex gap-3">
                    <Link
                      to={`/medicines/${medicine.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                      View
                    </Link>

                    <Link
                      to={`/medicines/${medicine.id}/pharmacies`}
                      className="rounded-lg bg-green-600 px-4 py-2 text-white"
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
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
          👤
        </div>
      )}
    </div>
  );
}

export default ChatMessage;