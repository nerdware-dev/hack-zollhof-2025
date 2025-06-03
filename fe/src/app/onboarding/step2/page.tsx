"use client";

import { ChatInterface, ChatMessage } from "@/components/chat/ChatInterface";
import { useEffect, useState } from "react";
import { useSteps } from "./steps";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Onboard() {
  const { messages, setMessages, init, sendMessageToAI } = useSteps();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    init().then(() => {
      setLoading(false);
    });
  }, []);

  function handleOptionSelected() {}

  function handleUserMessageSent(message: string) {
    sendMessageToAI(message);
  }

  return (
    <>
      <ChatInterface
        onOptionSelected={handleOptionSelected}
        messages={messages}
        setMessages={setMessages}
        onUserMessageSent={handleUserMessageSent}
      />
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            animationDuration=".5s"
          />
        </div>
      )}
    </>
  );
}
