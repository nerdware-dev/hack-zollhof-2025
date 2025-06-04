import { ChatMessage } from "@/components/chat/ChatInterface";
import { useInterviewChat } from "@/hooks/useInterviewChat";
import { useRegistration } from "@/hooks/useRegistration";
import { useUserStore } from "@/stores/user/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";


const MAX_MESSAGES = 9;

export function useSteps() {
    const [inputBlocked, setInputBlocked] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const userStore = useUserStore();
    const router = useRouter();
    const register = useRegistration().register;
    const { sendMessage, endInterview } = useInterviewChat();


    function addMessage(message: ChatMessage, delay: number = 0) {
        if (inputBlocked)
            return;
        setTimeout(() => {
            setMessages((prev) => {
                if (prev.find((m) => m.id === message.id) === undefined) {
                    return [...prev, message];
                }
                return prev;
            });
        }, delay);
        if (messages.length >= MAX_MESSAGES) {
            setInputBlocked(true);
            setMessages((prev) => {
                return [...prev, {
                    id: Math.random().toString(36).substring(2, 15),
                    type: "text",
                    text: "Vielen Dank, ich werde dir nun ein paar Empfehlungen für Aktivitäten zusammenstellen.",
                    sender: "ai",
                    timestamp: new Date(),
                }];
            });
            handleEndInterview();
        }
    }

    async function handleEndInterview() {
        const response = await endInterview();
        console.log(response);
        if (response.status === 200) {
            router.push("/home/community");
        }
    }

    async function sendMessageToAI(message: string) {
        const response = await sendMessage(message);
        if (response.status === 200) {
            addMessage({
                id: Math.random().toString(36).substring(2, 15),
                type: "text",
                text: response.data.message,
                sender: "ai",
                timestamp: new Date(),
            });
        }
    }

    async function init() {
        const promise = sendMessage("");
        addMessage({
            id: "1",
            type: "text",
            text: "Ich werde ein paar Fragen für dich zusammenstellen, um deine persönlichen Präferenzen und Empfehlungen für Aktivitäten zu erfahren.",
            sender: "ai",
            timestamp: new Date(),
        });
        const response = await promise;
        if (response.status === 200) {
            addMessage({
                id: "2",
                type: "text",
                text: response.data.message,
                sender: "ai",
                timestamp: new Date(),
            });
        }
    }



    return { currentStep, setCurrentStep, addMessage, sendMessageToAI, messages, setMessages, init };
}



