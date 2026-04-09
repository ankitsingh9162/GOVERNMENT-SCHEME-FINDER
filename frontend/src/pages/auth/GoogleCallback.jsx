import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const handleCallback = () => {
      const token = searchParams.get('token');
      const userData = searchParams.get('user');
      
      console.log('Token received:', token ? 'Yes' : 'No');
      console.log('User data received:', userData ? 'Yes' : 'No');
      
      if (token && userData) {
        try {
          setStatus('Saving credentials...');
          
          localStorage.setItem('token', token);
          localStorage.setItem('user', userData);
          
          setStatus('Success! Redirecting...');
          
          setTimeout(() => {
            navigate('/dashboard');
            window.location.reload();
          }, 1000);
        } catch (error) {
          console.error('Error saving auth data:', error);
          setStatus('Error: Failed to save session. Redirecting...');
          setTimeout(() => navigate('/login'), 2500);
        }
      } else {
        console.error('Missing token or user data:', { token: !!token, user: !!userData });
        setStatus(`Authentication failed: ${!token ? 'Missing Token' : ''} ${!userData ? 'Missing User Data' : ''}. Redirecting...`);
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
        <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-6 animate-spin" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Google Sign In
        </h2>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  );
};

export default GoogleCallback;