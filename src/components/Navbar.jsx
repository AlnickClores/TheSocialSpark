import React from "react";
import Logo from "../assets/icons/travelmug-logo.png";
import { Link } from "react-router-dom";
import { icons } from "../assets/icons/icons";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggleMenu = () => {
    setOpen(!open);
  };
  return (
    <div className="flex items-center justify-center sticky top-0 z-50 w-full bg-[#161616]">
      <nav className="flex justify-between items-center w-full h-20 px-5 text-[#ff8418] max-w-[630px]">
        <div>
          <Link
            className="text-2xl cursor-pointer uppercase font-bold tracking-widest"
            to="/"
          >
            <img className="w-11" src={Logo} alt="logo" />
          </Link>
        </div>

        <div
          className="block cursor-pointer z-50"
          onClick={() => {
            handleToggleMenu();
          }}
        >
          {open ? icons.cross : icons.hamburger}
        </div>
        <div
          className={`flex flex-col items-center justify-center fixed inset-0 bg-[#161616] backdrop-blur-lg ${
            open ? "block" : "hidden"
          }`}
        >
          <Link to="/">
            <img className="w-36" src={Logo} alt="logo" />
          </Link>

          <ul className="flex flex-col justify-center items-center gap-5 text-xl my-5 font-bold uppercase">
            <li className="border-b-2 border-[#ff8418] pb-1">
              <Link to="/main-course">Main Course</Link>
            </li>
            <li className="border-b-2 border-[#ff8418] pb-1">
              <Link to="/desserts">Desserts</Link>
            </li>
            <li className="border-b-2 border-[#ff8418] pb-1">
              <Link to="/burgers">Burgers</Link>
            </li>
            <li className="border-b-2 border-[#ff8418] pb-1">
              <Link to="/drinks">Drinks</Link>
            </li>
            <li className="border-b-2 border-[#ff8418] pb-1">
              <Link to="/coffee">Coffee</Link>
            </li>
            <li className="border-b-2 border-[#ff8418] pb-1">
              <Link to="/cakess">Cakes</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
