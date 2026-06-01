import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-red-600 text-white shadow-md relative z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider flex items-center gap-2" onClick={closeMenu}>
          <span>🩸</span> BloodBridge
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop & Mobile Menu */}
        <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-red-600 md:bg-transparent shadow-xl md:shadow-none p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-4 items-start md:items-center border-t md:border-t-0 border-red-500`}>
          <Link to="/blood-samples" onClick={closeMenu} className="hover:text-red-200 transition-colors w-full md:w-auto">Blood Samples</Link>
          
          {!user ? (
            <>
              <Link to="/login" onClick={closeMenu} className="hover:text-red-200 transition-colors w-full md:w-auto">Login</Link>
              <div className="group relative inline-block w-full md:w-auto">
                <button className="hover:text-red-200 transition-colors text-left w-full md:w-auto">Register</button>
                <div className="md:absolute hidden group-hover:block md:bg-white md:text-gray-800 bg-red-700 text-white shadow-lg mt-1 rounded right-0 z-10 min-w-max pl-4 md:pl-0">
                  <Link to="/register/hospital" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100 md:hover:bg-gray-100 hover:bg-red-800">As Hospital</Link>
                  <Link to="/register/receiver" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100 md:hover:bg-gray-100 hover:bg-red-800">As Receiver</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {user.role === 'hospital' && (
                <>
                  <Link to="/hospital/add-blood" onClick={closeMenu} className="hover:text-red-200 transition-colors w-full md:w-auto">Add Blood</Link>
                  <Link to="/hospital/requests" onClick={closeMenu} className="hover:text-red-200 transition-colors w-full md:w-auto">Requests</Link>
                </>
              )}
              {user.role === 'receiver' && (
                <Link to="/receiver/requests" onClick={closeMenu} className="hover:text-red-200 transition-colors w-full md:w-auto">My Requests</Link>
              )}
              <button onClick={handleLogout} className="bg-red-700 px-4 py-2 md:py-1 rounded hover:bg-red-800 transition-colors w-full md:w-auto text-left md:text-center mt-2 md:mt-0">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
