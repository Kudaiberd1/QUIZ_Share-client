import {useState} from "react";
import {LoginApi} from "../model/api.ts";
import {useLoginStore} from "../model/store.ts";
import {useNavigate} from "react-router-dom";
import {loginSchema} from "../lib/Validators.ts";
import {z} from "zod";
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [login, setLogin] = useState({email: "", password: "", rememberMe: false});
    const navigate = useNavigate();
    const [ error, setError ] = useState({email: "", password: ""});

    const { setToken } = useLoginStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await loginSchema.parseAsync({email: login.email, password: login.password});
            const token = await LoginApi(login.email, login.password);
            setToken({tokenValue: {accessToken: token}, rememberMe: login.rememberMe});
            setError({email: "", password: ""});
            toast.success("Login successful!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            navigate("/");
        }catch(err){
            if(err instanceof z.ZodError){
                const er = err.issues;
                for(let i = 0; i<er.length; i++) {
                    if (er[i].path[0] == "email") setError(prev => ({ ...prev, email: er[i].message }));
                    if (er[i].path[0] == "password") setError(prev => ({ ...prev, password: er[i].message }));
                }
            }else{
                setError({email: "", password: ""});
                toast.error("Invalid email or password", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    }

    return(
        <div className={"rounded-xl md:bg-[rgb(21,22,40)] p-6"} onSubmit={handleSubmit}>
            <h1 className={"px-10 text-center text-[30px]"}> Welcome Back </h1>
            <p className={"px-[62px] text-center text-gray-300 text-[18px] mb-[48px]"}> Log in to continue your learning journey. </p>
            <form className={"md:px-[64px]"}>
                <input onChange={(e) => setLogin({...login, email: e.target.value})} placeholder={"Email Address"} className={"border border-gray-500 rounded-lg mb-3 p-3 w-full"} />
                {error.email && <p className="text-red-400 text-sm mt-0 mb-3">{error.email}</p>}

                <input type={"password"} onChange={(e) => setLogin({...login, password: e.target.value})} placeholder={"Password"} className={"border border-gray-500 rounded-lg p-3 w-full"} />
                {error.password && <p className="text-red-400 mt-2 mb-3 text-sm">{error.password}</p>}

                <div className={"flex justify-between pt-5"}>
                    <div>
                        <input id={"ch1"} type={"checkbox"} onChange={() => { setLogin({...login, rememberMe: !login.rememberMe }); }} />
                        <label> Remember me </label>
                    </div>
                    <p className={"text-blue-500 pb-8"}> Forgot Password </p>
                </div>
                <button type={"submit"} className={"w-full bg-[rgb(41,69,215)] py-2 rounded-lg mb-7"}> Log in </button>
            </form>
            <p className={"text-center"}> Don't have an account? <span className={"text-blue-500 cursor-pointer"} onClick={() => navigate("/register")}> Register </span> </p>
        </div>
    )
}

export default LoginForm;