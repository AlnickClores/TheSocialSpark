import React from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons/icons";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return <>{icons.logout(handleLogout)}</>;
};

export default LogoutButton;
