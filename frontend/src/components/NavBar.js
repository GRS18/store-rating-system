import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="simple-navbar">
      <div className="navbar-left">Store Rating System</div>
      <button className="navbar-logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default NavBar;
