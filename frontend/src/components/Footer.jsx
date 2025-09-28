import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-center py-10 border-t border-gray-800 mt-10 relative">
      {/* Brand */}
      <Link
      to="/"
      className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-3xl md:text-4xl font-bold bg-clip-text text-transparent mb-2">
        Fitness Studio
      </Link>
      <p className="text-white text-lg">Your AI-Powered Fitness Companion</p>
      <p className="text-gray-500 mt-2 text-sm">
        &copy; 2025 Fit You. All rights reserved.
      </p>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mt-6">
        <a
          href="#"
          className="text-gray-400 hover:text-blue-500 text-xl transition-colors"
        >
          <FaFacebookF />
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-sky-400 text-xl transition-colors"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-pink-500 text-xl transition-colors"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-blue-600 text-xl transition-colors"
        >
          <FaLinkedinIn />
        </a>
      </div>

      {/* Back to Top Button */}
      <a
        href="#top"
        className="absolute right-6 bottom-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <FaArrowUp className="text-white text-lg" />
      </a>
    </footer>
  );
}
