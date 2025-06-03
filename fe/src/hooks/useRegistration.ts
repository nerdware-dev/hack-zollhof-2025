import { useUserStore } from "@/stores/user/userStore";
import { BASE_URL } from '@/API/utils';
import axios from "axios";

export function useRegistration() {
    const userStore = useUserStore();

    const register = async () => {
        const userData = {
            first_name: userStore.firstname,
            last_name: userStore.lastname,
            email: userStore.email,
            basic_preferences: {
                year_of_birth: userStore.yearOfBirth,
                gender: userStore.gender,
                city: userStore.location.city,
                country: "Deutschland",
                radius_in_km: userStore.radius,
                insurer_name: userStore.healthInsurance.name,
            },
            ai_preferences: "",
            chat_history: [],
        };
        const response = await axios.post(BASE_URL + "/register", userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return response;
    };

    return { register };
}