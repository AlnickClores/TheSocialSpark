import React from "react";

const OrderConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
        <h1>Confirm your order?</h1>
        <div className="flex justify-between mt-4">
          <button
            className="bg-[#ff8428] text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
