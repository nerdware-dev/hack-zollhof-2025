import { BASE_URL } from "@/API/utils";
import axios from "axios";

export function useInterviewChat() {
    async function sendMessage(message: string) {
        const response = await axios.post(BASE_URL + "/interview-talk", { question: message }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return response;
    };

    async function endInterview() {
        const response = await axios.post(BASE_URL + "/interview-end", {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    return { sendMessage, endInterview };
}