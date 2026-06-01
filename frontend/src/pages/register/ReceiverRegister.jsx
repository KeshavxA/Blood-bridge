import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';

function ReceiverRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    blood_group: 'A+'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
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
      await axios.post('/auth/register-receiver', formData);
      toast.success('Receiver registered successfully! Please log in.');
      navigate('/login');
    } catch (err) {
      const serverErrors = err.response?.data?.messages;
      if (typeof serverErrors === 'object') {
        setErrors(serverErrors);
        toast.error('Registration failed. Please check the errors.');
      } else {
        toast.error(err.response?.data?.error || 'Failed to register receiver.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register as Receiver</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input 
            type="text" 
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${errors.full_name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-500 focus:ring-red-200'} focus:ring`} 
          />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-500 focus:ring-red-200'} focus:ring`} 
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-500 focus:ring-red-200'} focus:ring`} 
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-500 focus:ring-red-200'} focus:ring`} 
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
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
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-red-600 text-white rounded-md py-2 hover:bg-red-700 transition-colors disabled:bg-red-400 flex items-center justify-center gap-2"
        >
          {loading ? <><Spinner /> Registering...</> : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default ReceiverRegister;
