import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import { icons } from "../assets/icons/icons";

const Register = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          {icons.spark}
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
        <RegistrationForm />
        <h1 className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/" className="text-[#bb86fc] font-semibold underline">
            Sign in
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Register;
