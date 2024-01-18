/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
import { create } from 'zustand';
import useApi from '../hooks/useApi';
import useAuthStore from './Auth';

interface ICart {
    cart: any[];
    add: (product: any) => void;
    remove: (id: string) => void;
}

const useCart = create<ICart>()((set) => {
    const api = useApi({ withAuth: true });
    return {
        cart: [],
        add: (product: any) =>
            set((state) => {
                const authStore = useAuthStore.getState();
                if (authStore.token && authStore.user) {
                    api.post(`/add-to-cart/${product._id}`, {
                        userId: authStore.user._id,
                    });
                    return { ...state, cart: [...state.cart, product] };
                } else {
                    return { ...state };
                }
            }),
        remove: (id: string) =>
            set((state) => {
                const authStore = useAuthStore.getState();
                if (authStore.token && authStore.user) {
                    api.delete(
                        `/remove-from-cart/${authStore.user._id}/remove/${id}`
                    );
                    return {
                        ...state,
                        cart: state.cart.filter((x) => x._id !== id),
                    };
                } else {
                    return { ...state };
                }
            }),
    };
});

export default useCart;
