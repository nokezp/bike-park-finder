import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Navigation from '../Navigation/Navigation';
import MobileNavigation from './MobileNavigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Bike Park Finder"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Bike Park Finder
            </span>
          </Link>

          {/* Navigation */}
          <Navigation />

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <FaTimes className="block h-6 w-6" />
            ) : (
              <FaBars className="block h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && <MobileNavigation onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
};

export default Header; 