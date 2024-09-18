import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage";
import MainCourse from "./pages/menu/MainCourse";
import Drinks from "./pages/menu/Drinks";
import Desserts from "./pages/menu/Desserts";
import Burgers from "./pages/menu/Burgers";
import Coffee from "./pages/menu/Coffee";
import Cakes from "./pages/menu/Cakes";
import BasketPage from "./pages/BasketPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import OrderDetailPage from "./pages/OrderDetailPage";

export const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/main-course", element: <MainCourse /> },
  { path: "/drinks", element: <Drinks /> },
  { path: "/desserts", element: <Desserts /> },
  { path: "/cakes", element: <Desserts /> },
  { path: "/burgers", element: <Burgers /> },
  { path: "/basket", element: <BasketPage /> },
  { path: "/cakess", element: <Cakes /> },
  { path: "/coffee", element: <Coffee /> },
  { path: "/item-detail", element: <ItemDetailPage /> },
  { path: "/order-detail", element: <OrderDetailPage /> },
]);
