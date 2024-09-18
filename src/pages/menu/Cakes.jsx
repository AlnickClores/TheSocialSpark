import React from "react";
import Navbar from "../../components/Navbar";
import FoodCard from "../../components/FoodCard";

const Cakes = () => {
  const category = "cakes";
  return (
    <div className="h-screen">
      <Navbar />
      <h1 className="text-center uppercase font-extrabold font-header text-2xl my-5 text-[#ff8418]">
        Cakes
      </h1>
      <FoodCard category={category} />
    </div>
  );
};

export default Cakes;
