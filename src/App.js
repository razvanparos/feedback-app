import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home/home';
import FeedbackAddPage from './feedback-add-page/FeedbackAddPage'
import FeedbackIndividual from './FeedbackIndividual/FeedbackIndividual';
import FeedbackEdit from './FeedbackEdit/FeedbackEdit';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback-add" element={<FeedbackAddPage />} />
          <Route path="/feedback/:feedbackId" element={<FeedbackIndividual />} />
          <Route path="/feedback/edit/:feedbackId" element={<FeedbackEdit />} />
        </Routes>
    </Router>
    
  );
}

export default App;
