import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Stocks from "./pages/Stocks";
import AskAI from "./pages/AskAI";
import ExpenseTracker from "./pages/ExpenseTracker";
import Diary from "./pages/Diary";
import AuthModal from "./components/AuthModal";
import { initTheme, applyTheme } from "./utils/theme";

export default function App() {
  const [theme, setTheme] = useState(initTheme());
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => applyTheme(theme), [theme]);

  return (
    <div className="min-vh-100 bg-body">
      <Navbar theme={theme} setTheme={setTheme} user={user} onLogin={() => setShowAuth(true)} />
      <div className="container py-4 fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/ask-ai" element={<AskAI />} />
          <Route path="/expenses" element={user ? <ExpenseTracker /> : <Navigate to="/" />} />
          <Route path="/diary" element={user ? <Diary /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <AuthModal show={showAuth} setShow={setShowAuth} setUser={setUser} />
    </div>
  );
}
