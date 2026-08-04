import { Bot } from "lucide-react";

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-6 animate-fadeIn">

      {/* AI Avatar */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow">
        <Bot size={20} className="text-white" />
      </div>

      {/* Bubble */}
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">

        <div className="flex gap-2">

          <span
            className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />

          <span
            className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />

        </div>

      </div>

    </div>
  );
}

export default TypingIndicator;