/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import LandingPage from '../screens/landing-page/LandingPage';
import SignedInLandingPage from '../screens/signed-in-landing-page/LandingPage';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import ForgotPassword from '../screens/ForgotPassword';
import ProductListing from '../screens/product-listing/ProductListing';
import ProductDetails from '../screens/product-details/ProductDetails';
import Cart from '../screens/cart/Cart';
import useAuthStore from '../stores/Auth';
import Wishlist from '../screens/wishlist/Wishlist';

const RedirectToHome = () => {
    const auth = useAuthStore();
    if (auth.token) {
        return <SignedInLandingPage />;
    }
    return <LandingPage />;
};

type RouteComponentProps = {
    Component: React.FC;
};

const NonLoginRoutes = ({ Component }: RouteComponentProps) => {
    const authStore = useAuthStore();
    if (authStore.token) {
        return <Navigate to={'/'} />;
    } else {
        return <Component />;
    }
};

const ProtectedRoute = ({ Component }: RouteComponentProps) => {
    const authStore = useAuthStore();
    if (!authStore.token) {
        return <Navigate to={'/'} />;
    } else {
        return <Component />;
    }
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RedirectToHome />,
    },
    {
        path: '/login',
        element: <NonLoginRoutes Component={Login} />,
    },
    {
        path: '/signup',
        element: <NonLoginRoutes Component={Register} />,
    },
    {
        path: 'forgot-password',
        element: <NonLoginRoutes Component={ForgotPassword} />,
    },
    {
        path: '/products/:search',
        element: <ProductListing />,
    },
    {
        path: '/product-detail/:id',
        element: <ProductDetails />,
    },
    {
        path: '/cart',
        element: <ProtectedRoute Component={Cart} />,
    },
    {
        path: '/wishlist',
        element: <ProtectedRoute Component={Wishlist} />,
    },

    {
        path: '*',
        element: <Navigate to="/" />,
    },
]);
