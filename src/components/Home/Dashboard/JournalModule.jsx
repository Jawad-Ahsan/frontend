import { useState } from "react";
import { motion } from "framer-motion";

const JournalModule = ({ darkMode }) => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  const handleSaveEntry = () => {
    if (newEntry.trim() === "") return;

    const entry = {
      id: Date.now(),
      content: newEntry,
      date: new Date(),
      mood: null,
    };

    setEntries([entry, ...entries]);
    setNewEntry("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className={`p-4 border-b ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        }`}
      >
        <h2
          className={`text-xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Daily Journal
        </h2>
      </div>

      {/* Editor */}
      <div
        className={`p-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          className={`w-full h-40 px-4 py-3 rounded-lg mb-4 ${
            darkMode
              ? "bg-gray-700 text-white placeholder-gray-400"
              : "bg-white text-gray-800 placeholder-gray-500"
          } border ${
            darkMode
              ? "border-gray-600 focus:border-blue-500"
              : "border-gray-300 focus:border-blue-400"
          } focus:outline-none focus:ring-1 ${
            darkMode ? "focus:ring-blue-500" : "focus:ring-blue-400"
          }`}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveEntry}
          className={`px-6 py-3 rounded-md font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          Save Entry
        </motion.button>
      </div>

      {/* Entries List */}
      <div className="flex-1 overflow-y-auto p-4">
        {entries.length === 0 ? (
          <div
            className={`text-center py-10 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No journal entries yet. Start writing above!
          </div>
        ) : (
          entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 mb-4 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow`}
            >
              <div
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {entry.date.toLocaleString()}
              </div>
              <p
                className={`mt-2 ${
                  darkMode ? "text-gray-100" : "text-gray-700"
                }`}
              >
                {entry.content}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default JournalModule;
