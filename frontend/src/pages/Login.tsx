import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Spark } from "../assets/icons/sparkles-outline-svgrepo-com.svg";
import LoginForm from "../components/LoginForm";

const Login = () => {
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
          <h1 className="font-semibold text-lg">Log in to your account</h1>
          <p className="text-gray-400 text-sm">
            Welcome! Please enter your details.
          </p>
        </div>
        <LoginForm />
        <h1 className="text-sm text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#bb86fc] font-semibold underline"
          >
            Sign up
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
