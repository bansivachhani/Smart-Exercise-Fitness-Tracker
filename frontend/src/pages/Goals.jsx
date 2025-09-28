import React from "react";

export default function Goals({ title, progress }) {
  const progressWidth = Math.min(progress, 100); // cap at 100%
  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-5 rounded-2xl shadow-lg text-gray-100 hover:scale-105 transform transition">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
        <div
          className="bg-yellow-400 h-3 rounded-full transition-all"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <p className="text-sm">{progressWidth}% completed</p>
    </div>
  );
}
