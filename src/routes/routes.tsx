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

const redirectToHome = (): JSX.Element => {
    const auth = JSON.parse(localStorage.getItem('ve-auth-storage') as string);
    if (auth.state.token) {
        return <SignedInLandingPage />;
    }
    return <LandingPage />;
};

const onlyNonLoginRoutes = (Component: React.FC): JSX.Element => {
    const auth = JSON.parse(localStorage.getItem('ve-auth-storage') as string);
    if (auth.state.token) {
        return redirectToHome();
    }
    return <Component />;
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: redirectToHome(),
    },
    {
        path: '/login',
        element: onlyNonLoginRoutes(Login),
    },
    {
        path: '/signup',
        element: onlyNonLoginRoutes(Register),
    },
    {
        path: 'forgot-password',
        element: onlyNonLoginRoutes(ForgotPassword),
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
        path: '*',
        element: <Navigate to="/" />,
    },
]);
