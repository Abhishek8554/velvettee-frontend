import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../screens/Login";
import Register from "../screens/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "log-in",
        Component: Login
        default: true
      },
      {
        path: "register",
        element: Register
      },
    ],
  },
]);
