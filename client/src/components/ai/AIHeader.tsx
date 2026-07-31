import { Bot } from "lucide-react";

function AIHeader() {
  return (
    <div className="border-b bg-white px-8 py-5 flex items-center gap-4">

      <div className="bg-blue-600 p-3 rounded-xl text-white">
        <Bot size={28} />
      </div>

      <div>

        <h2 className="text-2xl font-bold">
          AI Medicine Assistant
        </h2>

        <p className="text-gray-500">
          Ask about medicines, symptoms and pharmacies.
        </p>

      </div>

    </div>
  );
}

export default AIHeader;