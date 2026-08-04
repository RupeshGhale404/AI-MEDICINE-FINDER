import { useRef, useState } from "react";
import {
  SendHorizonal,
  Paperclip,
  Smile,
} from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void | Promise<void>;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 180) + "px";
  };

  const handleSend = async () => {
    const text = input.trim();

    if (!text) return;

    await onSend(text);

    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
    }
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-lg p-4">
      <textarea
        ref={textareaRef}
        value={input}
        rows={1}
        placeholder="Ask about symptoms, medicines or pharmacies..."
        onChange={(e) => {
          setInput(e.target.value);
          resizeTextarea();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void handleSend();
          }
        }}
        className="
          w-full
          resize-none
          overflow-y-auto
          border-none
          bg-transparent
          text-[15px]
          leading-7
          outline-none
          min-h-[56px]
          max-h-[180px]
        "
      />

      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
          >
            <Paperclip size={18} />
          </button>

          <button
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-yellow-500"
          >
            <Smile size={18} />
          </button>
        </div>

        <button
          onClick={() => void handleSend()}
          disabled={!input.trim()}
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-blue-600
            px-5
            py-2.5
            font-medium
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:bg-gray-300
          "
        >
          <SendHorizonal size={18} />
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;