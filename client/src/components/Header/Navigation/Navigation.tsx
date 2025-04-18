/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from 'urql';
import { MeDocument, MeQuery } from '../../../lib/graphql/generated/graphql-operations';
import { useEffect, useRef, useState } from 'react';
import { removeToken } from '../../../lib/graphql/urqlClient';

const Navigation = () => {
  const location = useLocation();
  const ref = useRef<any>(null);
  const [showMoreLinks, setShowMoreLinks] = useState(false);

  const [{ data }] = useQuery<MeQuery>({
    query: MeDocument,
    requestPolicy: "network-only"
  });

  const isSelected = (path: string) => {
    return location.pathname === path;
  };

  const userAvatar = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg';
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/bike-parks', label: 'Bike Parks' },
    { path: '/events', label: 'Events' },
    // { path: '/community', label: 'Community' },
    { path: '/maps', label: 'Maps' },
    { path: '/about', label: 'About' },
  ];

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current?.contains(event.target)) {
        setShowMoreLinks(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`text-base font-medium transition-colors duration-200 hover:text-emerald-500 ${isSelected(path) ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-gray-700'
            }`}
        >
          {label}
        </Link>
      ))}
      {data?.me?.id ? (
        <>
          {location.pathname !== "/bike-park/new" && location.pathname !== "/bike-park/edit" && (
            <Link to="/bike-park/new">
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Create Park
              </button>
            </Link>
          )}
          <div
            className={`text-base font-medium transition-colors duration-200 hover:text-emerald-500`}
            onClick={() => setShowMoreLinks(!showMoreLinks)}
          >
            <div className="relative">
              <img src={userAvatar} className="w-8 h-8 rounded-full cursor-pointer" alt="User avatar" />
              {showMoreLinks && (
                <div ref={ref} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link to="/user-account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <i className="fa-regular fa-user mr-2"></i>
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <i className="fa-regular fa-gear mr-2"></i>
                    Settings
                  </Link>
                  <Link to="/saved-parks" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <i className="fa-regular fa-bookmark mr-2"></i>
                    Saved Parks
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link to="/" className="block px-4 py-2 text-red-700 hover:bg-gray-100" onClick={removeToken}>
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Link
          to="/login"
          className={`text-base font-medium transition-colors duration-200 hover:text-emerald-500 ${isSelected('/login') ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-gray-700'
            }`}
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
