import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white font-bold text-xl px-3 py-2 rounded-lg">
              GS
            </div>
            <span className="text-xl font-bold text-gray-900">Scheme Finder</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/schemes"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              All Schemes
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  <User className="w-4 h-4 mr-1" />
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 font-medium">
                    {user.name || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;