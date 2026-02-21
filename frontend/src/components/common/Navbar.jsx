import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">GS</span>
              </div>
              <span className="text-xl font-bold text-gray-800">
                Scheme Finder
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition">
              Home
            </Link>
            <Link to="/schemes" className="text-gray-700 hover:text-primary-600 font-medium transition">
              All Schemes
            </Link>
            {user && (
              <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium transition">
                Dashboard
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                  <User size={20} />
                  <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-primary-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/schemes" className="text-gray-700 hover:text-primary-600 font-medium" onClick={() => setIsOpen(false)}>
                All Schemes
              </Link>
              {user && (
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              )}
              
              {user ? (
                <>
                  <Link to="/profile" className="text-gray-700 hover:text-primary-600 font-medium" onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-red-600 hover:text-red-700 font-medium text-left">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-center" onClick={() => setIsOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;