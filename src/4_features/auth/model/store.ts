import { create } from "zustand/react";
import type {User} from "../../../5_entity/model/user/type.ts";

interface Token {
    tokenValue: {accessToken: string};
    rememberMe: boolean;
}

interface LoginStore {
    token: Token | null;
    setToken: (token : Token) => void;
    logout: () => void;
}

export const useLoginStore = create<LoginStore>()(
    (set) => ({
        token: null,
        setToken: (token) => {
            set({ token });
            //console.log(token.tokenValue.accessToken, token.rememberMe);
            localStorage.setItem("Authorization", JSON.stringify(token.tokenValue.accessToken));
        },
        logout: () => set({ token: null }),
    }),
)

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    updateUser: (partial: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,

    setUser : (user) => {set({ user })},

    updateUser : (partial) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...partial } : partial as User,

        }))
}));
