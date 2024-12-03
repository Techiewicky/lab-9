import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../firebaseConfig';
import './Navbar.css';

function Navbar({ user }) {
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
    } catch (error) {
      alert('Logout failed! ' + error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Recipe App</div>
      {user && (
        <div className="navbar-user">
          <span>Hello, {user.displayName || user.email}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
