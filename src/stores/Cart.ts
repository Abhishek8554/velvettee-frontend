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
    cart: {
        product: any;
        size: number;
        color: string;
        qty: number;
        _id: string;
    }[];

    initCartState: (
        items: {
            product: any;
            size: number;
            color: string;
            qty: number;
            id: string;
        }[]
    ) => void;

    add: (product: any, size: number, color: string, qty: number) => void;
    remove: (
        id: string,
        successCallBack?: (response: AxiosResponse) => void
    ) => void;
    updateCartItem: (
        id: string,
        updates: { color?: string; size: number; quantity: number },
        successCallBack: (response: AxiosResponse) => void,
        errorCallback: (err: any) => void
    ) => void;
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

    // Utitlity Private methods only
    _addToCart: (
        product: any,
        size: number,
        color: string,
        qty: number,
        id: string
    ) => void;
    _removeFromCart: (id: string) => void;
    _emptyCart: () => void;
    _updateItem: (
        id: string,
        updates: {
            size: number;
            color?: string;
            qty: number;
        }
    ) => void;
}

const useCart = create<ICart>()((set) => {
    const api = useApi({ withAuth: true });
    return {
        cart: [],
        initCartState: (items) => {
            const _this = useCart.getState();
            _this._emptyCart();
            items.map((item) => {
                _this._addToCart(
                    item.product,
                    item.size,
                    item.color,
                    item.qty,
                    item.id
                );
            });
        },
        add: (product: any, size: number, color: string, qty: number) =>
            set((state) => {
                const snackBarService = useSnackBar.getState();
                const authStore = useAuthStore.getState();
                if (authStore.token && authStore.user) {
                    api.post(
                        ApiUrls.ADD_TO_CART.replace('{productId}', product._id),
                        {
                            userId: authStore.user._id,
                            size,
                            color,
                            quantity: qty,
                        }
                    )
                        .then((respone) => {
                            const _this = useCart.getState();
                            _this._addToCart(
                                product,
                                size,
                                color,
                                qty,
                                respone.data.cartItem?._id
                            );
                        })
                        .catch((err: any) => {
                            snackBarService.open(
                                err.message,
                                SnackBarTypes.DANGER
                            );
                        });
                    return state;
                } else {
                    snackBarService.open(
                        'You are not Logged in',
                        SnackBarTypes.INFO
                    );
                    return state;
                }
            }),
        remove: (id: string, successCallBack) =>
            set((state) => {
                const authStore = useAuthStore.getState();
                const snackBarService = useSnackBar.getState();
                if (authStore.token && authStore.user) {
                    api.delete(
                        ApiUrls.REMOVE_FROM_CART.replace(
                            '{userId}',
                            authStore.user._id
                        ).replace('{cartItemId}', id)
                    ).then((response) => {
                        const _this = useCart.getState();
                        _this._removeFromCart(id);
                        if (successCallBack) {
                            successCallBack(response);
                        }
                    });
                    return state;
                } else {
                    snackBarService.open(
                        'You are not Logged in',
                        SnackBarTypes.INFO
                    );
                    return { ...state };
                }
            }),
        updateCartItem(id, updates, successCallBack, errorCallback) {
            const authRef = useAuthStore.getState();
            const _this = useCart.getState();
            api.put(ApiUrls.CART_UPDATE_PRODUCTS, {
                userId: authRef.user?._id,
                cartId: id,
                updates: updates,
            })
                .then((response) => {
                    _this._updateItem(id, {
                        ...updates,
                        qty: updates?.quantity,
                    });
                    successCallBack(response);
                })
                .catch(errorCallback);
        },
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
        _addToCart(product, size, color, qty, id) {
            return set((state) => {
                return {
                    ...state,
                    cart: [
                        ...state.cart,
                        { product, size, color, qty, _id: id },
                    ],
                };
            });
        },
        _emptyCart() {
            return set((state) => {
                return {
                    ...state,
                    cart: [],
                };
            });
        },
        _removeFromCart(id) {
            return set((state) => {
                return {
                    ...state,
                    cart: state.cart.filter((x) => x._id !== id),
                };
            });
        },
        _updateItem(id, updates) {
            return set((state) => {
                const foundItem = state.cart.find((x) => x._id === id);
                if (foundItem) {
                    const index = state.cart.indexOf(foundItem);
                    const updatedItem = { ...foundItem, ...updates };
                    // Mutating state here
                    state.cart.splice(index, 1, updatedItem);
                    return state;
                }
                return state;
            });
        },
    };
});

export default useCart;

export const findItemInCart = (
    cartItemId?: string,
    config?: { color: string; size?: number; productId: string }
) => {
    const cartRef = useCart.getState();
    if (cartItemId) {
        return cartRef.cart.find((x) => x._id === cartItemId);
    }
    if (!cartItemId && config) {
        return cartRef.cart.find((x) => {
            if (config.size) {
                if (
                    x.color === config.color &&
                    x.size === config.size &&
                    x.product?._id === config.productId
                ) {
                    return true;
                }
            } else {
                if (
                    x.color === config.color &&
                    x.product?._id === config.productId
                ) {
                    return true;
                }
            }
        });
    }
    return undefined;
};
