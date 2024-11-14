import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  fetchUserPost,
  fetchUserData,
  fetchSearchedUserData,
  fetchSearchedUserPost,
  starPost,
  checkIfStarred,
} from "../../utils/api";
import { formatDatePost } from "../../utils/dateUtil";
import { icons } from "../../assets/icons/icons";
import PostOptions from "../modals/Posts/PostOptions";

interface Post {
  postId: number;
  userId: number;
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

  const [starredPosts, setStarredPosts] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [saved, setSaved] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [openPostOptions, setOpenPostOptions] = useState<number | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const [userData, setUserData] = useState({
    userID: "",
    username: "",
    image: "",
  });

  const handleStar = async (postId: number) => {
    const currentStarredState = starredPosts[postId] ?? false;
    const newStarredState = !currentStarredState;

    setStarredPosts((prev) => ({ ...prev, [postId]: newStarredState }));

    try {
      const response = await starPost(postId);

      if (response.starred !== undefined) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.postId === postId
              ? {
                  ...post,
                  stars: response.starred ? post.stars + 1 : post.stars - 1,
                }
              : post
          )
        );
      } else {
        console.log("Backend did not return the expected 'starred' field");
        setStarredPosts((prev) => ({ ...prev, [postId]: currentStarredState }));
      }
    } catch (error) {
      console.error("Error in star toggle:", error);
      setStarredPosts((prev) => ({ ...prev, [postId]: currentStarredState }));
    }
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userDataLogged = JSON.parse(user);
      setLoggedInUser(userDataLogged);
    } else {
      console.log("No token found");
    }
  }, []);

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
        if (!loggedInUser || !loggedInUser.username) {
          return;
        }

        const data = username
          ? await fetchSearchedUserPost(username)
          : await fetchUserPost();

        const postsData = username ? data.posts : data;
        setPosts(postsData);

        for (const post of postsData) {
          const isStarred = await checkIfStarred(post.postId, loggedInUser.id);

          setStarredPosts((prev) => ({
            ...prev,
            [post.postId]: isStarred,
          }));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getUserPost();
  }, [username, loggedInUser]);

  const togglePostOption = (postId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Toggling post options for postId:", postId);
    setOpenPostOptions(openPostOptions === postId ? null : postId);
  };

  const handleEdit = (postId: number) => {
    console.log("Edit post with id:", postId);
  };

  const handleDelete = (postId: number) => {
    console.log("Delete post with id:", postId);
  };

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            className="my-2 py-3 px-2 bg-[#121212] rounded-xl border border-gray-600"
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
                <>{icons.userCircle}</>
              )}
              <div className="flex items-center gap-3 ml-2">
                <h1 className="font-bold text-md">{userData.username}</h1>
                <p className="text-slate-300 text-sm">
                  {formatDatePost(post.date_created)}
                </p>
              </div>
              <div
                className="ml-auto relative"
                onClick={(e) => togglePostOption(post.postId, e)}
              >
                {loggedInUser.id === post.userId && (
                  <>
                    {icons.ellipsisPost}
                    {openPostOptions === post.postId && (
                      <PostOptions
                        postId={post.postId}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    )}
                  </>
                )}
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
              ) : null}

              <span className="font-center text-sm">{post.content}</span>
            </div>
            <div className="flex justify-between mt-3 px-2">
              <div
                className="flex items-center justify-center gap-1"
                onClick={() => handleStar(post.postId)}
              >
                {starredPosts[post.postId] ? (
                  <>{icons.starFilled}</>
                ) : (
                  <>{icons.star}</>
                )}
                <p className="text-sm">{post.stars}</p>
              </div>

              {!saved ? <>{icons.save}</> : <>{icons.saveFilled}</>}
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
