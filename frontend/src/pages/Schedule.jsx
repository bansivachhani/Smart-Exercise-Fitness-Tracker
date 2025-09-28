import React from "react";

export default function Schedule({ day, task, time, completed }) {
  return (
    <div
      className={`bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition flex items-center justify-between`}
    >
      <div>
        <h4 className="font-bold text-yellow-400">{day}</h4>
        <p className="text-gray-100 mt-1">{task}</p>
        <span className="text-gray-400 text-sm">{time}</span>
      </div>
      {completed && (
        <span className="text-green-500 font-bold text-xl">✅</span>
      )}
    </div>
  );
}
