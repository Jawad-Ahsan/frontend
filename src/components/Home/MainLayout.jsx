import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import TopNav from "./Navigation/TopNav";
import Sidebar from "./Navigation/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import UserProfile from "./Dashboard/UserProfile";
import Settings from "./Dashboard/Settings";
import axios from "axios";

const ProtectedRoute = ({ children, darkMode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        // Verify token with backend
        await axios.get("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return (
      <div
        className={`h-full flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-50 text-gray-600"
        }`}
      >
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
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
          onHoverChange={(isHovered) => setSidebarWidth(isHovered ? 240 : 72)}
        />

        <motion.main
          className="flex-1 overflow-y-auto"
          style={{ width: `calc(100% - ${sidebarWidth}px)` }}
          initial={false}
          animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
        >
          <Routes>
            <Route
              index
              element={
                <ProtectedRoute darkMode={darkMode}>
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
                </ProtectedRoute>
              }
            />

            <Route
              path="profile"
              element={
                <ProtectedRoute darkMode={darkMode}>
                  <UserProfile darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute darkMode={darkMode}>
                  <Settings darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":activeTab"
              element={
                <ProtectedRoute darkMode={darkMode}>
                  <Dashboard darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;
