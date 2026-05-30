import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddBlood() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    blood_group: 'A+',
    units_available: 1,
    collection_date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.units_available || formData.units_available < 1) newErrors.units_available = 'Must be at least 1 unit';
    if (!formData.collection_date) newErrors.collection_date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setLoading(true);
    
    try {
      await axios.post('/blood-samples', formData);
      toast.success('Blood sample added successfully!');
      navigate('/blood-samples');
    } catch (err) {
      toast.error(err.response?.data?.messages?.error || 'Failed to add blood sample. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Blood Sample</h2>
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
