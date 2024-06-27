import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Spark } from "../assets/icons/sparkles-outline-svgrepo-com.svg";

const Register = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Spark className="text-[#bb86fc] fill-current w-9 h-9" />
          <h1 className="text-[#bb86fc] text-3xl text-center font-bold">
            The SocialSpark
          </h1>
        </div>

        <div className="mt-3 text-center">
          <h1 className="font-semibold text-lg">Create a new account</h1>
          <p className="text-gray-400 text-sm">
            Hello! Please enter your details.
          </p>
        </div>
        <div className="flex flex-col gap-3 my-8">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Username</label>
            <input
              type="text"
              className="px-3 py-2 bg-[#121212] text-sm border border-gray-400"
              placeholder="Enter your username here..."
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email</label>
            <input
              type="text"
              className="px-3 py-2 bg-[#121212] text-sm border border-gray-400"
              placeholder="Enter your email here..."
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Password</label>
            <input
              type="password"
              className="px-3 py-2 bg-[#121212] text-sm border border-gray-400"
              placeholder="Enter your password here..."
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              className="px-3 py-2 bg-[#121212] text-sm border border-gray-400"
              placeholder="Enter your password here..."
            />
          </div>
          <button className="py-1 mt-2 bg-[#bb86fc] rounded-lg font-semibold">
            Sign Up
          </button>
        </div>
        <h1 className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#bb86fc] font-semibold underline">
            Sign in
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Register;
