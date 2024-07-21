import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../utils/api";
import { Link } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/icons/arrow-left-solid.svg";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";
import { ReactComponent as Edit } from "../assets/icons/pen-to-square-regular.svg";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    location: "",
  });

  const [updatedUserData, setUpdatedUserData] = useState({
    username: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setUpdatedUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found.");
      }

      const response = await axios.put(
        "http://localhost:3000/auth/updateProfile",
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUserData(updatedUserData);
        alert("Profile updated successfully.");
      }

      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert("Failed to update profile.");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              value={updatedUserData.username}
              onChange={handleChange}
              className="border-b border-gray-600 bg-black text-white px-2 py-1 placeholder-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-400">Bio</label>
            <input
              type="text"
              name="bio"
              value={updatedUserData.bio}
              onChange={handleChange}
              className="border-b border-gray-600 bg-black text-white px-2 py-1 placeholder-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-400">Location</label>
            <input
              type="text"
              name="location"
              value={updatedUserData.location}
              onChange={handleChange}
              className="border-b border-gray-600 bg-black text-white px-2 py-1 placeholder-white"
            />
          </div>
          <div className="m-auto">
            <button
              type="submit"
              className="py-1 px-16 border border-gray-600 rounded-2xl font-semibold text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
