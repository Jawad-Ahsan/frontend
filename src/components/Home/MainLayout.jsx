import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopNav from "./Navigation/TopNav";
import Sidebar from "./Navigation/Sidebar";
import Dashboard from "./Dashboard/Dashboard";

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(72);

  return (
    <div
      className={`h-screen flex flex-col ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <TopNav darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          darkMode={darkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onHoverChange={(isHovered) => setSidebarWidth(isHovered ? 240 : 72)}
        />

        <motion.div
          className="flex-1 overflow-auto"
          style={{ width: `calc(100% - ${sidebarWidth}px)` }}
          initial={false}
          animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab || "default"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab ? (
                <Dashboard darkMode={darkMode} activeTab={activeTab} />
              ) : (
                <div
                  className={`h-full flex items-center justify-center ${
                    darkMode
                      ? "bg-gray-900 text-gray-400"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">
                      Welcome to MindMate
                    </h2>
                    <p>Select an option from the sidebar to get started</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MainLayout;
