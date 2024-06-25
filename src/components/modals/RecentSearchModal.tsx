import React from "react";

interface ModalProps {
  onClose: () => void;
}

const RecentSearchModal: React.FC<ModalProps> = ({ onClose }) => {
  const handleDelete = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="flex flex-col bg-[#121212] p-5 rounded-lg gap-3 border border-gray-600">
        <h1>Remove from recent search?</h1>
        <div>
          <button
            className="py-1 px-3 rounded-md bg-red-600 text-sm font-semibold mr-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="py-1 px-3 rounded-md bg-slate-600 text-sm font-semibold"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentSearchModal;
