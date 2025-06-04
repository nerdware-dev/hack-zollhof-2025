"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import NerdwareFooter from "@/components/NerdwareFooter";
import { useRouter } from "next/navigation";
import PasswordField from "@/components/input/PasswordField";
import { useState } from "react";
import { useUserStore } from "@/stores/user/userStore";
import { Dropdown } from "primereact/dropdown";
import { germanCities } from "./germanCities";
import { InputNumber } from "primereact/inputnumber";

export default function Login() {
  const router = useRouter();
  const userStore = useUserStore();
  const [selectedCity, setSelectedCity] = useState<{
    id: number;
    city: string;
    zip: string;
  } | null>(null);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    yearOfBirth: 0,
    email: "",
    password: "",
    city: "",
    zip: "",
  });

  const germanCitiesOptions = germanCities
    .sort((a, b) => a.city.localeCompare(b.city))
    .map((city) => ({
      label: `${city.city} (PLZ: ${city.zip})`,
      value: city,
    }));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleRegister = () => {
    userStore.setUserLocation({
      city: selectedCity?.city || "",
      zip: selectedCity?.zip || "",
    });
    userStore.setUser({
      firstname: userData.firstname,
      lastname: userData.lastname,
      yearOfBirth: userData.yearOfBirth,
      email: userData.email,
      gender: "",
      radius: 0,
    });
    router.push("/onboarding");
  };

  const loginDataComplete =
    userData.firstname &&
    userData.lastname &&
    userData.email &&
    userData.password &&
    userData.yearOfBirth;

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="text-3xl font-bold text-center mb-1">Register</div>
        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="firstname" className="mb-1 text-xs">
              First Name
            </label>
            <InputText
              id="firstname"
              placeholder="Firstname"
              className="w-full"
              type="text"
              name="firstname"
              value={userData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="lastname" className="mb-1 text-xs">
              Last Name
            </label>
            <InputText
              id="lastname"
              placeholder="Lastname"
              className="w-full"
              type="text"
              name="lastname"
              value={userData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-1 text-xs">
            City
          </label>
          <Dropdown
            id="city"
            options={germanCitiesOptions}
            virtualScrollerOptions={{
              itemSize: 48,
            }}
            placeholder="Select your city"
            filter
            filterBy="label"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.value);
              setUserData({
                ...userData,
                city: e.value.city,
                zip: e.value.zip,
              });
            }}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="yearOfBirth" className="mb-1 text-xs">
            Year of Birth
          </label>
          <InputNumber
            id="yearOfBirth"
            value={userData.yearOfBirth}
            onValueChange={(e) =>
              setUserData({ ...userData, yearOfBirth: e.value || 0 })
            }
            min={1900}
            max={2024}
            useGrouping={false}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-xs">
            Email
          </label>
          <InputText
            id="email"
            placeholder="Email"
            className="w-full"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-xs">
            Password
          </label>
          <PasswordField
            id="password"
            placeholder="Password"
            className="w-full"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <Button
          label="Register"
          className="w-full"
          onClick={handleRegister}
          disabled={!loginDataComplete}
        />
        <Button
          label="Login"
          link
          className="w-full"
          onClick={() => router.push("/login")}
        />
      </div>
      <NerdwareFooter />
    </div>
  );
}
