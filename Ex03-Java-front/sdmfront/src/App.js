import React from 'react';
import StartUpPage from './Containers/StartUpPage/StartUpPage'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>

      <div className="App">
        <StartUpPage />
      </div>
    </Router>
  );
}

export default App;
