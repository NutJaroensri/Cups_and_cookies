import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the backend test route
    fetch('http://localhost:5000/api/test')
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Cups & Cookies</h1>
        <p>{message ? message : "Loading..."}</p>
      </header>
    </div>
  );
}

export default App;
