import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
}

function ChatInput({ onSend }: Props) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <div className="flex gap-3 mt-6">

      <input
        type="text"
        placeholder="Describe your symptoms..."
        className="flex-1 border rounded-lg px-4 py-3"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
      >
        Send
      </button>

    </div>
  );
}

export default ChatInput;