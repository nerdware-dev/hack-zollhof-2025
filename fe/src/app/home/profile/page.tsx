"use client";

import { useState } from "react";
import { useUserStore } from "@/stores/user/userStore";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Profile() {
  const userStore = useUserStore();
  const [activeTab, setActiveTab] = useState(1);

  // Dummy user data
  const user = {
    firstname: userStore.firstname || "Maria",
    lastname: userStore.lastname || "Nelles",
    email: userStore.email || "maria.nelles@example.com",
    avatar: "/avatar.png", // Placeholder avatar path
  };

  // Settings menu items
  const settingsItems = [
    {
      id: 1,
      category: "Personalisierung",
      items: [
        { id: 1, title: "Benachrichtigungen", icon: "pi pi-bell", link: "#" },
        { id: 2, title: "QR Code", icon: "pi pi-qrcode", link: "#" },
        { id: 3, title: "KI Assistent", icon: "pi pi-cog", link: "#" },
      ],
    },
    {
      id: 2,
      category: "App Nutzung",
      items: [
        {
          id: 1,
          title: "Deine Aktivitäten",
          icon: "pi pi-chart-line",
          link: "#",
        },
      ],
    },
    {
      id: 3,
      category: "Datenschutz",
      items: [{ id: 1, title: "Passwort", icon: "pi pi-lock", link: "#" }],
    },
    {
      id: 4,
      category: "Informationen und Support",
      items: [
        { id: 1, title: "FAQ", icon: "pi pi-question-circle", link: "#" },
        { id: 2, title: "Feedback", icon: "pi pi-comment", link: "#" },
        { id: 3, title: "Support", icon: "pi pi-info-circle", link: "#" },
      ],
    },
    {
      id: 5,
      category: "Anmeldung",
      items: [{ id: 1, title: "Logout", icon: "pi pi-sign-out", link: "#" }],
    },
  ];

  // Add custom styling for tabs
  useEffect(() => {
    // Add custom styling to match the design
    const style = document.createElement("style");
    style.innerHTML = `
      .profile-tabs .p-tabview-nav {
        border-bottom: 1px solid #e5e7eb;
        justify-content: center;
      }
      .profile-tabs .p-tabview-nav li .p-tabview-nav-link {
        background: transparent;
        border: none;
        color: #6b7280;
        font-weight: 500;
        padding: 1rem 1.5rem;
      }
      .profile-tabs .p-tabview-nav li.p-highlight .p-tabview-nav-link {
        color: #10b981;
        border-bottom: 2px solid #10b981;
      }
      .profile-tabs .p-tabview-panels {
        padding: 0;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="pb-20">
      {/* User header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src="/avatar.png"
            alt="avatar"
            style={{ height: "60px", width: "60px", borderRadius: "50%", border: "2px solid #e5e7eb" }}
          />
          <div>
            <p className="text-gray-600 text-sm mb-1">Herzlich Willkommen,</p>
            <h1 className="text-xl font-medium text-gray-500">
              {user.firstname} {user.lastname}
            </h1>
          </div>
        </div>
        <Button icon="pi pi-ellipsis-v" className="ml-auto" rounded text />
      </div>

      {/* Tabs */}
      <TabView onTabChange={(e) => setActiveTab(e.index)}>
        <TabPanel header="Settings">
          {/* Settings sections */}
          <div className="px-2 mt-4">
            {settingsItems.map((section) => (
              <div key={section.id} className="mb-6">
                <h2 className="text-base font-medium mb-2 px-2 text-gray-700">
                  {section.category}
                </h2>
                <div className="flex flex-col">
                  {section.items.map((item) => (
                    <Link
                      href={item.link}
                      key={item.id}
                      className="no-underline"
                    >
                      <div className="flex items-center justify-between p-3 hover:bg-gray-50 text-gray-700">
                        <div className="flex items-center gap-3">
                          <i
                            className={`${item.icon} text-gray-600`}
                            style={{ fontSize: "1.2rem" }}
                          ></i>
                          <span className="font-normal">{item.title}</span>
                        </div>
                        <i className="pi pi-chevron-right text-gray-400"></i>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
}
