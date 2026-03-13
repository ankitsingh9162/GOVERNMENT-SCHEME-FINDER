import { useState, useEffect } from 'react';
import { userAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await userAPI.getProfile();
        setUser(response.data.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <p className="text-lg font-semibold text-gray-800">{user.name}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="text-lg font-semibold text-gray-800">{user.email}</p>
            </div>
            
            {user.age && (
              <div>
                <label className="text-sm text-gray-600">Age</label>
                <p className="text-lg font-semibold text-gray-800">{user.age} years</p>
              </div>
            )}
            
            {user.state && (
              <div>
                <label className="text-sm text-gray-600">State</label>
                <p className="text-lg font-semibold text-gray-800">{user.state}</p>
              </div>
            )}
            
            {user.income && (
              <div>
                <label className="text-sm text-gray-600">Annual Income</label>
                <p className="text-lg font-semibold text-gray-800">₹{user.income.toLocaleString('en-IN')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;