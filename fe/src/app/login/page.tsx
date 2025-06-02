"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import NerdwareFooter from "@/components/NerdwareFooter";
import { useRouter } from "next/navigation";
import PasswordField from "@/components/input/PasswordField";

export default function Login() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="text-3xl font-bold text-center mb-1">Login</div>
        <InputText placeholder="Email" className="w-full" type="email" />
        <PasswordField placeholder="Password" className="w-full" />
        <Button label="Login" className="w-full" />
        <Button
          label="Register"
          link
          className="w-full"
          onClick={() => router.push("/register")}
        />
      </div>
      <NerdwareFooter />
    </div>
  );
}
