"use client";

import ActivityComponent from "@/components/activity/activity";
import { Activity } from "./activity";


export default function Community() {

  const activities: Activity[] = [
    {
      category: 'Hiking',
      title: 'blabla',
      description: 'blabla',
      imgUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.POvDKBzLb03Et6seePw2qwHaE9%26pid%3DApi&f=1&ipt=d866b0a13163a2da562ac56311e10d9b725be1fdddaed6c39f5772f8ff3d6c33&ipo=images'
    }, {
      category: 'Hiking',
      title: 'blabla',
      description: 'blabla',
      imgUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.S5Ex0pHP6vp4gzq1WclcoQHaE8%26pid%3DApi&f=1&ipt=17215961d146a63acee7365cf80bb09dc696b36b3765b1135eae3c784f26a941&ipo=images'
    }
  ]

  return <div>
    <button>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_back" />
    </button>
    <h1>Aktivitäten</h1>
    {
      activities.map(activity => 
         <ActivityComponent activity={activity } />
      )
    }
   
  </div>;
}
