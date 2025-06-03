import { create } from 'zustand';

interface UserBase {
    firstname: string;
    lastname: string;
    yearOfBirth: number;
    email: string;
    gender: string;
    radius: number;
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
    setGender: (gender: string) => void;
    setYearOfBirth: (yearOfBirth: number) => void;
    setRadius: (radius: number) => void;
    setUserLocation: (location: UserLocation) => void;
    setHealthInsurance: (healthInsurance: HealthInsurance) => void;
}

export const useUserStore = create<User & UserStoreActions>((set) => ({
    firstname: "",
    lastname: "",
    yearOfBirth: 2024,
    radius: 0,
    email: "",
    gender: "",
    location: {
        city: "",
        zip: "",
    },
    healthInsurance: {
        name: "",
        key: "",
    },
    setUser: (user: UserBase) => set(user),
    setGender: (gender: string) => set({ gender }),
    setRadius: (radius: number) => set({ radius }),
    setYearOfBirth: (yearOfBirth: number) => set({ yearOfBirth }),
    setUserLocation: (location: UserLocation) => set({ location }),
    setHealthInsurance: (healthInsurance: HealthInsurance) => set({ healthInsurance }),
}));