import ActivityComponent from "@/components/activity/activity";
import { useActivitiesStore } from "@/stores/activities/useActivities";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";

interface Event {
  name: string;
  description: string;
  link: string;
  location: string;
  date: string;
}

export default function EventsPanel() {
  const activityStore = useActivitiesStore();

  useEffect(() => {
    if (activityStore.events.length === 0 && !activityStore.loadingEvents) {
      activityStore.loadEvents();
    }
  }, []);

  return (
    <div>
      {activityStore.loadingEvents && (
        // Add some skeleton loading animations
        <div>
          <Skeleton className="mt-4" width="100%" height="100px" />
          <Skeleton className="mt-4" width="100%" height="100px" />
          <Skeleton className="mt-4" width="100%" height="100px" />
        </div>
      )}
      {activityStore.events.map((event) => (
        <ActivityComponent
          activity={{
            category: event.location,
            title: event.name,
            description: event.description,
            imgUrl: "",
          }}
          key={event.name + event.link + event.date + event.location}
        />
      ))}
    </div>
  );
}
