function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-6">

      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
        🤖
      </div>

      <div className="bg-white rounded-2xl shadow px-5 py-4">

        <div className="flex gap-2">

          <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>

          <span
            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>

          <span
            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>

        </div>

      </div>

    </div>
  );
}

export default TypingIndicator;