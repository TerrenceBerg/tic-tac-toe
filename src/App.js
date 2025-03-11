import React from 'react';
import './App.css';
import Board from './components/Board';
import MatrixRain from './components/MatrixRain';

function App() {
  return (
    <div className="app">
      <MatrixRain />
      <div className="game-container">
        <Board />
      </div>
    </div>
  );
}

export default App;
