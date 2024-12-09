import { Brain, FileText, Hash, Link2, Twitter, Video } from "lucide-react"
import { Button } from "./ui/Button"
const bgSidebar = "white"

const sidebarClasses = `
 h-full w-96 bg-${bgSidebar} text-black border-r-2
`

const Sidebar = () => {
    return (
        <>
            <div className={sidebarClasses}>
                <div className="flex gap-2 p-4 align-center justify-start text-nowrap">
                    <Brain className="text-purple-500" size={30} />
                    <div className=" text-black text-xl font-semibold tracking-wide">Brain Lapse</div>
                </div>
                <ul className="p-4 flex flex-col gap-5">
                    <Button variant="transparent" size="sm" startIcon={<Twitter size={23} />} text="Tweets"></Button>
                    <Button variant="transparent" size="sm" startIcon={<Video size={23} />} text="Video"></Button>
                    <Button variant="transparent" size="sm" startIcon={<FileText size={23} />} text="Document"></Button>
                    <Button variant="transparent" size="sm" startIcon={<Link2 size={23} />} text="Links"></Button>
                    <Button variant="transparent" size="sm" startIcon={<Hash size={23} />} text="Tags"></Button>
                </ul>
            </div>
        </>
    )
}

export default Sidebar;
