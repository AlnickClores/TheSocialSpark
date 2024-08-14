import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import SampleImage from "../../assets/images/sample-image.jpg";
import SampleImage1 from "../../assets/images/sample-image1.jpg";
import SampleImage2 from "../../assets/images/sample-image2.jpg";
import SampleImage3 from "../../assets/images/sample-image3.jpg";
import starFilled from "../../assets/icons/star-solid.svg";
import starRegular from "../../assets/icons/star-regular.svg";
import bookmarkRegular from "../../assets/icons/bookmark-regular.svg";
import bookmarkFilled from "../../assets/icons/bookmark-solid.svg";
import { ReactComponent as User } from "../../assets/icons/user-solid.svg";
import {
  fetchUserPost,
  fetchUserData,
  fetchSearchedUserData,
  fetchSearchedUserPost,
} from "../../utils/api";
import { formatDatePost } from "../../utils/dateUtil";

interface Post {
  postId: number;
  date_created: string;
  image: string;
  content: string;
  location: string;
  stars: number;
}

const Post = () => {
  const location = useLocation();
  const { username } = useParams();
  const isLoggedInProfilePage = location.pathname.endsWith("/profile");

  const [starred, setStarred] = useState(false);
  const [saved, setSaved] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const [userData, setUserData] = useState({
    username: "",
    image: "",
  });

  const handleStar = () => {
    setStarred(!starred);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = username
          ? await fetchSearchedUserData(username)
          : await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [username]);

  useEffect(() => {
    const getUserPost = async () => {
      try {
        const data = username
          ? await fetchSearchedUserPost(username)
          : await fetchUserPost();

        if (data && isLoggedInProfilePage) {
          setPosts(data);
          console.log(data);
        } else {
          setPosts(data.posts);
          console.log(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserPost();
  }, [username]);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            className="my-2 py-3 px-1 bg-[#121212] rounded-xl border border-gray-600"
            key={post.postId}
          >
            <div className="flex items-center">
              {userData.image ? (
                <img
                  src={userData.image}
                  className="h-8 w-10 text-[#bb86fc] fill-current rounded-full"
                  alt="profile image"
                />
              ) : (
                <User className="h-8 w-10 text-[#bb86fc] fill-current" />
              )}
              <div className="flex items-center gap-3 ml-2">
                <h1 className="font-bold text-md">{userData.username}</h1>
                <p className="text-slate-300 text-sm">
                  {formatDatePost(post.date_created)}
                </p>
              </div>
            </div>
            <p className="my-2 mx-1 text-slate-300 text-sm">{post.location}</p>
            <div className="p-1">
              {post.image ? (
                <div className="py-1">
                  <img
                    className="rounded-lg"
                    src={`data:image/jpeg;base64,${post.image}`}
                    alt="post image"
                  />
                </div>
              ) : (
                <div className="py-1">
                  <img
                    className="rounded-lg"
                    src={SampleImage}
                    alt="post image"
                  />
                </div>
              )}

              <span className="font-center text-sm">{post.content}</span>
            </div>
            <div className="flex justify-between mt-3 px-2">
              <div className="flex items-center justify-center gap-1">
                {!starred ? (
                  <img
                    className="h-5 w-5"
                    src={starRegular}
                    alt="star"
                    onClick={handleStar}
                  />
                ) : (
                  <img
                    className="h-5 w-5"
                    src={starFilled}
                    alt="star"
                    onClick={handleStar}
                  />
                )}
                <p className="text-sm">{post.stars}</p>
              </div>
              {!saved ? (
                <img
                  className="h-5 w-5"
                  src={bookmarkRegular}
                  alt="bookmark"
                  onClick={handleSave}
                />
              ) : (
                <img
                  className="h-5 w-5"
                  src={bookmarkFilled}
                  alt="bookmark"
                  onClick={handleSave}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          {isLoggedInProfilePage ? (
            <h1>You have no posts.</h1>
          ) : (
            <h1>This user has no posts.</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
