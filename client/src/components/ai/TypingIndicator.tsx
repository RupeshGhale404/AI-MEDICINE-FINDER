function TypingIndicator() {
  return (
    <div className="flex gap-2 items-center p-4">

      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />

      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-150" />

      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-300" />

    </div>
  );
}

export default TypingIndicator;