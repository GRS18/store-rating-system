import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" 
        element={<LoginPage />}
         />
        <Route path="/signup" 
        element={<SignupPage />} 
        />
        <Route path="/dashboard/user" 
        element={<UserDashboard />} 
        />
        <Route path="/dashboard/admin" 
        element={<AdminDashboard />} 
        />
        <Route path="/dashboard/owner" 
        element={<OwnerDashboard />} 
        />
      </Routes>
    </Router>
  );
}

export default App;