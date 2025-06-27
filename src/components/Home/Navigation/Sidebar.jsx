import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, BookOpen, Activity, Users } from "react-feather";

const Sidebar = ({ darkMode, activeTab, setActiveTab, onHoverChange }) => {
  const [hovered, setHovered] = useState(false);

  const tabs = [
    { id: "chat", icon: <MessageSquare size={20} />, label: "Chat" },
    { id: "journal", icon: <BookOpen size={20} />, label: "Journal" },
    { id: "exercises", icon: <Activity size={20} />, label: "Exercises" },
    { id: "community", icon: <Users size={20} />, label: "Community" },
  ];

  const isCollapsed = !hovered;

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
      <nav className="flex-1 overflow-y-auto py-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{
              backgroundColor: darkMode
                ? "rgba(55, 65, 81, 0.5)"
                : "rgba(243, 244, 246, 0.5)",
            }}
            className={`flex items-center w-full p-3 ${
              activeTab === tab.id
                ? darkMode
                  ? "bg-gray-700 text-gray-100"
                  : "bg-gray-100 text-gray-800"
                : ""
            } ${darkMode ? "text-gray-200" : "text-gray-700"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex-shrink-0">{tab.icon}</div>
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium">{tab.label}</span>
            )}
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
