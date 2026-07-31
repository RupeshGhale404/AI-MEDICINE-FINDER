import MedicineRecommendationCard from "./MedicineRecommendationCard";
import type { ChatMessage } from "../../types/AI";
import PharmacyRecommendationCard from "./PharmacyRecommendationCard";
interface Props {
  message: ChatMessage;
}

function ChatBubble({ message }: Props) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex mb-8 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white border border-gray-200"
        } rounded-2xl shadow-md px-6 py-5`}
      >
        {/* Header */}

        <div className="flex items-center gap-2 mb-3">

          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
              isUser
                ? "bg-blue-500"
                : "bg-green-100"
            }`}
          >
            {isUser ? "👤" : "🤖"}
          </div>

          <div>

            <h4 className="font-semibold">
              {isUser
                ? "You"
                : "AI Medicine Assistant"}
            </h4>

          </div>

        </div>

        {/* Message */}

        <div className="whitespace-pre-line leading-7">
          {message.message}
        </div>

        {/* Medicine Recommendations */}
        {message.pharmacies &&
message.pharmacies.length > 0 && (

  <div className="mt-8">

    <h3 className="text-lg font-bold mb-4">
      🏥 Available Pharmacies
    </h3>

    <div className="space-y-4">

      {message.pharmacies.map((pharmacy) => (

        <PharmacyRecommendationCard
          key={pharmacy.id}
          pharmacy={pharmacy}
        />

      ))}

    </div>

  </div>

)}

        {message.medicines &&
          message.medicines.length > 0 && (

            <div className="mt-6">

              <h3 className="font-bold text-lg mb-4">
                💊 Recommended Medicines
              </h3>

              <div className="space-y-4">

                {message.medicines.map((medicine) => (
                  <MedicineRecommendationCard
                    key={medicine.id}
                    medicine={medicine}
                  />
                ))}

              </div>

            </div>

          )}

      </div>
    </div>
  );
}

export default ChatBubble;