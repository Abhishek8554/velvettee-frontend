import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Register from './screens/register/Register';
import Login from './screens/login/Login';
import LandingPage from './pages/landing-page/LandingPage';
import ForgotPassword from './screens/ForgotPassword';
import { ThemeProvider, createTheme } from '@mui/material';
import Snackbar from './components/snackbar/Snackbar';

function App() {
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
            <div className="app-container">
                <Snackbar />
                <Routes>
                    <Route path="/" Component={LandingPage} />
                    <Route path="/login" Component={Login} />
                    <Route path="/signup" Component={Register} />
                    <Route path="/forgot-password" Component={ForgotPassword} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
