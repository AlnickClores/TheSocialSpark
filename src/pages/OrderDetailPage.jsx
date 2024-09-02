import React, { useState } from "react";
import { icons } from "../assets/icons/icons";
import { useNavigate, useLocation } from "react-router-dom";
import AddToBasketButton from "../components/AddToBasketButton";

const OrderDetailPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("slice");

  const { image, price, name, sizes } = location.state || {};

  const basePrice = sizes
    ? parseFloat(price[selectedSize.toLowerCase()])
    : parseFloat(price);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value.toLowerCase());
  };

  const totalPrice = (basePrice * quantity).toFixed(2);

  return (
    <div className="h-screen">
      <div className="relaive">
        <img src={image} alt="food-image" />
        <button className="absolute top-2 left-2" onClick={handleGoBack}>
          {icons.cross}
        </button>
      </div>

      <div className="flex justify-between text-2xl font-bold my-5 px-3">
        <h1>{name}</h1>
        <h1 className="text-[#ff8418]">&#8369;{totalPrice}</h1>
      </div>

      {sizes && (
        <div className="flex flex-col my-5 px-3">
          <h1 className="font-bold text-lg">
            Cake Variation{" "}
            <span className="font-normal text-sm text-gray-600">Pick 1</span>
          </h1>
          {sizes.map((size) => (
            <label key={size} className="flex items-center gap-2 py-3 border-b">
              <input
                type="radio"
                value={size.toLowerCase()}
                checked={selectedSize === size.toLowerCase()}
                onChange={handleSizeChange}
              />
              <span className="text-lg font-medium">{size}</span>
            </label>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2  px-3">
        <h1 className="text-lg font-semibold">
          Note to restaurant{" "}
          <span className="text-gray-600 text-xs">Optional</span>
        </h1>
        <p
          className="border-2 border-black p-2 text-sm text-gray-500"
          onClick={() => alert("no function yet hehe - Alnick")}
        >
          Add your preference (e.g., Thigh Part)
        </p>
      </div>
      <div className="flex items-center justify-center gap-5 mt-10 px-3">
        <button
          className="border-[#d4d4d4] border-2 p-1 rounded-md"
          onClick={handleMinusQuantity}
        >
          {icons.minusButton}
        </button>
        <h1 className="text-xl font-semibold">{quantity}</h1>
        <button
          className="border-[#d4d4d4] border-2 p-1 rounded-md"
          onClick={handleAddQuantity}
        >
          {icons.plusButton}
        </button>
      </div>
      <AddToBasketButton />
    </div>
  );
};

export default OrderDetailPage;
