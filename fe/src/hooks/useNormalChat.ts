import { BASE_URL } from "@/API/utils";
import axios from "axios";

export function useNormalChat() {
    async function sendMessage(message: string) {
        const response = await axios.post(BASE_URL + "/chat", { question: message }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return response;
    };

    return { sendMessage };
}