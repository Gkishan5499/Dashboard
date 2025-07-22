import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-4 bg-gray-900 border-b border-gray-700 text-white">
      {/* Logo & Title */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400">
            Samnic Admin
          </h1>
        </Link>
        <span className="text-sm md:text-base font-medium text-gray-300">
          Welcome, {user?.name || 'User'}
        </span>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
