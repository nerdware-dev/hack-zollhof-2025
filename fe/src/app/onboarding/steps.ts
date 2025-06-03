import { ChatMessage } from "@/components/chat/ChatInterface";
import { insurances } from "@/stores/insurances/insurancelist";
import { useUserStore } from "@/stores/user/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";


export function useSteps() {
    const [currentStep, setCurrentStep] = useState(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [onboardingAnswers, setOnboardingAnswers] = useState<string[]>([
        "", // health insurance
    ]);
    const userStore = useUserStore();
    const router = useRouter();

    function handleOptionSelected(value: string) {
        const currentAnswers = [...onboardingAnswers];
        currentAnswers[currentStep] = value;
        let nextStep = currentStep + 1;
        setOnboardingAnswers(currentAnswers);

        if (currentStep === 0) {
            const insurance = insurances.find(insurance => insurance.value === value);
            if (insurance) {
                userStore.setHealthInsurance({ key: insurance.value, name: insurance.text });
            }
            handleStepTwo();
        }

        if (currentStep === 1) {
            if (value === "yes") {
                router.push("/home/calendar");
            } else {
                nextStep = 0;
                setMessages([]);
                handleStepOne();
            }
        }

        setCurrentStep(nextStep);
    }


    function addMessage(message: ChatMessage, delay: number = 0) {
        setTimeout(() => {
            setMessages((prev) => {
                if (prev.find((m) => m.id === message.id) === undefined) {
                    return [...prev, message];
                }
                return prev;
            });
        }, delay);
    }



    function handleStepOne() {
        addMessage(
            {
                id: "1",
                type: "text",
                text: "Hello! I'm your health assistant. How can I help you today?",
                sender: "ai",
                timestamp: new Date(),
            },
            500
        );
        addMessage(
            {
                id: "2",
                type: "options",
                text: "What would you like to focus on improving?",
                sender: "ai",
                timestamp: new Date(),
                readonly: false,
                options: insurances,
            },
            1000
        );
    }


    function handleStepTwo() {
        addMessage(
            {
                id: "4",
                type: "options",
                text: "Let's proceed with the onboarding",
                sender: "ai",
                timestamp: new Date(),
                readonly: false,
                options: [
                    { text: "Sure", value: "yes" },
                    { text: "No, I picked the wrong insurance", value: "no" },
                ],
            }, 500);
    }


    return { handleStepOne, currentStep, setCurrentStep, onboardingAnswers, setOnboardingAnswers, handleOptionSelected, addMessage, messages, setMessages };
}



