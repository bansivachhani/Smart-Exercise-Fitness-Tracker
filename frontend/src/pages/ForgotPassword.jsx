// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here later we can add API call to send reset link
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Forgot Password?
        </h2>

        {!submitted ? (
          <>
            <p className="text-gray-400 mb-6 text-center">
              Enter your registered email, and we’ll send you a reset link.
            </p>

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 rounded-lg bg-neutral-800 border border-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 py-3 rounded-lg font-semibold text-lg hover:opacity-90"
            >
              Send Reset Link
            </button>
          </>
        ) : (
          <p className="text-green-400 text-center">
            ✅ If an account with <b>{email}</b> exists, a reset link was sent!
          </p>
        )}

        <p className="text-center text-gray-400 mt-6">
          <Link to="/login" className="text-pink-400 hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
