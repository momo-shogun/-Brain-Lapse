import {  Share2, Trash2 } from "lucide-react"
import { Button } from "./Button"
import Tags from "./Tags"
import { TypeIcon } from "./TypeIcon"
const iconClass = "text-stone-400/80 hover:text-stone-400"


export interface CardProps {
    link: string,
    type: "video" | "tweet" | "document" | "image",
    title: string,
    tag?: string[],
    createdAt: string
}

function CardTitle({ title }: { title: string }) {
    return (<div className="text-lg font-semibold leading-none tracking-tight">{title}</div>)

}

export const Card = (props: CardProps) => {

    return <div className="rounded-lg border bg-white shadow-sm">
        <div className="flex flex-col space-y-3 p-6 ">
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <TypeIcon type={props.type} />
                    <CardTitle title={props.title} />
                </div>
                <div className="inline-flex items-center">
                    <Button size="md" variant="icon" startIcon={<Share2 className={iconClass} size={19} />} onClick={() => { }}></Button>
                    <Button size="md" variant="icon" startIcon={<Trash2 className={iconClass} size={19} />
                    } onClick={() => { }}></Button>
                </div>
            </div>
            <div className="text-base">
                adasd
            </div>
            <div className="space-y-4">
                <div className="space-x-2">
                    <Tags tags={props.tag} />
                </div>
                <div className="text-xs text-slate-500">Added on {props.createdAt}</div>
            </div>
        </div>
    </div >
}
