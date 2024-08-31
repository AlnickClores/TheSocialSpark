import React from "react";
import Navbar from "../../components/Navbar";
import BasketButton from "../../components/BasketButton";
import FoodCard from "../../components/FoodCard";

const MainCourse = () => {
  const category = "main-course";
  return (
    <div className="h-screen">
      <Navbar />
      <h1 className="text-center uppercase font-extrabold font-header text-2xl my-5 text-[#ff8418]">
        Main Course
      </h1>
      <FoodCard category={category} />
      <BasketButton />
    </div>
  );
};

export default MainCourse;
