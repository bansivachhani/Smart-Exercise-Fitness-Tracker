import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaDumbbell, FaUtensils, FaSpa, FaBrain, FaClipboardList } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Chatbot from "../AppChatbot";

export default function WorkoutNavbar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const menuLinks = [
    { name: "Home", path: "/", icon: <FaBrain /> },
    { name: "Plan", path: "/workout/plan", icon: <FaClipboardList /> },
    { name: "Yoga", path: "/workout/yoga", icon: <FaSpa /> },
    { name: "Meditation", path: "/workout/meditation", icon: <FaBrain /> },
    { name: "Challenges", path: "/workout/challenges", icon: <FaDumbbell /> },
  ];

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed w-full top-0 z-50 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-2xl bg-neutral-900/90" : "bg-neutral-900/70"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link
            to="/workout"
            className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-2xl md:text-3xl font-bold bg-clip-text text-transparent flex items-center gap-2"
          >
            <FaDumbbell className="text-orange-500" />
            Fitness Studio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-3">
            {menuLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 flex items-center gap-2 rounded-full font-semibold transition-transform duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-green-400 to-blue-500 text-white scale-105"
                      : "bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 text-white hover:scale-105"
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              );
            })}
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
              transition={{ duration: 0.25 }}
              className="flex flex-col md:hidden px-6 pb-4 gap-3 bg-neutral-800/95 backdrop-blur-md"
            >
              {menuLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 rounded-full flex items-center justify-center gap-2 font-semibold text-white transition-transform duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-green-400 to-blue-500 scale-105"
                        : "bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 hover:scale-105"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon} {link.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Children content without extra top padding */}
      <div>{children}</div>
      <Chatbot />
    </>
  );
}
