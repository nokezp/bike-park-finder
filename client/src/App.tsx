import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'urql';
import { client } from './lib/urql';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;