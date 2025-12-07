import {useState} from "react";
import type { RegisterFormType } from "../../../5_entity/model/user/type.ts";
import {useNavigate} from "react-router-dom";
import {registerSchema} from "../lib/Validators.ts";
import {z} from "zod";
import {toast} from "react-toastify";
import axios from "axios";
import {baseUrl} from "../../../api.ts";

export const RegisterForm  = () => {
    const [selected, setSelected] = useState(0);
    const [ error, setError ] = useState({email: "", password: ""});

    const navigate = useNavigate();

    const [register, setRegister] = useState<RegisterFormType>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        file: null,
        role: "STUDENT"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(register);
        try{
            await registerSchema.parseAsync({email: register.email, password: register.password, confirmPassword: register.confirmPassword});
            const formData = new FormData();
            if (register.file) {
                formData.append("file", register.file);
            }
            formData.append(
                "data",
                new Blob([JSON.stringify({
                    firstName: register.firstName,
                    lastName: register.lastName,
                    email: register.email,
                    password: register.password,
                    confirmPassword: register.confirmPassword,
                    role: register.role
                })], { type: "application/json" })
            );

            await axios.post(`${baseUrl}/auth/register`, formData);

            setError({email: "", password: ""});
            navigate("/login");
        }catch(err) {
            //console.log(err.response.data.message);
            if(err instanceof z.ZodError){
                const er = err.issues;
                for(let i = 0; i<er.length; i++) {
                    if (er[i].path[0] == "email") setError(prev => ({ ...prev, email: er[i].message }));
                    if (er[i].path[0] == "password" || er[i].path[0] == "confirmPassword") setError(prev => ({ ...prev, password: er[i].message }));
                }
            }else{
                const error_message = axios.isAxiosError(err) ? err.response?.data?.message : "Unknown error";
                if(error_message.includes("unique")){
                    setError({email: "", password: ""});
                    toast.error("This email already exists", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }else{
                    setError({email: "", password: ""});
                    toast.error(axios.isAxiosError(err) ? err.response?.data?.message : "Unknown error", {
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
    }

    return (
        <div className={"rounded-xl md:bg-[rgb(21,22,40)] p-6"}>
            <h1 className={"px-10 text-center text-[30px]"}> Create Your QuizShare Account </h1>
            <p className={"px-[62px] text-center text-gray-300 text-[18px] mb-[48px]"}> Join students creating and sharing interactive quizzes. </p>
            <form className={"md:px-[64px]"} onSubmit={handleSubmit}>
                <input onChange={(e) => setRegister({...register, firstName: e.target.value})} placeholder={"First Name"} className={"border border-gray-500 rounded-lg p-3 mb-3 w-full"} />
                <input onChange={(e) => setRegister({...register, lastName: e.target.value})} placeholder={"Last Name"} className={"border border-gray-500 rounded-lg p-3 mb-3 w-full"} />
                <input onChange={(e) => setRegister({...register, email: e.target.value})} placeholder={"Email Address"} className={"border border-gray-500 rounded-lg p-3 mb-3 w-full"} />
                {error.email && <p className="text-red-400 text-sm mt-0 mb-3">{error.email}</p>}

                <input type={"password"} onChange={(e) => setRegister({...register, password: e.target.value})} placeholder={"Password"} className={"border border-gray-500 rounded-lg p-3 mb-3 w-full"} />
                <input type={"password"} onChange={(e) => setRegister({...register, confirmPassword: e.target.value})} placeholder={"Confirm Password"} className={`border border-gray-500 rounded-lg p-3 ${!error.password && "mb-[27px]"} w-full`} />
                {error.password && <p className="text-red-400 mt-2 mb-[27px] text-sm">{error.password}</p>}

                <input type={"file"} className="block w-full text-sm text-gray-300
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:text-sm file:font-semibold
               file:bg-[rgb(41,69,215)] file:text-white
               hover:file:bg-blue-700
               mb-3
               cursor-pointer" onChange={(e) => setRegister({...register, file: e.target.files?.[0] ?? null}) } />

                <p className={"pb-2"}> I am a: </p>
                <div className={"flex mb-6"}>
                    <p onClick={() => {setSelected(0); setRegister({...register, role: "STUDENT"})}} className={`max-w-[198px] w-full text-center ${selected==0 && "bg-[rgb(24,31,74)]"} font-sans py-2 rounded-lg`}> Student </p>
                    <p onClick={() => {setSelected(1); setRegister({...register, role: "TEACHER"}) }} className={`max-w-[198px] w-full text-center ${selected==1 && "bg-[rgb(24,31,74)]"} font-sans py-2 rounded-lg`}> Educator </p>
                </div>
                <button type={"submit"} className={"w-full bg-[rgb(41,69,215)] py-2 rounded-lg mb-7"}> Register </button>
            </form>
            <p className={"text-center"}> Already have an account? <span className={"text-blue-500 cursor-pointer"} onClick={() => navigate("/login")} > Log in </span> </p>
        </div>
    )
}

