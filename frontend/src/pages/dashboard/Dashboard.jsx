import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSchemes } from '../../utils/mockData';
import SchemeCard from '../../components/scheme/SchemeCard';
import { TrendingUp, Bookmark, User } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [savedSchemes, setSavedSchemes] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);

    const eligible = mockSchemes.filter((scheme) => {
      const eligibility = scheme.eligibility;
      
      if (userData.age) {
        if (eligibility.minAge && userData.age < eligibility.minAge) return false;
        if (eligibility.maxAge && userData.age > eligibility.maxAge) return false;
      }

      if (userData.income && eligibility.maxIncome) {
        if (userData.income > eligibility.maxIncome) return false;
      }

      if (userData.category && eligibility.categories) {
        if (!eligibility.categories.includes(userData.category)) return false;
      }

      return true;
    });

    setEligibleSchemes(eligible);

    const saved = JSON.parse(localStorage.getItem('savedSchemes') || '[]');
    setSavedSchemes(saved);
  }, [navigate]);

  const handleSaveScheme = (schemeId) => {
    const newSaved = [...savedSchemes, schemeId];
    setSavedSchemes(newSaved);
    localStorage.setItem('savedSchemes', JSON.stringify(newSaved));
  };

  const handleUnsaveScheme = (schemeId) => {
    const newSaved = savedSchemes.filter((id) => id !== schemeId);
    setSavedSchemes(newSaved);
    localStorage.setItem('savedSchemes', JSON.stringify(newSaved));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const savedSchemeObjects = mockSchemes.filter((scheme) => savedSchemes.includes(scheme._id));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-primary-100 text-lg">You're eligible for {eligibleSchemes.length} schemes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Eligible Schemes</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{eligibleSchemes.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Saved Schemes</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{savedSchemes.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Bookmark className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Profile Status</p>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  {user.age && user.income ? 'Complete' : 'Incomplete'}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Schemes You're Eligible For</h2>
          </div>

          {eligibleSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eligibleSchemes.slice(0, 6).map((scheme) => (
                <SchemeCard
                  key={scheme._id}
                  scheme={scheme}
                  isSaved={savedSchemes.includes(scheme._id)}
                  onSave={handleSaveScheme}
                  onUnsave={handleUnsaveScheme}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg">Complete your profile to see eligible schemes</p>
            </div>
          )}
        </div>

        {savedSchemes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Saved Schemes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSchemeObjects.map((scheme) => (
                <SchemeCard
                  key={scheme._id}
                  scheme={scheme}
                  isSaved={true}
                  onUnsave={handleUnsaveScheme}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;