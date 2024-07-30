import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";
import Post from "../components/posts/Post";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<string>("posts");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar />
      <div className="p-3">
        <ProfileHeader />
        <div className="w-full max-w-md mx-auto mb-16">
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
