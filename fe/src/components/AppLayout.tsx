"use client";

import { usePathname } from "next/navigation";
import BottomNavigation from "./BottomNavigation";
import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/stores/user/userStore";
import { useRouter } from "next/navigation";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const firstname = useUserStore((u) => u.firstname);
  const router = useRouter();

  // Don't show navigation on login and register pages
  const showBottomNavbar =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.includes("/onboarding");

  useEffect(() => {
    if (!firstname && !(pathname === "/login" || pathname === "/register")) {
      router.replace("/login");
    }
  }, [firstname, showBottomNavbar]);

  if (showBottomNavbar) {
    return <>{children}</>;
  }

  // Determine current view based on pathname
  let currentView: "calendar" | "map" | "home" | "community" | "favorites" =
    "home";

  if (pathname.includes("/calendar")) {
    currentView = "calendar";
  } else if (pathname.includes("/map")) {
    currentView = "map";
  } else if (pathname.includes("/community")) {
    currentView = "community";
  } else if (pathname.includes("/favorites")) {
    currentView = "favorites";
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-16">{children}</main>
      <BottomNavigation currentView={currentView} />
    </div>
  );
}
