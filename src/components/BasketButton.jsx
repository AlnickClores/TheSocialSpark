import React from "react";
import { icons } from "../assets/icons/icons";
import { Link } from "react-router-dom";

const Basket = () => {
  return (
    <Link
      className="fixed right-4 bottom-4 p-3 bg-[#ff8418] rounded-full"
      to="/basket"
    >
      {icons.basket}
    </Link>
  );
};

export default Basket;
