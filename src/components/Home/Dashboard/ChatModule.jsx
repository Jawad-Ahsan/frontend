import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatModule = ({ darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, userMsg]);
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
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
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
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-blue-100"
            } flex items-center justify-center`}
          >
            <span className="text-lg">🧠</span>
          </div>
          <div>
            <h3
              className={`font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              MindMate AI
            </h3>
            <p
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isTyping ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-3 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 relative ${
                  message.sender === "user"
                    ? darkMode
                      ? "bg-blue-600 rounded-tr-none"
                      : "bg-blue-500 text-white rounded-tr-none"
                    : darkMode
                    ? "bg-gray-700 text-white rounded-tl-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                {message.text}
                <div
                  className={`text-xs mt-1 text-right ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : darkMode
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div
                className={`px-4 py-3 rounded-2xl rounded-tl-none ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex space-x-1">
                  {[0, 150, 300].map((delay, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        darkMode ? "bg-gray-400" : "bg-gray-500"
                      } animate-bounce`}
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div
        className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"} border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-3 rounded-full ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-800 placeholder-gray-500"
            } focus:outline-none focus:ring-2 ${
              darkMode ? "focus:ring-blue-500" : "focus:ring-blue-400"
            }`}
          />
          {newMessage.trim() && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatModule;
