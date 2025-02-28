import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaRobot, FaTimes } from "react-icons/fa";
import "../assets/styles/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "I'm just a bot! 🤖", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot always visible */}
      <button className="chat-toggle" onClick={() => setIsOpen(true)}>
        <span className="online-status"></span>

        <div className="chat-icon-wrapper">
          <img src="/img/rb.png" alt="Chat" className="chat-icon-img" />
        </div>
      </button>

      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">
            <span>Chatbot</span>
            <FaTimes className="close-btn" onClick={() => setIsOpen(false)} />
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
