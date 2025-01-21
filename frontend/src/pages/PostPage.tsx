import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPostById,
  fetchSpecificUserData,
  starPost,
  checkIfStarred,
} from "../utils/api";
import { formatDatePost } from "../utils/dateUtil";
import { icons } from "../assets/icons/icons";
import Navbar from "../components/Navbar";

interface Post {
  content: string;
  location: string;
  image: string;
  date_created: string;
  userId: number;
  postId: number;
  stars: number;
}

interface User {
  userId: number;
  username: string;
  image: string;
  date_created: string;
}

interface LoggedUser {
  id: number;
  username: string;
}

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<LoggedUser | null>(null);
  const [starred, setStarred] = useState(false);
  const [saved, setSaved] = useState(false);

  const parsedPostId = postId ? parseInt(postId, 10) : 0;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userDataLogged = JSON.parse(user);
      setLoggedInUser(userDataLogged);
    }
  }, []);

  useEffect(() => {
    if (!parsedPostId) return;

    const getPost = async () => {
      try {
        const postData = await fetchPostById(parsedPostId);
        setPost(postData.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    getPost();
  }, [parsedPostId]);

  useEffect(() => {
    if (!post?.userId) return;

    const getUser = async () => {
      try {
        const userData = await fetchSpecificUserData(post.userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, [post?.userId]);

  useEffect(() => {
    if (!parsedPostId || !loggedInUser) return;

    const checkStarredStatus = async () => {
      try {
        const isStarred = await checkIfStarred(parsedPostId, loggedInUser.id);
        setStarred(isStarred);
      } catch (error) {
        console.error("Error checking star status:", error);
      }
    };
    checkStarredStatus();
  }, [parsedPostId, loggedInUser]);

  const handleStar = async () => {
    if (!post || !loggedInUser) return;

    const newStarredState = !starred;
    setStarred(newStarredState);

    try {
      const response = await starPost(parsedPostId);
      if (response.starred !== undefined) {
        setPost((prevPost) =>
          prevPost
            ? {
                ...prevPost,
                stars: newStarredState
                  ? prevPost.stars + 1
                  : prevPost.stars - 1,
              }
            : null
        );
      } else {
        console.error("Unexpected response from backend");
        setStarred(!newStarredState);
      }
    } catch (error) {
      console.error("Error toggling star:", error);
      setStarred(!newStarredState);
    }
  };

  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  return (
    <div>
      <Navbar />
      <div className="p-3">
        {user && post ? (
          <div className="my-2 py-3 px-2 bg-[#121212] rounded-xl">
            <div className="flex items-center">
              {user.image ? (
                <img
                  src={user.image}
                  className="h-8 w-10 text-[#bb86fc] fill-current rounded-full"
                  alt="profile image"
                />
              ) : (
                <>{icons.userCircle}</>
              )}
              <div className="flex items-center gap-3 ml-2">
                <h1 className="font-bold text-md">{user.username}</h1>
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
                    className="rounded-lg w-full h-full object-cover"
                    src={`data:image/jpeg;base64,${post.image}`}
                    alt="post image"
                  />
                </div>
              ) : null}
              <span className="font-center text-sm">{post.content}</span>
            </div>
            <div className="flex justify-between mt-3 px-2">
              <div
                className="flex items-center justify-center gap-1 cursor-pointer"
                onClick={handleStar}
              >
                {starred ? <>{icons.starFilled}</> : <>{icons.star}</>}
                <p className="text-sm">{post.stars}</p>
              </div>

              <div className="cursor-pointer" onClick={handleSave}>
                {!saved ? <>{icons.save}</> : <>{icons.saveFilled}</>}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PostPage;
