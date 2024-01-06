import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Register from './screens/register/Register';
import Login from './screens/login/Login';
import LandingPage from './screens/landing-page/LandingPage';
import SignedInLandingPage from './screens/signed-in-landing-page/LandingPage';
import ForgotPassword from './screens/ForgotPassword';
import { ThemeProvider, createTheme } from '@mui/material';
import Snackbar from './components/snackbar/Snackbar';
import FullPageLoader from './components/full-page-loader/FullPageLoader';
import useLoader from './stores/FullPageLoader';
// import ProtecredRoute from './components/ProtecredRoute';
import useAuthStore from './stores/Auth';
import ProductListing from './screens/product-listing/ProductListing';
import ProductDetails from './screens/product-details/ProductDetails';

function App() {
    const loaderService = useLoader();
    const auth = useAuthStore();
    const theme = createTheme({
        palette: {
            primary: {
                main: '#722ecc',
            },
            secondary: {
                main: '#eae9f2',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div
                className={
                    loaderService.loaderVisible
                        ? 'app-container overflow-hidden h-screen'
                        : 'app-container'
                }
            >
                <Snackbar />
                <FullPageLoader />
                <Routes>
                    {/* <Route element={<ProtecredRoute />}>
                        <Route path="/" element={<SignedInLandingPage />} />
                    </Route> */}
                    <Route
                        path="/"
                        Component={
                            auth.token ? SignedInLandingPage : LandingPage
                        }
                    />
                    <Route
                        path="/login"
                        element={auth.token ? <Navigate to={'/'} /> : <Login />}
                    />
                    <Route
                        path="/signup"
                        element={
                            auth.token ? <Navigate to={'/'} /> : <Register />
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            auth.token ? (
                                <Navigate to={'/'} />
                            ) : (
                                <ForgotPassword />
                            )
                        }
                    />
                    <Route
                        path="/products/:searchString"
                        Component={ProductListing}
                    />
                    <Route path="/product-details" Component={ProductDetails} />
                    <Route path="*" element={<Navigate to={'/'} />} />
                </Routes >
            </div >
        </ThemeProvider >
    );
}

export default App;
