"use client";

import ActivityComponent from "@/components/activity/activity";
import { Activity } from "./activity";
import PageTitle from "@/components/PageTitle";
import { TabPanel, TabView } from "primereact/tabview";

export default function Community() {
  const activities: Activity[] = [
    {
      category: "Hiking",
      title: "Hike & Chill",
      description: "Hey! We're planning a hike and chill event. Join us!",
      imgUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.POvDKBzLb03Et6seePw2qwHaE9%26pid%3DApi&f=1&ipt=d866b0a13163a2da562ac56311e10d9b725be1fdddaed6c39f5772f8ff3d6c33&ipo=images",
    },
    {
      category: "Hiking",
      title: "Mountain Hike",
      description:
        "We are going on a hike! Come and join us on a journey to the mountain cabin!",
      imgUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.S5Ex0pHP6vp4gzq1WclcoQHaE8%26pid%3DApi&f=1&ipt=17215961d146a63acee7365cf80bb09dc696b36b3765b1135eae3c784f26a941&ipo=images",
    },
  ];

  return (
    <div>
      <PageTitle title="Upcoming Activities" />

      <TabView>
        <TabPanel header="Prevention" className="p-0">
          {activities.map((activity) => (
            <ActivityComponent activity={activity} />
          ))}
        </TabPanel>
        <TabPanel header="Events">
          <p className="m-0">Nothing found yet.</p>
        </TabPanel>
        <TabPanel header="Activities">
          <p className="m-0">Nothing found yet.</p>
        </TabPanel>
      </TabView>
    </div>
  );
}
