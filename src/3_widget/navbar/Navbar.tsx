import notification from "../../6_shared/ui/icons/notification.svg"
import UserMenu from "./UserMenu.tsx";

const Navbar = () => {
    return (
        <div className={"flex items-center justify-end py-[15px] pr-[32px] space-x-3"}>
            <img src={notification} />
            <UserMenu />
        </div>
    )
}

export default Navbar;
