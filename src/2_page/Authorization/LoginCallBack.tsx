import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useLoginStore} from "../../4_features/auth/model/store.ts";

const LoginCallBack = () => {
    const navigate = useNavigate();
    const { setToken } = useLoginStore();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        console.log("token iss", token);

        if (token) {
            setToken({tokenValue: {accessToken: token}, rememberMe: false});
        }
        navigate("/");
    },[])

    return <p>Processing login...</p>;
}

export default LoginCallBack;