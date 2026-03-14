import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AllSchemes from './pages/AllSchemes';
import SchemeDetails from './pages/SchemeDetails';
import Dashboard from './pages/dashboard/Dashboard';
import GoogleCallback from './pages/auth/GoogleCallback';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/schemes" element={<AllSchemes />} />
            <Route path="/schemes/:id" element={<SchemeDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            {/* Redirect profile to dashboard */}
            <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;