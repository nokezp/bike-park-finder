import React from 'react';
import { UrqlProvider } from './components/UrqlProvider';
import { BikeParkList } from './components/BikeParkList';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, login, register, logout } = useAuth();

  return (
    <UrqlProvider>
      <div className="app">
        <header>
          <h1>Bike Park Finder</h1>
          {isAuthenticated ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <div>
              <button onClick={() => login('user@example.com', 'password')}>Login</button>
              <button onClick={() => register('username', 'user@example.com', 'password')}>Register</button>
            </div>
          )}
        </header>
        <main>
          <BikeParkList />
        </main>
      </div>
    </UrqlProvider>
  );
}

export default App; 