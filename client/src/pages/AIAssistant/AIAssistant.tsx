import { useState, useRef, useEffect } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import ChatMessage from "../../components/ai/ChatMessage";
import ChatInput from "../../components/ai/ChatInput";
import TypingIndicator from "../../components/ai/TypingIndicator";

import { askAI } from "../../services/aiService";

interface Chat {
  sender: "user" | "ai";
  message: string;
  medicines?: any[];
}

function AIAssistant() {
  const [messages, setMessages] = useState<Chat[]>([
    {
      sender: "ai",
      message:
        "👋 Hello! I am your AI Medicine Assistant.\n\nDescribe your symptoms and I'll recommend medicines from the database.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message,
      },
    ]);

    setLoading(true);

    try {
      const data = await askAI(message);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: data.answer,
          medicines: data.medicines,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: "❌ Something went wrong while contacting the AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            🤖 AI Medicine Assistant
          </h1>

          <p className="text-gray-500 mt-2">
            Ask about symptoms, diseases or medicines.
          </p>

        </div>

        {/* Chat Container */}

        <div className="bg-gray-100 rounded-2xl shadow-lg p-6 min-h-[650px] flex flex-col">

          {/* Suggested Questions */}

          <div className="flex flex-wrap gap-3 mb-6">

            <button
              onClick={() => handleSend("I have fever")}
              className="bg-white border px-4 py-2 rounded-full hover:bg-blue-50"
            >
              🤒 Fever
            </button>

            <button
              onClick={() => handleSend("I have headache")}
              className="bg-white border px-4 py-2 rounded-full hover:bg-blue-50"
            >
              🤕 Headache
            </button>

            <button
              onClick={() => handleSend("I have cough")}
              className="bg-white border px-4 py-2 rounded-full hover:bg-blue-50"
            >
              😷 Cough
            </button>

            <button
              onClick={() => handleSend("Diabetes medicine")}
              className="bg-white border px-4 py-2 rounded-full hover:bg-blue-50"
            >
              💉 Diabetes
            </button>

          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto pr-2">

            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
                medicines={msg.medicines}
              />
            ))}

            {loading && <TypingIndicator />}

            <div ref={bottomRef}></div>

          </div>

          {/* Input */}

          <ChatInput onSend={handleSend} />

        </div>

      </div>
    </AdminLayout>
  );
}

export default AIAssistant;