import './App.scss';
import { ThemeProvider, createTheme } from '@mui/material';
import Snackbar from './components/snackbar/Snackbar';
import FullPageLoader from './components/full-page-loader/FullPageLoader';
import useLoader from './stores/FullPageLoader';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';

function App() {
    const loaderService = useLoader();
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
        <>
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
                    <RouterProvider router={router} />
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;
