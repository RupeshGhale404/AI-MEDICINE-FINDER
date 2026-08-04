import { useEffect, useMemo, useRef, useState } from "react";

import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";
import SuggestedQuestions from "./SuggestedQuestions";
import TypingIndicator from "./TypingIndicator";

import { askAI } from "../../services/aiService";

import type {
  AIMessage,
  ChatMessage,
  Conversation,
} from "../../types/AI";

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

export default function ChatWindow() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] =
    useState<string | null>(null);

  const [typing, setTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const activeConversation = useMemo(() => {
    return (
      conversations.find(
        (conversation) =>
          conversation.id === activeConversationId
      ) ?? null
    );
  }, [conversations, activeConversationId]);

  /* -------------------------------- */
  /* Load conversations               */
  /* -------------------------------- */

  useEffect(() => {
    const saved = localStorage.getItem(
      "medicine-ai-conversations"
    );

    if (!saved) return;

    try {
      const chats: Conversation[] = JSON.parse(saved);

      setConversations(chats);

      if (chats.length) {
        setActiveConversationId(chats[0].id);
      }
    } catch {}
  }, []);

  /* -------------------------------- */
  /* Save conversations               */
  /* -------------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "medicine-ai-conversations",
      JSON.stringify(conversations)
    );
  }, [conversations]);

  /* -------------------------------- */
  /* Auto scroll                      */
  /* -------------------------------- */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeConversation?.messages, typing]);

  /* -------------------------------- */
  /* New Chat                         */
  /* -------------------------------- */

  const startNewChat = () => {
    const id = createId();

    const chat: Conversation = {
      id,
      title: "New Chat",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };

    setConversations((prev) => [
      chat,
      ...prev,
    ]);

    setActiveConversationId(id);
  };

  /* -------------------------------- */
  /* Rename                           */
  /* -------------------------------- */

  const renameConversation = (id: string) => {
    const title = prompt("Conversation name");

    if (!title) return;

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              title,
            }
          : chat
      )
    );
  };

  /* -------------------------------- */
  /* Delete                           */
  /* -------------------------------- */

  const deleteConversation = (id: string) => {
    const chats = conversations.filter(
      (chat) => chat.id !== id
    );

    setConversations(chats);

    if (activeConversationId === id) {
      setActiveConversationId(
        chats.length ? chats[0].id : null
      );
    }
  };
  /* -------------------------------- */
/* Stream AI Response               */
/* -------------------------------- */

const streamMessage = async (
  text: string,
  conversationId: string,
  medicines: any[] = [],
  pharmacies: any[] = []
) => {
  const assistantId = createId();

  // Create empty AI message first
  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === conversationId
        ? {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: assistantId,
                sender: "assistant",
                message: "",
                medicines: [],
                pharmacies: [],
              },
            ],
          }
        : chat
    )
  );

  const words = text.split(" ");

  let current = "";

  for (let i = 0; i < words.length; i++) {
    current += words[i] + " ";

    await new Promise((r) => setTimeout(r, 6));

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === conversationId
          ? {
              ...chat,
              messages: chat.messages.map((m) =>
                m.id === assistantId
                  ? {
                      ...m,
                      message: current,
                      medicines:
                        i === words.length - 1
                          ? medicines
                          : [],
                      pharmacies:
                        i === words.length - 1
                          ? pharmacies
                          : [],
                    }
                  : m
              ),
            }
          : chat
      )
    );
  };
};

/* -------------------------------- */
/* Send Message                     */
/* -------------------------------- */

const sendMessage = async (text: string) => {
  if (!text.trim()) return;

  let conversationId = activeConversationId;

  /* Create chat if none exists */

  if (!conversationId) {
    conversationId = createId();

    const chat: Conversation = {
      id: conversationId,
      title:
        text.length > 35
          ? text.substring(0, 35) + "..."
          : text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };

    setConversations((prev) => [
      chat,
      ...prev,
    ]);

    setActiveConversationId(conversationId);
  }

  const userMessage: ChatMessage = {
    id: createId(),
    sender: "user",
    message: text,
  };

  const currentChat =
    conversations.find(
      (c) => c.id === conversationId
    ) ??
    {
      id: conversationId,
      title: "",
      createdAt: "",
      updatedAt: "",
      messages: [],
    };

  /* Show user message instantly */

  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === conversationId
        ? {
            ...chat,
            updatedAt: new Date().toISOString(),
            title:
              chat.title === "New Chat"
                ? text.length > 35
                  ? text.substring(0, 35) + "..."
                  : text
                : chat.title,
            messages: [
              ...chat.messages,
              userMessage,
            ],
          }
        : chat
    )
  );

  setTyping(true);

  try {
    const aiMessages: AIMessage[] = [
      {
        role: "system",
        content: `You are AI Medicine Finder.

Rules:

- Remember previous conversation.
- Answer follow-up questions.
- Never forget earlier symptoms.
- Reply in Markdown.
- Be concise.
- Recommend only medicines from the backend.
- Explain possible causes, medicines and warning signs.`,
      },

      ...currentChat.messages.map((message): AIMessage => ({
        role:
          message.sender === "user"
            ? "user"
            : "assistant",
        content: message.message,
      })),

      {
        role: "user" as const,
        content: text,
      },
    ];

    const response = await askAI(aiMessages);

    await streamMessage(
      response.answer,
      conversationId,
      response.medicines ?? [],
      response.pharmacies ?? []
    );
  } catch (error) {
    console.error(error);

    const assistantMessage: ChatMessage = {
      id: createId(),
      sender: "assistant",
      message:
        "❌ Unable to contact the AI server.",
    };

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === conversationId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                assistantMessage,
              ],
            }
          : chat
      )
    );
  } finally {
    setTyping(false);
  }
};
const filteredConversations = conversations.filter((chat) => {
  if (!searchTerm) return true;

  const q = searchTerm.toLowerCase();

  return (
    chat.title.toLowerCase().includes(q) ||
    chat.messages.some((m) =>
      m.message.toLowerCase().includes(q)
    )
  );
});

return (
  <div className="flex h-screen bg-gray-100 overflow-hidden">

    {/* Sidebar */}

    <ChatSidebar
      conversations={filteredConversations}
      activeConversationId={activeConversationId}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onSelectConversation={setActiveConversationId}
      onNewChat={startNewChat}
      onDeleteConversation={deleteConversation}
      onRenameConversation={renameConversation}
    />

    {/* Main */}

    <main className="flex flex-1 flex-col">

      {/* Header */}

      <header className="border-b border-gray-200 bg-white px-8 py-5 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              AI Medicine Assistant
            </h1>

            <p className="text-sm text-gray-500">
              Ask about medicines, symptoms and pharmacies.
            </p>

          </div>

          {activeConversation && (

            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">

              {activeConversation.title}

            </div>

          )}

        </div>

      </header>

      {/* Chat Area */}

      <section className="flex-1 overflow-y-auto">

        {!activeConversation ||
        activeConversation.messages.length === 0 ? (

          <div className="flex h-full flex-col items-center justify-center px-6">

            <div className="text-center">

              <div className="mb-6 text-7xl">
                🩺
              </div>

              <h2 className="text-5xl font-bold text-gray-900">
                AI Medicine Finder
              </h2>

              <p className="mt-4 text-lg text-gray-500">
                Your intelligent healthcare companion
              </p>

            </div>

            <div className="mt-12 w-full max-w-3xl">

              <SuggestedQuestions
                onSelect={sendMessage}
              />

            </div>

          </div>

        ) : (

          <div className="mx-auto max-w-5xl px-6 py-8">

            {activeConversation.messages.map((message) => (

              <ChatBubble
                key={message.id}
                message={message}
              />

            ))}

            {typing && <TypingIndicator />}

            <div ref={bottomRef} />

          </div>

        )}

      </section>

      {/* Bottom Input */}

      <footer className="border-t border-gray-200 bg-white p-5">

        <div className="mx-auto max-w-5xl">

          <ChatInput
            onSend={sendMessage}
          />

        </div>

      </footer>

    </main>

  </div>
);
}