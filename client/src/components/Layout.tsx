import React from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'urql';
import urqlClient from '../lib/urqlClient';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout: React.FC = () => {
  return (
    <Provider value={urqlClient}>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default Layout; 