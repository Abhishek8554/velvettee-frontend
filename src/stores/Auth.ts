import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useUserService from './UserService';

export interface IUserAddress {
    address: string;
    phone: number;
    pincode: number;
    town: string;
    city: string;
    name: string;
    state: string;
    isHome: boolean;
    isWork: boolean;
    isDefault: boolean;
}
export interface IUserData {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    address?: IUserAddress[];
    phone?: number;
    googleId?: string;
    profileImage?: string;
    products: string[];
}
interface AuthState {
    token: string | undefined;
    user: IUserData | undefined;
    setToken: (token: string) => void;
    setUser: (user: IUserData | undefined) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => {
            return {
                token: undefined,
                setToken: (token: string | undefined) => set({ token }),
                user: undefined,
                setUser: (user: IUserData | undefined) => {
                    const userService = useUserService.getState();

                    userService.setUserData(user);
                    return set({
                        user,
                    });
                },
            };
        },
        {
            name: 've-auth-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
