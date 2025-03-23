import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import { UrqlProvider } from './components/UrqlProvider';
import LandingPage from './pages/LandingPage';
import BikeParkPage from './pages/BikeParkPage';
import BikeParkDetailPage from './pages/BikeParkDetailPage';
import { MapsPage } from './pages/MapsPage';
// import Layout from './components/Layout';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <UrqlProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Routes>
              {/* <Route element={<Layout />}> */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/bike-parks" element={<BikeParkPage />} />
              <Route path="/bike-parks/:id" element={<BikeParkDetailPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/maps" element={<MapsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* </Route> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UrqlProvider>
  );
};

export default App;
