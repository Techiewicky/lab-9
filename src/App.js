import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RecipeSearch from './components/RecipeSearch';
import RecipeDetails from './components/RecipeDetails';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebaseConfig';

function App() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  if (authLoading) {
    // Display a loading indicator while checking authentication status
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route
          path="/"
          element={user ? <RecipeSearch /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/recipe/:id"
          element={user ? <RecipeDetails /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
