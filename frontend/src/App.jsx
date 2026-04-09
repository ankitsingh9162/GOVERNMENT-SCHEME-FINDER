import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AllSchemes from './pages/AllSchemes';
import SchemeDetails from './pages/SchemeDetails';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/Profile';
import GoogleCallback from './pages/auth/GoogleCallback';

// Add route:

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/schemes" element={<AllSchemes />} />
          <Route path="/schemes/:id" element={<SchemeDetails />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Register setIsAuthenticated={setIsAuthenticated} />
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </PrivateRoute>
            } 
          />

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
