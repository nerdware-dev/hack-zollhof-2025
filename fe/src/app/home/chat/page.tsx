"use client";

import { useState, useRef, useEffect } from "react";
import { ChatInterface, ChatMessage } from "@/components/chat/ChatInterface";
import { useNormalChat } from "@/hooks/useNormalChat";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { sendMessage } = useNormalChat();

  function handleUserMessageSent(message: string) {
    sendMessage(message).then((response) => {
      setMessages((prev) => [...prev, {
        id: Math.random().toString(36).substring(2, 15),
        type: "text",
        text: response.data.message,
        sender: "ai",
        timestamp: new Date(),
      }]);
    });
  }

  return (
    <>
      <ChatInterface
        considerBottomBar
        messages={messages}
        setMessages={setMessages}
        onUserMessageSent={handleUserMessageSent}
      />
    </>
  );
}
