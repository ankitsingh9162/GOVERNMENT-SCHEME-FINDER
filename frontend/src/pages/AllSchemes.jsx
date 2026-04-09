import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { schemeAPI } from '../utils/api';
import { Search, Filter, ExternalLink } from 'lucide-react';

const AllSchemes = () => {
const [schemes, setSchemes] = useState([]);
const [filteredSchemes, setFilteredSchemes] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');
const [categories, setCategories] = useState(['All']);

// ✅ Improved Category to image mapping
const categoryImages = {
'education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
'health': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
'agriculture': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
'farmers': 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
'women': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
'senior': 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&h=300&fit=crop',
'housing': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
'employment': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
'financial': 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
'startup': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
'default': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop'
};

useEffect(() => {
fetchSchemes();
}, []);

useEffect(() => {
filterSchemes();
}, [schemes, searchTerm, selectedCategory]);

const fetchSchemes = async () => {
try {
setLoading(true);
const response = await schemeAPI.getAllSchemes();
const schemesData = response.data.data;
setSchemes(schemesData);


  const uniqueCategories = ['All', ...new Set(schemesData.map(s => s.category))];
  setCategories(uniqueCategories);
} catch (err) {
  console.error('Fetch schemes error:', err);
  setError('Failed to load schemes. Please try again.');
} finally {
  setLoading(false);
}


};

const filterSchemes = () => {
let filtered = schemes;


if (selectedCategory !== 'All') {
  filtered = filtered.filter(scheme => scheme.category === selectedCategory);
}

if (searchTerm) {
  filtered = filtered.filter(scheme =>
    scheme.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

setFilteredSchemes(filtered);


};

// ✅ Smart image selector (handles all cases)
const getSchemeImage = (category) => {
if (!category) return categoryImages.default;


const cat = category.toLowerCase();

if (cat.includes('education')) return categoryImages.education;
if (cat.includes('health')) return categoryImages.health;
if (cat.includes('agriculture')) return categoryImages.agriculture;
if (cat.includes('farmer')) return categoryImages.farmers;
if (cat.includes('women')) return categoryImages.women;
if (cat.includes('senior')) return categoryImages.senior;
if (cat.includes('housing')) return categoryImages.housing;
if (cat.includes('employment')) return categoryImages.employment;
if (cat.includes('financial')) return categoryImages.financial;
if (cat.includes('startup')) return categoryImages.startup;

return categoryImages.default;


};

if (loading) {
return ( <div className="min-h-screen flex items-center justify-center"> <div className="text-center"> <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div> <p className="mt-4 text-gray-600">Loading schemes...</p> </div> </div>
);
}

if (error) {
return ( <div className="min-h-screen flex items-center justify-center"> <div className="text-center"> <p className="text-red-600 text-lg">{error}</p> <button
         onClick={fetchSchemes}
         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
       >
Retry </button> </div> </div>
);
}

return ( <div className="min-h-screen bg-gray-50 py-12"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        All Government Schemes
      </h1>
      <p className="text-gray-600">
        Browse through {schemes.length} schemes available across India
      </p>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Schemes
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>

    <div className="mb-6">
      <p className="text-gray-600">
        Showing <span className="font-semibold text-gray-900">{filteredSchemes.length}</span> schemes
      </p>
    </div>

    {filteredSchemes.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No schemes found.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

            <div className="relative h-48">
              <img
                src={getSchemeImage(scheme.category)}
                alt={scheme.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{scheme.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>

              <div className="mb-4 bg-green-50 p-3 rounded">
                <b>Benefits:</b> {scheme.benefits}
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {scheme.eligibility?.minAge && <span>Age: {scheme.eligibility.minAge}+</span>}
                {scheme.eligibility?.maxIncome && <span>Income: ₹{(scheme.eligibility.maxIncome / 100000).toFixed(1)}L</span>}
              </div>

              <div className="flex gap-2">
                <Link to={`/schemes/${scheme._id}`} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-center">
                  View Details
                </Link>

                {/* ✅ FIXED BUTTON */}
                <a
                  href={scheme.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded"
                >
                  <ExternalLink size={18} />
                </a>

              </div>
            </div>

          </div>
        ))}
      </div>
    )}

  </div>
</div>


);
};

export default AllSchemes;
