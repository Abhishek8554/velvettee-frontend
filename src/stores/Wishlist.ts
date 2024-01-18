/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
import { create } from 'zustand';
import useApi from '../hooks/useApi';
import useAuthStore from './Auth';

interface IWishlist {
    wishlist: any[];
    add: (product: any) => void;
    remove: (id: string) => void;
}

const useWishlist = create<IWishlist>()((set) => {
    const api = useApi({ withAuth: true });
    return {
        wishlist: [],
        add: (product: any) =>
            set((state) => {
                const authStore = useAuthStore.getState();
                if (authStore.token && authStore.user) {
                    api.put('/products/addfavoriteproducts', {
                        userId: authStore.user._id,
                        newProductId: product._id,
                    });
                    return { ...state, wishlist: [...state.wishlist, product] };
                } else {
                    return { ...state };
                }
            }),
        remove: (id: string) =>
            set((state) => {
                const authStore = useAuthStore.getState();
                if (authStore.token && authStore.user) {
                    api.delete(
                        `/products/removeproduct/${authStore.user._id}/${id}`
                    );
                    return {
                        ...state,
                        wishlist: state.wishlist.filter((x) => x._id !== id),
                    };
                } else {
                    return { ...state };
                }
            }),
    };
});

export default useWishlist;
