import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Index from './Pages/Index.jsx';
import NavBar from './Components/NavBar.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Footer from './Components/Footer.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Profile from './Pages/Profile.jsx'; // Import the Profile component

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
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} /> {/* Add the profile route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;