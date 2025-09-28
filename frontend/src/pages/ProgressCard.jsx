import React from "react";

function Card({ children, className = "" }) {
  return <div className={`p-6 rounded-2xl shadow ${className}`}>{children}</div>;
}

export default function ProgressCard({ user }) {
  return (
    <>
      <Card className="bg-gray-800 text-gray-100">
        <h2 className="text-lg font-semibold">Good Morning, {user.name} 🎉</h2>
        <p className="text-sm text-gray-400">
          {user.weight}kg • {user.height} • {user.age} yrs
        </p>
      </Card>

      <Card className="bg-gray-800 text-gray-100">
        <h2 className="text-lg font-semibold">Heart Beat</h2>
        <p className="text-2xl font-bold">{user.heartbeat} bpm</p>
        <p className={user.heartbeat > 100 ? "text-red-500" : "text-green-500"}>
          {user.heartbeat > 100 ? "High" : "Normal"}
        </p>
      </Card>
    </>
  );
}
