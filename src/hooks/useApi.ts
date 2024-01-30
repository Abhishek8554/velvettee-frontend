import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { environment } from '../environments/environment';
import authStore from '../stores/Auth';

export interface IApiConfig {
    withAuth?: boolean; // Set this to true to send token as well
}

const useApi = (config?: IApiConfig) => {
    const axiosRef = axios.create({
        baseURL: environment.baseUrl,
        headers: {
            Accept: 'application/json',
        },
    });

    // Adding auth if required
    axiosRef.interceptors.request.use(
        (configData: InternalAxiosRequestConfig) => {
            const authStoreRef = authStore.getState();
            if (authStoreRef.token && config?.withAuth) {
                configData.headers.Authorization = `Bearer ${authStoreRef.token}`;
            }
            return configData;
        },
        (err) => {
            Promise.reject(err);
        }
    );

    axiosRef.interceptors.response.use(
        (value: AxiosResponse) => {
            return value;
        },
        (err) => {
            return Promise.reject(err?.response?.data);
        }
    );

    return axiosRef;
};

export default useApi;
