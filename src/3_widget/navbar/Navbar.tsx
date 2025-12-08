import notification from "../../6_shared/ui/icons/notification.svg"
import UserMenu from "./UserMenu.tsx";
import Badge from '@mui/material/Badge';
import {CountMessages} from "../../4_features/message-card/lib/filterMessage.ts";
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const countMessages = CountMessages();
    const navigate = useNavigate();

    return (
        <div className={"flex-1 flex flex-col"}>
            <div className={"fixed top-0 left-0 w-full z-50 md:left-[304px] md:w-[calc(100%-304px)] ms-16 flex items-center justify-end py-[15px] pr-[85px] space-x-3"}>
                {countMessages.unreaded>0 ?
                    <Badge badgeContent={1} color="error" className={"mr-4"}>
                        <img src={notification} onClick={() => navigate("/messages")} className={"cursor-pointer"} />
                    </Badge>
                    :
                    <img src={notification} onClick={() => navigate("/messages")} className={"cursor-pointer"} />
                }
                <UserMenu />
            </div>
        </div>
    )

}

export default Navbar;
