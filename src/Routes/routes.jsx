import { createBrowserRouter } from "react-router";
import Home from "../Page/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Root from "../Page/Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children: [
      { index: true, Component: Home },
      { path: "/login", Component: Login },
      { path: "/registar", Component: Register },
    ],
  },
]);
export default router
