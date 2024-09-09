import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";

const AddToBasketButton = ({ selectedItem }) => {
  const navigate = useNavigate();
  const { addToBasket } = useContext(BasketContext);

  const handleAddToBasket = () => {
    addToBasket(selectedItem);
    navigate("/basket");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center py-3 px-5 border-t rounded-xl">
      <button
        className="bg-[#ff8428] w-full text-lg font-bold text-white px-6 py-2 rounded-xl"
        onClick={handleAddToBasket}
      >
        Add to Basket
      </button>
    </div>
  );
};

export default AddToBasketButton;
