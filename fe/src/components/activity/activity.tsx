import { Activity } from "@/app/home/community/activity"

export default function ActivityComponent({ activity }: { activity: Activity }) {


    return (
        <div>
            <div className="flex flex-row">
                <p>{activity.category}
                    <button><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=more_vert" /></button>
                </p>
                <h1>{activity.title}</h1>
                <p>{activity.description}</p>
                <button className="rounded-xl border-solid border-black">Anmelden</button>
                <button><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=star" /></button>
            </div>
            <div>
                <img src={activity.imgUrl} alt="" className="w-100 rounded-xl"/>
            </div>

        </div>
    )
}