import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { UrqlProvider } from './components/UrqlProvider';

const App: React.FC = () => {
  return (
    <UrqlProvider>
      <RouterProvider router={router} />
    </UrqlProvider>
  );
};

export default App;