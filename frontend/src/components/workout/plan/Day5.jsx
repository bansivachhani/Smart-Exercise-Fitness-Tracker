// src/components/workout/days/Day5.jsx
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

export default function Day5() {
  return (
    <>
      <Navbar />
      <section className="pt-20 px-6 py-12 md:px-12 lg:px-28 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 min-h-screen">
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-500 text-center mb-4 drop-shadow-lg uppercase">
          Day 5 – Full Body Burn 🔥
        </h1>
        <p className="text-gray-300 text-center mb-10 text-lg">
          A{" "}
          <span className="text-orange-400 font-semibold">
            High-Intensity Full Body Workout
          </span>{" "}
          to build strength, endurance, and burn calories.
        </p>

        {/* Warm Up */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-4 uppercase">
            <FaFire /> Warm-Up (5 minutes)
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>2 minutes light jogging or high knees in place</li>
            <li>1 minute arm circles (forward and backward)</li>
            <li>1 minute leg swings (forward and side-to-side)</li>
            <li>1 minute dynamic stretches: torso twists, cat-cow</li>
          </ul>
          <div className="h-[2px] w-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 mt-5"></div>
        </div>

        {/* Workout Routine */}
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-6 uppercase">
            <FaDumbbell /> Workout Routine
          </h2>
          <div className="flex flex-col gap-6">
            {[
              { name: "Jumping Jacks", sets: "3 × 30s", tip: "Keep a steady pace and focus on controlled movements.", benefit: "Improves cardiovascular endurance and warms up muscles." },
              { name: "Squats (Bodyweight or Goblet)", sets: "3 × 15-20", tip: "Chest up, back straight, push through your heels.", benefit: "Strengthens quads, glutes, and core stability." },
              { name: "Push-ups", sets: "3 × Max reps", tip: "Keep your body in a straight line, engage your core.", benefit: "Builds upper body strength and endurance." },
              { name: "Mountain Climbers", sets: "3 × 30s", tip: "Bring knees towards chest in a running motion, keep core tight.", benefit: "Enhances core strength and cardiovascular fitness." },
              { name: "Lunges (Alternating Legs)", sets: "3 × 10-12 per leg", tip: "Keep front knee behind toes, lower back knee toward ground.", benefit: "Improves leg strength, balance, and coordination." },
              { name: "Plank", sets: "3 × 45-60s", tip: "Keep a straight line from head to heels, engage core & glutes.", benefit: "Strengthens core and improves posture." },
              { name: "Burpees", sets: "3 × 10-15", tip: "Explode up, control the movement down, maintain good form.", benefit: "Boosts cardiovascular endurance and full-body power." },
              { name: "Dumbbell Rows (Single Arm)", sets: "3 × 10-12 per arm", tip: "Pull dumbbell to hip, keep back flat.", benefit: "Strengthens upper back, shoulders, and biceps." },
              { name: "High Knees", sets: "3 × 30s", tip: "Drive knees up, pump arms for intensity.", benefit: "Improves leg power and cardio conditioning." },
              { name: "Glute Bridges", sets: "3 × 15-20", tip: "Squeeze glutes at top, lift hips off floor.", benefit: "Strengthens glutes and hamstrings." },
              { name: "Tricep Dips", sets: "3 × 10-15", tip: "Keep back close to bench, lower slowly.", benefit: "Targets triceps and shoulders." },
              { name: "Bicycle Crunches", sets: "3 × 15-20 per side", tip: "Twist torso, keep lower back pressed down.", benefit: "Enhances oblique and core strength." },
              { name: "Box Jumps (or Step-ups)", sets: "3 × 10-12", tip: "Land softly, step down carefully.", benefit: "Develops explosive leg power." },
              { name: "Dumbbell Shoulder Press", sets: "3 × 10-12", tip: "Press overhead, keep core tight.", benefit: "Strengthens shoulders and upper arms." },
              { name: "Reverse Crunches", sets: "3 × 15-20", tip: "Lift hips, focus on lower abs.", benefit: "Targets lower abs and core control." },
              { name: "Jump Squats", sets: "3 × 12-15", tip: "Explode up, land softly.", benefit: "Improves leg power and explosive strength." },
              { name: "Renegade Rows", sets: "3 × 8-10 per arm", tip: "Hold stable plank, minimize hip sway.", benefit: "Strengthens core, back, and arms." },
              { name: "Russian Twists", sets: "3 × 15-20 per side", tip: "Twist from torso, keep core engaged.", benefit: "Enhances rotational core strength." },
              { name: "Star Jumps", sets: "3 × 10-15", tip: "Explode from squat, spread arms and legs wide.", benefit: "Full-body explosive movement for cardio and strength." },
              { name: "Dumbbell Bicep Curls", sets: "3 × 10-12", tip: "Keep elbows tucked, control movement.", benefit: "Strengthens biceps and forearms." },
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
            <li>Hamstring stretch</li>
            <li>Quadriceps stretch</li>
            <li>Chest stretch</li>
            <li>Tricep stretch</li>
            <li>Shoulder stretch</li>
          </ul>
          <p className="mt-4 text-gray-400 italic">
            Hold each stretch for 20–30 seconds. Focus on deep breathing to aid recovery and relaxation.
          </p>
          <div className="h-[2px] w-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 mt-5"></div>
        </div>

        {/* Tips */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg hover:shadow-orange-500/30 transition mb-12">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-4 uppercase">
            <FaLightbulb /> Additional Tips
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-3 pl-4">
            <li>Rest <span className="text-yellow-400 font-semibold">30–45 sec</span> between sets to maintain intensity.</li>
            <li>Progress by adding more reps, sets, or reducing rest time.</li>
            <li>Always prioritize <span className="text-yellow-400 font-semibold">proper form</span> to prevent injury.</li>
            <li>Stay hydrated before, during, and after your workout.</li>
            <li>Listen to your body—modify or rest if needed.</li>
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-10 uppercase">
            Benefits of Full Body Workouts
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={<FaHeart />}
              title="Cardio & Endurance"
              text="Full-body movements enhance heart rate, stamina, and calorie burn."
            />
            <BenefitCard
              icon={<FaBolt />}
              title="Strength & Power"
              text="Compound exercises build functional strength across all muscle groups."
            />
            <BenefitCard
              icon={<FaRunning />}
              title="Agility & Coordination"
              text="Dynamic exercises improve balance, coordination, and athletic performance."
            />
            <BenefitCard
              icon={<FaSmile />}
              title="Confidence & Energy"
              text="Boosts mood, energy levels, and overall physical confidence."
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
