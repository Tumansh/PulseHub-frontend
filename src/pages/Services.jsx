import React from 'react';
import WeatherCard from '../components/cards/WeatherCard';
import StocksCard from '../components/cards/StocksCard';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="text-center mt-4">
      <h2 className="fw-bold mb-4">Available Services</h2>
      <div className="row justify-content-center g-4">
        <div className="col-md-4"><WeatherCard /></div>
        <div className="col-md-4"><StocksCard /></div>
      </div>
      <div className="mt-5">
        <Link to="/ask-ai" className="btn btn-outline-primary">Open Chat</Link>
      </div>
    </div>
  );
}
