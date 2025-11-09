import React, { useState } from "react";
import { getJSON } from "../api/api";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const data = await getJSON(`/api/weather/current?city=${city}`);
      setWeather(data);
    } catch (err) {
      setWeather({ city, temperature: "--", condition: "Not found", aiTip: "Try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 fade-in">
      <h3 className="fw-bold text-primary mb-4 text-center">Weather Forecast 🌦️</h3>
      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          className="form-control w-50 rounded-pill me-2"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button className="btn btn-primary rounded-pill" onClick={fetchWeather}>
          Search
        </button>
      </div>

      {loading && <p className="text-center text-muted">Loading...</p>}

      {weather && !loading && (
        <div className="card mx-auto p-4 text-center mt-4" style={{ maxWidth: "400px" }}>
          <h5 className="fw-semibold">{weather.city}</h5>
          <p className="mb-1">{weather.condition}</p>
          <h2 className="display-6 fw-bold text-primary">{weather.temperature}°C</h2>
          <hr />
          <p className="fst-italic text-muted">{weather.aiTip}</p>
        </div>
      )}
    </div>
  );
}
