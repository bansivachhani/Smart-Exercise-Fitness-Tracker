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

// ------------------ Recommendation Functions ------------------
const recommendYoga = (stress, goal) => {
  const yogaOptions = {
    weight_loss: {
      high: ["Power Yoga - 30 min", "Vinyasa Flow - 25 min", "Dynamic Flow - 20 min", "Hatha Yoga - 20 min", "Sun Salutation Series - 15 min"],
      medium: ["Hatha Yoga - 20 min", "Vinyasa Flow - 20 min", "Yin Yoga - 20 min", "Core Strength Yoga - 15 min", "Breathing & Stretch - 15 min"],
      low: ["Light Stretching - 15 min", "Gentle Flow - 15 min", "Breathing & Relaxation - 10 min", "Seated Yoga - 10 min", "Neck & Shoulder Stretch - 10 min"]
    },
    weight_gain: {
      high: ["Restorative Yoga - 25 min", "Gentle Flow - 20 min", "Hatha Yoga - 20 min", "Yin Yoga - 20 min", "Relaxing Flow - 15 min"],
      medium: ["Hatha Yoga - 20 min", "Yin Yoga - 15 min", "Gentle Stretch - 15 min", "Breathing & Core Flow - 15 min", "Meditative Flow - 15 min"],
      low: ["Breathing & Stretching - 15 min", "Light Flow - 10 min", "Seated Yoga - 10 min", "Gentle Neck & Shoulder - 10 min", "Relaxation Flow - 10 min"]
    },
    fitness: {
      high: ["Power Yoga - 25 min", "Vinyasa Flow - 20 min", "Dynamic Flow - 20 min", "Hatha Yoga - 20 min", "Strength & Balance Yoga - 20 min"],
      medium: ["Hatha Yoga - 20 min", "Restorative Yoga - 20 min", "Gentle Flow - 15 min", "Core Strength Yoga - 15 min", "Breathing & Stretch - 15 min"],
      low: ["Gentle Stretch - 10 min", "Breathing Exercises - 10 min", "Seated Yoga - 10 min", "Neck & Shoulder Relax - 10 min", "Light Flow - 10 min"]
    }
  };
  return yogaOptions[goal]?.[stress] || yogaOptions.fitness.low;
};

const recommendMeditation = (stress, goal) => {
  const medOptions = {
    weight_loss: {
      high: ["Mindfulness Meditation - 15 min","Body Scan - 15 min","Focused Breath - 15 min","Guided Visualization - 15 min","Energy Reset Meditation - 10 min"],
      medium: ["Transcendental Meditation - 15 min","Loving-Kindness - 15 min","Breath Awareness - 15 min","Zen Meditation - 10 min","Short Guided Meditation - 10 min"],
      low: ["Zen Meditation - 10 min","Yoga Nidra - 10 min","Relaxation Breath - 10 min","Mindful Listening - 10 min","Short Visualization - 10 min"]
    },
    weight_gain: {
      high: ["Guided Meditation - 15 min","Mindful Breathing - 15 min","Body Scan - 15 min","Relaxation Meditation - 15 min","Energy Balance Meditation - 10 min"],
      medium: ["Loving-Kindness - 10 min","Breath Awareness - 10 min","Focused Meditation - 10 min","Mindfulness - 10 min","Short Visualization - 10 min"],
      low: ["Yoga Nidra - 10 min","Gratitude Meditation - 10 min","Breathing Relaxation - 10 min","Seated Mindfulness - 10 min","Short Guided Meditation - 10 min"]
    },
    fitness: {
      high: ["Mindfulness Meditation - 15 min","Focused Breathing - 15 min","Guided Visualization - 15 min","Energy Reset Meditation - 15 min","Body Scan - 10 min"],
      medium: ["Transcendental Meditation - 10 min","Loving-Kindness - 10 min","Breath Awareness - 10 min","Short Guided Meditation - 10 min","Mindful Listening - 10 min"],
      low: ["Zen Meditation - 10 min","Yoga Nidra - 10 min","Relaxation Breath - 10 min","Short Visualization - 10 min","Gentle Mindfulness - 10 min"]
    }
  };
  return medOptions[goal]?.[stress] || medOptions.fitness.low;
};

// ✅ Veg-only diet recommender
const recommendVegDiet = (goal) => {
  const dietOptions = {
    weight_loss: {
      breakfast: ["Oats", "Banana", "Almonds"],
      lunch: ["Paneer Salad", "Brown Rice", "Vegetables"],
      snacks: ["Fruit Smoothie", "Nuts"],
      dinner: ["Vegetable Soup", "Quinoa", "Paneer"],
    },
    weight_gain: {
      breakfast: ["Whole Wheat Toast", "Avocado", "Milkshake"],
      lunch: ["Paneer Rice Bowl", "Dal", "Veggies"],
      snacks: ["Peanut Butter Sandwich", "Protein Shake"],
      dinner: ["Paneer Curry", "Quinoa", "Vegetables"],
    },
    fitness: {
      breakfast: ["Oatmeal", "Berries", "Greek Yogurt"],
      lunch: ["Grilled Paneer", "Brown Rice", "Salad"],
      snacks: ["Boiled Chickpeas", "Fruits"],
      dinner: ["Paneer Tikka", "Steamed Veggies", "Sweet Potato"],
    },
  };
  return dietOptions[goal] || dietOptions.fitness;
};

// ------------------ Chatbot Component ------------------
export default function FitnessChatbot({ uid }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPrefs, setUserPrefs] = useState({ uid });
  const [missingFields, setMissingFields] = useState([]);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const navigate = useNavigate();

  // ------------------ Fetch user profile ------------------
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/user/${uid}`);
        const profile = await res.json();

        setUserPrefs({ uid, ...profile });

        const requiredFields = ["age","height","weight","diet","workout_type","stress_level","goal"];
        const missing = requiredFields.filter(f => !profile[f] && profile[f] !== 0);
        setMissingFields(missing);

        if (missing.length === 0) {
          const yoga = recommendYoga(profile.stress_level, profile.goal);
          const meditation = recommendMeditation(profile.stress_level, profile.goal);
          const diet = recommendVegDiet(profile.goal);

          logBot("Welcome back! Here are your personalized recommendations:");
          logBot(`<b>Yoga:</b> ${yoga.join(", ")}`);
          logBot(`<b>Meditation:</b> ${meditation.join(", ")}`);
          logBot(`<b>Veg Diet Plan:</b>
            🥞 Breakfast: ${diet.breakfast.join(", ")}<br/>
            🍲 Lunch: ${diet.lunch.join(", ")}<br/>
            🍎 Snacks: ${diet.snacks.join(", ")}<br/>
            🌙 Dinner: ${diet.dinner.join(", ")}
          `);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchUserProfile();
  }, [uid]);

  // ------------------ Ask for missing fields only once ------------------
  useEffect(() => {
    if (missingFields.length > 0) {
      logBot(`Hi! Let's complete your profile. Please enter your ${missingFields[0]}.`);
    }
  }, [missingFields]);

  // ------------------ Scroll & Syntax Highlight ------------------
  useEffect(() => {
    hljs.highlightAll();
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ------------------ Load Voices ------------------
  useEffect(() => {
    if ("speechSynthesis" in window) {
      const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // ------------------ Speech Recognition ------------------
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event) => setInput(event.results[0][0].transcript);
    }
  }, []);

  // ------------------ Speak Text ------------------
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

  // ------------------ Log Bot Message ------------------
  const logBot = (message, type = "bot") => {
    setMessages(prev => [...prev, { type, content: message }]);
    if (type === "bot") speakText(message);
  };

  // ------------------ Handle User Message ------------------
  const handleMessage = async (message) => {
    const msg = message.toLowerCase();

    // --- Auto profile completion ---
    if (missingFields.length > 0) {
      const currentField = missingFields[0];
      let userValue = message.trim();

      if (["age","height","weight"].includes(currentField)) {
        if (isNaN(Number(userValue))) return logBot(`Please enter a valid ${currentField} number.`);
        userValue = Number(userValue);
      }
      if (currentField === "diet") {
        const val = userValue.toLowerCase();
        if (val !== "vegetarian") {
          return logBot("❌ Only Vegetarian diet is supported. Please type: Vegetarian 🌱");
        }
        userValue = val;
      }
      if (currentField === "goal") {
        const val = userValue.toLowerCase();
        if (!["weight_loss","weight_gain","fitness"].includes(val)) {
          return logBot("Goal must be one of: weight_loss, weight_gain, fitness.");
        }
        userValue = val;
      }
      if (currentField === "stress_level") {
        const val = userValue.toLowerCase();
        if (!["low","medium","high"].includes(val)) {
          return logBot("Stress level must be: low, medium, high.");
        }
        userValue = val;
      }

      await fetch(`http://127.0.0.1:8000/user/${uid}/update-profile-field`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field: currentField, value: userValue }),
      });

      const newPrefs = { ...userPrefs, [currentField]: userValue };
      setUserPrefs(newPrefs);
      setMissingFields(prev => {
        const remaining = prev.slice(1);
        if (remaining.length > 0) {
          logBot(`Please enter your ${remaining[0]}.`);
        } else {
          logBot("✅ All profile details updated! Here are your recommendations:");
          const yoga = recommendYoga(newPrefs.stress_level, newPrefs.goal);
          const meditation = recommendMeditation(newPrefs.stress_level, newPrefs.goal);
          const diet = recommendVegDiet(newPrefs.goal);

          logBot(`<b>Yoga:</b> ${yoga.join(", ")}`);
          logBot(`<b>Meditation:</b> ${meditation.join(", ")}`);
          logBot(`<b>Veg Diet Plan:</b>
            🥞 Breakfast: ${diet.breakfast.join(", ")}<br/>
            🍲 Lunch: ${diet.lunch.join(", ")}<br/>
            🍎 Snacks: ${diet.snacks.join(", ")}<br/>
            🌙 Dinner: ${diet.dinner.join(", ")}
          `);
        }
        return remaining;
      });

      return;
    }

    // --- Rule-based navigation ---
    if (msg.includes("diet")) {
      const diet = recommendVegDiet(userPrefs.goal);
      logBot(`Here’s your vegetarian diet plan for <b>${userPrefs.goal.replace("_"," ")}</b>:
        <br/>🥞 Breakfast: ${diet.breakfast.join(", ")}
        <br/>🍲 Lunch: ${diet.lunch.join(", ")}
        <br/>🍎 Snacks: ${diet.snacks.join(", ")}
        <br/>🌙 Dinner: ${diet.dinner.join(", ")}
      `);
      navigate("/personalized");
      return;
    }

    if (msg.includes("yoga")) {
      const yoga = recommendYoga(userPrefs.stress_level, userPrefs.goal);
      logBot(`Here are Yoga recommendations: ${yoga.join(", ")}`);
      navigate("/workout/yoga");
      return;
    }

    if (msg.includes("meditation")) {
      const meditation = recommendMeditation(userPrefs.stress_level, userPrefs.goal);
      logBot(`Here are Meditation recommendations: ${meditation.join(", ")}`);
      navigate("/workout/meditation");
      return;
    }

    if (msg.includes("workout") || msg.includes("exercise")) {
      navigate("/workout");
      logBot("Navigated to Workout page 💪");
      return;
    }

    // --- AI fallback ---
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });
      const data = await res.json();
      logBot(data.reply || "⚠️ Something went wrong with AI.");
    } catch {
      logBot("❌ Failed to connect to AI.", "error");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    setMessages(prev => [...prev, { type: "user", content: input.trim() }]);
    handleMessage(input.trim());
    setInput("");
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.start(); } 
      catch { console.error("Speech recognition already running."); }
    } else logBot("❌ Speech recognition not supported.", "error");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMessages(prev => [...prev, { type: "user", content: `📷 Uploaded: ${file.name}`, image: reader.result }]);
    };
    reader.readAsDataURL(file);
  };

  // ------------------ Render ------------------
  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 z-50">
      <div className={`bg-gray-900/90 backdrop-blur-lg rounded-xl shadow-2xl flex flex-col transition-all ${chatOpen ? "h-[80vh]" : "h-16"}`}>
        {/* Header */}
        <div className="flex justify-between items-center p-3 cursor-pointer border-b border-gray-700" onClick={() => setChatOpen(!chatOpen)}>
          <div className="flex items-center text-white font-semibold"><FaRobot className="mr-2 text-pink-500"/> FitAI Coach</div>
          {chatOpen ? <FaChevronDown className="text-white"/> : <FaChevronUp className="text-white"/>}
        </div>

        {/* Chat content */}
        {chatOpen && <>
          <div className="flex-1 flex flex-col px-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((m,i) => (
              <div key={i} className={`max-w-[85%] p-2 rounded-xl break-words ${m.type==="user"?"bg-gradient-to-r from-orange-500 to-pink-500 self-end ml-auto text-white": m.type==="error"?"bg-red-500/80 text-white":"bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 text-white"}`}>
                {m.image ? <img src={m.image} alt="Uploaded" className="rounded-md max-h-40"/> : <div dangerouslySetInnerHTML={{__html: marked.parse(m.content)}}/>}
              </div>
            ))}
            {loading && <div className="flex gap-2 items-center text-gray-400"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400"></span></div>}
            <div ref={chatEndRef}></div>
          </div>
 {/* Input */}
          <div className="p-2 border-t border-gray-700 flex gap-2 bg-gray-800">
            <input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter" && sendMessage()} placeholder="Ask me anything..." className="flex-1 px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs"/>
            <input type="file" accept="image/*" id="imageUpload" className="hidden" onChange={handleImageUpload}/>
            <label htmlFor="imageUpload" className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer flex items-center justify-center"><FaImage/></label>
            <button onClick={startListening} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"><FaMicrophone/></button>
            <button onClick={sendMessage} disabled={loading} className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg shadow-md"><FaPaperPlane/></button>
          </div>
        </>}
      </div>
    </div>
  );
}
