import UserLayout from "../../components/user/UserLayout";
import AIHeader from "../../components/ai/AIHeader";
import ChatWindow from "../../components/ai/ChatWindow";

function AIAssistant() {
  return (
    <UserLayout>
      <div className="flex h-[calc(100vh-100px)] flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100">
        <AIHeader />

        <div className="min-h-0 flex-1 overflow-hidden">
          <ChatWindow />
        </div>
      </div>
    </UserLayout>
  );
}

export default AIAssistant;