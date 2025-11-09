import React, { useState, useRef, useEffect } from "react";

export default function AskAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      const response = {
        sender: "ai",
        text: "I'm just your temporary chat buddy — try logging in for saved chats!",
      };
      setMessages((prev) => [...prev, response]);
    }, 800);
  };

  return (
    <div className="container fade-in py-5" style={{ maxWidth: "800px" }}>
      <h3 className="text-center text-primary fw-bold mb-4">Ask AI 💬</h3>

      <div
        className="card shadow-sm p-3"
        style={{
          height: "500px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div className="flex-grow-1">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`d-flex mb-3 ${
                msg.sender === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded-4 ${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-light text-dark"
                }`}
                style={{ maxWidth: "70%" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="d-flex mt-3">
          <input
            className="form-control rounded-pill me-2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary rounded-pill px-4" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
