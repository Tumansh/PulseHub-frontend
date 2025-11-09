import React from 'react';
import WeatherCard from '../components/cards/WeatherCard';
import StocksCard from '../components/cards/StocksCard';

export default function Dashboard({ user }) {
  return (
    <div>
      <h3 className="fw-semibold mb-4">Welcome back, {user?.name || 'User'}</h3>
      <div className="row g-4">
        <div className="col-md-6"><WeatherCard /></div>
        <div className="col-md-6"><StocksCard /></div>
      </div>
      <p className="text-muted mt-4">Your personal features (Diary, Expenses) are accessible from the navbar.</p>
    </div>
  );
}
