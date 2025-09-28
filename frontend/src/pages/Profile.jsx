// pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    goal: "Lose Weight",
    diet: "",
    stress_level: "medium",
  });

  const [suggestions, setSuggestions] = useState({
    yoga: [],
    meditation: [],
  });

  // Populate form with user data on load
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        age: user.age || "",
        height: user.height || "",
        weight: user.weight || "",
        goal: user.goal || "Lose Weight",
        diet: user.diet || "",
        stress_level: user.stress_level || "medium",
      });

      setSuggestions({
        yoga: user.suggested_yoga || [],
        meditation: user.suggested_meditation || [],
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      age: form.age ? parseInt(form.age) : null,
      height: form.height ? parseFloat(form.height) : null,
      weight: form.weight ? parseFloat(form.weight) : null,
      name: form.name || null,
      diet: form.diet || null,
      goal: form.goal || null,
      stress_level: form.stress_level || null,
    };

    try {
      const updated = await updateProfile(payload);

      // Update suggestions live
      setSuggestions({
        yoga: updated.suggested_yoga || [],
        meditation: updated.suggested_meditation || [],
      });

      alert("Profile updated ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile ❌");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-10 mt-8">
      <h1 className="text-3xl font-bold mb-6">Profile Settings ⚙️</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        {/* Name */}
        <label className="block">
          <span className="text-gray-300">Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 rounded-md bg-gray-800 text-white mt-1"
            required
          />
        </label>

        {/* Age */}
        <label className="block">
          <span className="text-gray-300">Age</span>
          <input
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="w-full p-2 rounded-md bg-gray-800 text-white mt-1"
          />
        </label>

        {/* Height */}
        <label className="block">
          <span className="text-gray-300">Height (cm)</span>
          <input
            type="number"
            value={form.height}
            onChange={(e) => setForm({ ...form, height: e.target.value })}
            className="w-full p-2 rounded-md bg-gray-800 text-white mt-1"
          />
        </label>

        {/* Weight */}
        <label className="block">
          <span className="text-gray-300">Weight (kg)</span>
          <input
            type="number"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            className="w-full p-2 rounded-md bg-gray-800 text-white mt-1"
          />
        </label>

        {/* Goal */}
        <label className="block">
          <span className="text-gray-300">Goal</span>
          <select
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            className="w-full p-2 rounded-md bg-gray-800 text-white mt-1"
          >
            <option value="weight_loss">Lose Weight</option>
            <option value="weight_gain">Gain Weight</option>
            <option value="fitness">Maintain Fitness</option>
          </select>
        </label>

        {/* Diet */}
        <label className="block">
          <span className="text-gray-300">Diet Preference</span>
          <input
            type="text"
            value={form.diet}
            onChange={(e) => setForm({ ...form, diet: e.target.value })}
            placeholder="e.g., Vegan, Keto, Vegetarian"
            className="w-full p-2 rounded-md bg-gray-800 text-white mt-1"
          />
        </label>

        {/* Stress Level */}
        <label className="block">
          <span className="text-gray-300">Stress Level</span>
          <select
            value={form.stress_level}
            onChange={(e) => setForm({ ...form, stress_level: e.target.value })}
            className="w-full p-2 rounded-md bg-gray-800 text-white mt-1"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-md font-semibold"
        >
          Save Changes
        </button>
      </form>

      {/* Suggestions Preview */}
      <div className="mt-6 w-full max-w-md bg-gray-800 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Your Suggestions 🧘‍♂️</h2>
        <div>
          <strong>Yoga:</strong>
          <ul className="list-disc list-inside">
            {suggestions.yoga.map((y, i) => (
              <li key={i}>{y}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <strong>Meditation:</strong>
          <ul className="list-disc list-inside">
            {suggestions.meditation.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
