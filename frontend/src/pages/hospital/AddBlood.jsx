import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBlood() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    blood_group: 'A+',
    units_available: 1,
    collection_date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('/blood-samples', formData);
      alert('Blood sample added successfully!');
      navigate('/blood-samples');
    } catch (err) {
      setError(err.response?.data?.messages?.error || 'Failed to add blood sample. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Blood Sample</h2>
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Group</label>
          <select 
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 p-2 border bg-white"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Units Available</label>
          <input 
            type="number" 
            name="units_available"
            min="1" 
            value={formData.units_available}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 p-2 border" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Collection Date</label>
          <input 
            type="date" 
            name="collection_date"
            value={formData.collection_date}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 p-2 border" 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-red-600 text-white rounded-md py-2 hover:bg-red-700 transition-colors disabled:bg-red-400"
        >
          {loading ? 'Adding...' : 'Add Sample'}
        </button>
      </form>
    </div>
  );
}

export default AddBlood;
