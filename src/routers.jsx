import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Create from "./pages/Create";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/search", element: <Search /> },
  { path: "/create", element: <Create /> },
  { path: "/saved", element: <Saved /> },
  { path: "/profile", element: <Profile /> },
  { path: "/editprofile", element: <EditProfile /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
