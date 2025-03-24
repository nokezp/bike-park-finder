import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import { UrqlProvider } from './components/UrqlProvider';
import LandingPage from './pages/LandingPage';
import BikeParkPage from './pages/BikeParkPage';
import BikeParkDetailPage from './pages/BikeParkDetailPage';
import { MapsPage } from './pages/MapsPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AboutPage from './pages/AboutPage';
import CreateUserPage from './pages/CreateUserPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CommunityPage from './pages/CommunityPage';

const App: React.FC = () => {
  return (
    <UrqlProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/bike-parks" element={<BikeParkPage />} />
              <Route path="/bike-parks/:id" element={<BikeParkDetailPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/maps" element={<MapsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/register" element={<CreateUserPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path='/user-account' element={<ProfilePage />} />
              <Route path='/community' element={<CommunityPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UrqlProvider>
  );
};

export default App;
