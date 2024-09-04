import React from "react";
import { Link } from "react-router-dom";
import Image404 from "../assets/images/8.png";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center px-3 h-screen bg-[#121212]">
      <img src={Image404} alt="Image 404" />
      <p className="text-2xl font-bold text-center text-[#bb86fc]">
        The page you are looking for does not exist.
      </p>
      <Link className="bg-[#bb86fc] p-2 rounded-xl mt-10 font-bold" to="/">
        Go to Login Page
      </Link>
    </div>
  );
};

export default Page404;
