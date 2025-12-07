import React from "react";
import type {MouseEvent} from "react";
import {NavLink} from "react-router-dom";

interface Props {
    icon?: React.ReactNode;
    label: string;
    to: string;
    isActive: boolean;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}
const SidebarItem = ({icon, label, to, isActive, onClick}: Props) => {

    return (
        <NavLink to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-lg 
        ${isActive ? "bg-[rgb(39,42,50)]" : "hover:bg-gray-700"}`} onClick={onClick}>
            {icon && <img src={icon as string} alt={label} className="w-6 h-6" />}
            {label}
        </NavLink>
    )
}

export default SidebarItem;