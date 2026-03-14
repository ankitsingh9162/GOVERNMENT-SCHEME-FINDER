import { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState(null);

  const handleSync = async () => {
    setSyncing(true);
    setResult(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/admin/sync-schemes',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setResult(response.data);
      alert(`✅ Sync successful!\nAdded: ${response.data.stats.added}\nUpdated: ${response.data.stats.updated}`);
    } catch (error) {
      alert('❌ Sync failed: ' + error.response?.data?.message);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
          
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Scheme Synchronization</h2>
            <p className="text-gray-600 mb-4">
              Sync latest schemes from MyScheme.gov.in API. This will add new schemes and update existing ones.
            </p>
            
            <button
              onClick={handleSync}
              disabled={syncing}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncing ? '🔄 Syncing...' : '🔄 Sync Schemes Now'}
            </button>
            
            {result && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800">Sync Results:</h3>
                <ul className="mt-2 space-y-1 text-green-700">
                  <li>✅ Total Schemes: {result.stats.total}</li>
                  <li>➕ Added: {result.stats.added}</li>
                  <li>🔄 Updated: {result.stats.updated}</li>
                  {result.stats.errors > 0 && (
                    <li>❌ Errors: {result.stats.errors}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          
          <div className="border-t mt-8 pt-6">
            <h2 className="text-xl font-semibold mb-4">Automatic Sync</h2>
            <p className="text-gray-600">
              ✅ Auto-sync is enabled and runs daily at 2:00 AM
            </p>
            <p className="text-sm text-gray-500 mt-2">
              The system automatically checks MyScheme API every night and updates the database with new schemes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;