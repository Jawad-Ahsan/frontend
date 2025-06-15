import { useState } from 'react'; // Missing
import { motion } from 'framer-motion';
import { Sun, Moon } from 'react-feather'; // Missing icons
import ProfileDropdown from '../Navigation/ProfileDropdown';

const TopNav = ({ darkMode, setDarkMode }) => {
  return (
    <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md py-4 px-6 flex justify-between items-center`}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center space-x-2"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
          M
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          MindMate
        </h1>
      </motion.div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <ProfileDropdown darkMode={darkMode} />
      </div>
    </header>
  );
};

export default TopNav;