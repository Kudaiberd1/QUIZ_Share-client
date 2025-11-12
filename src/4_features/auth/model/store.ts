import { create } from "zustand/react";

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
            localStorage.setItem("RememberMe", token.rememberMe);
        },
        logout: () => set({ token: null }),
    }),
)

