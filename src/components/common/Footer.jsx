import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Government Scheme Finder</h3>
            <p className="text-gray-400">
              Helping Indian citizens discover and access government welfare schemes they're eligible for.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/schemes" className="hover:text-white transition">All Schemes</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@schemefinder.in</li>
              <li>Phone: 1800-XXX-XXXX</li>
              <li>Address: New Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>for India</span>
          </p>
          <p className="mt-2 text-sm">© 2024 Government Scheme Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;