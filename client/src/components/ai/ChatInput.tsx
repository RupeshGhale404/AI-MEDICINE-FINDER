import { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
}

function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <div className="border-t bg-white p-5">

      <div className="flex gap-3">

        <textarea
          rows={2}
          placeholder="Describe your symptoms..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />

        <button
          onClick={send}
          className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700"
        >
          <SendHorizonal />
        </button>

      </div>

    </div>
  );
}

export default ChatInput;