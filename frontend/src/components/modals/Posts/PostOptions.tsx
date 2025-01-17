import React, { useState } from "react";
import { deletePost } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

interface PostOptionsProps {
  postId: number;
  onEdit: (postId: number) => void;
  onDelete: (postId: number) => void;
}

const PostOptions: React.FC<PostOptionsProps> = ({
  postId,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleDeletePost = async (postId: number) => {
    console.log("Deleting post with ID:", postId);
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (userConfirmed) {
      try {
        if (typeof postId !== "number" || isNaN(postId)) {
          throw new Error("Invalid postId.");
        }
        await deletePost(postId);
        navigate(0);
        onDelete(postId);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    } else {
      console.log("User canceled the deletion", postId);
    }
  };

  const handleEditPost = async (postId: number) => {
    navigate(`/editpost/${[postId]}`);
  };

  return (
    <div className="absolute right-0 mt-2 w-32 bg-[#121212] border border-gray-600 rounded shadow-lg z-10">
      <button
        onClick={() => handleEditPost(postId)}
        className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100"
      >
        Edit Post
      </button>
      <button
        onClick={() => handleDeletePost(postId)}
        className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100"
      >
        Delete Post
      </button>
    </div>
  );
};

export default PostOptions;
