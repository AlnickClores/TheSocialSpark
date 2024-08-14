import React from "react";
import Navbar from "../components/Navbar";
import WelcomePost from "../components/posts/WelcomePost";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-3">
        <h1 className="text-xl font-bold mt-5 mb-10">Home Feed</h1>
        <WelcomePost />
      </div>
    </div>
  );
};

export default Homepage;
