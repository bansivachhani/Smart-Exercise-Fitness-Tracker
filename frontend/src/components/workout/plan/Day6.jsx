// src/components/workout/days/Day6.jsx
import React from "react";
import Navbar from "../WorkoutNavbar";
import Footer from "../../Footer";
import { FaDumbbell, FaFire, FaRegClock, FaLightbulb, FaHeart, FaBolt, FaRunning, FaSmile } from "react-icons/fa";

export default function Day6() {
  return (
    <>
      <Navbar />
      <section className="pt-20 px-6 py-12 md:px-12 lg:px-28 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 min-h-screen">
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-500 text-center mb-4 drop-shadow-lg uppercase">
          Day 6 – Active Recovery & Stretch 🧘‍♂
        </h1>
        <p className="text-gray-300 text-center mb-10 text-lg">
          A{" "}
          <span className="text-orange-400 font-semibold">
            Gentle Recovery & Mobility Routine
          </span>{" "}
          designed to improve flexibility, reduce soreness, and promote relaxation.
        </p>

        {/* Warm Up */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-4 uppercase">
            <FaFire /> Warm-Up (5–10 minutes)
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>2–3 minutes Light Cardio (gentle marching in place, arm circles)</li>
            <li>2–3 minutes Dynamic Stretches (Cat-Cow, gentle torso twists, leg swings)</li>
          </ul>
          <div className="h-[2px] w-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 mt-5"></div>
        </div>

        {/* Active Recovery & Stretch */}
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-6 uppercase">
            <FaDumbbell /> Active Recovery & Stretch
          </h2>
          <div className="flex flex-col gap-6">
            {[
              { name: "Cat-Cow Stretch", sets: "3 × 10-12 controlled", tip: "Synchronize movement with breath for spinal mobility.", benefit: "Increases spinal flexibility and warms up back muscles." },
              { name: "Bird-Dog", sets: "3 × 10-12 per side", tip: "Maintain a flat back, move slowly for core stability.", benefit: "Strengthens core, improves balance and coordination." },
              { name: "Child's Pose (Balasana)", sets: "3 × 30-60s hold", tip: "Relax into the stretch, focus on deep breaths.", benefit: "Relieves lower back tension and promotes relaxation." },
              { name: "Downward-Facing Dog", sets: "3 × 30-60s hold", tip: "Press heels down, lengthen spine, slight bend in knees if tight.", benefit: "Stretches hamstrings, calves, shoulders, and spine." },
              { name: "Standing Hamstring Stretch", sets: "3 × 30s per leg", tip: "Hinge from hips, avoid rounding your spine.", benefit: "Improves hamstring flexibility and reduces lower back tightness." },
              { name: "Standing Quad Stretch", sets: "3 × 30s per leg", tip: "Keep knees together, gently pull heel toward glute.", benefit: "Stretches quadriceps and hip flexors." },
              { name: "Figure-Four Stretch (Supine)", sets: "3 × 30s per side", tip: "Cross ankle over opposite knee, pull thigh toward chest.", benefit: "Opens hips and glutes, relieves tension." },
              { name: "Seated Thoracic Spine Rotation", sets: "3 × 10-12 per side", tip: "Sit tall, twist from upper back, keep hips stable.", benefit: "Improves thoracic spine mobility and posture." },
              { name: "Side Bend Stretch (Standing)", sets: "3 × 30s per side", tip: "Reach overhead and lean gently to stretch torso.", benefit: "Stretches obliques and lateral torso muscles." },
              { name: "Wrist & Ankle Circles", sets: "3 × 10-15 circles each direction", tip: "Move slowly and controlled for mobility.", benefit: "Improves joint mobility and circulation." },
              { name: "Seated Forward Fold", sets: "3 × 30-45s hold", tip: "Reach for your toes, keep spine long, avoid rounding lower back.", benefit: "Stretches hamstrings, calves, and spine." },
              { name: "Butterfly Stretch", sets: "3 × 30-45s hold", tip: "Press knees gently toward the floor, keep back upright.", benefit: "Opens hips and groin muscles." },
              { name: "Hip Flexor Stretch (Low Lunge)", sets: "3 × 30s per side", tip: "Keep front knee over ankle, push hips gently forward.", benefit: "Stretches hip flexors and quads." },
              { name: "Pigeon Pose", sets: "3 × 30s per side", tip: "Stretch glutes & hips, keep chest lifted.", benefit: "Opens hips and stretches glutes deeply." },
              { name: "Chest Opener (Standing or Wall)", sets: "3 × 30s hold", tip: "Clasp hands behind back or press against wall, open chest wide.", benefit: "Improves chest flexibility and posture." },
              { name: "Upper Trap Stretch (Neck)", sets: "3 × 20-30s per side", tip: "Tilt head gently to the side, avoid pulling too hard.", benefit: "Relieves neck tension and improves posture." },
              { name: "Calf Stretch (Wall or Step)", sets: "3 × 30s per side", tip: "Press heel into floor, lean forward to stretch calf muscles.", benefit: "Increases calf flexibility and ankle mobility." },
              { name: "Spinal Twist (Supine)", sets: "3 × 20-30s per side", tip: "Lay on your back, drop knees to one side, arms extended wide.", benefit: "Improves spinal rotation and relieves lower back tension." },
            ].map((ex, i) => (
              <div
                key={i}
                className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-[1.02] hover:border-orange-400 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-2 uppercase">{ex.name}</h3>
                <span className="inline-block bg-orange-500 text-black text-sm font-bold px-3 py-1 rounded-full mb-3">{ex.sets}</span>
                <p className="text-md text-gray-300 italic">💡 {ex.tip}</p>
                <p className="text-md text-green-400 mt-2">✅ Benefit: {ex.benefit}</p>
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
            <li>Chest Stretch</li>
            <li>Tricep Stretch</li>
            <li>Shoulder Stretch</li>
          </ul>
          <p className="mt-4 text-gray-400 italic">
            Hold each stretch for 20–30 seconds. Focus on deep, calming breaths to aid recovery and relaxation.
          </p>
          <div className="h-[2px] w-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 mt-5"></div>
        </div>

        {/* Additional Tips */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg hover:shadow-orange-500/30 transition mb-12">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-400 mb-4 uppercase">
            <FaLightbulb /> Additional Tips
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-3 pl-4">
            <li>Stay hydrated throughout the day to support recovery. </li>
            <li>Focus on your breathing and mind-body connection during stretches.</li>
            <li>Avoid pushing into pain—the goal is gentle movement. </li>
            <li>Consistency improves flexibility and reduces soreness. </li>
            <li>Pay attention to body alignment for better balance and coordination. </li>
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-10 uppercase">
            Benefits of Active Recovery
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={<FaHeart />}
              title="Improved Recovery"
              text="Helps muscles recover faster and reduces soreness."
            />
            <BenefitCard
              icon={<FaBolt />}
              title="Flexibility & Mobility"
              text="Enhances joint range of motion and muscle elasticity."
            />
            <BenefitCard
              icon={<FaRunning />}
              title="Balance & Coordination"
              text="Boosts body awareness, stability, and coordination."
            />
            <BenefitCard
              icon={<FaSmile />}
              title="Relaxation & Wellness"
              text="Reduces stress and promotes mind-body connection."
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
