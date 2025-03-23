import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isSelected = (path: string) => {
    return location.pathname === path;
  };

  const userAvatar = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg';
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/bike-parks', label: 'Bike Parks' },
    { path: '/maps', label: 'Maps' },
    { path: '/events', label: 'Events' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`text-base font-medium transition-colors duration-200 hover:text-emerald-500 ${
            isSelected(path) ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-gray-700'
          }`}
        >
          {label}
        </Link>
      ))}
      <Link
        key="/user-accout"
        to="/user-accout"
        className={`text-base font-medium transition-colors duration-200 hover:text-emerald-500 ${
          isSelected('/user-accout') ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-gray-700'
        }`}
      >
        <img src={userAvatar} className="w-8 h-8 rounded-full cursor-pointer" alt="User avatar" />
      </Link>
    </nav>
  );
};

export default Navigation;
