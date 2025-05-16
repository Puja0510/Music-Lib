import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './auth/AuthContext';
import './styles.css';

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<div className="unauthorized">Unauthorized</div>} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      </div>
    </AuthProvider>
  );
}

export default App;