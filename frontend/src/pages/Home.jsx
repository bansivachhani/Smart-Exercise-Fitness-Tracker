import React from "react";
import yogaLady from "../assets/yoga-lady.png"; // <-- place your image in /src/assets
import Contact from "../components/Contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faRobot, faUtensils, faAppleAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="bg-black text-white mt-8">
      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text */}
          <div className="text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Body With{" "}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                AI-Powered Fitness
              </span>
            </h1>
            <p className="text-gray-300 max-w-md mb-8 text-lg leading-relaxed">
              Get personalized workouts, nutrition guidance, and 24/7 AI coaching
              tailored to your goals and lifestyle.
            </p>
            <Link 
            to="personalized"
            className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-pink-500/30 transition-transform">
              Start Your Journey 🚀
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center">
            <img
              src={yogaLady}
              alt="Yoga Lady"
              className="w-full max-w-md rounded-2xl shadow-lg hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="feature p-8 bg-gray-900 rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-pink-500/20 transition">
            <FontAwesomeIcon icon={faDumbbell} size="3x" className="text-orange-500 mb-6" />
            <h3 className="text-xl font-semibold mb-2">Personalized Workouts</h3>
            <p className="text-gray-400 leading-relaxed">
              AI-generated workout plans that adapt to your progress, goals, and available equipment.
            </p>
          </div>

          <div className="feature p-8 bg-gray-900 rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-pink-500/20 transition">
            <FontAwesomeIcon icon={faAppleAlt} size="3x" className="text-pink-500 mb-6" />
            <h3 className="text-xl font-semibold mb-2">Smart Nutrition</h3>
            <p className="text-gray-400 leading-relaxed">
              Custom meal plans with recipes tailored to your dietary preferences and fitness objectives.
            </p>
          </div>

          <div className="feature p-8 bg-gray-900 rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-pink-500/20 transition">
            <FontAwesomeIcon icon={faRobot} size="3x" className="text-purple-500 mb-6" />
            <h3 className="text-xl font-semibold mb-2">AI Coaching</h3>
            <p className="text-gray-400 leading-relaxed">
              24/7 access to your virtual fitness coach for guidance, motivation, and form correction.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      {/* Premium Services Section */}
<section className="px-6 py-20 text-center">
  <h2 className="text-4xl font-bold mb-14">Premium Services</h2>
  <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
    {/* Card 1 */}
    <div className="relative bg-gray-900 p-10 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-orange-500/20 transition text-left">
      <FontAwesomeIcon icon={faDumbbell} size="2x" className="text-orange-400 mb-4" />
      <h3 className="text-2xl font-semibold mb-4">Personalized Tracker</h3>
      <p className="text-gray-300 mb-6 leading-relaxed">
        Stay on top of your workouts, track progress, and monitor performance with real-time AI insights.
      </p>
      <Link 
      to="workout"
      className="bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-2 rounded-lg font-semibold text-white hover:scale-105 hover:shadow-lg transition-transform">
        Learn More
      </Link>
      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-orange-500 to-pink-500"></div>
    </div>

    {/* Card 2 */}
    <div className="relative bg-gray-900 p-10 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-purple-500/20 transition text-left">
      <FontAwesomeIcon icon={faUtensils} size="2x" className="text-purple-400 mb-4" />
      <h3 className="text-2xl font-semibold mb-4">Meal Planning</h3>
      <p className="text-gray-300 mb-6 leading-relaxed">
        Get customized meal plans tailored to your body type, goals, and preferences with AI-powered nutrition.
      </p>
      <Link
      to = "./dietplan"
      className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg font-semibold text-white hover:scale-105 hover:shadow-lg transition-transform">
        Learn More
      </Link>
      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-blue-500 to-purple-500"></div>
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section className="px-6 py-20">
        <Contact />
      </section>
    </main>
  );
}
