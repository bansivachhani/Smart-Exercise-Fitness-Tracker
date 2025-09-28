// src/pages/ConnectCoach.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaArrowLeft,
  FaHandshake,
  FaStar,
  FaEnvelope,
  FaCalendarAlt,
  FaMedal,
} from "react-icons/fa";

export default function ConnectCoach() {
  const navigate = useNavigate();

  const coaches = [
    {
      name: "John Doe",
      expertise: "Strength & Conditioning",
      rating: 4.9,
      experience: "8+ years",
      bio: "Helping people transform their bodies with sustainable fitness strategies.",
      specializations: ["Weight Loss", "Muscle Gain", "HIIT", "Nutrition Guidance"],
      availability: ["Mon", "Wed", "Fri", "Sat"],
      reviews: [
        { user: "Rahul", feedback: "Great trainer, very motivating!" },
        { user: "Priya", feedback: "Loved the custom plan." },
      ],
    },
    {
      name: "Samantha Lee",
      expertise: "Yoga & Flexibility Training",
      rating: 4.8,
      experience: "6+ years",
      bio: "Certified yoga instructor helping clients improve flexibility, balance, and mindfulness.",
      specializations: ["Yoga", "Mobility", "Meditation", "Stress Relief"],
      availability: ["Tue", "Thu", "Sat"],
      reviews: [{ user: "Anita", feedback: "Her yoga sessions are very relaxing." }],
    },
    {
      name: "Arjun Mehta",
      expertise: "Functional Training & CrossFit",
      rating: 5.0,
      experience: "10+ years",
      bio: "Dedicated to building strength, agility, and endurance through functional training.",
      specializations: ["CrossFit", "Endurance", "Agility Drills", "Athlete Training"],
      availability: ["Mon", "Wed", "Fri"],
      reviews: [{ user: "Karan", feedback: "Best CrossFit coach!" }],
    },
    {
      name: "Neha Kapoor",
      expertise: "Mental Fitness & Mindfulness Coaching",
      rating: 4.9,
      experience: "7+ years",
      bio: "Guiding individuals to achieve mental clarity, resilience, and stress-free living through mindfulness and meditation.",
      specializations: ["Mindfulness", "Meditation", "Stress Management", "Focus Training"],
      availability: ["Tue", "Thu", "Sun"],
      reviews: [{ user: "Sneha", feedback: "Really helped with my stress levels." }],
    },
    {
    name: "Michael Johnson",
    expertise: "Sports Performance Coach",
    rating: 4.7,
    experience: "9+ years",
    bio: "Helping athletes maximize performance with tailored sports conditioning and recovery programs.",
    specializations: ["Athlete Training", "Injury Prevention", "Recovery", "Speed & Agility"],
    availability: ["Mon", "Tue", "Thu", "Sat"],
    reviews: [{ user: "Rohit", feedback: "Helped me recover from injury fast and strong." }],
  },
  {
    name: "Ananya Sharma",
    expertise: "Dance Fitness & Zumba",
    rating: 4.8,
    experience: "5+ years",
    bio: "Making workouts fun with high-energy dance and Zumba sessions to keep you fit and happy.",
    specializations: ["Zumba", "Cardio Dance", "Aerobics", "Group Fitness"],
    availability: ["Wed", "Fri", "Sun"],
    reviews: [{ user: "Megha", feedback: "Best Zumba sessions! Super fun and energetic." }],
  },
  ];

  return (
    <section className="pt-20 px-6 py-12 md:px-12 lg:px-28 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-yellow-400 hover:text-orange-400 transition"
      >
        <FaArrowLeft /> Back to Marketplace
      </button>

      {/* Coaches Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {coaches.map((coach, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:shadow-orange-500/20 transition flex flex-col h-full p-8"
          >
            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-3xl text-black shadow-lg">
                <FaUserTie />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-orange-400">{coach.name}</h1>
                <p className="text-gray-300">{coach.expertise}</p>
                <p className="text-yellow-400 flex items-center justify-center md:justify-start gap-2">
                  <FaStar /> {coach.rating} Rating
                </p>
                <p className="text-sm text-gray-400">{coach.experience} Experience</p>
              </div>
            </div>

            {/* Middle Flexible Content */}
            <div className="flex-1 flex flex-col mt-6">
              <p className="text-gray-300 italic">{coach.bio}</p>

              {/* Specializations */}
              <div className="mt-4">
                <h2 className="text-lg font-bold text-orange-400 flex items-center gap-2">
                  <FaMedal /> Specializations
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {coach.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-xs hover:bg-orange-500 hover:text-black transition"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mt-4">
                <h2 className="text-lg font-bold text-orange-400 flex items-center gap-2">
                  <FaCalendarAlt /> Availability
                </h2>
                <div className="flex gap-2 flex-wrap mt-2">
                  {coach.availability.map((day, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded text-xs shadow-md"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-4">
                <h2 className="text-lg font-bold text-orange-400 flex items-center gap-2">
                  <FaStar /> Reviews
                </h2>
                <div className="space-y-2 mt-2">
                  {coach.reviews.map((rev, i) => (
                    <div
                      key={i}
                      className="bg-gray-700 p-3 rounded border border-gray-600 text-sm hover:border-orange-400 transition"
                    >
                      <p className="text-gray-200 italic">"{rev.feedback}"</p>
                      <p className="text-xs text-yellow-400">– {rev.user}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-black rounded-lg font-semibold shadow-md hover:scale-105 hover:bg-orange-600 transition">
                <FaHandshake /> Connect Now
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition">
                <FaEnvelope /> Send Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
