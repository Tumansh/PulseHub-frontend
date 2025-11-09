const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

export async function getJSON(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch {
    if (path.includes('/thought')) return { message: 'Stay patient, progress takes time.' };
    if (path.includes('/weather')) return { city: 'Delhi', temp: '29°C', condition: 'Sunny' };
    if (path.includes('/stocks')) return { ticker: 'TCS.NS', price: 3850, change: '+1.2%' };
    return {};
  }
}

export async function postJSON(path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return await res.json();
  } catch {
    return { success: false, message: 'Network error' };
  }
}
