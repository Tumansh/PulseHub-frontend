import React, { useState } from 'react';

export default function Diary() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');

  const addEntry = () => {
    if (!text.trim()) return;
    setEntries([...entries, text]);
    setText('');
  };

  return (
    <div className="text-center mt-5">
      <h2 className="fw-bold mb-3">Diary</h2>
      <div className="card p-3 mb-3 mx-auto" style={{ maxWidth: 600 }}>
        <textarea
          className="form-control mb-2"
          rows="3"
          placeholder="Write your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addEntry}>Add Entry</button>
      </div>
      <div className="card p-3 mx-auto" style={{ maxWidth: 600 }}>
        <h5>Entries</h5>
        {entries.length === 0 ? (
          <p className="text-muted">No diary entries yet.</p>
        ) : (
          entries.map((entry, i) => <p key={i} className="border-bottom pb-2">{entry}</p>)
        )}
      </div>
    </div>
  );
}
