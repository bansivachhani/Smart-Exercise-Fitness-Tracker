// src/components/workout/days/Day3.jsx
import React from "react";
import Navbar from "../WorkoutNavbar";
import Footer from "../../Footer";
import {
  FaDumbbell,
  FaFire,
  FaRegClock,
  FaLightbulb,
  FaRunning,
  FaBolt,
  FaArrowUp,
  FaSmile,
} from "react-icons/fa";

export default function Day3() {
  return (
    <>
      <Navbar />
      <section className="pt-20 px-6 py-12 md:px-12 lg:px-28 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 min-h-screen">
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-500 text-center mb-4 drop-shadow-lg uppercase">
          Day 3 – Legs & Core 🦵
        </h1>
        <p className="text-gray-300 text-center mb-10 text-lg">
          Build strength and endurance with a{" "}
          <span className="text-orange-400 font-semibold">Leg-focused</span>{" "}
          routine for lower body power.
        </p>

        {/* Warm Up */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-4 uppercase">
            <FaFire /> Warm-Up (5–10 minutes)
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Leg Swings</li>
            <li>Bodyweight Squats</li>
            <li>Lunges (forward and backward)</li>
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
                name: "Squats",
                sets: "3 Sets × 10-15 Reps",
                tip: "Keep your chest up and push through your heels as you rise.",
                benefit:
                  "Strengthens quads, glutes, and hamstrings while boosting overall lower body power.",
              },
              {
                name: "Lunges",
                sets: "3 Sets × 10-12 Reps (each leg)",
                tip: "Step forward and lower your back knee toward the ground.",
                benefit:
                  "Improves balance, coordination, and targets glutes, hamstrings, and quads.",
              },
              {
                name: "Leg Press",
                sets: "3 Sets × 10-12 Reps",
                tip: "Adjust the seat, keep feet shoulder-width apart, and push the platform away.",
                benefit:
                  "Develops lower body strength safely and effectively with controlled resistance.",
              },
              {
                name: "Calf Raises",
                sets: "3 Sets × 12-15 Reps",
                tip: "Stand on the edge of a step, raise your heels, then lower below step level.",
                benefit: "Builds calf muscle endurance and improves ankle stability.",
              },
              {
                name: "Deadlifts",
                sets: "3 Sets × 10-12 Reps",
                tip: "Keep your back straight and lift with your legs as you pull the barbell up.",
                benefit:
                  "Strengthens hamstrings, glutes, and core while improving posture and grip strength.",
              },
              {
                name: "Bulgarian Split Squats",
                sets: "3 Sets × 10-12 Reps (each leg)",
                tip: "Place rear foot on a bench, squat with front leg keeping torso upright.",
                benefit:
                  "Enhances single-leg strength, balance, and glute development.",
              },
              {
                name: "Step-Ups",
                sets: "3 Sets × 12 Reps (each leg)",
                tip: "Step onto a bench/box, push through your heel to rise, alternate legs.",
                benefit:
                  "Boosts functional strength and improves balance while working quads and glutes.",
              },
              {
                name: "Hip Thrusts",
                sets: "3 Sets × 12-15 Reps",
                tip: "Rest upper back on a bench, thrust hips upward while squeezing glutes.",
                benefit:
                  "Excellent for glute growth, hip strength, and core stability.",
              },
              {
                name: "Glute Bridges",
                sets: "3 Sets × 12-15 Reps",
                tip: "Lie flat, bend knees, lift hips upward while contracting glutes.",
                benefit:
                  "Strengthens glutes and lower back while improving hip mobility.",
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
            <FaRegClock /> Cool Down (5–10 minutes)
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Hamstring Stretch</li>
            <li>Quadriceps Stretch</li>
            <li>Glute Stretch</li>
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
              Rest <span className="text-yellow-400 font-semibold">30–60 sec</span> between sets.
            </li>
            <li>Stay hydrated before, during, and after your workout.</li>
            <li>Focus on proper form to prevent injury and maximize effectiveness.</li>
            <li>Increase resistance gradually to challenge your muscles.</li>
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-10 uppercase">
            Benefits of Legs & Core Training
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={<FaRunning />}
              title="Improved Endurance"
              text="Leg and core training boosts stamina for sports and daily activity."
            />
            <BenefitCard
              icon={<FaBolt />}
              title="Explosive Power"
              text="Squats, lunges, and deadlifts develop strength for jumps and sprints."
            />
            <BenefitCard
              icon={<FaArrowUp />}
              title="Better Posture"
              text="Strong core stabilizes the spine and improves overall posture."
            />
            <BenefitCard
              icon={<FaSmile />}
              title="Confidence & Strength"
              text="A strong lower body enhances physique, mobility, and self-esteem."
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
