import { useEffect, useMemo, useRef, useState } from "react";

import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";
import TypingIndicator from "./TypingIndicator";

import { askAI } from "../../services/aiService";

import type {
  AIMessage,
  ChatMessage,
  Conversation,
  Medicine,
  Pharmacy,
} from "../../types/AI";

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

export default function ChatWindow() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Location state must be at the top level
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) ?? null,
    [conversations, activeConversationId]
  );

  /* ── Get user location (once) ───────────────────────────────── */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        // User denied or error → pharmacies still work, just not sorted by distance
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }, []);

  /* ── Load conversations ─────────────────────────────────────── */
  useEffect(() => {
    const saved = localStorage.getItem("medicine-ai-conversations");
    if (!saved) return;

    try {
      const chats: Conversation[] = JSON.parse(saved);
      setConversations(chats);
      if (chats.length > 0) {
        setActiveConversationId(chats[0].id);
      }
    } catch {
      // ignore corrupted data
    }
  }, []);

  /* ── Persist conversations ──────────────────────────────────── */
  useEffect(() => {
    localStorage.setItem(
      "medicine-ai-conversations",
      JSON.stringify(conversations)
    );
  }, [conversations]);

  /* ── Auto-scroll ────────────────────────────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, typing]);

  /* ── New Chat ───────────────────────────────────────────────── */
  const startNewChat = () => {
    const id = createId();
    const chat: Conversation = {
      id,
      title: "New Chat",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };

    setConversations((prev) => [chat, ...prev]);
    setActiveConversationId(id);
  };

  /* ── Rename ─────────────────────────────────────────────────── */
  const renameConversation = (id: string) => {
    const title = prompt("Conversation name");
    if (!title?.trim()) return;

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, title: title.trim() } : chat
      )
    );
  };

  /* ── Delete ─────────────────────────────────────────────────── */
  const deleteConversation = (id: string) => {
    setConversations((prev) => {
      const next = prev.filter((chat) => chat.id !== id);
      if (activeConversationId === id) {
        setActiveConversationId(next.length ? next[0].id : null);
      }
      return next;
    });
  };

  /* ── Stream AI response (word-by-word) ──────────────────────── */
  const streamMessage = async (
    text: string,
    conversationId: string,
    medicines: Medicine[] = [],
    pharmacies: Pharmacy[] = []
  ) => {
    const assistantId = createId();

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === conversationId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: assistantId,
                  sender: "assistant" as const,
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
      current += (i === 0 ? "" : " ") + words[i];

      await new Promise((r) => setTimeout(r, 8));

      const isLast = i === words.length - 1;

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
                        medicines: isLast ? medicines : [],
                        pharmacies: isLast ? pharmacies : [],
                      }
                    : m
                ),
              }
            : chat
        )
      );
    }
  };

  /* ── Send Message ───────────────────────────────────────────── */
  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    let conversationId = activeConversationId;

    if (!conversationId) {
      conversationId = createId();
      const chat: Conversation = {
        id: conversationId,
        title:
          trimmed.length > 35 ? `${trimmed.substring(0, 35)}...` : trimmed,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
      };

      setConversations((prev) => [chat, ...prev]);
      setActiveConversationId(conversationId);
    }

    const userMessage: ChatMessage = {
      id: createId(),
      sender: "user",
      message: trimmed,
    };

    const currentMessages =
      conversations.find((c) => c.id === conversationId)?.messages ?? [];

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === conversationId
          ? {
              ...chat,
              updatedAt: new Date().toISOString(),
              title:
                chat.title === "New Chat"
                  ? trimmed.length > 35
                    ? `${trimmed.substring(0, 35)}...`
                    : trimmed
                  : chat.title,
              messages: [...chat.messages, userMessage],
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
        ...currentMessages.map(
          (m): AIMessage => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.message,
          })
        ),
        { role: "user", content: trimmed },
      ];

      // ✅ Pass location here
      const response = await askAI(aiMessages);

      await streamMessage(
        response.answer,
        conversationId,
        response.medicines ?? [],
        response.pharmacies ?? []
      );
    } catch (error) {
      console.error(error);

      const errorMessage: ChatMessage = {
        id: createId(),
        sender: "assistant",
        message: "❌ Unable to contact the AI server. Please try again.",
      };

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === conversationId
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat
        )
      );
    } finally {
      setTyping(false);
    }
  };

  /* ── Filtered conversations for sidebar ─────────────────────── */
  const filteredConversations = useMemo(() => {
    if (!searchTerm.trim()) return conversations;

    const q = searchTerm.toLowerCase();
    return conversations.filter(
      (chat) =>
        chat.title.toLowerCase().includes(q) ||
        chat.messages.some((m) => m.message.toLowerCase().includes(q))
    );
  }, [conversations, searchTerm]);

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <div className="flex h-full overflow-hidden bg-gray-50">
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

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 bg-white px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-gray-900 sm:text-2xl">
                AI Medicine Assistant
              </h1>
              <p className="text-sm text-gray-500">
                Ask about medicines, symptoms and pharmacies.
              </p>
            </div>

            {activeConversation && (
              <div className="hidden shrink-0 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 sm:block">
                {activeConversation.title}
              </div>
            )}
          </div>
        </header>

        <section className="min-h-0 flex-1 overflow-y-auto">
          {!activeConversation || activeConversation.messages.length === 0 ? (
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Start a new conversation
              </h2>
              <p className="mt-2 max-w-xl text-sm text-gray-500">
                Ask about medicines, symptoms, warning signs, or nearby pharmacies.
              </p>
              <button
                type="button"
                onClick={() => sendMessage("What medicines help with a headache?")}
                className="mt-6 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Try a quick prompt
              </button>
            </div>
          ) : (
            <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
              {activeConversation.messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}

              {typing && <TypingIndicator />}

              <div ref={bottomRef} />
            </div>
          )}
        </section>

        <footer className="shrink-0 border-t border-gray-200 bg-white p-4 sm:p-5">
          <div className="mx-auto max-w-5xl">
            <ChatInput onSend={sendMessage} />
          </div>
        </footer>
      </main>
    </div>
  );
}