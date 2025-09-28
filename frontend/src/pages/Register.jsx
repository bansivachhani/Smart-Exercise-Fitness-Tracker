import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    goal: "Lose Weight",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.goal
    );

    Swal.fire({
      icon: "success",
      title: `Registered successfully, ${data.name}!`,
      confirmButtonText: "OK",
      background: "#1f2937",
      color: "#fff",
    });

    navigate("/dashboard");
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: err.message,
      confirmButtonText: "OK",
      background: "#1f2937",
      color: "#fff",
    });
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account ✨
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 mb-4 rounded-lg bg-neutral-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 mb-4 rounded-lg bg-neutral-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-neutral-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <select
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className="w-full p-3 mb-6 rounded-lg bg-neutral-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option>Lose Weight</option>
          <option>Gain Weight</option>
          <option>Maintain Weight</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
