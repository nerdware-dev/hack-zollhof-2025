"use client";

import { ChatInterface, ChatMessage } from "@/components/chat/ChatInterface";
import { useEffect, useState } from "react";
import { useSteps } from "./steps";

export default function Onboard() {
  const { handleOptionSelected, handleStepOne, messages, setMessages } =
    useSteps();

  useEffect(() => {
    handleStepOne();
  }, []);

  return (
    <ChatInterface
      onOptionSelected={handleOptionSelected}
      messages={messages}
      setMessages={setMessages}
      inputDisabled
    />
  );
}
