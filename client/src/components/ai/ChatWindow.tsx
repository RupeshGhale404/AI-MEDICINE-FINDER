import { useState } from "react";

import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import TypingIndicator from "./TypingIndicator";

import type { ChatMessage } from "../../types/AI";
import { askAI } from "../../services/aiService";

function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // ============================
    // User Message
    // ============================

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      message: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTyping(true);

    try {
      // ============================
      // Ask AI
      // ============================

      const response = await askAI(text);

      // ============================
      // AI Response
      // ============================

      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        message: response.answer,
        medicines: response.medicines ?? [],
        pharmacies: response.pharmacies ?? [],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        message:
          "❌ Sorry, I couldn't contact the AI server. Please try again later.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-8">

        {messages.length === 0 && (
          <SuggestedQuestions onSelect={sendMessage} />
        )}

        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
          />
        ))}

        {typing && <TypingIndicator />}

      </div>

      {/* Input */}

      <ChatInput onSend={sendMessage} />

    </div>
  );
}

export default ChatWindow;