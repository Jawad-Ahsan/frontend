import ChatModule from "./ChatModule";
import JournalModule from "./JournalModule";
import ExercisesModule from "./ExercisesModule";
import CommunityModule from "./CommunityModule";

const Dashboard = ({ darkMode, activeTab }) => {
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
