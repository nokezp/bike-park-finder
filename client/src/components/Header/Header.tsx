import React from 'react';


const Header: React.FC = () => {
  const userAvatar = "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
  const navItems = [
    { label: 'Discover', route: '/discover' },
    { label: 'Maps', route: '/maps' },
    { label: 'Community', route: '/community' },
    { label: 'Events', route: '/events' }
  ];

  const onNavigate = (route: string) => {
    console.log('Navigating to:', route);
    // Add navigation logic here
  };

  const onSearch = () => {
    console.log('Opening search');
    // Add search logic here
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-mountain-sun text-2xl text-emerald-600"></i>
          <span className="text-xl font-bold">Bike Park Finder</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <span
              key={item.route}
              onClick={() => onNavigate(item.route)}
              className="text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors duration-200"
            >
              {item.label}
            </span>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button 
            className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            onClick={onSearch}
            aria-label="Search"
          >
            <i className="fa-solid fa-magnifying-glass text-xl"></i>
          </button>
          <img 
            src={userAvatar}
            className="w-8 h-8 rounded-full cursor-pointer"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 