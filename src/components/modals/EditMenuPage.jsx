import React, { useState } from "react";
import { icons } from "../../assets/icons/icons";
import DeleteConfirmation from "../modals/DeleteConfirmation"; // Import the new modal

const EditMenu = ({ isOpen, onClose, item, onSave }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [selectedSize, setSelectedSize] = useState(item.size || "");
  const [pricePerItem, setPricePerItem] = useState(
    item.itemPrice[selectedSize] || item.price / item.quantity
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSelectedSize(newSize);

    if (item.itemPrice[newSize]) {
      setPricePerItem(parseFloat(item.itemPrice[newSize]));
    }
  };

  const handleIncrease = () => {
    if (quantity >= 9) {
      alert("You can't order more than 9 items.");
    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      // Show the delete confirmation modal
      setShowDeleteModal(true);
    }
  };

  const handleSave = () => {
    if (quantity < 1) {
      // Remove the item if quantity is less than 1
      onSave(null);
    } else {
      const updatedItem = {
        ...item,
        quantity,
        ...(item.size && { size: selectedSize }),
        price: (pricePerItem * quantity).toFixed(2),
      };
      onSave(updatedItem);
    }
    onClose();
  };

  const handleConfirmDelete = () => {
    onSave(null); // Delete the item
    onClose(); // Close the edit menu
    setShowDeleteModal(false); // Close delete confirmation modal
  };

  const updatedPrice = (pricePerItem * quantity).toFixed(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={handleDecrease}>{icons.minusButton}</button>
            <span className="font-semibold border border-[#ff8428] px-1">
              {quantity}x
            </span>
            <button onClick={handleIncrease}>{icons.plusButton}</button>
          </div>

          <div className="text-center">
            <span className="font-semibold text-lg">{item.name}</span>
            <p className="text-lg font-semibold">&#8369;{updatedPrice}</p>
          </div>
        </div>

        {/* Size selection for drinks */}
        {item.size && item.category === "drinks" && (
          <div>
            <h3 className="font-semibold mb-2">Select Size</h3>
            {["small", "medium", "large"].map((size) => (
              <div key={size}>
                <input
                  type="radio"
                  id={size}
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={handleSizeChange}
                />
                <label htmlFor={size}>{size}</label>
              </div>
            ))}
          </div>
        )}

        {/* Size selection for cakes */}
        {item.size && item.category === "cakes" && (
          <div>
            <h3 className="font-semibold mb-2">Select Size</h3>
            {["slice", "whole"].map((size) => (
              <div key={size}>
                <input
                  type="radio"
                  id={size}
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={handleSizeChange}
                />
                <label htmlFor={size}>{size}</label>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between gap-2 pt-[20px]">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-[#ff8428] text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default EditMenu;
