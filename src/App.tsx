import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { PlantIdentify } from './pages/PlantIdentify';
import { GardenPlanner } from './pages/GardenPlanner';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/identify" element={<PlantIdentify />} />
          <Route path="/planner" element={<GardenPlanner />} />
          <Route path="/community" element={<div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600">Community page coming soon!</p></div>} />
          <Route path="/blog" element={<div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600">Blog page coming soon!</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;