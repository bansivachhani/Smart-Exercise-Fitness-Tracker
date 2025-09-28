// src/components/Layout.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/AppChatbot" // Import the chatbot component

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      {/* Main content */}
      <main className="flex-grow">{children}</main>
      
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
