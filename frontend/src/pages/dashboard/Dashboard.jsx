import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { schemeAPI } from '../../utils/api';
import SchemeCard from '../../components/scheme/SchemeCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchEligibleSchemes = async () => {
      try {
        setLoading(true);
        const response = await schemeAPI.getEligibleSchemes();
        setEligibleSchemes(response.data.data);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load eligible schemes');
      } finally {
        setLoading(false);
      }
    };

    fetchEligibleSchemes();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your eligible schemes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Eligible Schemes</h1>
          <p className="text-gray-600">
            Based on your profile, you are eligible for {eligibleSchemes.length} scheme{eligibleSchemes.length !== 1 ? 's' : ''}
          </p>
        </div>

        {eligibleSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibleSchemes.map((scheme) => (
              <SchemeCard key={scheme._id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No eligible schemes found</p>
            <p className="text-gray-500 mt-2">Please update your profile to see personalized recommendations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;