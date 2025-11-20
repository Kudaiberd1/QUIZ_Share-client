import icon from "../../assets/icon.svg"
import {useState} from "react";
import SidebarItem from "./SidebarItem.tsx";
import "../../6_shared/ui/index.ts"
import home from "../../6_shared/ui/icons/home.svg"
import add from "../../6_shared/ui/icons/add.svg"
import grid from "../../6_shared/ui/icons/grid.svg"
import chat from "../../6_shared/ui/icons/chat.svg"
import user from "../../6_shared/ui/icons/user.svg"
import { Menu, X } from "lucide-react";
import {useNavigate} from "react-router-dom";


interface Prop{
    selected: number;
}

const Sidebar = ({selected} : Prop) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-4 z-50 fixed top-4 left-4 text-white bg-blue-600 rounded-lg"
            >
                {open ? <X size={18} /> : <Menu size={18} />}
            </button>

            <aside className={`fixed h-full w-76 p-6 flex flex-col transition-all duration-180 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-76 w-64 bg-[rgb(10,9,41)]`}>
                <div className={"flex text-center ms-12 md:ms-0 cursor-pointer"} onClick={() => navigate("/")}>
                    <img src={icon} />
                    <h1 className={"my-auto text-2xl text-[rgb(41,69,215)] pl-1"}> QuizShare </h1>
                </div>
                <div className={"pt-12 space-x-2"}>
                    <SidebarItem icon={home} label={"Home"} to={"/"} isActive={selected==0} />
                    <SidebarItem icon={add} label={"Create Quiz"} to={"/add"} isActive={selected==1} />
                    <SidebarItem icon={grid} label={"Dashboard"} to={"/"} isActive={selected==2} />
                    <SidebarItem icon={chat} label={"Messages"} to={"/"} isActive={selected==3} />
                    <SidebarItem icon={user} label={"Profile"} to={"/"} isActive={selected==4} />
                </div>
            </aside>
        </>
    )
}


export default Sidebar;