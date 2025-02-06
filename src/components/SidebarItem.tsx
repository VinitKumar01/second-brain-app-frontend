import { ReactElement } from "react"

export function SidebarItem({title, icon}: {
    title: string;
    icon: ReactElement;
}) {
    return <div className="flex cursor-pointer hover:bg-gray-200 rounded pl-4 max-w-48 transition-all duration-150">
        <div className="p-2 text-gray-700">
        {icon}
        </div>
        <div className="p-2 text-gray-700">
        {title}
        </div>
    </div>
}