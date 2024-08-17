import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";
import { ReactComponent as Location } from "../assets/icons/location-dot-solid.svg";
import { ReactComponent as Calendar } from "../assets/icons/calendar-regular.svg";
import { fetchUserData, fetchSearchedUserData } from "../utils/api";
import { formatDate } from "../utils/dateUtil";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProfileHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedInProfilePage = location.pathname.endsWith("/profile");
  const [isFollowing, setIsFollowing] = useState(false);
  const { username } = useParams();
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [userData, setUserData] = useState({
    userID: "",
    username: "",
    bio: "",
    location: "",
    date_joined: "",
    image: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = username
          ? await fetchSearchedUserData(username)
          : await fetchUserData();
        setUserData(data);

        const response = await axios.get(
          `http://localhost:3000/users/${data.userID}/followers-following`
        );

        setFollowerCount(response.data.followerCount);
        setFollowingCount(response.data.followingCount);

        if (username) {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `http://localhost:3000/users/check-follow-status/${username}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsFollowing(res.data.isFollowing);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [username]);

  const handleFollowUser = async () => {
    const confirmFollow = window.confirm(`Follow ${username}?`);
    if (!confirmFollow) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const decodedToken = jwtDecode(token) as { id: string };
    const userId = decodedToken.id;
    const followingId = userData.userID;

    try {
      const response = await axios.post("http://localhost:3000/users/follow", {
        userId,
        followingId,
      });

      if (response.status === 200) {
        setIsFollowing(!isFollowing);
        alert("User followed successfully");
        navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollowUser = () => {};
  return (
    <div>
      <div className="flex items-center justify-between mt-5">
        {userData.image ? (
          <img
            src={userData.image}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <User className="text-white fill-current w-16 h-16 border border-gray-600 rounded-full p-1" />
        )}

        {isLoggedInProfilePage ? (
          <Link to="/editprofile">
            <button className="py-1 px-4 border border-gray-600 rounded-2xl font-semibold text-sm">
              Edit Profile
            </button>
          </Link>
        ) : isFollowing ? (
          <button
            className="py-1 px-4 border border-gray-600 rounded-2xl font-semibold text-sm"
            onClick={handleUnfollowUser}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="py-1 px-4 border border-gray-600 rounded-2xl font-semibold text-sm"
            onClick={handleFollowUser}
          >
            Follow
          </button>
        )}
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
          <h1 className="font-semibold">{followingCount}</h1>
          <h1 className="text-gray-400">Following</h1>
        </div>
        <div className="flex gap-1 text-sm">
          <h1 className="font-semibold">{followerCount}</h1>
          <h1 className="text-gray-400">Followers</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
