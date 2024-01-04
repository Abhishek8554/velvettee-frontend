/* eslint-disable @typescript-eslint/no-explicit-any */

import useAuthStore from '../stores/Auth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtecredRoute = () => {
    const authService = useAuthStore();
    const isLogin = authService.token ? true : false;
    // isLogin = authService.token ? true : false;
    return isLogin ? <Outlet /> : <Navigate to={'/'} />;
};

export default ProtecredRoute;
