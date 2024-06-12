import React from "react";
import Home from "../assets/icons/house-solid.svg";
import Bookmark from "../assets/icons/bookmark-solid.svg";
import Search from "../assets/icons/magnifying-glass-solid.svg";
import Create from "../assets/icons/plus-solid.svg";
import User from "../assets/icons/user-solid.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-green-200 p-2">
        <h1 className="text-lg font-bold">The SocialSpark</h1>
        <Link to="/profile">
          <img className="w-5 h-5" src={User} alt="user-image" />
        </Link>
      </div>
      <div className="flex w-full justify-evenly bg-green-200 absolute bottom-0 py-3 rounded-t-2xl md:hidden">
        <div className="flex flex-col justify-center items-center">
          <Link to="/">
            {" "}
            <img className="w-16 h-6" src={Home} alt="home-icon" />
          </Link>
          <p className="text-sm">Home</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to="/search">
            {" "}
            <img className="w-16 h-6" src={Search} alt="search-icon" />
          </Link>
          <p className="text-sm">Search</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to="/create">
            <img className="w-16 h-6" src={Create} alt="create-icon" />{" "}
          </Link>
          <p className="text-sm">Create</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to="/saved">
            {" "}
            <img className="w-16 h-6" src={Bookmark} alt="saved-icon" />
          </Link>
          <p className="text-sm">Saved</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
