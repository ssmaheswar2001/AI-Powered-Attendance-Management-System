import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

function App() {
  return (
    <Router>
      {/* ✅ Top Navigation Bar */}
      <nav style={{
        backgroundColor: '#1a202c',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
          AI Attendance System
        </div>
        <div>
          <a href="https://github.com/ssmaheswar2001/AI-Powered-Attendance-Management-System" target="_blank" rel="noopener noreferrer"
             style={{ marginRight: '20px', color: 'white', textDecoration: 'none' }}>
            GitHub
          </a>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
            User Register
          </Link>
        </div>
      </nav>

      {/* ✅ Route Handling */}
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="*" element={<div style={{ padding: '20px' }}><h2>Welcome to AI Attendance System</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;
