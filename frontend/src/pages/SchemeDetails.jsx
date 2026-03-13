import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { schemeAPI } from '../utils/api';
import { ArrowLeft, ExternalLink, Bookmark, BookmarkCheck, FileText, CheckCircle, Info, DollarSign } from 'lucide-react';

const SchemeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        setLoading(true);
        const response = await schemeAPI.getSchemeById(id);
        setScheme(response.data.data);
        const savedSchemes = JSON.parse(localStorage.getItem('savedSchemes') || '[]');
        setIsSaved(savedSchemes.includes(id));
      } catch (err) {
        setError('Failed to load scheme details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemeDetails();
  }, [id]);

  const handleSave = () => {
    const savedSchemes = JSON.parse(localStorage.getItem('savedSchemes') || '[]');
    if (isSaved) {
      const updated = savedSchemes.filter(schemeId => schemeId !== id);
      localStorage.setItem('savedSchemes', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      savedSchemes.push(id);
      localStorage.setItem('savedSchemes', JSON.stringify(savedSchemes));
      setIsSaved(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading scheme details...</p>
        </div>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Scheme not found'}</p>
          <button onClick={() => navigate('/schemes')} className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Back to Schemes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3">{scheme.name}</h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium">{scheme.category}</span>
                <span className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium">{scheme.schemeType}</span>
              </div>
            </div>
            <button onClick={handleSave} className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition">
              {isSaved ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Info size={24} className="text-primary-600" />
                About This Scheme
              </h2>
              <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign size={24} className="text-green-600" />
                Benefits
              </h2>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-gray-800 font-medium">{scheme.benefits}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle size={24} className="text-blue-600" />
                Eligibility Criteria
              </h2>
              <div className="space-y-3">
                {scheme.eligibility && (scheme.eligibility.minAge || scheme.eligibility.maxAge) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Age:</span> {scheme.eligibility.minAge || 0}
                      {scheme.eligibility.maxAge ? ` - ${scheme.eligibility.maxAge}` : '+'} years
                    </p>
                  </div>
                )}
                {scheme.eligibility && scheme.eligibility.maxIncome && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Income:</span> Up to ₹{scheme.eligibility.maxIncome.toLocaleString('en-IN')} per year
                    </p>
                  </div>
                )}
                {scheme.eligibility && scheme.eligibility.states && scheme.eligibility.states.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      <span className="font-semibold">States:</span> {scheme.eligibility.states.join(', ')}
                    </p>
                  </div>
                )}
                {scheme.eligibility && scheme.eligibility.categories && scheme.eligibility.categories.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Categories:</span> {scheme.eligibility.categories.join(', ')}
                    </p>
                  </div>
                )}
                {scheme.eligibility && scheme.eligibility.gender && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Gender:</span> {scheme.eligibility.gender}
                    </p>
                  </div>
                )}
                {scheme.eligibility && scheme.eligibility.occupations && scheme.eligibility.occupations.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Occupation:</span> {scheme.eligibility.occupations.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {scheme.documents && scheme.documents.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText size={24} className="text-purple-600" />
                  Required Documents
                </h2>
                <ul className="space-y-2">
                  {scheme.documents.map((doc, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle size={18} className="text-green-600" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="text-gray-800 font-semibold">{scheme.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="text-gray-800 font-semibold">{scheme.schemeType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${scheme.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {scheme.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {scheme.applicationLink && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Ready to Apply?</h3>
                <p className="text-gray-600 text-sm mb-4">Visit the official website to submit your application</p>
                <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition">
                  Apply Now
                  <ExternalLink size={18} />
                </a>
              </div>
            )}

            {scheme.officialWebsite && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Official Website</h3>
                <a href={scheme.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 text-sm break-all">
                  <ExternalLink size={16} />
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
