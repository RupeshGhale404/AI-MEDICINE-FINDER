import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Bot,
  User,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Pill,
  MapPin,
  Phone,
} from "lucide-react";

import type { ChatMessage, Medicine, Pharmacy } from "../../types/AI";

interface Props {
  message: ChatMessage;
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function MedicineCard({
  medicine,
  onView,
}: {
  medicine: Medicine;
  onView: (id: string | number) => void;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h4 className="text-lg font-bold text-blue-700">{medicine.name}</h4>
      {medicine.genericName && (
        <p className="mt-0.5 text-sm text-gray-500">{medicine.genericName}</p>
      )}

      <dl className="mt-4 flex-1 space-y-1.5 text-sm text-gray-700">
        {medicine.strength && (
          <div className="flex gap-1">
            <dt className="font-medium text-gray-500">Strength:</dt>
            <dd>{medicine.strength}</dd>
          </div>
        )}
        {medicine.form && (
          <div className="flex gap-1">
            <dt className="font-medium text-gray-500">Form:</dt>
            <dd>{medicine.form}</dd>
          </div>
        )}
        {medicine.price && (
          <div className="flex gap-1">
            <dt className="font-medium text-gray-500">Price:</dt>
            <dd>Rs. {medicine.price}</dd>
          </div>
        )}
        {medicine.stock && (
          <div className="flex gap-1">
            <dt className="font-medium text-gray-500">Stock:</dt>
            <dd>{medicine.stock}</dd>
          </div>
        )}
        {medicine.manufacturer && (
          <div className="flex gap-1">
            <dt className="font-medium text-gray-500">Manufacturer:</dt>
            <dd>{medicine.manufacturer}</dd>
          </div>
        )}
      </dl>

      {medicine.id != null && (
        <button
          type="button"
          onClick={() => onView(medicine.id!)}
          className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          View Details
        </button>
      )}
    </article>
  );
}

function PharmacyCard({
  pharmacy,
  onView,
}: {
  pharmacy: Pharmacy;
  onView: (id: string | number) => void;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h4 className="font-bold text-green-700">{pharmacy.name}</h4>

      {pharmacy.address && (
        <p className="mt-2 text-sm text-gray-500">{pharmacy.address}</p>
      )}

      {pharmacy.distance && (
        <p className="mt-1 text-xs text-gray-400">{pharmacy.distance}</p>
      )}

      {pharmacy.phone && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
          <Phone className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
          <span>{pharmacy.phone}</span>
        </div>
      )}

      <span
        className={`mt-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${
          pharmacy.open
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {pharmacy.open ? "Open" : "Closed"}
      </span>

      {pharmacy.id != null && (
        <button
          type="button"
          onClick={() => onView(pharmacy.id!)}
          className="mt-5 w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          View Pharmacy
        </button>
      )}
    </article>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function ChatBubble({ message }: Props) {
  const isUser = message.sender === "user";
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be blocked
    }
  };

  return (
    <div
      className={`mb-8 flex ${isUser ? "justify-end" : "justify-start"}`}
      role="article"
      aria-label={isUser ? "Your message" : "AI response"}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="mr-3 flex-shrink-0 self-start">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow"
            aria-hidden
          >
            <Bot size={20} strokeWidth={1.75} />
          </div>
        </div>
      )}

      <div className={isUser ? "max-w-md" : "w-full max-w-4xl"}>
        {/* Bubble */}
        <div
          className={`rounded-2xl shadow-sm ${
            isUser
              ? "bg-blue-600 px-5 py-3 text-white"
              : "border border-gray-200 bg-white"
          }`}
        >
          {!isUser && (
            <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-3 text-sm font-semibold text-gray-800">
              <span aria-hidden>🤖</span>
              AI Medicine Assistant
            </div>
          )}

          <div
            className={
              isUser
                ? ""
                : "prose prose-sm max-w-none px-5 py-4 sm:px-6 sm:py-5"
            }
          >
            {isUser ? (
              <p className="whitespace-pre-wrap leading-7">{message.message}</p>
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

        {/* Recommended Medicines */}
        {!isUser && message.medicines && message.medicines.length > 0 && (
          <section className="mt-5" aria-labelledby={`medicines-${message.id}`}>
            <h3
              id={`medicines-${message.id}`}
              className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900"
            >
              <Pill className="h-5 w-5 text-blue-600" aria-hidden />
              Recommended Medicines
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {message.medicines.map((medicine, index) => (
                <MedicineCard
                  key={medicine.id ?? index}
                  medicine={medicine}
                  onView={(id) => navigate(`/medicines/${id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Nearby Pharmacies */}
        {!isUser && message.pharmacies && message.pharmacies.length > 0 && (
          <section className="mt-6" aria-labelledby={`pharmacies-${message.id}`}>
            <h3
              id={`pharmacies-${message.id}`}
              className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900"
            >
              <MapPin className="h-5 w-5 text-green-600" aria-hidden />
              Nearby Pharmacies
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {message.pharmacies.map((pharmacy, index) => (
                <PharmacyCard
                  key={pharmacy.id ?? index}
                  pharmacy={pharmacy}
                  onView={(id) => navigate(`/pharmacies/${id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Action Footer */}
        {!isUser && (
          <div className="mt-4 flex items-center gap-1 text-gray-400">
            <button
              type="button"
              onClick={copyMessage}
              className="rounded-lg p-2 transition hover:bg-gray-100 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              aria-label={copied ? "Copied" : "Copy message"}
              title={copied ? "Copied!" : "Copy"}
            >
              {copied ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <Copy size={18} />
              )}
            </button>

            <button
              type="button"
              className="rounded-lg p-2 transition hover:bg-gray-100 hover:text-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              aria-label="Thumbs up"
            >
              <ThumbsUp size={18} />
            </button>

            <button
              type="button"
              className="rounded-lg p-2 transition hover:bg-gray-100 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              aria-label="Thumbs down"
            >
              <ThumbsDown size={18} />
            </button>

            <button
              type="button"
              className="rounded-lg p-2 transition hover:bg-gray-100 hover:text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
              aria-label="Regenerate"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="ml-3 flex-shrink-0 self-start">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white shadow"
            aria-hidden
          >
            <User size={18} strokeWidth={1.75} />
          </div>
        </div>
      )}
    </div>
  );
}