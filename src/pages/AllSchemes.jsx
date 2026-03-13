import { useState, useEffect } from 'react';
import { schemeAPI } from '../utils/api';
import SchemeCard from '../components/scheme/SchemeCard';
import { Filter } from 'lucide-react';

const AllSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch schemes from backend
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true);
        const response = await schemeAPI.getAllSchemes();
        const schemesData = response.data.data;
        
        setSchemes(schemesData);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(schemesData.map(s => s.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load schemes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading schemes...</p>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">All Government Schemes</h1>
          <p className="text-gray-600">Browse through {schemes.length} schemes available across India</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Schemes</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Filter size={16} />
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing <strong>{filteredSchemes.length}</strong> scheme{filteredSchemes.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
          </p>
        </div>

        {filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme._id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No schemes found</p>
            <p className="text-gray-500 mt-2">Try changing your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSchemes;