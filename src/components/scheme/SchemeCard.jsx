import { Link } from 'react-router-dom';
import { ExternalLink, Bookmark, Check } from 'lucide-react';

const SchemeCard = ({ scheme, isSaved = false, onSave, onUnsave }) => {
  const getCategoryColor = (category) => {
    const colors = {
      Health: 'bg-red-100 text-red-800',
      Education: 'bg-blue-100 text-blue-800',
      Women: 'bg-pink-100 text-pink-800',
      Farmers: 'bg-green-100 text-green-800',
      'Senior Citizens': 'bg-purple-100 text-purple-800',
      'Startup/MSME': 'bg-yellow-100 text-yellow-800',
      Housing: 'bg-indigo-100 text-indigo-800',
      Employment: 'bg-orange-100 text-orange-800',
      'Financial Assistance': 'bg-teal-100 text-teal-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{scheme.name}</h3>
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(scheme.category)}`}>
              {scheme.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
              {scheme.schemeType}
            </span>
          </div>
        </div>
        
        {onSave && (
          <button
            onClick={() => (isSaved ? onUnsave(scheme._id) : onSave(scheme._id))}
            className={`p-2 rounded-full transition ${isSaved ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title={isSaved ? 'Remove from saved' : 'Save scheme'}
          >
            {isSaved ? <Check size={20} /> : <Bookmark size={20} />}
          </button>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scheme.description}</p>

      <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4">
        <p className="text-sm font-semibold text-green-800">💰 Benefits: {scheme.benefits}</p>
      </div>

      {scheme.eligibility && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Eligibility:</h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {scheme.eligibility.minAge && (
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">Age: {scheme.eligibility.minAge}+</span>
            )}
            {scheme.eligibility.maxIncome && (
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                Income: ₹{(scheme.eligibility.maxIncome / 100000).toFixed(1)}L max
              </span>
            )}
            {scheme.eligibility.categories && (
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                {scheme.eligibility.categories.join(', ')}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Link to={`/schemes/${scheme._id}`} className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition text-center text-sm font-medium">
          View Details
        </Link>
        {scheme.applicationLink && (
          <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
            Apply
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default SchemeCard;