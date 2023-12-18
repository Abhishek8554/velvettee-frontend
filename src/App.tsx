import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Register from "./screens/Register";
import Login from "./screens/Login";
import LandingPage from "./pages/landing-page/LandingPage";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </div>
  );
}

export default App;
