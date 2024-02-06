/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
import { create } from 'zustand';
import useApi from '../hooks/useApi';
import useAuthStore from './Auth';
import useSnackBar from './Snackbar';
import { SnackBarTypes } from '../enums/SnackBarTypes';
import { AxiosResponse } from 'axios';
import ApiUrls from '../constants/ApiUrls';

interface IWishlist {
    wishlist: {
        product: any;
        color: string;
        _id: string;
    }[];

    initWishlistState: (
        items: {
            product: any;
            color: string;
            id: string;
        }[]
    ) => void;

    add: (product: any, color: string) => void;
    remove: (
        id: string,
        successCallBack?: (response: AxiosResponse) => void
    ) => void;

    getWishlistDetails: (
        successCallBack: (response: AxiosResponse) => void,
        errorCallback: (error: any) => void
    ) => void;

    // Utitlity Private methods only
    _addToWishlist: (product: any, color: string, id: string) => void;
    _removeFromWishlist: (id: string) => void;
    _emptyWishlist: () => void;
}

const useWishlist = create<IWishlist>()((set) => {
    const api = useApi({ withAuth: true });
    return {
        wishlist: [],
        initWishlistState: (items) => {
            const _this = useWishlist.getState();
            _this._emptyWishlist();
            items.map((item) => {
                _this._addToWishlist(item.product, item.color, item.id);
            });
        },
        add: (product: any, color: string) =>
            set((state) => {
                const snackBarService = useSnackBar.getState();
                const authStore = useAuthStore.getState();
                if (authStore.token && authStore.user) {
                    api.post(
                        ApiUrls.ADD_TO_WISHLIST.replace(
                            '{productId}',
                            product._id
                        ),
                        {
                            userId: authStore.user._id,
                            color,
                        }
                    )
                        .then((respone) => {
                            const _this = useWishlist.getState();
                            _this._addToWishlist(
                                product,
                                color,
                                respone.data.wishItem?._id
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
                        ApiUrls.DELETE_WISHLIST_ITEM.replace(
                            '{userId}',
                            authStore.user._id
                        ).replace('{wishlistId}', id)
                    ).then((response) => {
                        const _this = useWishlist.getState();
                        _this._removeFromWishlist(id);
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

        getWishlistDetails: (successCallBack, errorCallback) => {
            const authRef = useAuthStore.getState();
            console.log(2);
            api.get(
                ApiUrls.GET_WISHLIST_DETAILS.replace(
                    '{userId}',
                    authRef.user?._id as string
                )
            )
                .then(successCallBack)
                .catch(errorCallback);
        },
        _addToWishlist(product, color, id) {
            return set((state) => {
                return {
                    ...state,
                    wishlist: [...state.wishlist, { product, color, _id: id }],
                };
            });
        },
        _emptyWishlist() {
            return set((state) => {
                return {
                    ...state,
                    wishlist: [],
                };
            });
        },
        _removeFromWishlist(id) {
            return set((state) => {
                return {
                    ...state,
                    wishlist: state.wishlist.filter((x) => x._id !== id),
                };
            });
        },
    };
});

export default useWishlist;

export const findItemInWishlist = (
    wishlistItemId?: string,
    config?: { color: string; productId: string }
) => {
    const wishlistRef = useWishlist.getState();
    if (wishlistItemId) {
        return wishlistRef.wishlist.find((x) => x._id === wishlistItemId);
    }
    if (!wishlistItemId && config) {
        return wishlistRef.wishlist.find((x) => {
            if (config.color) {
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
