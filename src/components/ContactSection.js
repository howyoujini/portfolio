import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = new WebSocket("ws://your-websocket-server");
  const formRef = useRef(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.addEventListener("message", (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    });

    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });

    gsap.from(chatBoxRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: chatBoxRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.send(message);
      setMessage("");
    }
  };

  return (
    <div id="contact-section">
      <form id="chat-form" onSubmit={handleSubmit} ref={formRef}>
        <input
          type="text"
          id="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
      <div id="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div className="chat-message" key={index}>
            {msg}
          </div>
        ))}
      </div>
      <div className="links">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://blog.com" target="_blank" rel="noopener noreferrer">
          Blog
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
