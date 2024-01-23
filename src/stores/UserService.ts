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
    };
});

export default useUserService;
