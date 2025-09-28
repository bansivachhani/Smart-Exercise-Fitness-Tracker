import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-16 px-6"
    >
      {/* Heading */}
      <div className="text-center mb-12 mt-8">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="mt-4 text-gray-300 text-lg">
          Have questions? Want to learn more? Contact us today.
        </p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12 ">
       
        

        {/* Email */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
          <FaEnvelope className="text-4xl mx-auto mb-4 text-pink-500" />
          <h3 className="text-xl font-semibold mb-2">Email Us</h3>
          <p>
            <a
              href="mailto:support@fityou.com"
              className="text-blue-400 hover:underline"
            >
              bansivachhani153@gmail.com
              
            </a>
            <br/>
             <a
              href="mailto:support@fityou.com"
              className="text-blue-400 hover:underline"
            >
              bhaktikansagara2004@gmail.com
              
            </a>
            <br/>
             <a
              href="mailto:support@fityou.com"
              className="text-blue-400 hover:underline"
            >
              hillsoni8104@gmail.com
              
            </a>
          </p>
        </div>

        {/* Phone */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
          <FaPhone className="text-4xl mx-auto mb-4 text-purple-500" />
          <h3 className="text-xl font-semibold mb-2">Call Us</h3>
          <p>
            <a href="tel:+1234567890" className="text-green-400 hover:underline">
              +91 65935 98924
            </a>
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-center">
          Send a Message
        </h3>
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            Send Message <FaPaperPlane />
          </button>
        </form>
      </div>
    </section>
  );
}
