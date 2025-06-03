"use client";

import Image from "next/image";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, []);
  return <></>;
}
