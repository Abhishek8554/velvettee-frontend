/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
import { create } from 'zustand';
import useApi from '../hooks/useApi';
import useAuthStore from './Auth';
import useSnackBar from './Snackbar';
import { SnackBarTypes } from '../enums/SnackBarTypes';
import ApiUrls from '../constants/ApiUrls';
import { AxiosResponse } from 'axios';

interface ICart {
    cart: { product: any; size: number; color: string; qty: number }[];
    add: (product: any, size: number, color: string, qty: number) => void;
    remove: (id: string, successCallBack?: () => void) => void;
    getCartDetails: (
        userId: string,
        successCallBack: (response: AxiosResponse) => void,
        errorCallback: (error: any) => void
    ) => void;
    getSimilarItems: (
        productIds: string[],
        successCallBack: (response: AxiosResponse) => void,
        errorCallback: (error: any) => void
    ) => void;
}

const useCart = create<ICart>()((set) => {
    const api = useApi({ withAuth: true });
    return {
        cart: [],
        add: (product: any, size: number, color: string, qty: number) =>
            set((state) => {
                const snackBarService = useSnackBar.getState();
                const authStore = useAuthStore.getState();
                if (authStore.token && authStore.user) {
                    api.post(`/add-to-cart/${product._id}`, {
                        userId: authStore.user._id,
                        size,
                        color,
                        quantity: qty,
                    });
                    return {
                        ...state,
                        cart: [...state.cart, { product, size, color, qty }],
                    };
                } else {
                    snackBarService.open(
                        'You are not Logged in',
                        SnackBarTypes.INFO
                    );
                    return { ...state };
                }
            }),
        remove: (id: string, successCallBack) =>
            set((state) => {
                const authStore = useAuthStore.getState();
                const snackBarService = useSnackBar.getState();
                if (authStore.token && authStore.user) {
                    api.delete(
                        `/remove-from-cart/${authStore.user._id}/remove/${id}`
                    ).then(successCallBack);
                    return {
                        ...state,
                        cart: state.cart.filter((x) => x.product._id !== id),
                    };
                } else {
                    snackBarService.open(
                        'You are not Logged in',
                        SnackBarTypes.INFO
                    );
                    return { ...state };
                }
            }),
        getCartDetails: (userId, successCallBack, errorCallback) => {
            api.get(ApiUrls.CART_DETAILS.replace('{userId}', userId))
                .then(successCallBack)
                .catch(errorCallback);
        },
        getSimilarItems(productIds: string[], successCallBack, errorCallback) {
            api.post(ApiUrls.CART_SIMILAR_PRODUCTS, {
                productIds,
            })
                .then(successCallBack)
                .catch(errorCallback);
        },
    };
});

export default useCart;
