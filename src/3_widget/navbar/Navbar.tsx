import notification from "../../6_shared/ui/icons/notification.svg"

const Navbar = () => {
    return (
        <div className={"flex items-center justify-end p-1 space-x-3"}>
            <img src={notification} />

        </div>
    )
}

export default Navbar;
