import React from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-3">
        <h1 className="text-xl font-bold mt-3 mb-10">Home Feed</h1>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Homepage;
