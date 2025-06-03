"use client";

import { useState, useRef, useEffect } from "react";
import { ChatInterface, ChatMessage } from "@/components/chat/ChatInterface";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <>
      <ChatInterface
        considerBottomBar
        messages={messages}
        setMessages={setMessages}
      />
    </>
  );
}
