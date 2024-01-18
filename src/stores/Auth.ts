import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useWishlist from './Wishlist';
import useApi from '../hooks/useApi';

export interface IUserData {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    address?: string;
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
