import React from "react";
import Navbar from "../../components/Navbar";
import Basket from "../../components/Basket";
import FoodCard from "../../components/FoodCard";

const MainCourse = () => {
  return (
    <div>
      <Navbar />
      <h1>Main Course</h1>
      <FoodCard />
      <Basket />
    </div>
  );
};

export default MainCourse;
