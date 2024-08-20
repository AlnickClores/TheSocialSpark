import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const [userCredential, setUserCredential] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<String | null>(null);

  const handleChange = (e: any) => {
    setUserCredential((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        userCredential
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      setError(null);
      navigate("/homepage");
    } catch (error) {
      setError(null);
      setTimeout(() => {
        setError("Invalid username or password.");
      }, 0);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3 my-8">
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          className="px-3 py-2 bg-[#121212] text-sm border border-gray-400"
          placeholder="Enter your email here..."
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="px-3 py-2 bg-[#121212] text-sm border border-gray-400"
          placeholder="Enter your password here..."
          required
        />
      </div>
      {error && (
        <p className="text-sm text-center text-red-500 font-semibold animate-shake">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="py-1 mt-2 bg-[#bb86fc] rounded-lg font-semibold"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
