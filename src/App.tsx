import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Register from "./screens/Register";
import Login from "./screens/Login";
import LandingPage from "./pages/landing-page/LandingPage";
import ForgotPassword from "./screens/ForgotPassword";
import { ThemeProvider, createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#722ecc",
      },
      secondary: {
        main: "#eae9f2",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/forgot-password" Component={ForgotPassword} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
