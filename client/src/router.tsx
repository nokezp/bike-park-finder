import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import BikeParkPage from './pages/BikeParkPage';
import LandingPage from './pages/LandingPage';
import BikeParkDetailPage from './pages/BikeParkDetailPage';

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
        element: <BikeParkPage />,
      },
      {
        path: '/bike-parks/:id',
        element: <BikeParkDetailPage />,
      },
    ],
  },
]); 