import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";
import { ReactComponent as Location } from "../assets/icons/location-dot-solid.svg";
import { ReactComponent as Calendar } from "../assets/icons/calendar-regular.svg";
import Post from "../components/Post";
import { Link } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<string>("posts");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar />
      <div className="p-3">
        <h1 className="text-xl font-bold mt-3 mb-10">Alnick Clores</h1>
        <div className="flex items-center justify-between">
          <User className="text-white fill-current w-16 h-16 border border-gray-600 rounded-full p-1" />
          <Link to="/editprofile">
            <button className="py-1 px-4 border border-gray-600 rounded-2xl font-semibold text-sm">
              Edit Profile
            </button>
          </Link>
        </div>
        <h1 className="text-xl font-semibold pb-3 mt-2 border-b border-gray-600">
          Knotz
        </h1>
        <div className="my-3">
          <p className="text-center text-sm font-light">
            This is a placeholder bio.
          </p>
        </div>
        <div className="flex gap-5">
          <div className="flex gap-1 justify-center items-center">
            <Location className="text-gray-400 fill-current w-3 h-4" />
            <p className="text-sm text-gray-400">Valenzuela, PH</p>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <Calendar className="text-gray-400 fill-current w-3 h-4" />
            <p className="text-sm text-gray-400">Joined June 2024</p>
          </div>
        </div>
        <div className="flex gap-3 my-3 pl-0.5">
          <div className="flex gap-1 text-sm">
            <h1 className="font-semibold">0</h1>
            <h1 className="text-gray-400">Following</h1>
          </div>
          <div className="flex gap-1 text-sm">
            <h1 className="font-semibold">0</h1>
            <h1 className="text-gray-400">Followers</h1>
          </div>
        </div>
        <div className="w-full max-w-md mx-auto">
          <div className="flex border-b-2 border-gray-600">
            <button
              className={`font-semibold py-2 px-4 focus:outline-none ${
                activeTab === "posts"
                  ? "text-white border-b-2 border-[#bb86fc]"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabClick("posts")}
            >
              Posts
            </button>
            <button
              className={`font-semibold py-2 px-4 focus:outline-none ${
                activeTab === "starred"
                  ? "text-white border-b-2 border-[#bb86fc]"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabClick("starred")}
            >
              Starred
            </button>
          </div>
          <div className="pt-3">
            {activeTab === "posts" ? (
              <div>
                <h1 className="text-lg font-semibold">Posts</h1>
                <Post />
                <Post />
                <Post />
              </div>
            ) : (
              <div>
                <h1 className="text-lg font-semibold">Starred</h1>
                <Post />
                <Post />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
