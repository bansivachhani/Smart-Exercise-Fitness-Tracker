// src/components/FitnessChatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaChevronUp,
  FaChevronDown,
  FaPaperPlane,
  FaMicrophone,
  FaImage,
} from "react-icons/fa";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default function FitnessChatbot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPrefs, setUserPrefs] = useState({});
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Scroll + syntax highlighting
  useEffect(() => {
    hljs.highlightAll();
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load voices for speech output
  useEffect(() => {
    if ("speechSynthesis" in window) {
      const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Speech recognition setup
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) =>
        setInput(event.results[0][0].transcript);
    }
  }, []);

  // Voice output
  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    const cleanText = text.replace(/<[^>]*>?/gm, "").trim();
    if (!cleanText) return;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-US";
    const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    if (enVoice) utterance.voice = enVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Log bot messages
  const logBot = (message, type = "bot") => {
    setMessages((prev) => [...prev, { type, content: message }]);
    if (type === "bot") speakText(message);
  };

  // Handle text input
  const handleMessage = async (message) => {
    const msg = message.toLowerCase();

    // --- Rule-based handling ---
    if (msg.includes("diet")) {
      if (
        msg.includes("vegetarian") ||
        msg.includes("non-vegetarian") ||
        msg.includes("nonveg")
      ) {
        const diet = msg.includes("vegetarian")
          ? "vegetarian"
          : "non-vegetarian";
        setUserPrefs((prev) => ({ ...prev, diet }));
        logBot(`Got it! You prefer a ${diet} diet. ✅`);
        return;
      }
      if (msg.includes("suggest")) {
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

    // --- AI fallback (Google Gemini / backend AI) ---
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.trim() }),
      });

      const data = await res.json();
      logBot(
        data.status === "success"
          ? data.response
          : "⚠️ Something went wrong with AI."
      );
    } catch {
      logBot("❌ Failed to connect to AI. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: `📷 Uploaded: ${file.name}`,
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
      logBot(
        data.status === "success"
          ? `🖼️ Image analysis: ${data.response}`
          : "⚠️ Could not analyze image."
      );
    } catch {
      logBot("❌ Failed to send image to server.", "error");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    setMessages((prev) => [...prev, { type: "user", content: input.trim() }]);
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
      logBot("❌ Speech recognition not supported.", "error");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 z-50">
      <div
        className={`bg-gray-900/90 backdrop-blur-lg rounded-xl shadow-2xl flex flex-col transition-all ${
          chatOpen ? "h-[80vh]" : "h-16"
        }`}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-3 cursor-pointer border-b border-gray-700"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <div className="flex items-center text-white font-semibold">
            <FaRobot className="mr-2 text-pink-500" /> FitAI Coach
          </div>
          {chatOpen ? (
            <FaChevronDown className="text-white" />
          ) : (
            <FaChevronUp className="text-white" />
          )}
        </div>

        {/* Chat Content */}
        {chatOpen && (
          <>
            <div className="flex-1 flex flex-col px-3 space-y-2 overflow-y-auto text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] p-2 rounded-xl break-words ${
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(m.content),
                      }}
                    />
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
            <div className="p-2 border-t border-gray-700 flex gap-2 bg-gray-800">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs"
              />
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="imageUpload"
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer flex items-center justify-center"
              >
                <FaImage />
              </label>
              <button
                onClick={startListening}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                <FaMicrophone />
              </button>
              <button
                onClick={sendMessage}
                disabled={loading}
                className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg shadow-md"
              >
                <FaPaperPlane />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
