import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GoBack.css';

export default function GoBack({ colour }) {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <button
      to='/'
      className={`go-back ${colour === 'white' ? 'white' : ''}`}
      onClick={navigateBack}
    >
      <svg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M4.33447 9L0.334473 5L4.33447 1' stroke='#4661E6' strokeWidth='2' />
      </svg>
      <span>Go Back</span>
    </button>
  );
}