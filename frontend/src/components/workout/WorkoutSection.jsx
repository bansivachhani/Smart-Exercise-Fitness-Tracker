import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { FaAppleAlt, FaDumbbell, FaBrain, FaMedal } from "react-icons/fa";

const sections = [
  {
    title: "Diet & Nutrition",
    desc: "Balanced meal plans to fuel your body and achieve your goals.",
    img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    icon: <FaAppleAlt />,
    path: "diet",
  },
  {
    title: "Yoga",
    desc: "Improve flexibility, reduce stress, and boost mindfulness.",
    img: "https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg",
    icon: <FaDumbbell />,
    path: "yoga",
  },
  {
    title: "Meditation",
    desc: "Relax, recharge, and enhance focus with guided meditation.",
    img: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
    icon: <FaBrain />,
    path: "meditation",
  },
  {
    title: "Challenges",
    desc: "Stay motivated with fun weekly and monthly fitness challenges.",
    img: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
    icon: <FaMedal />,
    path: "challenges",
  },
];

export default function WorkoutSection() {
  return (
    <>
      <div className="bg-gray-900 min-h-screen font-poppins text-gray-100 px-6 md:px-12 lg:px-20 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 drop-shadow-lg">
            Explore Workout Sections
          </h1>
          <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Choose your fitness journey and transform your body with expert-guided programs 💪
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section, index) => (
            <Link key={index} to={`/workout/${section.path}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer group">
                <img
                  src={section.img}
                  alt={section.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col justify-center items-center text-center px-6">
                  <div className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                  <p className="text-gray-200 text-sm">{section.desc}</p>
                  <span className="mt-4 inline-block bg-gradient-to-r from-orange-400 to-pink-500 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Extra Section: Benefits */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Why Explore These Sections?
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition">
              <FaAppleAlt className="text-4xl text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Nutrition</h3>
              <p className="text-gray-300 text-sm">
                Proper diet fuels workouts and helps muscle recovery.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition">
              <FaDumbbell className="text-4xl text-orange-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Strength</h3>
              <p className="text-gray-300 text-sm">
                Build muscle and improve overall body strength effectively.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition">
              <FaBrain className="text-4xl text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Mindfulness</h3>
              <p className="text-gray-300 text-sm">
                Meditation and yoga enhance focus, calmness, and mental health.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition">
              <FaMedal className="text-4xl text-pink-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Challenges</h3>
              <p className="text-gray-300 text-sm">
                Engage in challenges to stay motivated and track your progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
