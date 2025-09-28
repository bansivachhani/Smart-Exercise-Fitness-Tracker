import React, { createContext, useContext, useState } from "react";
import { db } from "./../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // --- Initialize user from localStorage ---
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // --- Helper to format user ---
  // const formatUser = (data) => ({
  //   id: data.uid || data.id,
  //   email: data.email,
  //   name: data.profile?.name || "User",
  //   age: data.profile?.age || null,
  //   height: data.profile?.height || null,
  //   weight: data.profile?.weight || null,
  //   goal: data.profile?.goal || "Maintain Weight",
  //   diet: data.profile?.diet || "",
  //   activity: data.profile?.activity || [],
  //   goals: data.profile?.goals || [],
  //   schedule: data.profile?.schedule || [],
  //   progress: data.profile?.progress || 0,
  //   completedYoga: data.profile?.completedYoga || [],
  //   stress_level: data.profile?.stress_level || "medium",
  //   suggested_activities: data.profile?.suggested_activities || [],
  // });

  const formatUser = (data) => ({
    id: data.uid || data.id || data.user_id,
    email: data.email,
    name: data.profile?.name || "User",
    age: data.profile?.age || null,
    height: data.profile?.height || null,
    weight: data.profile?.weight || null,
    goal: data.profile?.goal || "Maintain Weight",
    diet: data.profile?.diet || "",
    activity: data.profile?.activity || [],
    goals: data.profile?.goals || "fitness",
    schedule: data.profile?.schedule || [],
    progress: data.profile?.progress || 0,
    completedYoga: data.profile?.completedYoga || [],
    completedMeditation: data.profile?.completedMeditation || [],
    suggested_yoga: data.profile?.suggested_yoga || [],
    suggested_meditation: data.profile?.suggested_meditation || [],
    suggested_activities: data.profile?.suggested_activities || [],
    stress_level: data.profile?.stress_level || "medium",
  });

  // --- Save user locally ---
  const saveUser = (data) => {
    const formatted = formatUser(data);
    setUser(formatted);
    localStorage.setItem("user", JSON.stringify(formatted));
    return formatted;
  };

  // --- Register ---
  const register = async (name, email, password, goal) => {
    const res = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, goal }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Registration failed");
    }

    const data = await res.json();
    return saveUser(data);
  };

  // --- Login ---
  const login = async (email, password) => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Login failed");
    }

    const data = await res.json();
    return saveUser(data);
  };

  // --- Logout ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // --- Update local Firestore data (for real-time sync) ---
  const updateUser = async (updates) => {
    if (!user || !user.id) throw new Error("No user logged in");

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    try {
      const docRef = doc(db, "users", user.id);
      await updateDoc(docRef, updates);
    } catch (err) {
      console.error("Error updating Firestore:", err);
      throw err;
    }

    return updatedUser;
  };

  // --- Update backend profile (FastAPI + Firestore) ---
  const updateProfile = async (updates) => {
    if (!user || !user.id) throw new Error("No user logged in");

    try {
      const res = await fetch(`http://127.0.0.1:8000/profile/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to update profile");
      }

      const data = await res.json();

      // Overwrite user completely with API response + previous id/email
      const updatedUser = {
        ...user,
        ...data.data, // contains suggested_yoga, suggested_meditation, updated fields
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (err) {
      console.error("Profile update error:", err);
      throw err;
    }
  };

  // --- Diet Plan helpers ---
  const saveDietPlan = async (dietData) => {
    return await updateUser({ diet: dietData });
  };

  const getDietPlan = async () => {
    if (!user || !user.id) throw new Error("No user logged in");

    try {
      const docRef = doc(db, "users", user.id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const profile = snap.data();
        return await updateUser({ diet: profile.diet || {} });
      }
      return {};
    } catch (err) {
      console.error("Error fetching diet plan:", err);
      throw err;
    }
  };

  // --- AuthContext.js ---

  // Fetch the full user profile from Firestore
  const getUserProfile = async (uid) => {
    if (!uid) return null;
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (err) {
      console.error("Error fetching user profile:", err);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        updateUser,
        updateProfile,
        saveDietPlan,
        getDietPlan,
        getUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
