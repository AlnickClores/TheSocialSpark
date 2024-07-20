import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";
import { ReactComponent as Location } from "../assets/icons/location-dot-solid.svg";
import { ReactComponent as Calendar } from "../assets/icons/calendar-regular.svg";
import { fetchUserData } from "../utils/api";
import { formatDate } from "../utils/dateUtil";

const ProfileHeader = () => {
  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    location: "",
    date_joined: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mt-5">
        <User className="text-white fill-current w-16 h-16 border border-gray-600 rounded-full p-1" />
        <Link to="/editprofile">
          <button className="py-1 px-4 border border-gray-600 rounded-2xl font-semibold text-sm">
            Edit Profile
          </button>
        </Link>
      </div>
      <h1 className="text-xl font-semibold pb-3 mt-2 border-b border-gray-600">
        {userData.username}
      </h1>
      <div className="my-3">
        <p className="text-center text-sm font-light">{userData.bio}</p>
      </div>
      <div className="flex gap-5">
        <div className="flex gap-1 justify-center items-center">
          <Location className="text-gray-400 fill-current w-3 h-4" />
          <p className="text-sm text-gray-400">
            {userData.location ? userData.location : "Unknown"}
          </p>
        </div>
        <div className="flex gap-1 justify-center items-center">
          <Calendar className="text-gray-400 fill-current w-3 h-4" />
          <p className="text-sm text-gray-400">
            Joined {formatDate(userData.date_joined)}
          </p>
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
    </div>
  );
};

export default ProfileHeader;
