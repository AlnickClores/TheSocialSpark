import React from "react";
import { menu } from "../data/menuData";

const FoodCard = () => {
  return (
    <div>
      {menu["main-course"].map((item, index) => (
        <div className="border border-blue-500" key={index}>
          <img src={item.image} alt="image" />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: {item.price}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FoodCard;
