import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider flex items-center gap-2">
          <span>🩸</span> BloodBridge
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/blood-samples" className="hover:text-red-200 transition-colors">Blood Samples</Link>
          
          {!user ? (
            <>
              <Link to="/login" className="hover:text-red-200 transition-colors">Login</Link>
              <div className="group relative inline-block">
                <button className="hover:text-red-200 transition-colors">Register</button>
                <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg mt-1 rounded right-0 z-10 min-w-max">
                  <Link to="/register/hospital" className="block px-4 py-2 hover:bg-gray-100">As Hospital</Link>
                  <Link to="/register/receiver" className="block px-4 py-2 hover:bg-gray-100">As Receiver</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {user.role === 'hospital' && (
                <>
                  <Link to="/hospital/add-blood" className="hover:text-red-200 transition-colors">Add Blood</Link>
                  <Link to="/hospital/requests" className="hover:text-red-200 transition-colors">Requests</Link>
                </>
              )}
              {user.role === 'receiver' && (
                <Link to="/receiver/requests" className="hover:text-red-200 transition-colors">My Requests</Link>
              )}
              <button onClick={handleLogout} className="bg-red-700 px-4 py-1 rounded hover:bg-red-800 transition-colors">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
