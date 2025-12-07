import {useEffect, useState} from "react";
import api from "../../6_shared/api/axiosInstance.ts";
import {useUserStore} from "../../4_features/auth/model/store.ts";
import type {User} from "../../5_entity/model/user/type.ts";
import {useNavigate} from "react-router-dom";


const UserMenu = () => {
    const { setUser } = useUserStore();
    const [profile, setProfile] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/auth/me").then(
            (res) => {setUser(res.data); setProfile(res.data)}
        ).catch(() => navigate("/login"));
    },[]);

    return (
        <>
            <img
                className={"rounded-full h-[36px] w-[36px]"}
                src={
                    profile?.imageUrl instanceof File
                        ? URL.createObjectURL(profile.imageUrl)
                        : profile?.imageUrl ??
                        `https://avatar.iran.liara.run/username?username=${profile?.firstName}+${profile?.lastName}`
                }
            />
        </>
    )
}

export default UserMenu;