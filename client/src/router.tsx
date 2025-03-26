import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import BikeParksPage from './pages/BikeParksPage';
import LandingPage from './pages/LandingPage';
import BikeParkDetailPage from './pages/BikeParkDetailPage';
import { MapsPage } from './pages/MapsPage';
import EventsPage from './pages/EventsPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/bike-parks',
        element: <BikeParksPage />,
      },
      {
        path: '/bike-parks/:id',
        element: <BikeParkDetailPage />,
      },
      {
        path: '/maps',
        element: <MapsPage />,
      },
      {
        path: '/events',
        element: <EventsPage />,
      },
      {
        path: '/events/:id',
        element: <div />,
      },
    ],
  },
]); 