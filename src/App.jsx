import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MapPage from './Pages/MapPage.jsx';
import NavBar from './Components/NavBar.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Footer from './Components/Footer.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Profile from './Pages/Profile.jsx'; 
import RideSharing from './Pages/RideSharing.jsx'; 
import ShareRide from './Pages/ShareRide.jsx';
import ChangePassword from './Pages/ChangePassword.jsx'; 
import Payment from './Pages/Payment.jsx';
import { RideProvider } from './Context/RideContext';
import RideHistory from './Pages/RideHistory.jsx';

function ErrorPage() {
  return (
    <div>
      <h1>Unexpected Application Error!</h1>
      <p>404 Not Found</p>
      <p>You can provide a way better UX than this when your app throws errors by providing your own ErrorBoundary or errorElement prop on your route.</p>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <RideProvider> {/* Wrap the App with RideProvider */}
      <BrowserRouter>
        <NavBar user={user} setUser={setUser} />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} /> {/* Add the profile route */}
            <Route path="/ride-sharing" element={<RideSharing />} /> {/* Add the ride-sharing route */}
            <Route path="/share-ride" element={<ShareRide />} /> {/* Add the share-ride route */}
            <Route path="/change-password" element={<ChangePassword />} /> {/* Add the change-password route */}
            <Route path="/payment" element={<Payment />} /> 
            <Route path="ride-history" element={<RideHistory/>} />
            <Route path="/map" element={<MapPage />} /> {/* Add the map route */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </RideProvider>
  );
}

export default App;