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
import EditPost from "./pages/EditPost";
import PrivateRoute from "./components/PrivateRoute";
import Page404 from "./pages/404";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/homepage",
    element: <PrivateRoute element={Homepage} />,
  },
  {
    path: "/search",
    element: <PrivateRoute element={Search} />,
  },
  {
    path: "/create",
    element: <PrivateRoute element={Create} />,
  },
  {
    path: "/saved",
    element: <PrivateRoute element={Saved} />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={Profile} />,
  },
  {
    path: "/editprofile",
    element: <PrivateRoute element={EditProfile} />,
  },
  {
    path: "/editpost/:postId",
    element: <PrivateRoute element={EditPost} />,
  },
  {
    path: "/profile/:username",
    element: <PrivateRoute element={Profile} />,
  },
  {
    path: "*",
    element: <Page404 element={Page404} />,
  },
]);
