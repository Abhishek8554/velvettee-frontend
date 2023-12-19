import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Register from './screens/register/Register';
import Login from './screens/login/Login';
import LandingPage from './pages/landing-page/LandingPage';
import Snackbar from './components/snackbar/Snackbar';

function App() {
    return (
        <div className="app-container">
            <Snackbar />
            <Routes>
                <Route path="/" Component={LandingPage} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
            </Routes>
        </div>
    );
}

export default App;
