import React from "react";

interface DeletePostConfirmationProps {
  postId: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeletePostConfirmation: React.FC<DeletePostConfirmationProps> = ({
  postId,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-[#1E1E1E] border border-gray-600 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-white mb-4">Delete Post</h2>
        <p className="text-gray-300 mb-4">
          Are you sure you want to delete this post?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostConfirmation;
