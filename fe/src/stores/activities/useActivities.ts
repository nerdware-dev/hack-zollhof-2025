import { BASE_URL } from "@/API/utils";
import axios from "axios";
import { create } from "zustand";

interface ActivitiesStore {
    preventionPrograms: PreventionProgram[];
    events: Event[];
    loadingEvents: boolean;
    loadingPreventionPrograms: boolean;
    loadPreventionPrograms: () => Promise<void>;
    loadEvents: () => Promise<void>;
}

export interface PreventionProgram {
    name: string;
    description: string;
    link: string;
}

export interface Event {
    name: string;
    description: string;
    link: string;
    location: string;
    date: string;
}


export const useActivitiesStore = create<ActivitiesStore>((set) => ({
    preventionPrograms: [],
    events: [],
    loadingEvents: false,
    loadingPreventionPrograms: false,
    loadPreventionPrograms: async () => {
        set({ loadingPreventionPrograms: true });
        const response = await axios.post(BASE_URL + "/programs", {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        set({ preventionPrograms: response.data });
        set({ loadingPreventionPrograms: false });
    },
    loadEvents: async () => {
        set({ loadingEvents: true });
        const response = await axios.post(BASE_URL + "/events", {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        set({ events: response.data });
        set({ loadingEvents: false });
    }
}));