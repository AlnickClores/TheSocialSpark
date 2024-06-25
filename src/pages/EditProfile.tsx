import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/icons/arrow-left-solid.svg";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";
import { ReactComponent as Edit } from "../assets/icons/pen-to-square-regular.svg";

const EditProfile = () => {
  return (
    <div>
      <div className="p-3">
        <div className="flex items-center gap-5">
          <Link to="/profile">
            <LeftArrow className="text-white fill-current h-6 w-6" />
          </Link>
          <h1 className="text-lg font-semibold">Edit Profile</h1>
        </div>
        <div className="flex justify-center mt-16">
          <div className="relative w-32 h-32">
            <User className="text-gray-400 fill-current h-full w-full border border-gray-400 rounded-full p-1" />
            <Edit
              className="text-white fill-current h-8 w-8 absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-gray-400">Name</label>
            <input
              type="text"
              placeholder="Alnick Clores"
              className="border-b border-gray-600 bg-black text-white px-2 py-1 placeholder-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-400">Bio</label>
            <input
              type="text"
              placeholder="This is a placeholder bio."
              className="border-b border-gray-600 bg-black text-white px-2 py-1 placeholder-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-400">Location</label>
            <input
              type="text"
              placeholder="Valenzuela, PH"
              className="border-b border-gray-600 bg-black text-white px-2 py-1 placeholder-white"
            />
          </div>
          <div className="m-auto">
            <button className="py-1 px-16 border border-gray-600 rounded-2xl font-semibold text-sm">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
