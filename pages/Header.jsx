import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // optional for styling


function Header({ username, onLogout }) {
      const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/'); // Redirects to `/` after logout
  };

  return (
<div className="header-bar">
  <div className="header-left">ACCESS HUB</div>
  <div className="header-center">Welcome, {username}</div>
  <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
</div>
  );
}

export default Header;
