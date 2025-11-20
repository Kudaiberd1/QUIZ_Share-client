import {Navigate} from "react-router-dom";

const LogOut = () => {
    localStorage.clear();

    return (
        <>
            <Navigate to={"/login"} />
        </>
    )
}

export default LogOut;