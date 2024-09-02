import React from "react";
import Navbar from "../components/Navbar";
import { menu } from "../data/menuData";
import { icons } from "../assets/icons/icons";

const BasketPage = () => {
  const handleAddItems = () => {
    alert("On going");
  };

  const handleEditItems = () => {
    alert("Wala pa!!!");
  };

  const handleSubmitMenu = () => {
    alert("Kelangan ba mag madaleeeeeee!!!");
  };

  return (
    <div className="h-screen">
      <Navbar />

      <div className="flex justify-between items-center px-3 my-5">
        <h1 className="font-bold text-xl">Order Summary</h1>
        <h1 className="text-[blue] text-md" onClick={handleAddItems}>
          Add Items
        </h1>
      </div>

      <div className="px-3">
        {menu["main-course"].map((item, index) => (
          <div
            key={index}
            className="flex items-center w-full gap-5 py-4 border-b"
          >
            {/* Quantity */}
            <span className="font-semibold border border-[#ff8428] px-1">
              1x
            </span>

            {/* Name and Edit */}
            <div className="flex flex-grow flex-col justify-between">
              <span className="font-semibold text-lg">{item.name}</span>
              <span
                className="text-[blue] text-xs cursor-pointer"
                onClick={handleEditItems}
              >
                Edit
              </span>
            </div>

            {/* Price */}
            <span className="text-lg font-semibold">&#8369;{item.price}</span>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-5 py-3 px-5 border-t rounded-xl">
        <div className="flex justify-between w-full text-xl">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">&#8369;188.00</span>
        </div>

        <button
          className="bg-[#ff8428] w-full text-lg font-bold text-white px-6 py-2 rounded-xl"
          onClick={handleSubmitMenu}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default BasketPage;
