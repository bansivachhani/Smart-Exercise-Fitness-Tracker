import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaDumbbell,
  FaUserCog,
  FaUserCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-neutral-900 fixed w-full top-0 shadow-md z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-2xl md:text-3xl font-bold bg-clip-text text-transparent flex items-center gap-2"
        >
          <FaDumbbell className="text-orange-500" />
          Fitness Studio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-3 items-center">
          <Link
            to="/dietplan"
            className="px-4 py-2 flex items-center gap-2 rounded-full text-white font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"
          >
            <FaUtensils /> Diet Plan
          </Link>

          <Link
            to="/workout"
            className="px-4 py-2 flex items-center gap-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 via-orange-500 to-purple-600"
          >
            <FaDumbbell /> Workout
          </Link>

          <Link
            to="/personalized"
            className="px-4 py-2 flex items-center gap-2 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-green-400"
          >
            <FaUserCog /> Personalized Routine
          </Link>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* Round Avatar → Dashboard */}
              <Link
                to="/dashboard"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-400 text-white font-bold hover:opacity-90"
                title="Dashboard"
              >
                <FaUserCircle className="text-xl" />
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:hidden px-6 pb-4 gap-3 bg-neutral-800"
          >
            <Link
              to="/dietplan"
              className="px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-center"
              onClick={() => setIsOpen(false)}
            >
              <FaUtensils className="inline mr-2" /> Diet Plan
            </Link>

            <Link
              to="/workout"
              className="px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 text-center"
              onClick={() => setIsOpen(false)}
            >
              <FaDumbbell className="inline mr-2" /> Workout
            </Link>

            <Link
              to="/personalized"
              className="px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-green-400 text-center"
              onClick={() => setIsOpen(false)}
            >
              <FaUserCog className="inline mr-2" /> Personalized Routine
            </Link>

            {/* Mobile Auth */}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserCircle className="text-xl" /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
