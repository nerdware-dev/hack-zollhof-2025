"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import NerdwareFooter from "@/components/NerdwareFooter";
import { useRouter } from "next/navigation";
import PasswordField from "@/components/input/PasswordField";
import { useUserStore } from "@/stores/user/userStore";
import { callTestApi } from "./useTestApi";

export default function Login() {
  const router = useRouter();
  const userStore = useUserStore();

  // Hardcoded credentials for demo
  const username = "maria.nelles@nerdware.dev";
  const password = "123456";

  function handleLogin() {
    userStore.setUser({
      firstname: "Maria",
      lastname: "Nelles",
      gender: "w",
      yearOfBirth: 1968,
      email: username,
      radius: 10,
    });
    userStore.setUserLocation({
      city: "Nuremberg",
      zip: "90403",
    });
    userStore.setHealthInsurance({
      name: "AOK",
      key: "aok",
    });
    //router.replace("/home/calendar");
    router.replace("/onboarding");
  }

  async function callApi() {
    const result = await callTestApi();
    console.log("result", result);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="text-3xl font-bold text-center mb-1">Login</div>
        <InputText
          placeholder="Email"
          className="w-full"
          type="email"
          value={username}
        />
        <PasswordField
          placeholder="Password"
          className="w-full"
          value={password}
        />
        <Button label="Login" className="w-full" onClick={handleLogin} />
        <Button
          label="Register"
          link
          className="w-full"
          onClick={() => router.push("/register")}
        />
        {/* <Button label="Call test API" className="w-full " onClick={callApi} /> */}
      </div>
      <NerdwareFooter />
    </div>
  );
}
