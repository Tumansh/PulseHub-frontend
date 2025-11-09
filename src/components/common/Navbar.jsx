import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ theme, setTheme, user, onLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleProtected = (e, path) => {
    e.preventDefault();
    if (!user) onLogin();
    else navigate(path);
  };

  return (
    <nav
      className="navbar navbar-expand-lg py-2 px-3 mt-3 shadow-sm position-sticky top-0 z-3"
      style={{
        borderRadius: "14px",
        background: theme === "dark" ? "#1b2432" : "#ffffff",
        transition: "background 0.3s ease",
      }}
    >
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand fw-semibold text-primary fs-5">
          PulseHub
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto d-flex align-items-center gap-3">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>

            <li className="nav-item position-relative">
              <div className="d-flex align-items-center services-wrapper">
                <span className="nav-link services-label mb-0">Services</span>

                <button
                  className="btn btn-sm px-2 py-0 services-toggle"
                  id="servicesToggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{verticalAlign: 'middle'}}>
                    <path fillRule="evenodd" d="M1.646 5.646a.5.5 0 0 1 .708 0L8 11.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>

                <ul
                  className={`dropdown-menu custom-dropdown shadow border-0 ${theme === "dark" ? "dropdown-dark" : "dropdown-light"}`}
                  aria-labelledby="servicesToggle"
                >
                  <li>
                    <NavLink className="dropdown-item" to="/weather">
                      Weather Forecast
                      <small className="text-muted ms-1">+ AI Tip</small>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/stocks">
                      Stock Tracker
                      <small className="text-muted ms-1">+ AI Insight</small>
                    </NavLink>
                  </li>
                  <li>
                    <a
                      href="/expenses"
                      className="dropdown-item"
                      onClick={(e) => handleProtected(e, "/expenses")}
                    >
                      Expense Tracker
                    </a>
                  </li>
                  <li>
                    <a
                      href="/diary"
                      className="dropdown-item"
                      onClick={(e) => handleProtected(e, "/diary")}
                    >
                      Diary
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <NavLink to="/ask-ai" className="nav-link">Chat</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            {user ? (
              <span className="fw-medium text-light">{user.name}</span>
            ) : (
              <button className="btn btn-sm btn-primary px-3 rounded-pill" onClick={onLogin}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
