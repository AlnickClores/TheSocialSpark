import React, { useState } from "react";
import { icons } from "../assets/icons/icons";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const OrderDetailPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);

  const { image, price, name, description } = location.state || {};

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleMinusQuantity = () => {
    if (quantity == 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
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
        <h1 className="text-[#ff8418]">&#8369;{price}</h1>
      </div>
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
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center py-3 px-5">
        <button
          className="bg-[#ff8428] w-full text-lg font-bold text-white px-6 py-2 rounded-xl"
          onClick={() => alert("Wala pa e. - Alnick")}
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
