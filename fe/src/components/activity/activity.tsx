import { Activity } from "@/app/home/community/activity";
import { Button } from "primereact/button";

export default function ActivityComponent({
  activity,
}: {
  activity: Activity;
}) {
  return (
    <div className="flex flex-row justify-between mb-7">
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
        <div className="mt-2 gap-4 flex items-center">
          <Button
            label="Anmelden"
            outlined
            className="px-6 py-2 border border-gray-300 rounded-full text-black bg-white hover:bg-white"
          />
          <i className="pi pi-star" />
        </div>
      </div>
      <div className="flex-shrink-0">
        <img
          src={activity.imgUrl}
          alt=""
          className="w-32 h-48 object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
