// src/components/Home/Navigation/Sidebar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import { MessageSquare, BookOpen, Activity, Users } from "react-feather";

const Sidebar = ({ darkMode, activeTab, onHoverChange }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const tabs = [
    { id: "chat", icon: <MessageSquare size={20} />, label: "Chat" },
    { id: "journal", icon: <BookOpen size={20} />, label: "Journal" },
    { id: "exercises", icon: <Activity size={20} />, label: "Exercises" },
    { id: "community", icon: <Users size={20} />, label: "Community" },
  ];

  const isCollapsed = !hovered;

  const handleTabClick = (tabId) => {
    navigate(`/home/${tabId}`); // Navigate to the correct route
  };

  return (
    <motion.aside
      initial={{ width: "72px" }}
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      onMouseEnter={() => {
        setHovered(true);
        onHoverChange?.(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        onHoverChange?.(false);
      }}
      className={`h-full flex flex-col ${
        darkMode ? "bg-gray-800" : "bg-white"
      } border-r ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      <nav className="flex-1 overflow-y-auto py-4 space-y-2">
        {tabs.map((tab) => (
          <div key={tab.id} className="px-2">
            <motion.button
              whileHover={{
                backgroundColor: darkMode
                  ? "rgba(55, 65, 81, 1)"
                  : "rgba(243, 244, 246, 1)",
              }}
              className={`flex items-center w-full p-3 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                  : darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              <div className="flex-shrink-0">{tab.icon}</div>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="ml-3 text-sm font-medium"
                >
                  {tab.label}
                </motion.span>
              )}
            </motion.button>
          </div>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
