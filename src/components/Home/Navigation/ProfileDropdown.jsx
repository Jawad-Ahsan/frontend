import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings } from 'react-feather';
import { motion } from 'framer-motion';
import { Modal } from '../../Modal';
import { toast } from 'react-hot-toast';

const ProfileDropdown = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully', {
      position: 'bottom-center',
      duration: 3000,
    });
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
        aria-label="Profile menu"
      >
        <div className={`
          w-8 h-8 rounded-full 
          ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} 
          flex items-center justify-center
          border ${darkMode ? 'border-gray-500' : 'border-gray-300'}
        `}>
          <User 
            size={18} 
            className={darkMode ? 'text-gray-200' : 'text-gray-700'} 
            strokeWidth={2}
          />
        </div>
      </button>

      {/* Logout Modal */}
      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
        <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Are you sure you want to log out?
          </h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowLogoutModal(false)}
              className={`
                px-4 py-2 rounded-md 
                ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
              `}
            >
              Cancel
            </button>
            <button
              onClick={handleLogoutConfirm}
              className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
            >
              Log Out
            </button>
          </div>
        </div>
      </Modal>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50
            ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
          `}
        >
          <div className="py-1">
            <button
              className={`
                w-full text-left px-4 py-2 text-sm flex items-center
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              <User size={16} className="mr-2" />
              Profile
            </button>
            <button
              className={`
                w-full text-left px-4 py-2 text-sm flex items-center
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              <Settings size={16} className="mr-2" />
              Settings
            </button>
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogoutModal(true);
              }}
              className={`
                w-full text-left px-4 py-2 text-sm flex items-center
                ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}
              `}
            >
              <LogOut size={16} className="mr-2" />
              Log Out
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileDropdown;