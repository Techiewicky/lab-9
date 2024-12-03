import React, { useState, useEffect } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import app from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert('Login failed! ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      alert('Login failed! ' + error.message);
    }
  };

  // Removed useEffect from here since redirection is handled in App.js

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>or</p>
        <button onClick={handleGoogleLogin} className="google-button">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
