"use client";

import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import Image from "next/image";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

// Badge type definition
type Badge = {
  id: number;
  title: string;
  image: string;
  completed: boolean;
};

// Progress badge type
type ProgressBadge = {
  id: number;
  title: string;
  progress: number;
  total: number;
  unit: string;
};

export default function Badges() {
  // Dummy data for unlocked badges
  const unlockedBadges: Badge[] = [
    {
      id: 1,
      title: "LONGEST TIME RECORD",
      image: "/badge1.png",
      completed: true,
    },
    {
      id: 2,
      title: "FIRST WORKOUT COMPLETED",
      image: "/badge2.png",
      completed: true,
    },
    {
      id: 3,
      title: "100 WORKOUT COMPLETED",
      image: "/badge3.png",
      completed: true,
    },
    {
      id: 4,
      title: "NEW RECORD CALORIES BURNED",
      image: "/badge4.png",
      completed: true,
    },
    {
      id: 5,
      title: "7 DAYS STREAK",
      image: "/badge5.png",
      completed: true,
    },
    {
      id: 6,
      title: "30 DAYS STREAK",
      image: "/badge6.png",
      completed: true,
    },
  ];

  // Dummy data for upcoming badges
  const upcomingBadges: ProgressBadge[] = [
    {
      id: 1,
      title: "Run 100km",
      progress: 80,
      total: 100,
      unit: "km",
    },
    {
      id: 2,
      title: "Cycle 200km",
      progress: 80,
      total: 100,
      unit: "km",
    },
    {
      id: 3,
      title: "Swim 5km",
      progress: 80,
      total: 100,
      unit: "km",
    },
    {
      id: 4,
      title: "Hike 20km",
      progress: 10,
      total: 20,
      unit: "km",
    },
  ];

  return (
    <div className="pb-20">
      <PageTitle title="Freigeschaltete Badges" />

      {/* Unlocked badges grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {unlockedBadges.map((badge) => (
          <div key={badge.id} className="flex flex-col items-center gap-5">
            <img src={badge.image} alt={badge.title} width={100} height={100} />
          </div>
        ))}
      </div>

      {/* Share button */}
      <div className="px-4 mt-7 mb-6">
        <Button
          label="Mit Freunden teilen"
          className="w-full p-button-outlined"
          style={{ borderColor: "#6b7280", color: "#4b5563" }}
        />
      </div>

      {/* Upcoming badges section */}
      <div className="px-4">
        <h2 className="text-xl font-semibold mb-4">Anstehende Badges</h2>

        <div className="flex flex-col gap-6">
          {upcomingBadges.map((badge) => (
            <div key={badge.id} className="mb-2">
              <div className="flex justify-between mb-1">
                <span>{badge.title}</span>
              </div>
              <ProgressBar
                value={badge.progress}
                className="h-2 mb-1"
                color="#7DBFC1"
                showValue={false}
                style={{ backgroundColor: "#e5e7eb", height: "8px" }}
              />
              <div className="text-sm text-gray-500">
                {badge.progress} / {badge.total} {badge.unit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
