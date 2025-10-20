import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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

interface PostType {
  postId: number;
  userId: number;
  username?: string;
  userImage?: string;
  date_created: string;
  image?: string;
  content: string;
  location: string;
  stars: number;
}

interface PostProps {
  externalPosts?: PostType[];
}

const Post = ({ externalPosts }: PostProps) => {
  const location = useLocation();
  const { username } = useParams();
  const navigate = useNavigate();
  const isLoggedInProfilePage = location.pathname.endsWith("/profile");

  const [posts, setPosts] = useState<PostType[]>([]);
  const [starredPosts, setStarredPosts] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [saved, setSaved] = useState(false);
  const [openPostOptions, setOpenPostOptions] = useState<number | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    if (externalPosts && externalPosts.length > 0) {
      setPosts(externalPosts);
    }
  }, [externalPosts]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setLoggedInUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    const getUserPost = async () => {
      if (
        location.pathname === "/" ||
        location.pathname.includes("/homepage")
      ) {
        if (loggedInUser && externalPosts && externalPosts.length > 0) {
          for (const post of externalPosts) {
            const isStarred = await checkIfStarred(
              post.postId,
              loggedInUser.id
            );
            setStarredPosts((prev) => ({ ...prev, [post.postId]: isStarred }));
          }
        }
        return;
      }

      try {
        const data = username
          ? await fetchSearchedUserPost(username)
          : await fetchUserPost();
        const postsData = username ? data.posts : data;
        setPosts(postsData);
        console.log("Fetched posts:", postsData);

        if (loggedInUser) {
          for (const post of postsData) {
            const isStarred = await checkIfStarred(
              post.postId,
              loggedInUser.id
            );
            setStarredPosts((prev) => ({ ...prev, [post.postId]: isStarred }));
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getUserPost();
  }, [username, loggedInUser, location.pathname, externalPosts]);

  const handleStar = async (postId: number) => {
    const currentStarred = starredPosts[postId] ?? false;
    const newStarred = !currentStarred;
    setStarredPosts((prev) => ({ ...prev, [postId]: newStarred }));

    try {
      const response = await starPost(postId);
      if (response.starred !== undefined) {
        setPosts((prev) =>
          prev.map((post) =>
            post.postId === postId
              ? {
                  ...post,
                  stars: response.starred ? post.stars + 1 : post.stars - 1,
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error in star toggle:", error);
      setStarredPosts((prev) => ({ ...prev, [postId]: currentStarred }));
    }
  };

  const togglePostOption = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenPostOptions(openPostOptions === postId ? null : postId);
  };

  const handleEdit = (postId: number) =>
    console.log("Edit post with id:", postId);
  const handleDelete = (postId: number) =>
    console.log("Delete post with id:", postId);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.postId}
            className="my-2 py-3 px-2 bg-[#121212] rounded-xl border border-gray-600"
            onClick={() => navigate(`/post/${post.postId}`)}
          >
            <div className="flex items-center">
              {post.userImage ? (
                <img
                  src={post.userImage}
                  className="h-8 w-10 rounded-full"
                  alt={post.username}
                />
              ) : (
                icons.userCircle
              )}

              <div className="flex items-center gap-3 ml-2">
                <h1 className="font-bold text-md">{post.username}</h1>
                <p className="text-slate-300 text-sm">
                  {formatDatePost(post.date_created)}
                </p>
              </div>

              <div
                className="ml-auto relative"
                onClick={(e) => togglePostOption(post.postId, e)}
              >
                {loggedInUser?.id === post.userId && (
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

            {post.image && (
              <img
                className="rounded-lg w-full object-cover"
                src={`data:image/jpeg;base64,${post.image}`}
                alt="post"
              />
            )}

            <p className="text-sm mt-2">{post.content}</p>

            <div className="flex justify-between mt-3 px-2">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleStar(post.postId)}
              >
                {starredPosts[post.postId] ? icons.starFilled : icons.star}
                <p className="text-sm">{post.stars}</p>
              </div>

              {saved ? icons.saveFilled : icons.save}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <h1>
            {isLoggedInProfilePage
              ? "You have no posts."
              : "This user has no posts."}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Post;
