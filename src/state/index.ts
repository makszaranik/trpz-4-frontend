import {create} from "zustand/react";

interface UserState {
    token: string | null;
    setToken: (token: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    token: null,
    setToken: (token) => set({token})
}))