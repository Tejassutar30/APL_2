import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="header">
        <h1>Simple Counter</h1>
      </header>

      <main className="main-content">
        <div className="card">
          <h2>Welcome</h2>
          <p>Click the button below to increase the counter</p>
          
          <button 
            className="counter-button"
            onClick={() => setCount(count + 1)}
          >
            Count: {count}
          </button>
        </div>
      </main>
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} Simple Counter App</p>
      </footer>
    </div>
  );
}

export default App;
