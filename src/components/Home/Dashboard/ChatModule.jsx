// src/components/Home/Dashboard/ChatModule.jsx

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Mic, Send } from "react-feather"; // Import new icons

const ChatModule = ({ darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const showSendButton = newMessage.trim() !== "";

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm MindMate, your AI mental health companion. How are you feeling today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!showSendButton) return;

    const userMsg = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponses = [
        "I hear you. Can you tell me more about that feeling?",
        "That sounds challenging. How long have you felt this way?",
        "I appreciate you sharing that. What would help you feel better?",
        "Let's explore that together. What's been on your mind lately?",
        "I understand. Would you like to try a breathing exercise to help?",
      ];
      const aiMsg = {
        id: Date.now() + 1,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  return (
    <div
      className={`w-full h-full flex flex-col ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Chat Header */}
      <div
        className={`p-4 border-b ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        }`}
      >
        {/* ... Header content is unchanged ... */}
      </div>

      {/* Messages Area */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <AnimatePresence initial={false}>
          {/* ... Messages mapping is unchanged ... */}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* --- UPDATED INPUT AREA --- */}
      <div
        className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"} border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          {/* Add Media Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-600"
            }`}
          >
            <Plus size={20} />
          </motion.button>

          {/* Text Input */}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-2.5 rounded-full ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-800 placeholder-gray-500"
            } focus:outline-none focus:ring-2 ${
              darkMode ? "focus:ring-blue-500" : "focus:ring-blue-400"
            }`}
          />

          {/* Send or Mic Button */}
          <div className="relative w-10 h-10 flex-shrink-0">
            <AnimatePresence>
              {showSendButton ? (
                <motion.button
                  key="send"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className={`absolute inset-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  <Send size={18} />
                </motion.button>
              ) : (
                <motion.button
                  key="mic"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`absolute inset-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                  }`}
                >
                  <Mic size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModule;
