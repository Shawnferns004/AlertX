import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Siren, User, Home, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex justify-between h-14 sm:h-16 items-center">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onMenuClick}
              className="p-1.5 sm:p-2 rounded-full text-gray-400 lg:hidden hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
            >
              <Menu size={22} className="transform hover:rotate-180 transition-transform duration-500" />
            </button>
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <Siren 
                  className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600 transform group-hover:rotate-12 transition-all duration-500" 
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"
                />
              </div>
              <span className="hidden md:inline-block text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-transparent bg-clip-text transition-all duration-500">
                A!ert-X
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <button className="relative p-1.5 sm:p-2 rounded-full hover:bg-indigo-50 transition-colors duration-300">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-indigo-200 hover:scale-105 transition-all duration-300"
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-48 sm:w-56 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="p-3 sm:p-4 text-gray-800 font-medium border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">{user?.name || 'User'}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{user?.email || 'user@email.com'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-1.5 sm:p-2">
                      <Link
                        to="/"
                        className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-indigo-50 rounded-xl transition-colors group"
                      >
                        <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-indigo-600 group-hover:scale-110 transition-transform" />
                        <span className="text-sm sm:text-base">Home</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-indigo-50 rounded-xl transition-colors group"
                      >
                        <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-indigo-600 group-hover:scale-110 transition-transform" />
                        <span className="text-sm sm:text-base">Profile</span>
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
                      >
                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" />
                        <span className="text-sm sm:text-base">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;