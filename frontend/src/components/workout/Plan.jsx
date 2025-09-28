import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../workout/WorkoutNavbar";

const WorkoutPlanSection = () => {
  const navigate = useNavigate();

  const workoutDays = [
    { day: 1, focus: "Chest & Triceps", ex: 16, dur: "20 mins", goal: "Strength & Definition", benefit: "Build upper body strength and define muscles." },
    { day: 2, focus: "Arms & Shoulders", ex: 19, dur: "25 mins", goal: "Bicep & Deltoid Growth", benefit: "Enhances arm size, shoulder mobility, and posture." },
    { day: 3, focus: "Legs & Core", ex: 23, dur: "30 mins", goal: "Power & Stability", benefit: "Strengthens legs and core for better balance and power." },
    { day: 4, focus: "Back & Biceps", ex: 18, dur: "25 mins", goal: "Lat & Arm Development", benefit: "Builds back width, arm strength, and posture support." },
    { day: 5, focus: "Full Body Burn", ex: 20, dur: "35 mins", goal: "High Intensity & Cardio", benefit: "Boosts endurance, burns calories, and tones muscles." },
    { day: 6, focus: "Active Recovery & Stretch", ex: 10, dur: "40 mins", goal: "Flexibility & Mobility", benefit: "Enhances flexibility, reduces soreness, and improves recovery." },
  ];

  return (
    <>
      <Navbar />

      <section className="pt-20 px-6 py-12 md:px-12 lg:px-20 bg-gray-900 text-gray-100 font-poppins min-h-screen">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500">
            6 Days Weekly Workout Plan
          </h1>
          <p className="text-gray-300 mt-2">
            Sculpt your body, one day at a time, with our expertly crafted routine.
          </p>
        </div>

        {/* Workout Days Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutDays.map((d) => (
            <div
              key={d.day}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer border border-gray-700"
              onClick={() => navigate(`/workout/plan/D${d.day}`)}
            >
              <div className="text-xl font-semibold text-orange-400 mb-2">Day {d.day}</div>
              <div className="text-lg font-medium mb-3">{d.focus}</div>
              <div className="space-y-1 text-sm text-gray-300">
                <p>📊 Exercises: {d.ex}</p>
                <p>⏱ Duration: {d.dur}</p>
                <p>🔥 Focus: {d.goal}</p>
              </div>
              <p className="mt-3 text-green-400 font-medium text-sm">✅ Benefit: {d.benefit}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons & Rest Day */}
        <div className="text-center mt-10 space-y-6">
         

          <div className="mt-6 text-center bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
            <h2 className="text-2xl font-bold text-orange-400">😴 Day 7: Rest Day</h2>
            <p className="mt-2 text-gray-300">
              Remember, <strong>rest is crucial for muscle recovery and growth!</strong>{" "}
              Give your body time to repair, restore energy, and improve performance.
            </p>
            <p className="mt-2 text-green-400 font-medium">
              ✅ Benefits: Reduces fatigue, prevents injury, and enhances overall strength.
            </p>
          </div>

          <Link
            to="/connect_coach"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-md transition"
          >
            Connect with your Personalized Coach 👥
          </Link>
        </div>

        {/* Optional Overall Benefits */}
        <div className="max-w-5xl mx-auto text-center mt-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-10 uppercase">
            Benefits of Following this Plan
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon="❤️"
              title="Cardio & Endurance"
              text="Boost stamina, heart health, and calorie burn."
            />
            <BenefitCard
              icon="💪"
              title="Strength & Power"
              text="Build muscles and functional strength across all body parts."
            />
            <BenefitCard
              icon="🤸"
              title="Flexibility & Mobility"
              text="Increase joint range of motion and overall flexibility."
            />
            <BenefitCard
              icon="😄"
              title="Wellness & Confidence"
              text="Enhance mood, energy, and overall physical confidence."
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

/* Reusable Benefit Card */
const BenefitCard = ({ icon, title, text }) => (
  <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-md hover:shadow-lg border border-gray-700 text-gray-200">
    <div className="text-4xl mb-4 flex justify-center">{icon}</div>
    <h4 className="font-bold text-lg mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{text}</p>
  </div>
);

export default WorkoutPlanSection;
