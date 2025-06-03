import Link from "next/link";
import { FC } from "react";

interface BottomNavigationProps {
  currentView?: "calendar" | "map" | "home" | "community" | "favorites";
}

const BottomNavigation: FC<BottomNavigationProps> = ({
  currentView = "chat",
}) => {
  const menuItems = [
    {
      id: "calendar",
      label: "Calendar",
      icon: "pi pi-calendar",
      path: "/home/calendar",
    },
    { id: "map", label: "Map", icon: "pi pi-map", path: "/home/map" },
    { id: "chat", label: "Chat", icon: "pi pi-comments", path: "/home/chat" },
    {
      id: "community",
      label: "Community",
      icon: "pi pi-users",
      path: "/home/community",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "pi pi-user",
      path: "/home/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 shadow-lg z-50">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          className={`flex flex-col items-center justify-center ${
            item.id === "chat" ? "relative -top-4" : "w-full h-full"
          }`}
        >
          {item.id === "chat" ? (
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-full ${
                currentView === item.id
                  ? "bg-[#232a48] text-white"
                  : "bg-[#232a48] text-white"
              } shadow-lg`}
            >
              <i className={`${item.icon} text-xl`}></i>
            </div>
          ) : (
            <>
              <i
                className={`${item.icon} text-lg ${
                  currentView === item.id ? "text-[#232a48]" : "text-gray-500"
                }`}
              ></i>
              <span
                className={`text-xs mt-1 ${
                  currentView === item.id ? "text-[#232a48]" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavigation;
