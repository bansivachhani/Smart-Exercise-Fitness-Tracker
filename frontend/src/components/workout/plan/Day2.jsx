// src/components/workout/days/Day2.jsx
import React from "react";
import Navbar from "../WorkoutNavbar";
import Footer from "../../Footer";
import {
  FaDumbbell,
  FaFire,
  FaRegClock,
  FaLightbulb,
  FaHandRock,
  FaArrowUp,
  FaExpand,
  FaSmile,
} from "react-icons/fa";

export default function Day2() {
  return (
    <>
      <Navbar />
      <section className="pt-20 px-6 py-12 md:px-12 lg:px-28 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 min-h-screen">
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-500 text-center mb-4 drop-shadow-lg uppercase">
          Day 2 – Arms & Lats 💪
        </h1>
        <p className="text-gray-300 text-center mb-10 text-lg">
          Build strength and muscle with a{" "}
          <span className="text-orange-400 font-semibold">Arms + Lats</span>{" "}
          focused routine.
        </p>

        {/* Warm Up */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-4 uppercase">
            <FaFire /> Warm-Up (5–10 minutes)
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Arm Circles</li>
            <li>Jumping Jacks</li>
            <li>Dumbbell Shoulder Press (light weight)</li>
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
                name: "Bicep Curls",
                sets: "3 Sets × 10-15 Reps",
                tip: "Curl dumbbells while keeping elbows close to your body.",
                benefit:
                  "Improves arm definition and builds stronger, more toned biceps.",
              },
              {
                name: "Tricep Extensions",
                sets: "3 Sets × 10-12 Reps",
                tip: "Hold dumbbell overhead, lower behind neck, extend back up.",
                benefit:
                  "Strengthens triceps for better pushing strength and balanced arm development.",
              },
              {
                name: "Lat Pulldowns",
                sets: "3 Sets × 10-12 Reps",
                tip: "Use cable machine, pull bar down to chest, keep back straight.",
                benefit: "Targets lats for a wider back and better posture.",
              },
              {
                name: "Seated Rows",
                sets: "3 Sets × 10-12 Reps",
                tip: "Sit straight, pull handles to your body, squeeze lats.",
                benefit:
                  "Builds a stronger mid-back, improves pulling power, and enhances posture.",
              },
              {
                name: "Push-Ups",
                sets: "3 Sets × 10-15 Reps",
                tip: "Body straight, lower until chest nearly touches the ground.",
                benefit:
                  "Works chest, shoulders, and triceps while improving endurance.",
              },
              {
                name: "Hammer Curls",
                sets: "3 Sets × 12-15 Reps",
                tip: "Hold dumbbells with neutral grip (palms facing in). Great for forearms too.",
                benefit: "Builds forearm strength and adds thickness to biceps.",
              },
              {
                name: "Pull-Ups / Assisted Pull-Ups",
                sets: "3 Sets × Max Reps",
                tip: "Engage lats and avoid swinging. Use resistance band if needed.",
                benefit:
                  "Enhances overall back strength, grip power, and upper body endurance.",
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
                <p className="text-sm text-green-400 mt-2">✅ {ex.benefit}</p>
              </div>
            ))}
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 mt-10"></div>
        </div>

        {/* Cool Down */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-4 uppercase">
            <FaRegClock /> Cool Down (5–10 minutes)
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Overhead Tricep Stretch</li>
            <li>Cross-Body Shoulder Stretch</li>
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
              Rest{" "}
              <span className="text-yellow-400 font-semibold">30–60 sec</span>{" "}
              between sets.
            </li>
            <li>Stay hydrated before, during, and after workout.</li>
            <li>Focus on proper form to avoid injury & maximize gains.</li>
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-10 uppercase">
            Benefits of Arms & Lats Training
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={<FaHandRock />}
              title="Powerful Grip"
              text="Rows and pull-ups build grip strength essential for lifting and daily tasks."
            />
            <BenefitCard
              icon={<FaArrowUp />}
              title="Wider Back"
              text="Lat training gives a strong V-taper look and enhances posture."
            />
            <BenefitCard
              icon={<FaExpand />}
              title="Bigger Arms"
              text="Bicep and tricep exercises add thickness, size, and strength to arms."
            />
            <BenefitCard
              icon={<FaSmile />}
              title="Confidence & Strength"
              text="Strong arms and back boost athletic performance and self-esteem."
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
