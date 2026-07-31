import { useState } from "react";

import UserLayout from "../../components/user/UserLayout";

import AIHeader from "../../components/ai/AIHeader";
import ChatSidebar from "../../components/ai/ChatSidebar";
import ChatWindow from "../../components/ai/ChatWindow";

function AIAssistant() {

  const [activeChat, setActiveChat] = useState<number>(1);

  const [chats, setChats] = useState([
    {
      id: 1,
      title: "New Conversation",
    },
  ]);

  const handleNewChat = () => {

    const newChat = {
      id: Date.now(),
      title: "New Conversation",
    };

    setChats((prev) => [newChat, ...prev]);

    setActiveChat(newChat.id);

  };

  return (
    <UserLayout>

      <div className="h-[calc(100vh-100px)] rounded-2xl overflow-hidden shadow-lg bg-white flex">

        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          onSelect={setActiveChat}
          onNewChat={handleNewChat}
        />

        <div className="flex-1 flex flex-col">

          <AIHeader />

          <ChatWindow />

        </div>

      </div>

    </UserLayout>
  );
}

export default AIAssistant;