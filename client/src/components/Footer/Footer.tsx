import React from 'react';


const Footer: React.FC = () => {
  const handleNavClick = () => {
    // console.log('Navigating to:', route);
  };

  const handleSocialClick = () => {
    // console.log('Opening social platform:', platform);
  };

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <i className="fa-solid fa-mountain-sun text-2xl text-emerald-400"></i>
              <span className="text-xl font-bold">Bike Park Finder</span>
            </div>
            <p className="text-gray-400">
              Find and explore the best mountain bike parks around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                { label: 'About Us', route: '/about' },
                { label: 'Contact', route: '/contact' },
                { label: 'Privacy Policy', route: '/privacy' },
                { label: 'Terms of Service', route: '/terms' }
              ].map(({ label, route }) => (
                <li key={route}>
                  <span 
                    onClick={() => handleNavClick()}
                    className="hover:text-white cursor-pointer transition-colors duration-200"
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-bold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                { label: 'Park Finder', route: '/parks' },
                { label: 'Trail Maps', route: '/trails' },
                { label: 'Events', route: '/events' },
                { label: 'Community', route: '/community' }
              ].map(({ label, route }) => (
                <li key={route}>
                  <span 
                    onClick={() => handleNavClick()}
                    className="hover:text-white cursor-pointer transition-colors duration-200"
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4">Connect</h4>
            <div className="flex space-x-4 text-gray-400">
              {[
                { platform: 'facebook', icon: 'fa-brands fa-facebook' },
                { platform: 'instagram', icon: 'fa-brands fa-instagram' },
                { platform: 'twitter', icon: 'fa-brands fa-twitter' },
                { platform: 'youtube', icon: 'fa-brands fa-youtube' }
              ].map(({ platform, icon }) => (
                <span 
                  key={platform}
                  onClick={() => handleSocialClick()}
                  className="hover:text-white cursor-pointer transition-colors duration-200"
                >
                  <i className={`${icon} text-xl`}></i>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bike Park Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 