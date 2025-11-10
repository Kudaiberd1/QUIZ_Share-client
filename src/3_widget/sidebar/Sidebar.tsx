import icon from "../../assets/icon.svg"
import {useState} from "react";
import SidebarItem from "./SidebarItem.tsx";
import "../../6_shared/ui/index.ts"
import home from "../../6_shared/ui/icons/home.svg"
import add from "../../6_shared/ui/icons/add.svg"
import grid from "../../6_shared/ui/icons/grid.svg"
import chat from "../../6_shared/ui/icons/chat.svg"
import user from "../../6_shared/ui/icons/user.svg"


const Sidebar = () => {
    const [selected, setSelected] = useState(1);
    return (
        <aside className={"w-76 p-6 flex flex-col transition-all duration-180"}>
            <div className={"flex text-center"}>
                <img src={icon} />
                <h1 className={"my-auto text-2xl text-[rgb(41,69,215)] pl-1"}> QuizShare </h1>
            </div>
            <div className={"pt-12 space-x-2"}>
                <SidebarItem icon={home} label={"Home"} to={"/"} isActive={selected==0} onClick={() => setSelected(0)} />
                <SidebarItem icon={add} label={"Create Quiz"} to={"/"} isActive={selected==1} onClick={() => setSelected(1)} />
                <SidebarItem icon={grid} label={"Dashboard"} to={"/"} isActive={selected==2} onClick={() => setSelected(2)} />
                <SidebarItem icon={chat} label={"Messages"} to={"/"} isActive={selected==3} onClick={() => setSelected(3)} />
                <SidebarItem icon={user} label={"Profile"} to={"/"} isActive={selected==4} onClick={() => setSelected(4)} />
            </div>
        </aside>
    )
}


export default Sidebar;