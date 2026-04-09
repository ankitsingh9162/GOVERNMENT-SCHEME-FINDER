import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  TrendingUp, 
  Award, 
  Users, 
  ChevronRight,
  MessageCircle,
  X,
  Send,
  ChevronLeft
} from 'lucide-react';
import { getChatbotResponse } from '../services/chatbotService';

// Inside Home component, update handleSendMessage:

const handleSendMessage = async () => {
  if (!inputMessage.trim()) return;

  // Add user message
  const userMsg = inputMessage;
  setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
  setInputMessage('');

  // Show typing indicator
  setMessages(prev => [...prev, { type: 'bot', text: 'Typing...', isTyping: true }]);

  try {
    // Get AI response
    const botResponse = await getChatbotResponse(userMsg);
    
    // Remove typing indicator and add real response
    setMessages(prev => prev.filter(m => !m.isTyping).concat({
      type: 'bot',
      text: botResponse
    }));
  } catch (error) {
    setMessages(prev => prev.filter(m => !m.isTyping).concat({
      type: 'bot',
      text: "Sorry, I couldn't process that. Can you ask about specific schemes?"
    }));
  }
};
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I can help you find government schemes. What are you looking for?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Hero Slider Data
  const slides = [
    {
      title: "Discover Government Schemes",
      subtitle: "Find welfare programs tailored to your profile",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "Personalized Recommendations",
      subtitle: "Get schemes based on your age, income, and location",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800",
      gradient: "from-green-600 to-teal-600"
    },
    {
      title: "Easy Application Process",
      subtitle: "Direct links to official government portals",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      gradient: "from-orange-600 to-red-600"
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Chatbot logic
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages([...messages, { type: 'user', text: inputMessage }]);

    // Simple bot responses
    setTimeout(() => {
      let botResponse = "I can help you with that! Please register to see personalized schemes.";
      
      if (inputMessage.toLowerCase().includes('education')) {
        botResponse = "We have several education schemes! Check out PM Scholarship Scheme and Post Matric Scholarships.";
      } else if (inputMessage.toLowerCase().includes('farmer')) {
        botResponse = "For farmers, we have PM-KISAN and Pradhan Mantri Fasal Bima Yojana. Register to see more!";
      } else if (inputMessage.toLowerCase().includes('women')) {
        botResponse = "Great! We have schemes like Beti Bachao Beti Padhao and PM Ujjwala Yojana for women.";
      }

      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);

    setInputMessage('');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section with Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`}></div>
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="text-white max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in-up animation-delay-200">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
                  <Link
                    to="/register"
                    className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/schemes"
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition transform hover:scale-105"
                  >
                    Browse Schemes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 transform hover:scale-105 transition">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-600 mb-2">30+</h3>
              <p className="text-gray-600">Government Schemes</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 transform hover:scale-105 transition">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">1000+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 transform hover:scale-105 transition">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-purple-600 mb-2">95%</h3>
              <p className="text-gray-600">Match Accuracy</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 transform hover:scale-105 transition">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-orange-600 mb-2">Fast</h3>
              <p className="text-gray-600">Instant Results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find eligible schemes in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Create Profile
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Register and fill in your details like age, income, state, and category
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get Matched
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our system automatically filters and shows schemes you qualify for
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Apply Easily
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Click on any scheme to view details and apply through official portals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Discover Your Benefits?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Indians finding government schemes they're eligible for
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg text-lg"
          >
            Create Free Account
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Chatbot Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition transform z-50"
      >
        {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-up">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-bold text-lg">Scheme Assistant</h3>
            <p className="text-sm text-blue-100">Ask me about schemes!</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about schemes..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;