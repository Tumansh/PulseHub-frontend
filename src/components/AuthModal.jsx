import React, { useState } from 'react';
import { postJSON } from '../api/api';

export default function AuthModal({ show, setShow, setUser }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
    const res = await postJSON(endpoint, form);
    setLoading(false);

    if (res.success) {
      setUser(res.user || { name: form.email.split('@')[0] });
      setShow(false);
    } else {
      setError(res.message || 'Something went wrong.');
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 2000,
        animation: 'fadeIn 0.3s ease'
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: '100%',
          maxWidth: '380px',
          borderRadius: '16px',
          animation: 'popIn 0.3s ease',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 text-primary">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h4>
          <button
            className="btn btn-sm btn-outline-secondary rounded-circle"
            onClick={() => setShow(false)}
          >
            ✕
          </button>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label small">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label small">Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 mb-3 rounded-pill"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center small text-muted">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                className="btn btn-link p-0 text-primary text-decoration-none"
                onClick={() => setMode('signup')}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                className="btn btn-link p-0 text-primary text-decoration-none"
                onClick={() => setMode('login')}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
