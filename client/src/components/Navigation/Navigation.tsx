import { Link, useLocation } from 'react-router-dom';
import { useQuery } from 'urql';
import { MeDocument, MeQuery } from '../../lib/graphql/generated/graphql-operations';

const Navigation = () => {
  const location = useLocation();

  const [{ data }] = useQuery<MeQuery>({
    query: MeDocument,
  });

  const isSelected = (path: string) => {
    return location.pathname === path;
  };

  const userAvatar = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg';
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/bike-parks', label: 'Bike Parks' },
    { path: '/events', label: 'Events' },
    { path: '/maps', label: 'Maps' },
    { path: '/about', label: 'About' },
    // { path: '/user-accout', label: 'User' },
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
      {data?.me?.id ? (
        <Link
          key="/user-account"
          to="/user-account"
          className={`text-base font-medium transition-colors duration-200 hover:text-emerald-500`}
        >
          <img src={userAvatar} className="w-8 h-8 rounded-full cursor-pointer" alt="User avatar" />
        </Link>
      ) : (
        <Link
          key="/login"
          to="/login"
          className={`text-base font-medium transition-colors duration-200 hover:text-emerald-500 ${
            isSelected('/login') ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-gray-700'
          }`}
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
