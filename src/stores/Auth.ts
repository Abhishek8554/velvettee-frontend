import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useWishlist from './Wishlist';
import useApi from '../hooks/useApi';
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
            const api = useApi({ withAuth: true });
            return {
                token: undefined,
                setToken: (token: string | undefined) => set({ token }),
                user: undefined,
                setUser: (user: IUserData | undefined) => {
                    const userService = useUserService.getState();
                    const wishlist = useWishlist.getState();
                    if (user?.products?.length) {
                        user.products.map((id: string) => {
                            api.get(`/products/getproductbyid/${id}`).then(
                                (response) => {
                                    wishlist.add(response.data);
                                }
                            );
                        });
                    }
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
