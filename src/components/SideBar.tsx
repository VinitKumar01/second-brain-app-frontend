import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function SideBar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0">
        <div className="flex text-2xl pl-4 pt-4">
            <Logo/>
            Brainly
        </div>
        <div className="pt-8 pl-4">
        <SidebarItem title="Twitter" icon={<TwitterIcon/>}/>
        <SidebarItem title="Youtube" icon={<YoutubeIcon/>}/>
        </div>
    </div>
}