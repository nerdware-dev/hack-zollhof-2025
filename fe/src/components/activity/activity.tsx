import { Activity } from "@/app/home/community/activity";
import { Button } from "primereact/button";

export default function ActivityComponent({
  activity,
}: {
  activity: Activity;
}) {
  return (
    <div className="flex flex-row justify-between mb-7 p-4 rounded-lg"
    style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="pr-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-gray-500 font-light text-sm">
            {activity.category}
          </div>
          <div className="text-xl font-bold mt-1">{activity.title}</div>
          <div className="text-gray-600 text-sm mt-1 line-clamp-3">
            {activity.description}
          </div>
        </div>
        <div className="mt-4 gap-4 flex items-center">
          <Button label="Add to calendar" outlined />
          <i className="pi pi-star" />
        </div>
      </div>
      <div className="flex-shrink-0">
        {activity.imgUrl && (
          <img
            src={activity.imgUrl}
            alt=""
            className="w-32 h-48 object-cover rounded-xl"
          />
        )}
      </div>
    </div>
  );
}
