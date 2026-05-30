import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HospitalRegister from './pages/register/HospitalRegister';
import ReceiverRegister from './pages/register/ReceiverRegister';
import Login from './pages/Login';
import BloodSamples from './pages/BloodSamples';
import AddBlood from './pages/hospital/AddBlood';
import ViewRequests from './pages/hospital/ViewRequests';
import MyRequests from './pages/receiver/MyRequests';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register/hospital" element={<HospitalRegister />} />
            <Route path="/register/receiver" element={<ReceiverRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blood-samples" element={<BloodSamples />} />
            
            <Route path="/hospital/add-blood" element={<AddBlood />} />
            <Route path="/hospital/requests" element={<ViewRequests />} />
            
            <Route path="/receiver/requests" element={<MyRequests />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
