import { Activity } from "@/app/home/community/activity"

export default function ActivityComponent({ activity }: { activity: Activity }) {


    return (
        <div className="self-stretch inline-flex flex-row justify-start items-left gap-2.5 ">
            <div className="">
                <p className="justify-start text-slate-400 text-s font-light  leading-none tracking-wide text-8995AC">{activity.category}</p>
                <h1 className="justify-start text-slate-800 text-m font-bold leading-none tracking-wide">{activity.title}</h1>
                <p className="justify-start text-slate-400 text-s font-light  leading-none tracking-wide text-8995AC">{activity.description}</p>
                <button className="self-stretch h-11 px-5 py-2.5 rounded-md outline outline-[0.50px] outline-offset-[-0.50px] outline-slate-800 inline-flex justify-center items-center gap-2.5">Anmelden</button>
                <button><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=star" /></button>
            </div>
            <div>
                <img src={activity.imgUrl} alt="" className="w-100 rounded-xl"/>
            </div>

        </div>
    )
}
; // 


/* <button><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=more_vert" /></button> */


// rounded-l border border-solid border-black

{/* <div class="">
    <div class="">
        <div class="w-8 h-8 relative overflow-hidden">
            <div class="w-5 h-5 left-[7.10px] top-[6.94px] absolute bg-slate-400"></div>
        </div>
        <div class="text-center justify-start text-slate-800 text-sm font-medium font-['SF_UI_Text'] leading-none tracking-wide">Aktivitäten</div>
    </div>
    <div class="self-stretch inline-flex justify-between items-center">
        <div class="flex justify-start items-center">
            <div class="px-5 py-2.5 border-b-2 border-slate-400 flex justify-center items-center gap-2.5">
                <div class="text-center justify-start text-slate-800 text-sm font-bold font-['SF_UI_Text'] leading-none tracking-wide">Für Dich</div>
            </div>
            <div class="px-5 py-2.5 border-b-2 border-sky-100 flex justify-center items-center gap-2.5">
                <div class="text-center justify-start text-slate-400 text-sm font-medium font-['SF_UI_Text'] leading-none tracking-wide">Freunde</div>
            </div>
        </div>
        <div class="w-6 h-6 relative overflow-hidden">
            <div class="w-3.5 h-3.5 left-[5.49px] top-[5px] absolute bg-gray-600"></div>
        </div>
    </div>
    <div class="self-stretch flex flex-col justify-start items-start gap-10">
        <div class="self-stretch inline-flex justify-start items-start gap-2.5">
            <div class="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                <div class="self-stretch inline-flex justify-between items-end">
                    <div class="text-center justify-start text-slate-400 text-xs font-light font-['SF_UI__Text'] leading-none tracking-wide">Jogging</div>
                    <div class="w-5 h-5 relative overflow-hidden">
                        <div class="w-[1.67px] h-2.5 left-[9.17px] top-[4.55px] absolute bg-slate-800"></div>
                    </div>
                </div>
                <div class="text-center justify-start text-slate-800 text-sm font-bold font-['SF_UI_Text'] leading-none tracking-wide">City Marathon</div>
                <div class="self-stretch justify-start text-slate-400 text-xs font-light font-['SF_UI__Text'] leading-none tracking-wide">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...</div>
                <div class="self-stretch inline-flex justify-start items-center gap-3.5">
                    <div class="flex-1 h-11 px-5 py-2.5 rounded-md outline outline-[0.50px] outline-offset-[-0.50px] outline-slate-800 flex justify-center items-center gap-2.5">
                        <div class="text-center justify-start text-slate-800 text-sm font-medium font-['SF_UI_Text'] leading-none tracking-wide">Anmelden</div>
                    </div>
                    <div class="w-8 h-8 relative overflow-hidden">
                        <div class="w-5 h-4 left-[6.90px] top-[7.15px] absolute bg-slate-800"></div>
                    </div>
                </div>
            </div>
            <img class="w-32 h-40 rounded-xl" src="https://placehold.co/133x164" />
        </div>
        <div class="self-stretch inline-flex justify-start items-start gap-2.5">
            <div class="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                <div class="self-stretch inline-flex justify-between items-end">
                    <div class="text-center justify-start text-slate-400 text-xs font-light font-['SF_UI__Text'] leading-none tracking-wide">Mountain Biking</div>
                    <div class="w-5 h-5 relative overflow-hidden">
                        <div class="w-[1.67px] h-2.5 left-[9.17px] top-[4.55px] absolute bg-slate-800"></div>
                    </div>
                </div>
                <div class="text-center justify-start text-slate-800 text-sm font-bold font-['SF_UI_Text'] leading-none tracking-wide">Mountail Trail Rail</div>
                <div class="self-stretch justify-start text-slate-400 text-xs font-light font-['SF_UI__Text'] leading-none tracking-wide">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...</div>
                <div class="self-stretch inline-flex justify-start items-center gap-3.5">
                    <div class="flex-1 h-11 px-5 py-2.5 rounded-md outline outline-[0.50px] outline-offset-[-0.50px] outline-slate-800 flex justify-center items-center gap-2.5">
                        <div class="text-center justify-start text-slate-800 text-sm font-medium font-['SF_UI_Text'] leading-none tracking-wide">Anmelden</div>
                    </div>
                    <div class="w-8 h-8 relative overflow-hidden">
                        <div class="w-5 h-4 left-[6.90px] top-[7.15px] absolute bg-slate-800"></div>
                    </div>
                </div>
            </div>
            <img class="w-32 self-stretch rounded-xl" src="https://placehold.co/133x164" />
        </div>
        <div class="self-stretch inline-flex justify-start items-start gap-2.5">
            <div class="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                <div class="self-stretch inline-flex justify-between items-end">
                    <div class="text-center justify-start text-slate-400 text-xs font-light font-['SF_UI__Text'] leading-none tracking-wide">Schwimmen</div>
                    <div class="w-5 h-5 relative overflow-hidden">
                        <div class="w-[1.67px] h-2.5 left-[9.17px] top-[4.55px] absolute bg-slate-800"></div>
                    </div>
                </div>
                <div class="text-center justify-start text-slate-800 text-sm font-bold font-['SF_UI_Text'] leading-none tracking-wide">Green Lake swimming</div>
                <div class="self-stretch justify-start text-slate-400 text-xs font-light font-['SF_UI__Text'] leading-none tracking-wide">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...</div>
                <div class="self-stretch inline-flex justify-start items-center gap-3.5">
                    <div class="flex-1 h-11 px-5 py-2.5 rounded-md outline outline-[0.50px] outline-offset-[-0.50px] outline-slate-800 flex justify-center items-center gap-2.5">
                        <div class="text-center justify-start text-slate-800 text-sm font-medium font-['SF_UI_Text'] leading-none tracking-wide">Anmelden</div>
                    </div>
                    <div class="w-8 h-8 relative overflow-hidden">
                        <div class="w-5 h-4 left-[6.90px] top-[7.15px] absolute bg-slate-800"></div>
                    </div>
                </div>
            </div>
            <img class="w-32 self-stretch rounded-xl" src="https://placehold.co/133x164" />
        </div>
    </div>
</div> */}