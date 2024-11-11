import React from "react";

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
  return (
    <div className="absolute right-0 mt-2 w-32 bg-[#121212] border border-gray-600 rounded shadow-lg z-10">
      <button
        onClick={() => onEdit(postId)}
        className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100"
      >
        Edit Post
      </button>
      <button
        onClick={() => onDelete(postId)}
        className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100"
      >
        Delete Post
      </button>
    </div>
  );
};

export default PostOptions;
