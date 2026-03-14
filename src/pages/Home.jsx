import { Link } from 'react-router-dom';
import { Search, TrendingUp, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Government Schemes
              <br />
              You're Eligible For
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover welfare schemes based on your profile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg">
                Get Started Free
              </Link>
              <Link to="/schemes" className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition text-lg border-2 border-white">
                Browse Schemes
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use Scheme Finder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Smart Discovery</h3>
              <p className="text-gray-600">
                Find schemes automatically based on your age, income, state, and occupation. No more manual searching!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Verified Information</h3>
              <p className="text-gray-600">
                All schemes are sourced from official government portals. Get accurate, up-to-date information.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Easy Application</h3>
              <p className="text-gray-600">
                Get document checklists, application links, and reminders. Apply with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Government Schemes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">Free to Use</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Create Profile', desc: 'Sign up and enter your basic details' },
              { step: '2', title: 'Get Matches', desc: 'We find schemes you qualify for' },
              { step: '3', title: 'Learn More', desc: 'Read details and requirements' },
              { step: '4', title: 'Apply', desc: 'Apply directly on government portals' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Discover Your Benefits?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of Indians accessing their rightful benefits
          </p>
          <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg inline-block">
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;