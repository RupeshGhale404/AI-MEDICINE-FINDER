import {
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react";

interface ChatHistory {
  id: number;
  title: string;
}

interface Props {
  chats: ChatHistory[];
  activeChat: number | null;
  onSelect: (id: number) => void;
  onNewChat: () => void;
}

function ChatSidebar({
  chats,
  activeChat,
  onSelect,
  onNewChat,
}: Props) {
  return (
    <aside className="w-80 bg-slate-900 text-white flex flex-col">

      {/* Header */}

      <div className="p-5 border-b border-slate-700">

        <button
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 flex justify-center items-center gap-2 transition"
        >
          <Plus size={20} />

          New Chat
        </button>

      </div>

      {/* Chats */}

      <div className="flex-1 overflow-y-auto">

        {chats.map((chat) => (

          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`w-full text-left px-5 py-4 flex justify-between items-center hover:bg-slate-800 transition

            ${
              activeChat === chat.id
                ? "bg-slate-800"
                : ""
            }`}
          >

            <div className="flex items-center gap-3">

              <MessageSquare size={18} />

              <span className="truncate">

                {chat.title}

              </span>

            </div>

            <Trash2
              size={16}
              className="opacity-50"
            />

          </button>

        ))}

      </div>

    </aside>
  );
}

export default ChatSidebar;