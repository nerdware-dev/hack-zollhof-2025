import { useActivitiesStore } from "@/stores/activities/useActivities";
import { useUserStore } from "@/stores/user/userStore";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";

interface Program {
  name: string;
  description: string;
  link: string;
}

export default function PreventionPanel() {
  const activityStore = useActivitiesStore();
  const userStore = useUserStore();

  useEffect(() => {
    if (
      activityStore.preventionPrograms.length === 0 &&
      !activityStore.loadingPreventionPrograms
    ) {
      activityStore.loadPreventionPrograms();
    }
  }, []);

  return (
    <div>
      {activityStore.loadingPreventionPrograms && (
        // Add some skeleton loading animations
        <div>
          <Skeleton className="mt-4" width="100%" height="100px" />
          <Skeleton className="mt-4" width="100%" height="100px" />
          <Skeleton className="mt-4" width="100%" height="100px" />
        </div>
      )}
      <div
        style={{ backgroundColor: "#C5E6E7" }}
        className="p-4 mb-6 rounded-lg"
      >
        <div className="flex justify-between items-center">
          <div>
            <div>Your health insurance:</div>
            <div className="mt-1 font-bold">
              {userStore.healthInsurance.name}
            </div>
          </div>
          <div>
            <Button icon="pi pi-pencil" rounded text />
          </div>
        </div>
      </div>
      {activityStore.preventionPrograms.map((program) => (
        <ProgramComponent program={program} key={program.name + program.link} />
      ))}
    </div>
  );
}

function ProgramComponent({ program }: { program: Program }) {
  return (
    <div
      className="mb-8 p-4 rounded-lg"
      style={{ backgroundColor: "rgb(250, 250, 250)" }}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="text-xl font-bold">{program.name}</div>
        <i className="pi pi-arrow-right mt-1" style={{ fontSize: "1.3rem" }} />
      </div>
      <div className="mt-2">{program.description}</div>
    </div>
  );
}
