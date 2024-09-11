import React, { useState } from "react";
import { icons } from "../../assets/icons/icons";

const EditMenu = ({ isOpen, onClose, item, onSave }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [selectedSize, setSelectedSize] = useState(item.sizes ? item.size || item.sizes[0] : '');

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const pricePerItem = item.price / item.quantity;

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
      alert("Quantity can't be less than 1.");
    }
  };

  const handleSave = () => {
    const updatedItem = {
      ...item,
      quantity,
      size: selectedSize,
      price: (pricePerItem * quantity).toFixed(2),
    };
    onSave(updatedItem);
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

        {(item.type === "drinks" || item.type === "cakes") && item.sizes && item.sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-[#ff8428] mb-2">
              Select Size
            </h3>
            <div className="flex flex-col gap-4">
              {item.sizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-3 p-2 border border-gray-300 rounded-lg"
                >
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={handleSizeChange}
                  />
                  <span className="text-lg font-semibold">{size}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between gap-2">
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
    </div>
  );
};

export default EditMenu;
