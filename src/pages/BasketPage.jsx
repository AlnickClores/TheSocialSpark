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
    alert("Kelangan ba mag madaleeeeeee!!!")
  };

  return (
    <div className="w-full">
      <Navbar />

      <div className="w-full h-full flex items-center flex-col text-[1.2rem] py-[20px]">
        <div className="flex justify-between w-full mb-[40px] px-[5px]">
          <h1 className="font-extrabold">Order Summary</h1>
          <h1 className="text-[blue]" onClick={handleAddItems}>Add Items</h1>
        </div>

        {menu["main-course"].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-full max-w-[600px] gap-[20px] mb-[10px] p-[10px] border-b"
          >
            {/* Quantity */}
            <div className="flex items-center bg-white w-[20px] text-center">
              <span>1x</span>
            </div>

            {/* Name and Edit */}
            <div className="flex flex-grow flex-col justify-between">
              <span className="text-black text-left">{item.name}</span>
              <span className="text-[blue] text-left cursor-pointer" onClick={handleEditItems}>Edit</span>
            </div>

            {/* Price */}
            <div className="text-black text-right">
              <span>{item.price}</span>
            </div>
          </div>
        ))}

        <div className="absolute bottom-0 flex flex-col items-center bg-white w-full h-[15vh] ">
          <div className="flex justify-between w-full px-[20px] py-[4px] ">
            <span className="">Total</span>
            <span className="">999999.00</span>
          </div>
          <div className="flex items-center justify-center mt-[20px]">
            <button className="w-[250px] h-[40px] bg-green-500 relative rounded-[10px]" onClick={handleSubmitMenu}>
              Bagums
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
