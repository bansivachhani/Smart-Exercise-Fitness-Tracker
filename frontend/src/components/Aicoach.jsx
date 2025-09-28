// src/components/AiCoachDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaPaperPlane,
  FaMicrophone,
  FaImage,
} from "react-icons/fa";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default function AiCoachDashboard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPrefs, setUserPrefs] = useState({});
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Auto scroll + highlight
  useEffect(() => {
    hljs.highlightAll();
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load voices
  useEffect(() => {
    if ("speechSynthesis" in window) {
      const loadVoices = () => {
        const available = window.speechSynthesis.getVoices();
        if (available.length > 0) setVoices(available);
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        setInput(event.results[0][0].transcript);
      };
    }
  }, []);

  // Speak text
  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/<[^>]*>?/gm, "").trim();
    if (!cleanText) return;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-US";
    const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    if (enVoice) utterance.voice = enVoice;
    window.speechSynthesis.speak(utterance);
  };

  // Bot response
  const logBot = (message, type = "bot") => {
    const msg = { type, content: message };
    setMessages((prev) => [...prev, msg]);
    if (type === "bot") speakText(message);
  };

  // Handle text input
  const handleMessage = async (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("diet")) {
      if (msg.includes("vegetarian")) {
        setUserPrefs((prev) => ({ ...prev, diet: "vegetarian" }));
        logBot("Got it! You prefer a vegetarian diet. ✅");
        return;
      } else if (msg.includes("non-vegetarian") || msg.includes("nonveg")) {
        setUserPrefs((prev) => ({ ...prev, diet: "non-vegetarian" }));
        logBot("Got it! You prefer a non-vegetarian diet. ✅");
        return;
      } else if (msg.includes("suggest")) {
        if (userPrefs.diet) {
          logBot(
            `Based on your ${userPrefs.diet} preference, I suggest exploring personalized diet plans. 🍴`
          );
          navigate("/personalized");
        } else {
          logBot(
            "Please tell me your diet preference first (Vegetarian / Non-Vegetarian)."
          );
        }
        return;
      }
      logBot("What type of diet do you prefer? (Vegetarian / Non-Vegetarian)");
      return;
    }

    if (msg.includes("yoga")) {
      navigate("/workout/yoga");
      logBot("Navigated to the Yoga page 🧘");
      return;
    }

    if (msg.includes("meditation")) {
      navigate("/workout/meditation");
      logBot("Navigated to the Meditation page 🧘‍♂️");
      return;
    }

    if (msg.includes("workout") || msg.includes("exercise")) {
      navigate("/workout");
      logBot("Navigated to the Workout page 💪");
      return;
    }

    if (msg.includes("my preferences")) {
      logBot(
        `Your current preferences: ${JSON.stringify(userPrefs) || "None yet"}`
      );
      return;
    }

    // AI fallback
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (data.status === "success") {
        logBot(data.response);
      } else {
        logBot("⚠️ Something went wrong with AI. Please try again later.", "error");
      }
    } catch {
      logBot("❌ Failed to connect to AI. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: `📷 Uploaded an image: ${file.name}`,
        image: reader.result,
      },
    ]);

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.status === "success") {
        logBot(`🖼️ Image analysis result: ${data.response}`);
      } else {
        logBot("⚠️ Could not analyze the image. Try again later.", "error");
      }
    } catch {
      logBot("❌ Failed to send image to server.", "error");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    const userMessage = { type: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    handleMessage(input.trim());
    setInput("");
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {
        console.error("Speech recognition already running.");
      }
    } else {
      logBot("❌ Speech recognition not supported in this browser.", "error");
    }
  };

  // Suggested prompts
  const prompts = [
    "What workout should I do today?",
    "How to lose weight effectively?",
    "Best exercises for beginners?",
    "Nutrition tips for muscle building?",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 p-4 flex items-center justify-center shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaRobot className="text-white" /> FitAI Coach
        </h1>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-semibold text-orange-400">
          Welcome to FitAI! 💪
        </h2>
        <p className="mt-3 text-gray-300 max-w-2xl">
          I'm your personal fitness coach powered by AI. I can help you with
          workout routines, nutrition advice, form corrections, and motivation!
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {prompts.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              className="px-4 py-2 bg-gray-800 border border-orange-500 rounded-full text-sm hover:bg-orange-600 transition"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-lg flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 flex flex-col px-3 py-4 space-y-2 overflow-y-auto text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-2 rounded-xl break-words ${
                  m.type === "user"
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 self-end ml-auto text-white"
                    : m.type === "error"
                    ? "bg-red-500/80 text-white"
                    : "bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 text-white"
                }`}
              >
                {m.image ? (
                  <img
                    src={m.image}
                    alt="Uploaded"
                    className="rounded-md max-h-40"
                  />
                ) : m.type === "bot" ? (
                  <div dangerouslySetInnerHTML={{ __html: marked.parse(m.content) }} />
                ) : (
                  <p>{m.content}</p>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-gray-400">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400"></span>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-700 flex gap-2 bg-gray-900">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 
                focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
            />
            <input
              type="file"
              accept="image/*"
              id="imageUploadAi"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="imageUploadAi"
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer flex items-center justify-center"
            >
              <FaImage />
            </label>
            <button
              onClick={sendMessage}
              disabled={loading}
              className="p-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-md"
            >
              <FaPaperPlane />
            </button>
            <button
              onClick={startListening}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              <FaMicrophone />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
