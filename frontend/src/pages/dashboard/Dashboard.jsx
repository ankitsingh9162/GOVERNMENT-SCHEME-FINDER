import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { schemeAPI, userAPI } from '../../utils/api';
import { User, Heart, TrendingUp, Filter } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile
      const userResponse = await userAPI.getProfile();
      setUser(userResponse.data);
      
      // Fetch eligible schemes based on user profile
      const schemesResponse = await schemeAPI.getEligibleSchemes();
      setEligibleSchemes(schemesResponse.data.data || []);
      
      // Get saved scheme IDs
      setSavedSchemes(userResponse.data.savedSchemes || []);
      
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveScheme = async (schemeId) => {
    try {
      if (savedSchemes.includes(schemeId)) {
        await userAPI.unsaveScheme(schemeId);
        setSavedSchemes(savedSchemes.filter(id => id !== schemeId));
      } else {
        await userAPI.saveScheme(schemeId);
        setSavedSchemes([...savedSchemes, schemeId]);
      }
    } catch (err) {
      console.error('Save scheme error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome, {user?.name}!
                </h1>
                <p className="text-gray-600 mt-1">
                  Here are schemes personalized for your profile
                </p>
              </div>
            </div>
            <Link
              to="/profile"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* User Profile Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Your Profile</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Age</p>
              <p className="text-2xl font-bold text-blue-600">{user?.age} years</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Annual Income</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{user?.income?.toLocaleString('en-IN')}
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">State</p>
              <p className="text-lg font-bold text-purple-600">{user?.state}</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Category</p>
              <p className="text-lg font-bold text-orange-600">{user?.category}</p>
            </div>
          </div>

          {user?.gender && (
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
              <span>Gender: <strong>{user.gender}</strong></span>
              {user?.occupation && (
                <span>Occupation: <strong>{user.occupation}</strong></span>
              )}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Eligible Schemes</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {eligibleSchemes.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Based on your profile criteria
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Saved Schemes</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {savedSchemes.length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Schemes you've bookmarked
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Match Rate</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {eligibleSchemes.length > 0 
                    ? Math.round((eligibleSchemes.length / 30) * 100) 
                    : 0}%
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Filter className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Of total schemes available
            </p>
          </div>
        </div>

        {/* Eligible Schemes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Eligible Schemes
            </h2>
            <Link
              to="/schemes"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Schemes →
            </Link>
          </div>

          {eligibleSchemes.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Eligible Schemes Found
              </h3>
              <p className="text-gray-600 mb-6">
                Update your profile to see personalized recommendations
              </p>
              <Link
                to="/profile"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Profile
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eligibleSchemes.slice(0, 6).map((scheme) => (
                <div
                  key={scheme._id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {scheme.category}
                    </span>
                    <button
                      onClick={() => handleSaveScheme(scheme._id)}
                      className={`p-2 rounded-full transition ${
                        savedSchemes.includes(scheme._id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Heart
                        className="w-5 h-5"
                        fill={savedSchemes.includes(scheme._id) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {scheme.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {scheme.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {scheme.schemeType}
                    </span>
                    <Link
                      to={`/schemes/${scheme._id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {eligibleSchemes.length > 6 && (
            <div className="text-center mt-8">
              <Link
                to="/schemes"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
              >
                View All {eligibleSchemes.length} Eligible Schemes
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;