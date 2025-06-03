import { ChatMessage } from "@/components/chat/ChatInterface";
import { useRegistration } from "@/hooks/useRegistration";
import { insurances } from "@/stores/insurances/insurancelist";
import { useUserStore } from "@/stores/user/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";


export function useSteps() {
    const [currentStep, setCurrentStep] = useState(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const userStore = useUserStore();
    const router = useRouter();
    const register = useRegistration().register;

    async function handleOptionSelected(value: string) {
        setCurrentStep(currentStep + 1);

        if (currentStep === 0) {
            const insurance = insurances.find(insurance => insurance.value === value);
            if (insurance) {
                userStore.setHealthInsurance({ key: insurance.value, name: insurance.text });
            }
            addMessagesForStepTwo();
        }

        if (currentStep === 1) {
            userStore.setGender(value);
            addMessagesForStepThree();
        }


        if (currentStep === 2) {
            userStore.setRadius(Number(value));
            addMessagesForStepFour();
        }

        if (currentStep === 3) {
            if (value === "yes") {
                await register();
                router.push("/onboarding/step2");
            } else {
                //nextStep = 0;
                setCurrentStep(0);
                setMessages([]);
                addMessagesForStepOne();
            }
        }
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



    function addMessagesForStepOne() {
        addMessage(
            {
                id: "1",
                type: "text",
                text: "Hello! I'll guide you through the onboarding process. Let me ask you a few questions up front.",
                sender: "ai",
                timestamp: new Date(),
            },
            100
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
            800
        );
    }



    function addMessagesForStepTwo() {
        addMessage(
            {
                id: "3",
                type: "options",
                text: "What is your gender?",
                sender: "ai",
                timestamp: new Date(),
                readonly: false,
                options: [
                    { text: "Male", value: "m" },
                    { text: "Female", value: "w" },
                    { text: "Other", value: "d" },
                ],
            }, 100);
    }



    function addMessagesForStepThree() {
        addMessage(
            {
                id: "4",
                type: "options",
                text: "What is the radius you want to get activity recommendations for?",
                sender: "ai",
                timestamp: new Date(),
                readonly: false,
                options: [
                    { text: "1 km", value: "1" },
                    { text: "5 km", value: "5" },
                    { text: "10 km", value: "10" },
                    { text: "15 km", value: "15" },
                    { text: "20 km", value: "20" },
                    { text: "30 km", value: "30" },
                    { text: "50 km", value: "50" },
                ],
            }, 100);
    }

    function addMessagesForStepFour() {
        addMessage(
            {
                id: "5",
                type: "options",
                text: "Let's proceed with the onboarding",
                sender: "ai",
                timestamp: new Date(),
                readonly: false,
                options: [
                    { text: "Sure", value: "yes" },
                    { text: "No, let's repeat", value: "no" },
                ],
            }, 200);
    }

    return { handleStepOne: addMessagesForStepOne, currentStep, setCurrentStep, handleOptionSelected, addMessage, messages, setMessages };
}



