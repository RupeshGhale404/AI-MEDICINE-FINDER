import UserLayout from "../../components/user/UserLayout";

import AIHeader from "../../components/ai/AIHeader";
import ChatWindow from "../../components/ai/ChatWindow";

function AIAssistant() {
  return (
    <UserLayout>
      <div className="h-[calc(100vh-100px)] rounded-2xl overflow-hidden bg-white shadow-lg flex flex-col">

        <AIHeader />

        <div className="flex-1 overflow-hidden">
          <ChatWindow />
        </div>

      </div>
    </UserLayout>
  );
}

export default AIAssistant;