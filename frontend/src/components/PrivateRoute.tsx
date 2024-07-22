import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ComponentType<any>;
  [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Element,
  ...rest
}) => {
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
