import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home/home';
import FeedbackAddPage from './feedback-add-page/FeedbackAddPage'


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback-add" element={<FeedbackAddPage />} />
        </Routes>
    </Router>
    
  );
}

export default App;
