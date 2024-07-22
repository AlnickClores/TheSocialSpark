import React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as Home } from "../assets/icons/house-solid.svg";
import { ReactComponent as Bookmark } from "../assets/icons/bookmark-solid.svg";
import { ReactComponent as Search } from "../assets/icons/magnifying-glass-solid.svg";
import { ReactComponent as Create } from "../assets/icons/plus-solid.svg";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";
import LogoutButton from "./buttons/Logout";
import { fetchUserData } from "../utils/api";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setProfileImage(data.image);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between bg-[#121212] px-3 py-4 sticky top-0">
        <h1 className="text-lg font-bold">The SocialSpark</h1>
        {currentPage === "/profile" ? (
          <LogoutButton />
        ) : (
          <Link to="/profile">
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile image"
                className="w-5 h-5 rounded-full"
              />
            ) : (
              <User className="w-5 h-5 text-[#bb86fc] fill-current" />
            )}
          </Link>
        )}
      </div>
      <div className="flex w-full justify-between bg-[#121212] bottom-0 py-3 rounded-t-2xl fixed md:hidden">
        <div className="flex flex-col justify-center items-center">
          <Link to="/homepage">
            {" "}
            <Home className="w-16 h-6 text-[#bb86fc] fill-current" />
          </Link>
          <p className="text-sm">Home</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to="/search">
            {" "}
            <Search className="w-16 h-6 text-[#bb86fc] fill-current" />
          </Link>
          <p className="text-sm">Search</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to="/create">
            <Create className="w-16 h-6 text-[#bb86fc] fill-current" />{" "}
          </Link>
          <p className="text-sm">Create</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to="/saved">
            {" "}
            <Bookmark className="w-16 h-6 text-[#bb86fc] fill-current" />
          </Link>
          <p className="text-sm">Saved</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
