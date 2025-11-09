import React, { useEffect, useState } from "react";
import { getJSON } from "../api/api";

export default function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchStocks() {
      try {
        const data = await getJSON("/api/stocks/list");
        if (Array.isArray(data)) setStocks(data);
        else setStocks([]); // fallback to empty array if backend fails
      } catch (err) {
        console.error("Backend unreachable:", err);
        setStocks([]);
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
  }, []);

  const sendChat = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setChat((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const aiMsg = {
        sender: "ai",
        text: "AI Suggestion: Diversify across top 3 stable tickers 📊",
      };
      setChat((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="container py-4 fade-in">
      <h3 className="fw-bold text-primary mb-4 text-center">
        Stock Market Tracker 💹
      </h3>

      <div className="row">
        <div className="col-md-7">
          <div className="card p-3">
            {loading ? (
              <p className="text-center text-muted py-3">Loading stocks...</p>
            ) : stocks.length === 0 ? (
              <p className="text-center text-muted py-3">
                Could not load stocks — please check backend connection.
              </p>
            ) : (
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>AI Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((s, idx) => (
                    <tr key={idx}>
                      <td>{s.ticker}</td>
                      <td>{s.price}</td>
                      <td
                        className={
                          s.change?.includes("-")
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {s.change}
                      </td>
                      <td className="fst-italic">{s.aiRecommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="col-md-5">
          <div
            className="card p-3 d-flex flex-column"
            style={{ height: "100%" }}
          >
            <h6 className="fw-semibold mb-3 text-primary">Investment Chat 💬</h6>
            <div className="chat-container flex-grow-1">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-bubble ${
                    msg.sender === "user" ? "user" : "ai"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="chat-input mt-2">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Ask AI about stocks..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
              />
              <button
                className="btn btn-primary rounded-pill px-3"
                onClick={sendChat}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
