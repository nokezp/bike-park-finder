import React from 'react';
import { BikeParkList } from './components/BikeParkList';
import './styles/components/App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app__header">
        <div className="container">
          <h1>Bike Park Finder</h1>
        </div>
      </header>
      <main className="app__main">
        <div className="container">
          <BikeParkList />
        </div>
      </main>
    </div>
  );
};

export default App; 