import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import {
  Bot,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Pill,
  MapPin,
  Phone,
} from "lucide-react";

import type { ChatMessage } from "../../types/AI";

interface Props {
  message: ChatMessage;
}

export default function ChatBubble({ message }: Props) {
  const isUser = message.sender === "user";

  const copyMessage = () => {
    navigator.clipboard.writeText(message.message);
  };

  return (
    <div
      className={`mb-8 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}

      {!isUser && (
        <div className="mr-3 flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow">
            <Bot size={20} />
          </div>
        </div>
      )}

      <div
        className={`${
          isUser
            ? "max-w-md"
            : "w-full max-w-4xl"
        }`}
      >
        {/* Bubble */}

        <div
          className={`rounded-2xl shadow-sm ${
            isUser
              ? "bg-blue-600 text-white px-5 py-3"
              : "border border-gray-200 bg-white"
          }`}
        >
          {!isUser && (
            <div className="border-b border-gray-100 px-5 py-3 font-semibold text-gray-800">
              🤖 AI Medicine Assistant
            </div>
          )}

          <div
            className={
              isUser
                ? ""
                : "px-6 py-5 prose prose-sm max-w-none"
            }
          >
            {isUser ? (
              <p className="whitespace-pre-wrap leading-7">
                {message.message}
              </p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {message.message}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Medicines */}

        {!isUser &&
          message.medicines &&
          message.medicines.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <Pill
                  className="text-blue-600"
                  size={20}
                />
                Recommended Medicines
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {message.medicines.map((medicine: any) => (
                  <div
                    key={medicine.id}
                    className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg"
                  >
                    <h4 className="text-lg font-bold text-blue-700">
                      {medicine.name}
                    </h4>

                    <p className="mb-4 text-sm text-gray-500">
                      {medicine.generic_name}
                    </p>

                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Strength:</strong>{" "}
                        {medicine.strength}
                      </p>

                      <p>
                        <strong>Form:</strong>{" "}
                        {medicine.form}
                      </p>

                      <p>
                        <strong>Price:</strong>{" "}
                        Rs. {medicine.price}
                      </p>

                      <p>
                        <strong>Stock:</strong>{" "}
                        {medicine.stock_quantity}
                      </p>
                    </div>

                    <button className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Pharmacies */}

        {!isUser &&
          message.pharmacies &&
          message.pharmacies.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <MapPin
                  className="text-green-600"
                  size={20}
                />
                Nearby Pharmacies
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {message.pharmacies.map((pharmacy: any) => (
                  <div
                    key={pharmacy.id}
                    className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg"
                  >
                    <h4 className="font-bold text-green-700">
                      {pharmacy.name}
                    </h4>

                    <p className="mt-2 text-sm text-gray-500">
                      {pharmacy.address}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <Phone size={16} />
                      {pharmacy.phone}
                    </div>

                    <div className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Open
                    </div>

                    <button className="mt-5 w-full rounded-xl bg-green-600 py-3 font-medium text-white transition hover:bg-green-700">
                      View Pharmacy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Footer */}

        {!isUser && (
          <div className="mt-4 flex gap-4 text-gray-500">
            <button
              onClick={copyMessage}
              className="hover:text-blue-600"
            >
              <Copy size={18} />
            </button>

            <button className="hover:text-green-600">
              <ThumbsUp size={18} />
            </button>

            <button className="hover:text-red-600">
              <ThumbsDown size={18} />
            </button>

            <button className="hover:text-purple-600">
              <RotateCcw size={18} />
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}

      {isUser && (
        <div className="ml-3 flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white shadow">
            <User size={18} />
          </div>
        </div>
      )}
    </div>
  );
}