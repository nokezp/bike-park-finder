import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/Event/EventsPage';
import EventDetailPage from './pages/Event/EventDetailPage';
import { UrqlProvider } from './provider/UrqlProvider';
import HomePage from './pages/Home/HomePage';
import BikeParksPage from './pages/BikePark/BikeParksPage';
import BikeParkDetailPage from './pages/BikePark/BikeParkDetailPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AboutPage from './pages/About/AboutPage';
import CreateUserPage from './pages/Proflie/CreateUserPage';
import LoginPage from './pages/Proflie/LoginPage';
import ProfilePage from './pages/Proflie/ProfilePage';
import ForgotPasswordPage from './pages/Proflie/ForgotPasswordPage';
import ResetPasswordPage from './pages/Proflie/ResetPasswordPage';
import CommunityPage from './pages/Community/CommunityPage';
import { MapsPage } from './pages/Map/MapsPage';
import BikeParkFormPage from './pages/Admin/BikeParkFormPage';
import 'react-leaflet-cluster/lib/assets/MarkerCluster.css';
import 'react-leaflet-cluster/lib/assets/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css';


const App: React.FC = () => {
  return (
    <UrqlProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Header />
          <div className="flex-grow mt-[65px]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bike-parks" element={<BikeParksPage />} />
              <Route path="/bike-parks/:id" element={<BikeParkDetailPage />} />
              <Route path="/bike-park/new" element={<BikeParkFormPage />} />
              <Route path="/bike-park/edit/:id" element={<BikeParkFormPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/maps" element={<MapsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/register" element={<CreateUserPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
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
