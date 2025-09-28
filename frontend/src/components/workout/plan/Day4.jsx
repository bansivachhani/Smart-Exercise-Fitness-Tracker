// src/components/workout/days/Day4.jsx
import React from "react";
import Navbar from "../WorkoutNavbar";
import Footer from "../../Footer";
import {
  FaDumbbell,
  FaFire,
  FaRegClock,
  FaLightbulb,
  FaHeart,
  FaBolt,
  FaRunning,
  FaSmile,
} from "react-icons/fa";

export default function Day4() {
  return (
    <>
      <Navbar />
      <section className="pt-20 px-6 py-12 md:px-12 lg:px-28 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 min-h-screen">
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-500 text-center mb-4 drop-shadow-lg uppercase">
          Day 4 – Chest & Triceps 🔥
        </h1>
        <p className="text-gray-300 text-center mb-10 text-lg">
          Strengthen and sculpt your{" "}
          <span className="text-orange-400 font-semibold uppercase">
            Chest + Triceps
          </span>{" "}
          with this power-packed routine.
        </p>

        {/* Warm Up */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-4 uppercase">
            <FaFire /> Warm-Up (5–10 Minutes)
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Arm Circles</li>
            <li>Push-Ups (Light Intensity)</li>
            <li>Dynamic Upper Body Stretches</li>
          </ul>
          <div className="h-[2px] w-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 mt-5"></div>
        </div>

        {/* Workout Routine */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-6 uppercase">
            <FaDumbbell /> Workout Routine
          </h2>
          <div className="flex flex-col gap-6">
            {[
              {
                name: "Push-Ups",
                sets: "3 Sets × 10-15 Reps",
                tip: "Keep body straight, lower chest near the floor.",
                benefit: "Works chest, shoulders, and triceps while improving endurance.",
              },
              {
                name: "Dumbbell Bench Press",
                sets: "3 Sets × 10-12 Reps",
                tip: "Press dumbbells above chest, lower slowly to sides.",
                benefit: "Builds chest and triceps strength with controlled movement.",
              },
              {
                name: "Incline Dumbbell Press",
                sets: "3 Sets × 10-12 Reps",
                tip: "Bench at 30–45°, press dumbbells upward.",
                benefit: "Targets upper chest and shoulders for balanced development.",
              },
              {
                name: "Chest Fly (Dumbbells)",
                sets: "3 Sets × 10-12 Reps",
                tip: "Arms slightly bent, open wide then bring together.",
                benefit: "Improves chest stretch and contraction for better muscle definition.",
              },
              {
                name: "Tricep Dips",
                sets: "3 Sets × 10-15 Reps",
                tip: "Lower body with elbows close using a bench/chair.",
                benefit: "Strengthens triceps and improves pushing power.",
              },
              {
                name: "Overhead Tricep Extension",
                sets: "3 Sets × 10-12 Reps",
                tip: "Lower dumbbell behind head, extend back up.",
                benefit: "Enhances tricep strength and arm stability.",
              },
              {
                name: "Close-Grip Push-Ups",
                sets: "3 Sets × 10-12 Reps",
                tip: "Hands under chest to target triceps.",
                benefit: "Isolates triceps for better muscle tone.",
              },
              {
                name: "Tricep Kickbacks",
                sets: "3 Sets × 10-12 Reps",
                tip: "Bend at waist, extend arms backward with dumbbells.",
                benefit: "Strengthens triceps and improves arm definition.",
              },
            ].map((ex, i) => (
              <div
                key={i}
                className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-[1.02] hover:border-orange-400 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-2 uppercase">
                  {ex.name}
                </h3>
                <span className="inline-block bg-orange-500 text-black text-sm font-bold px-3 py-1 rounded-full mb-3">
                  {ex.sets}
                </span>
                <p className="text-md text-gray-300 italic">💡 {ex.tip}</p>
                <p className="text-md text-green-400 mt-2">
                  ✅ Benefit: {ex.benefit}
                </p>
              </div>
            ))}
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 mt-10"></div>
        </div>

        {/* Cool Down */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-4 uppercase">
            <FaRegClock /> Cool Down (5–10 Minutes)
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Doorway Chest Stretch</li>
            <li>Overhead Tricep Stretch</li>
            <li>Deep Breathing & Relaxation</li>
          </ul>
          <div className="h-[2px] w-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 mt-5"></div>
        </div>

        {/* Tips */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg hover:shadow-orange-500/30 transition mb-12">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-4 uppercase">
            <FaLightbulb /> Additional Tips
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-3 pl-4">
            <li>
              Rest <span className="text-yellow-400 font-semibold">30–60 Sec</span> Between Sets.
            </li>
            <li>Progress Gradually By Adding Reps Or Increasing Weight.</li>
            <li>Focus On Proper Form To Prevent Injury & Maximize Results.</li>
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-10 uppercase">
            Benefits of Chest & Triceps Training
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={<FaHeart />}
              title="Stronger Heart & Lungs"
              text="Push-ups and presses improve cardiovascular endurance and overall heart health."
            />
            <BenefitCard
              icon={<FaBolt />}
              title="Explosive Strength"
              text="Build explosive pushing power that translates to sports and daily activities."
            />
            <BenefitCard
              icon={<FaRunning />}
              title="Better Posture"
              text="Balanced chest and triceps training reduces slouching and improves posture."
            />
            <BenefitCard
              icon={<FaSmile />}
              title="Confidence Boost"
              text="A stronger upper body improves physique, strength, and self-esteem."
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

/* Reusable Benefit Card */
const BenefitCard = ({ icon, title, text }) => (
  <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-md hover:shadow-lg border border-gray-700 text-gray-200">
    <div className="text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 flex justify-center">
      {icon}
    </div>
    <h4 className="font-bold text-lg mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{text}</p>
  </div>
);
