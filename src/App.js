import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './home/home';

function App() {
  return (
    <div className="app-div">
      <Home/>
    </div>
  );
}

export default App;
