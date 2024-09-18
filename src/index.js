import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { BasketProvider } from "./context/BasketContext";
import { router } from "./routers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BasketProvider>
      <RouterProvider router={router} />
    </BasketProvider>
  </React.StrictMode>
);
