import React from 'react';
import { Provider } from 'urql';
import { client } from './lib/urql';
import LandingPage from './pages/LandingPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <Provider value={client}>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="pt-16">
          <LandingPage />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;