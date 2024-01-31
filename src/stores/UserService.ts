/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
import { create } from 'zustand';
import useApi from '../hooks/useApi';
import useAuthStore, { IUserData } from './Auth';
import ApiUrls from '../constants/ApiUrls';
import { AxiosResponse } from 'axios';

interface IUser {
    userData: IUserData | undefined;
    setUserData: (userData: IUserData | undefined) => void;
    login: (
        email: string,
        password: string,
        successCallback: (response: AxiosResponse) => void,
        errorCallback: (error: any) => void
    ) => void;
    register: (
        email: string,
        password: string,
        successCallback: (response: AxiosResponse) => void,
        errorCallback: (error: any) => void
    ) => void;
    loginWithGoogle: () => void;
    checkGoogleLogin: (
        successCallback: (response: AxiosResponse) => void,
        errorCallback: (error: any) => void
    ) => void;
    resetPassword: (
        email: string,
        password: string,
        successCallback: (response: AxiosResponse) => void,
        errorCallback: (error: any) => void
    ) => void;
    addAddress: (
        address: any,
        successCallback: (response: AxiosResponse) => void,
        errorCallback: (error: any) => void
    ) => void;
    updateAddress: (
        updatedAddress: any,
        id: string,
        successCallback: (response: AxiosResponse) => void,
        errorCallback: (error: any) => void
    ) => void;
    fetchAddresses: (
        userId: string,
        successCallBack: (response: AxiosResponse) => void,
        errorCallback: (error: any) => void
    ) => void;
    removeAddress: (
        id: string,
        successCallBack: (response: AxiosResponse) => void,
        errorCallback: (err: any) => void
    ) => void;
    saveCard: (
        cardDetails: any,
        successCallBack: (response: AxiosResponse) => void,
        errorCallback: (err: any) => void
    ) => void;
    placeOrderFromCart: (
        successCallback: (response: AxiosResponse) => void,
        errorCallback: (err: any) => void
    ) => void;
    logout: () => void;
}

const useUserService = create<IUser>()((set) => {
    const api = useApi({ withAuth: true });
    return {
        userData: undefined,
        setUserData: (userData) =>
            set((state) => {
                return { ...state, userData };
            }),
        login: (email, password, successCallback, errorCallback) => {
            api.post(ApiUrls.LOGIN, { email, password })
                .then((response) => {
                    useAuthStore.getState().setToken(response.data.token);
                    useAuthStore.getState().setUser(response.data);
                    successCallback(response);
                })
                .catch((error) => {
                    errorCallback(error);
                });
        },
        register: (email, password, successCallback, errorCallback) => {
            api.post(ApiUrls.REGISTER, { email, password })
                .then((response) => {
                    useAuthStore.getState().setToken(response.data.token);
                    useAuthStore.getState().setUser(response.data);
                    successCallback(response);
                })
                .catch((error) => {
                    errorCallback(error);
                });
        },
        loginWithGoogle: () => {
            window.open(ApiUrls.GOOGLE_LOGIN, '_self');
        },
        checkGoogleLogin: async (successCallback, errorCallback) => {
            try {
                const response = await api.get(ApiUrls.GOOGLE_LOGIN_SUCCESS, {
                    withCredentials: true,
                });
                useAuthStore.getState().setToken(response.data.user.token);
                useAuthStore.getState().setUser(response.data.user);
                successCallback(response);
            } catch (error) {
                errorCallback(error);
            }
        },
        resetPassword: (email, password, successCallback, errorCallback) => {
            api.post(ApiUrls.RESET_PASSWORD, { email, password })
                .then((response) => {
                    successCallback(response);
                })
                .catch((error) => {
                    errorCallback(error);
                });
        },
        logout: () => {
            const authRef = useAuthStore.getState();
            if (authRef.user?.googleId) {
                window.open(ApiUrls.GOOGLE_LOGOUT, '_self');
            }
            authRef.setToken('');
            authRef.setUser(undefined);
        },
        addAddress: (address, successCallback, errorCallback) => {
            const authRef = useAuthStore.getState();
            const formattedAddress = {
                address: address.address,
                phone: address.mobileNumber,
                pincode: address.pinCode,
                name: address.name,
                Town: address.town,
                City: address.city,
                State: address.state,
                IsHome: address.saveAs === 'Home' ? true : false,
                IsWork: address.saveAs === 'Work' ? true : false,
                IsDefault: address.markDefault,
            };
            api.put(
                ApiUrls.ADD_ADDRESS.replace(
                    '{userId}',
                    authRef.user?._id as string
                ),
                { addresses: [formattedAddress] }
            )
                .then((response) => {
                    successCallback(response);
                })
                .catch(errorCallback);
        },
        fetchAddresses: (userId, successCallback, errorCallback) => {
            api.get(ApiUrls.GET_ADDRESS.replace('{userId}', userId))
                .then(successCallback)
                .catch(errorCallback);
        },
        removeAddress(id, successCallBack, errorCallback) {
            const authRef = useAuthStore.getState();
            api.delete(
                ApiUrls.DELETE_ADDRESS.replace(
                    '{userId}',
                    authRef.user?._id as string
                ).replace('{addressId}', id)
            )
                .then(successCallBack)
                .catch(errorCallback);
        },
        updateAddress(updatedAddress, id, successCallback, errorCallback) {
            const authRef = useAuthStore.getState();
            const formattedAddress = {
                address: updatedAddress.address,
                phone: updatedAddress.mobileNumber,
                pincode: updatedAddress.pinCode,
                name: updatedAddress.name,
                Town: updatedAddress.town,
                City: updatedAddress.city,
                State: updatedAddress.state,
                IsHome: updatedAddress.saveAs === 'Home' ? true : false,
                IsWork: updatedAddress.saveAs === 'Work' ? true : false,
                IsDefault: updatedAddress.markDefault,
                _id: id,
            };
            api.put(
                ApiUrls.UPDATE_ADDRESS.replace(
                    '{userId}',
                    authRef.user?._id as string
                ),
                { addresses: [formattedAddress] }
            )
                .then(successCallback)
                .catch(errorCallback);
        },
        // TODO: Integrate razor pay here
        saveCard(cardDetails, successCallBack, errorCallback) {
            const authRef = useAuthStore.getState();
            console.log(cardDetails);
            const formattedCardData = {
                cardNumber: cardDetails.cardNumber,
                name: cardDetails.name,
                expiryMonth: cardDetails.month,
                expiryYear: cardDetails.year,
                cvv: cardDetails.cvv,
            };
            api.post(
                ApiUrls.ADD_CARD.replace(
                    '{userId}',
                    authRef.user?._id as string
                ),
                formattedCardData
            )
                .then(successCallBack)
                .catch(errorCallback);
        },
        placeOrderFromCart(successCallback, errorCallback) {
            const authRef = useAuthStore.getState();
            api.post(ApiUrls.PLACEORDER, {
                userId: authRef.user?._id as string,
            })
                .then(successCallback)
                .catch(errorCallback);
        },
    };
});

export default useUserService;
