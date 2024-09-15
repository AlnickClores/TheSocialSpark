import React from "react";

const DeleteConfirmation = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-[80%] max-w-sm">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this item?
        </h2>

        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-[#ff8428] text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
