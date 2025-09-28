// pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProgressCard from "./ProgressCard";
import ActivityChart from "./ActivityChart";
import Goals from "./Goals";
import Schedule from "./Schedule";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

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

// ------------------ Dashboard Component ------------------
export default function Dashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [yogaList, setYogaList] = useState([]);
  const [meditationList, setMeditationList] = useState([]);
  const [todayCompleted, setTodayCompleted] = useState([]);
  const [history, setHistory] = useState([]);
  const [userSchedule, setUserSchedule] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      fetchUserProfile();
      generateRecommendations();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/user/${user.id}`);
      const profile = res.data.profile || {};

      // Ensure arrays exist
      const completedYoga = profile.completedYoga || [];
      const completedMeditation = profile.completedMeditation || [];

      // Update user in context
      if (setUser) {
        setUser({ ...user, ...profile, completedYoga, completedMeditation });
      }

      setLoading(false);
      updateTodayAndHistory(completedYoga, completedMeditation);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const generateRecommendations = () => {
    if (!user) return;
    const goal = user.goal || "fitness";
    const stress = user.stress_level || "medium";

    const yoga = recommendYoga(stress, goal);
    const meditation = recommendMeditation(stress, goal);

    setYogaList(yoga);
    setMeditationList(meditation);

    const schedule = [
      ...yoga.map((task, i) => ({ id: `yoga-${i}`, day: "Today", task, time: `${6+i}:00 AM`, type: "Yoga" })),
      ...meditation.map((task, i) => ({ id: `meditation-${i}`, day: "Today", task, time: `${6+i}:30 PM`, type: "Meditation" }))
    ];
    setUserSchedule(schedule);
  };

  const updateTodayAndHistory = (completedYoga = [], completedMeditation = []) => {
    const today = new Date().toISOString().split("T")[0];
    const allCompleted = [
      ...completedYoga.map(item => ({ ...item, type: "Yoga" })),
      ...completedMeditation.map(item => ({ ...item, type: "Meditation" }))
    ];
    setTodayCompleted(allCompleted.filter(a => a.date === today));
    setHistory(allCompleted.filter(a => a.date !== today));
  };

  const handleCompleteActivity = async (item) => {
    try {
      const field = item.type === "Yoga" ? "completedYoga" : "completedMeditation";
      const today = new Date().toISOString().split("T")[0];

      await axios.post(`http://localhost:8000/user/${user.id}/complete-activity`, {
        task: item.task,
        type: item.type,
        date: today
      });

      const updatedField = [...(user[field] || []), { task: item.task, date: today }];
      if (setUser) setUser({ ...user, [field]: updatedField });

      updateTodayAndHistory(
        field === "Yoga" ? updatedField : user.completedYoga || [],
        field === "Meditation" ? updatedField : user.completedMeditation || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || loading) return null;

  const userGoals = [
    { id: 1, title: "Complete Yoga sessions", target: yogaList.length, completed: user.completedYoga?.length || 0, type: "Yoga" },
    { id: 2, title: "Complete Meditation sessions", target: meditationList.length, completed: user.completedMeditation?.length || 0, type: "Meditation" }
  ];

  const totalGoals = userGoals.reduce((acc, g) => acc + g.target, 0);
  const completedActivities = (user.completedYoga?.length || 0) + (user.completedMeditation?.length || 0);
  const progressPercentage = totalGoals ? Math.round((completedActivities / totalGoals) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-poppins">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-10 mt-16 space-y-10">
        <h1 className="text-2xl font-bold text-yellow-400">Welcome back, {user.name}! 👋</h1>
        <button onClick={() => navigate("/profile")} className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md font-semibold hover:bg-yellow-500 transition">Edit Profile</button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProgressCard user={user} dark />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">Weekly Activity</h2>
            {user.activity?.length > 0 ? <ActivityChart data={user.activity} dark /> : <p className="text-gray-400">No activity recorded yet.</p>}

           

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">History</h3>
              {history.length > 0 ? (
                <ul className="list-disc ml-5 text-gray-400">
                  {history.map((item, i) => (
                    <li key={i}>
                      {item.date}: {item.task} ({item.type})
                    </li>
                  ))}
                </ul>
              ) : <p className="text-gray-500">No past activity recorded.</p>}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-700 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">Monthly Progress</h2>
            <div className="w-44 h-44 relative">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path className="text-gray-700" stroke="currentColor" strokeWidth="3.8" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                <path className="text-green-500 transition-all duration-1000 ease-out" stroke="currentColor" strokeWidth="3.8" strokeDasharray="100" strokeDashoffset={100 - progressPercentage} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-100">{progressPercentage}%</span>
            </div>
            <p className="mt-3 text-gray-400 font-medium">of your monthly goal achieved</p>
          </div>
        </div>

        {/* Goals Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Your Goals</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userGoals.map(goal => (
              <div key={goal.id} onClick={() => navigate(goal.type === "Yoga" ? "/workout/yoga" : "/workout/meditation")} className="cursor-pointer hover:scale-105 transition-transform">
                <Goals title={goal.title} progress={goal.target ? Math.round((goal.completed / goal.target) * 100) : 0} />
              </div>
            ))}
          </div>
        </section>

        {/* Today's Schedule Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Today's Schedule</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {userSchedule.map(item => {
              const isCompleted = item.type === "Yoga"
                ? user.completedYoga?.some(t => t.task === item.task)
                : user.completedMeditation?.some(t => t.task === item.task);
              return (
                <div key={item.id} onClick={() => handleCompleteActivity(item)} className="cursor-pointer hover:scale-105 transition-transform">
                  <Schedule day={item.day} task={item.task} time={item.time} completed={isCompleted} />
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
