import { create } from 'zustand';

interface UserBase {
    firstname: string;
    lastname: string;
    email: string;
}

interface UserLocation {
    city: string;
    zip: string;
}

interface User extends UserBase {
    location: UserLocation;
    healthInsurance: HealthInsurance;
}

interface HealthInsurance {
    name: string;
    key: string;
}


interface UserStoreActions {
    setUser: (user: UserBase) => void;
    setUserLocation: (location: UserLocation) => void;
    setHealthInsurance: (healthInsurance: HealthInsurance) => void;
}

export const useUserStore = create<User & UserStoreActions>((set) => ({
    firstname: "",
    lastname: "",
    email: "",
    location: {
        city: "",
        zip: "",
    },
    healthInsurance: {
        name: "",
        key: "",
    },
    setUser: (user: UserBase) => set(user),
    setUserLocation: (location: UserLocation) => set({ location }),
    setHealthInsurance: (healthInsurance: HealthInsurance) => set({ healthInsurance }),
}));