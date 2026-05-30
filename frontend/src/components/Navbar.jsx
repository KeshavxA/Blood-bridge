import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">BloodBridge</Link>
        <div className="space-x-4">
          <Link to="/blood-samples" className="hover:text-red-200 transition-colors">Blood Samples</Link>
          <Link to="/login" className="hover:text-red-200 transition-colors">Login</Link>
          <div className="group relative inline-block">
            <button className="hover:text-red-200 transition-colors">Register</button>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg mt-1 rounded right-0 z-10 min-w-max">
              <Link to="/register/hospital" className="block px-4 py-2 hover:bg-gray-100">As Hospital</Link>
              <Link to="/register/receiver" className="block px-4 py-2 hover:bg-gray-100">As Receiver</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
