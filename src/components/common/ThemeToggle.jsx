import React from 'react';
import { applyTheme } from '../../utils/theme';

export default function ThemeToggle({ theme, setTheme }) {
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={toggle}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
