import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

interface BaseChatMessage {
  id: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export interface ChatTextMessage extends BaseChatMessage {
  type: "text";
  text: string;
}

export interface OptionMessage extends BaseChatMessage {
  type: "options";
  text?: string;
  options: {
    text: string;
    value: string;
  }[];
  selectedOptionValue?: string;
  readonly: boolean;
}

// Union type for messages
export type ChatMessage = ChatTextMessage | OptionMessage;

export function ChatInterface({
  messages = [],
  setMessages,
  considerBottomBar = false,
  inputDisabled = false,
  onOptionSelected = undefined,
  onUserMessageSent = undefined,
}: {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  considerBottomBar?: boolean;
  inputDisabled?: boolean;
  onOptionSelected?: (value: string) => void;
  onUserMessageSent?: (message: string) => void;
}) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add user message
    const userMessage: ChatTextMessage = {
      id: Date.now().toString(),
      type: "text",
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    if (onUserMessageSent) {
      onUserMessageSent(userMessage.text);
    }
  };

  const handleOptionSelect = (messageId: string, optionValue: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId && message.type === "options"
          ? { ...message, selectedOptionValue: optionValue, readonly: true }
          : message
      )
    );

    if (onOptionSelected) {
      onOptionSelected(optionValue);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`flex flex-col ${
        considerBottomBar ? "h-[calc(100dvh-4rem)]" : "h-dvh"
      }`}
    >
      <div className="bg-white p-2.5 flex flex-row items-center gap-3 grow-0 shrink-0">
        <div>
          <img
            src="/chatbot.jpg"
            alt="chatbot"
            className="w-10 h-10 rounded-4xl"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Health Assistant
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 grow shrink">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-[#DEF3F3] text-gray-600 rounded-tr-none"
                  : "bg-[#F5F5F5] text-gray-800 rounded-tl-none"
              }`}
            >
              {message.type === "text" ? (
                <ChatMessage message={message} />
              ) : (
                <ChatOptionMessage
                  message={message}
                  handleOptionSelect={handleOptionSelect}
                />
              )}
              <p className={`text-xs mt-1 text-gray-500`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="py-2 px-4 bg-white grow-0 shrink-0">
        <div className="flex gap-2">
          <InputText
            value={newMessage}
            disabled={inputDisabled}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            icon="pi pi-send"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || inputDisabled}
            className="p-button-rounded"
          />
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: ChatMessage }) {
  return <div>{message.text}</div>;
}

function ChatOptionMessage({
  message,
  handleOptionSelect,
}: {
  message: OptionMessage;
  handleOptionSelect: (messageId: string, optionValue: string) => void;
}) {
  return (
    <div>
      {message.text && <p className="mb-2">{message.text}</p>}
      <div className="flex flex-col gap-2">
        {message.options.map((option) => (
          <button
            disabled={message.readonly}
            key={option.value}
            onClick={() => handleOptionSelect(message.id, option.value)}
            className={`text-left px-3 py-2 rounded-md border ${
              message.selectedOptionValue === option.value
                ? "bg-[#232a48] text-white border-[#232a48]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
