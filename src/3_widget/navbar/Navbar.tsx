import notification from "../../6_shared/ui/icons/notification.svg"
import UserMenu from "./UserMenu.tsx";

const Navbar = () => {
    return (
        <div className={"flex-1 flex flex-col"}>
            <div className={"fixed top-0 left-0 w-full z-50 md:left-[304px] md:w-[calc(100%-304px)] ms-16 flex items-center justify-end py-[15px] pr-[85px] space-x-3"}>
                <img src={notification} />
                <UserMenu />
            </div>
        </div>
    )

}

export default Navbar;
