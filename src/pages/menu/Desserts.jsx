import React from "react";
import Navbar from "../../components/Navbar";
import FoodCard from "../../components/FoodCard";

const Desserts = () => {
  const category = "desserts";
  return (
    <div className="h-screen">
      <Navbar />
      <h1 className="text-center uppercase font-extrabold font-header text-2xl my-5 text-[#ff8418]">
        Desserts
      </h1>
      <FoodCard category={category} />
    </div>
  );
};

export default Desserts;
