import { useParams } from "react-router-dom";
import ChatModule from "./ChatModule";
import JournalModule from "./JournalModule";
import ExercisesModule from "./ExercisesModule";
import CommunityModule from "./CommunityModule";
import { useEffect } from "react";
import axios from "axios";

const Dashboard = ({ darkMode }) => {
  const { activeTab } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User data:", response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div
      className={`flex flex-col h-full overflow-hidden ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {activeTab === "chat" && <ChatModule darkMode={darkMode} />}
      {activeTab === "journal" && <JournalModule darkMode={darkMode} />}
      {activeTab === "exercises" && <ExercisesModule darkMode={darkMode} />}
      {activeTab === "community" && <CommunityModule darkMode={darkMode} />}
    </div>
  );
};

export default Dashboard;
