import React from "react";
import { Routes, Route } from "react-router-dom";
import WorkoutNavbar from "./WorkoutNavbar";
import Plan from "./Plan";
import Diet from "./Diet";
import Yoga from "./Yoga";
import Meditation from "./Meditation";
import Challenges from "./Challenges";
import WorkoutSection from "./WorkoutSection";

import Day1 from "./plan/Day1";
import Day2 from "./plan/Day2";
import Day3 from "./plan/Day3";
import Day4 from "./plan/Day4";
import Day5 from "./plan/Day5";
import Day6 from "./plan/Day6";

export default function WorkoutSectionPage() {
  return (
    <div>
      <WorkoutNavbar />
      <Routes>
        {/* Default /workout page */}
        <Route index element={<WorkoutSection />} />

        {/* Plan section → shows grid of Day 1–6 */}
        <Route path="plan" element={<Plan />} />

        {/* Individual Plan Day Pages */}
        <Route path="plan/D1" element={<Day1 />} />
        <Route path="plan/D2" element={<Day2 />} />
        <Route path="plan/D3" element={<Day3 />} />
        <Route path="plan/D4" element={<Day4 />} />
        <Route path="plan/D5" element={<Day5 />} />
        <Route path="plan/D6" element={<Day6 />} />

        {/* Other sections */}
        <Route path="diet" element={<Diet />} />
        <Route path="yoga" element={<Yoga />} />
        <Route path="meditation" element={<Meditation />} />
        <Route path="challenges" element={<Challenges />} />
      </Routes>
    </div>
  );
}
