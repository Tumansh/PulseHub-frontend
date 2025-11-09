import React, { useState } from 'react';

function formatCurrency(num) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    if (!amount.trim()) return;
    setExpenses([...expenses, Number(amount)]);
    setAmount('');
  };

  return (
    <div className="text-center mt-5">
      <h2 className="fw-bold mb-3">Expense Tracker</h2>
      <div className="card p-3 mb-3 mx-auto" style={{ maxWidth: 600 }}>
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addExpense}>
          Add Expense
        </button>
      </div>
      <div className="card p-3 mx-auto" style={{ maxWidth: 600 }}>
        <h5>Expenses</h5>
        {expenses.length === 0 ? (
          <p className="text-muted">No expenses yet.</p>
        ) : (
          <ul className="list-group">
            {expenses.map((exp, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <span>Entry {i + 1}</span>
                <span>{formatCurrency(exp)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
