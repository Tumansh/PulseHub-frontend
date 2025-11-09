import React, { useState, useEffect } from 'react';
import { getJSON } from '../../api/api';

export default function StocksCard() {
  const [stock, setStock] = useState({ ticker: '', price: '', change: '' });

  useEffect(() => {
    async function load() {
      const data = await getJSON('/api/stocks/price?ticker=TCS.NS');
      setStock(data);
    }
    load();
  }, []);

  return (
    <div className="card p-3">
      <h5 className="mb-2">Stock</h5>
      {stock.ticker ? (
        <>
          <p className="mb-1">{stock.ticker}</p>
          <p className="mb-0">₹{stock.price} ({stock.change})</p>
        </>
      ) : (
        <p className="text-muted">Loading stock data...</p>
      )}
    </div>
  );
}
