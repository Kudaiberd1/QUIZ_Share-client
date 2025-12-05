import LoginForm from "../../4_features/auth/ui/LoginForm.tsx";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("Authorization");
        if(token){
            const decoded: any = jwtDecode(token);
            const rememberMe = localStorage.getItem("RememberMe");
            const now = Date.now() / 1000;

            if(rememberMe == "true"){
                decoded.exp += 30 * 24 * 60 * 60;
            }

            if (decoded.exp && decoded.exp > now) {
                navigate("/");
            }
        }

    }, []);

    return(
        <div className={"max-w-xl justify-center mx-auto mt-20"}>
            <LoginForm />
        </div>
    )
}

export default Login;