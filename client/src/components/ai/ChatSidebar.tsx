import type { Dispatch, SetStateAction } from "react";
import {
  MessageSquare,
  Plus,
  Trash2,
  Pencil,
  Search,
  Bot,
} from "lucide-react";

import type { Conversation } from "../../types/AI";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  searchTerm: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
  onSelectConversation: Dispatch<SetStateAction<string | null>>;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string) => void;
}

export default function ChatSidebar({
  conversations,
  activeConversationId,
  searchTerm,
  onSearchChange,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
}: ChatSidebarProps) {
  return (
    <aside className="hidden w-80 border-r border-gray-200 bg-white lg:flex lg:flex-col">

      {/* Header */}

      <div className="border-b border-gray-200 p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow">

            <Bot size={22} />

          </div>

          <div>

            <h2 className="text-lg font-bold">
              AI Medicine Finder
            </h2>

            <p className="text-xs text-gray-500">
              Your AI Health Assistant
            </p>

          </div>

        </div>

        {/* New Chat */}

        <button
          onClick={onNewChat}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Chat
        </button>

        {/* Search */}

        <div className="relative mt-4">

          <Search
            size={16}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            value={searchTerm}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search conversations..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 outline-none transition focus:border-blue-500"
          />

        </div>

      </div>

      {/* Conversations */}

      <div className="flex-1 overflow-y-auto p-4">

        {conversations.length === 0 ? (

          <div className="mt-20 text-center">

            <MessageSquare
              className="mx-auto mb-4 text-gray-300"
              size={40}
            />

            <p className="text-gray-500">
              No conversations yet
            </p>

          </div>

        ) : (

          conversations.map((conversation) => {

            const lastMessage =
              conversation.messages.length > 0
                ? conversation.messages[
                    conversation.messages.length - 1
                  ].message
                : "New conversation";

            return (
              <div
                key={conversation.id}
                onClick={() =>
                  onSelectConversation(
                    conversation.id
                  )
                }
                className={`mb-3 cursor-pointer rounded-2xl border p-4 transition-all ${
                  activeConversationId ===
                  conversation.id
                    ? "border-blue-500 bg-blue-50 shadow"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">

                  <MessageSquare
                    size={18}
                    className="mt-1 text-blue-600"
                  />

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate font-semibold text-gray-800">
                      {conversation.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                      {lastMessage}
                    </p>

                    <p className="mt-2 text-[11px] text-gray-400">
                      {new Date(
                        conversation.updatedAt
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

                {/* Actions */}

                <div className="mt-3 flex justify-end gap-3">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRenameConversation(
                        conversation.id
                      );
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(
                        conversation.id
                      );
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>
            );
          })

        )}

      </div>

    </aside>
  );
}