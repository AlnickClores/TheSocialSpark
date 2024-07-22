import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoutBtn } from "../../assets/icons/right-from-bracket-solid.svg";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <LogoutBtn
      onClick={handleLogout}
      className="w-5 h-5 text-[#bb86fc] fill-current"
    />
  );
};

export default LogoutButton;
