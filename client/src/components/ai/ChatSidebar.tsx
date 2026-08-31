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
  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="hidden w-80 flex-shrink-0 border-r border-gray-200 bg-white lg:flex lg:flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow"
            aria-hidden
          >
            <Bot size={22} strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-gray-900">
              AI Medicine Finder
            </h2>
            <p className="text-xs text-gray-500">Your AI Health Assistant</p>
          </div>
        </div>

        {/* New Chat */}
        <button
          type="button"
          onClick={onNewChat}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <Plus size={18} aria-hidden />
          New Chat
        </button>

        {/* Search */}
        <div className="relative mt-4">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            aria-label="Search conversations"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredConversations.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <MessageSquare
              className="mb-3 text-gray-300"
              size={40}
              strokeWidth={1.25}
              aria-hidden
            />
            <p className="text-sm text-gray-500">
              {searchTerm ? "No matching conversations" : "No conversations yet"}
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredConversations.map((conversation) => {
              const isActive = activeConversationId === conversation.id;
              const lastMessage =
                conversation.messages.length > 0
                  ? conversation.messages[conversation.messages.length - 1]
                      .message
                  : "New conversation";

              return (
                <li key={conversation.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectConversation(conversation.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectConversation(conversation.id);
                      }
                    }}
                    className={`group cursor-pointer rounded-2xl border p-4 transition-all ${
                      isActive
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare
                        size={18}
                        className={`mt-0.5 shrink-0 ${
                          isActive ? "text-blue-600" : "text-gray-400"
                        }`}
                        aria-hidden
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-gray-800">
                          {conversation.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                          {lastMessage}
                        </p>
                        <p className="mt-2 text-[11px] text-gray-400">
                          {new Date(conversation.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRenameConversation(conversation.id);
                        }}
                        className="rounded-lg p-1.5 text-blue-600 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500"
                        aria-label={`Rename ${conversation.title}`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}
                        className="rounded-lg p-1.5 text-red-600 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-red-500"
                        aria-label={`Delete ${conversation.title}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}