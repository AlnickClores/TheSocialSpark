import React, { useState, useEffect } from "react";
import { icons } from "../assets/icons/icons";
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

  const isActive = (path: string) => currentPage === path;

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
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <>{icons.userImage}</>
            )}
          </Link>
        )}
      </div>

      <div className="flex w-full justify-around bg-[#121212] bottom-0 py-3 rounded-t-2xl fixed md:hidden">
        <div
          className={`flex flex-col justify-center items-center py-1 px-3 ${
            isActive("/homepage")
              ? "bg-gray-800 text-[#bb86fc] rounded-lg font-semibold"
              : "text-gray-400"
          }  `}
        >
          <Link to="/homepage">{icons.home}</Link>
          <p className="text-sm">Home</p>
        </div>

        <div
          className={`flex flex-col justify-center items-center py-1 px-3 ${
            isActive("/search")
              ? "bg-gray-800 text-[#bb86fc] rounded-lg font-semibold"
              : "text-gray-400"
          }  `}
        >
          <Link to="/search">{icons.search}</Link>
          <p className="text-sm">Search</p>
        </div>

        <div
          className={`flex flex-col justify-center items-center py-1 px-3 ${
            isActive("/create")
              ? "bg-gray-800 text-[#bb86fc] rounded-lg font-semibold"
              : "text-gray-400"
          }  `}
        >
          <Link to="/create">{icons.create}</Link>
          <p className="text-sm">Create</p>
        </div>

        <div
          className={`flex flex-col justify-center items-center py-1 px-3 ${
            isActive("/saved")
              ? "bg-gray-800 text-[#bb86fc] rounded-lg font-semibold"
              : "text-gray-400"
          }  `}
        >
          <Link to="/saved">{icons.save}</Link>
          <p className="text-sm">Saved</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
