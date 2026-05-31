import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/requests/hospital');
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests', error);
      toast.error('Failed to load blood requests');

      setRequests([
        {
          id: 1,
          receiver_name: 'John Doe',
          receiver_blood_group: 'O+',
          sample_blood_group: 'O+',
          units_available: 5,
          status: 'pending',
          requested_at: '2023-10-27 10:00:00'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (requestId, newStatus) => {
    // Backend endpoint not implemented yet in this iteration, just updating state locally for demo
    toast.error(`Backend endpoint to ${newStatus} request not implemented yet.`);
    setRequests(requests.map(req => req.id === requestId ? { ...req, status: newStatus } : req));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Blood Requests</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Sample</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading requests...</td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No requests found.</td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.receiver_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">{request.receiver_blood_group}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.sample_blood_group} ({request.units_available} Units)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.requested_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                      }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {request.status === 'pending' && (
                      <>
                        <button onClick={() => handleStatusChange(request.id, 'approved')} className="text-green-600 hover:text-green-900 mr-4">Approve</button>
                        <button onClick={() => handleStatusChange(request.id, 'rejected')} className="text-red-600 hover:text-red-900">Reject</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewRequests;
