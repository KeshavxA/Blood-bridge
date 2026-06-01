import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
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
      await login(formData.email, formData.password);
      toast.success('Logged in successfully!');
      navigate('/blood-samples');
    } catch (err) {
      const apiError = err.response?.data?.messages?.error || err.response?.data?.error;
      toast.error(typeof apiError === 'string' ? apiError : 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            name="email"
            autoComplete="username"
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
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-500 focus:ring-red-200'} focus:ring`} 
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-red-600 text-white rounded-md py-2 hover:bg-red-700 transition-colors disabled:bg-red-400 flex items-center justify-center gap-2"
        >
          {loading ? <><Spinner /> Logging in...</> : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
