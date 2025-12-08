import React from "react";
import type {MouseEvent} from "react";
import {NavLink} from "react-router-dom";
import {CountMessages} from "../../4_features/message-card/lib/filterMessage.ts";

interface Props {
    icon?: React.ReactNode;
    label: string;
    to: string;
    isActive: boolean;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}
const SidebarItem = ({icon, label, to, isActive, onClick}: Props) => {

    const countMessages = CountMessages();

    return (
        <NavLink to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-lg 
        ${isActive ? "bg-[rgb(39,42,50)]" : "hover:bg-gray-700"}`} onClick={onClick}>
            {icon && <img src={icon as string} alt={label} className="w-6 h-6" />}
            {label}
            {(countMessages.unreaded>0 && label == "Messages") && <p className="border border-[rgb(194,63,56)] bg-[rgb(194,63,56)] rounded-full w-5 h-5 aspect-square flex items-center justify-center text-[14px]"> {countMessages.unreaded} </p>}
        </NavLink>
    )
}

export default SidebarItem;