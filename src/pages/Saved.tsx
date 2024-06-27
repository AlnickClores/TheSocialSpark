import React from "react";
import Navbar from "../components/Navbar";
import SavedPost from "../components/SavedPost";

const Saved = () => {
  return (
    <div>
      <Navbar />
      <div className="p-3">
        <h1 className="text-xl font-bold mt-5 mb-10">Saved Posts</h1>
        <SavedPost />
      </div>
    </div>
  );
};

export default Saved;
