import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../utils/api";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";
import { ReactComponent as Edit } from "../assets/icons/pen-to-square-regular.svg";

const EditProfileForm = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    location: "",
    image: "",
  });

  const [updatedUserData, setUpdatedUserData] = useState({
    username: "",
    bio: "",
    location: "",
    image: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setUpdatedUserData(data);
        console.log(data);
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

      const formData = new FormData();
      formData.append("username", updatedUserData.username);
      formData.append("bio", updatedUserData.bio);
      formData.append("location", updatedUserData.location);
      if (fileInputRef.current && fileInputRef.current.files?.[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }

      const response = await axios.put(
        "http://localhost:3000/users/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedUserData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="flex justify-center mt-16">
        <div className="relative w-32 h-32">
          {updatedUserData.image ? (
            <img
              src={updatedUserData.image}
              className="text-gray-400 fill-current h-full w-full border border-gray-400 rounded-full p-1 opacity-50"
              alt="profile"
            />
          ) : (
            <User className="text-gray-400 fill-current h-full w-full border border-gray-400 rounded-full p-1" />
          )}

          <Edit
            className="text-white fill-current h-8 w-8 absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={handleClick}
          />
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label className="text-gray-400">Username</label>
          <input
            type="text"
            name="username"
            value={updatedUserData.username}
            onChange={handleChange}
            className="border-b border-gray-600 bg-black text-white px-2 py-1 placeholder-white"
            required
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
      </div>
    </form>
  );
};

export default EditProfileForm;
