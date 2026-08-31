import { useRef, useState, useEffect } from "react";
import { SendHorizonal, Paperclip, Smile } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void | Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Ask about symptoms, medicines or pharmacies...",
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  };

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending || disabled) return;

    setSending(true);
    try {
      await onSend(text);
      setInput("");
      // Reset height after clearing
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "56px";
        }
      });
    } finally {
      setSending(false);
    }
  };

  const canSend = Boolean(input.trim()) && !sending && !disabled;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-3 shadow-lg sm:p-4">
      <textarea
        ref={textareaRef}
        value={input}
        rows={1}
        disabled={disabled || sending}
        placeholder={placeholder}
        aria-label="Message input"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void handleSend();
          }
        }}
        className="
          w-full resize-none overflow-y-auto
          border-none bg-transparent
          text-[15px] leading-7
          outline-none
          min-h-[56px] max-h-[180px]
          placeholder:text-gray-400
          disabled:cursor-not-allowed disabled:opacity-60
        "
      />

      <div className="mt-2 flex items-center justify-between gap-3">
        {/* Left actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={disabled || sending}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-40"
            aria-label="Attach file"
            title="Attach file"
          >
            <Paperclip size={18} />
          </button>

          <button
            type="button"
            disabled={disabled || sending}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:opacity-40"
            aria-label="Emoji"
            title="Emoji"
          >
            <Smile size={18} />
          </button>
        </div>

        {/* Send */}
        <button
          type="button"
          onClick={() => void handleSend()}
          disabled={!canSend}
          className="
            flex items-center gap-2
            rounded-full bg-blue-600
            px-5 py-2.5
            text-sm font-semibold text-white
            transition
            hover:bg-blue-700
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-blue-600
            disabled:cursor-not-allowed disabled:bg-gray-300
          "
        >
          <SendHorizonal size={18} className={sending ? "animate-pulse" : ""} />
          {sending ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}