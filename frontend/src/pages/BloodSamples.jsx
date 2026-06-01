import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

function BloodSamples() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [samples, setSamples] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSamples();
    if (user?.role === 'receiver') {
      fetchMyRequests();
    }
  }, [user]);

  const fetchSamples = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/blood-samples');
      setSamples(response.data);
    } catch (error) {
      console.error('Failed to fetch samples', error);

      setSamples([
        { id: 1, blood_group: 'O+', units_available: 5, hospital_name: 'City Hospital', collection_date: '2023-10-01' },
        { id: 2, blood_group: 'A-', units_available: 2, hospital_name: 'Metro Care', collection_date: '2023-10-02' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const response = await axios.get('/requests/receiver');
      setMyRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests', error);
    }
  };

  const isCompatible = (donorGroup, receiverGroup) => {
    const map = {
      'O-': ['O-'],
      'O+': ['O-', 'O+'],
      'A-': ['O-', 'A-'],
      'A+': ['O-', 'O+', 'A-', 'A+'],
      'B-': ['O-', 'B-'],
      'B+': ['O-', 'O+', 'B-', 'B+'],
      'AB-': ['O-', 'A-', 'B-', 'AB-'],
      'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
    };
    return map[receiverGroup]?.includes(donorGroup);
  };

  const handleRequest = async (sampleId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('/requests', { blood_sample_id: sampleId });
      fetchMyRequests(); // Refresh requests after successful request
      toast.success('Request sent successfully!');
    } catch (error) {
      toast.error(error.response?.data?.messages?.error || 'Failed to request sample');
    }
  };

  const renderActionButton = (sample) => {
    if (!user) {
      return (
        <button onClick={() => navigate('/login')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
          Request
        </button>
      );
    }

    if (user.role === 'hospital') {
      return (
        <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed" title="Hospitals cannot request samples">
          Request
        </button>
      );
    }

    if (user.role === 'receiver') {
      const alreadyRequested = myRequests.find(req => req.blood_sample_id === sample.id);
      if (alreadyRequested) {
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Requested
          </span>
        );
      }

      const compatible = isCompatible(sample.blood_group, profile?.blood_group);
      if (!compatible) {
        return (
          <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed" title="Your blood group is not compatible">
            Request
          </button>
        );
      }

      return (
        <button onClick={() => handleRequest(sample.id)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
          Request
        </button>
      );
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Blood Samples</h2>

      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Available</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex justify-center items-center flex-col gap-2">
                    <Spinner className="w-8 h-8 text-red-600" />
                    <span>Loading samples...</span>
                  </div>
                </td>
              </tr>
            ) : samples.map(sample => (
              <tr key={`desktop-${sample.id}`}>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-red-600">{sample.blood_group}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sample.hospital_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sample.units_available}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sample.collection_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {renderActionButton(sample)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && samples.length === 0 && (
          <div className="p-12 text-center text-gray-500 bg-gray-50 flex flex-col items-center justify-center gap-3">
            <svg className="w-16 h-16 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
            <p className="text-lg font-medium text-gray-600">No blood samples available at the moment.</p>
            {user?.role === 'hospital' && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-3">Add a new blood sample to your inventory so receivers can request it.</p>
                <Link to="/hospital/add-blood" className="text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors">
                  Add Blood Sample
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {loading ? (
          <div className="bg-white p-10 rounded-xl shadow border border-gray-100 flex flex-col items-center justify-center gap-3">
            <Spinner className="w-8 h-8 text-red-600" />
            <span className="text-gray-500">Loading samples...</span>
          </div>
        ) : samples.map(sample => (
          <div key={`mobile-${sample.id}`} className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-gray-500 font-medium">Blood Group</span>
              <span className="text-xl font-bold text-red-600">{sample.blood_group}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Hospital</span>
              <span className="text-sm font-medium text-gray-900">{sample.hospital_name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Units</span>
              <span className="text-sm text-gray-900">{sample.units_available}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-sm text-gray-500">Collection Date</span>
              <span className="text-sm text-gray-900">{sample.collection_date}</span>
            </div>
            <div className="pt-2 flex justify-end">
              {renderActionButton(sample)}
            </div>
          </div>
        ))}
        {!loading && samples.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow border border-gray-100 flex flex-col items-center justify-center gap-3 text-center">
            <svg className="w-16 h-16 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
            <p className="text-lg font-medium text-gray-600">No blood samples available at the moment.</p>
            {user?.role === 'hospital' && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-3">Add a new blood sample to your inventory so receivers can request it.</p>
                <Link to="/hospital/add-blood" className="text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors inline-block">
                  Add Blood Sample
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BloodSamples;
