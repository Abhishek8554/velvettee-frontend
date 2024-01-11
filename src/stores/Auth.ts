import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IUserData {
    first_name: string;
    last_name: string;
    email: string;
    address?: string;
    phone?: number;
    googleId?: string;
    profileImage?: string;
}
interface AuthState {
    token: string | undefined;
    user: IUserData | undefined;
    setToken: (token: string) => void;
    setUser: (user: IUserData) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: undefined,
            setToken: (token: string | undefined) => set({ token }),
            user: undefined,
            setUser: (user: IUserData | undefined) =>
                set({
                    user,
                }),
        }),
        {
            name: 've-auth-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
