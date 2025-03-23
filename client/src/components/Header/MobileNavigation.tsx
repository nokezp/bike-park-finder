import { Link, useLocation } from 'react-router-dom';

interface MobileNavigationProps {
  onClose: () => void;
}

const MobileNavigation = ({ onClose }: MobileNavigationProps) => {
  const location = useLocation();
  
  const isSelected = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/bike-parks', label: 'Bike Parks' },
    { path: '/maps', label: 'Maps' },
    { path: '/events', label: 'Events' },
    { path: '/about', label: 'About' },
  ];

  return (
    <div className="md:hidden">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
      <nav className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
        <div className="h-full flex flex-col py-6 space-y-6">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`px-8 py-2 text-base font-medium transition-colors duration-200 hover:text-emerald-500 hover:bg-gray-50 ${
                isSelected(path)
                  ? 'text-emerald-500 bg-emerald-50'
                  : 'text-gray-700'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation; 