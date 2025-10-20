import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WelcomePost from "../components/posts/WelcomePost";
import { fetchFollowedUsersPosts } from "../utils/api";
import Post from "../components/posts/Post";

const Homepage = () => {
  const [followedPosts, setFollowedPosts] = useState([]);

  useEffect(() => {
    const getFollowedUsersPosts = async () => {
      const res = await fetchFollowedUsersPosts();
      const posts = Array.isArray(res?.posts) ? res.posts : [];
      setFollowedPosts(posts);
      console.log("Followed Users' Posts:", posts);
    };

    getFollowedUsersPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-3 mb-16">
        <h1 className="text-xl font-bold mt-5 mb-10">Home Feed</h1>
        <Post externalPosts={followedPosts} />
        <WelcomePost />
      </div>
    </div>
  );
};

export default Homepage;
