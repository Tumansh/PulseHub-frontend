import React, { useEffect, useState } from "react";
import { getJSON } from "../api/api";

export default function Home() {
  const [thought, setThought] = useState("Loading...");

  useEffect(() => {
    async function fetchThought() {
      try {
        const res = await getJSON("/api/thought/today");
        setThought(res.message || "Stay patient — good things take time.");
      } catch {
        setThought("Stay patient — good things take time.");
      }
    }
    fetchThought();
  }, []);

  return (
    <div className="fade-in d-flex flex-column align-items-center justify-content-center text-center min-vh-100">
      <h1 className="fw-bold mb-2 display-5 text-primary">PulseHub</h1>
      <p className="lead text-muted mb-4">
        Your hub for weather, stocks, and mindful tracking.
      </p>

      <div className="card p-4 mb-4" style={{ maxWidth: 640, width: "90%" }}>
        <h5 className="mb-2 text-primary">Thought of the Day 💭</h5>
        <p className="mb-0 fst-italic">{thought}</p>
      </div>

      {/* <p className="text-muted small mt-4">
        Explore services from the menu above.  
        Diary and Expenses require login.
      </p> */}
    </div>
  );
}
