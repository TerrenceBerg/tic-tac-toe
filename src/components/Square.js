import React from 'react';
import './Square.css';

const Square = ({ value, onClick }) => {
  const getMarkClass = () => {
    if (value === 'X') return 'x-mark';
    if (value === 'O') return 'o-mark';
    return '';
  };

  return (
    <button className="square" onClick={onClick}>
      <span className={getMarkClass()}>{value}</span>
    </button>
  );
};

export default Square;
