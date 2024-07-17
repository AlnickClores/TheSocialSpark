import React, { useState } from "react";

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckPassword = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const checkPassword = handleCheckPassword();
    if (!checkPassword) {
      return;
    }
    alert("Registration Successful.");
  };

  return (
    <form className="flex flex-col gap-3 my-8" onSubmit={handleRegister}>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-2 bg-[#121212] text-sm border border-gray-400"
          placeholder="Enter your username here..."
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 bg-[#121212] text-sm border border-gray-400"
          placeholder="Enter your email here..."
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 bg-[#121212] text-sm border border-gray-400"
          placeholder="Enter your password here..."
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-3 py-2 bg-[#121212] text-sm border border-gray-400"
          placeholder="Enter your password here..."
          required
        />
      </div>
      {errorMessage && (
        <p className="text-xs text-red-600 font-semibold text-center">
          {errorMessage}
        </p>
      )}
      <button
        className="py-1 mt-2 bg-[#bb86fc] rounded-lg font-semibold"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
