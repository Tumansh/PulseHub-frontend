import React, { useState, useEffect } from 'react';
import { getJSON } from '../../api/api';

export default function WeatherCard() {
  const [weather, setWeather] = useState({ city: '', temp: '', condition: '' });

  useEffect(() => {
    async function load() {
      const data = await getJSON('/api/weather/current?city=Delhi');
      setWeather(data);
    }
    load();
  }, []);

  return (
    <div className="card p-3">
      <h5 className="mb-2">Weather</h5>
      {weather.city ? (
        <>
          <p className="mb-1">{weather.city}</p>
          <p className="mb-0">{weather.temp} — {weather.condition}</p>
        </>
      ) : (
        <p className="text-muted">Loading weather...</p>
      )}
    </div>
  );
}
