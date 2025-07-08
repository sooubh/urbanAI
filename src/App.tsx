import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { PlantIdentify } from './pages/PlantIdentify';
import { GardenPlanner } from './pages/GardenPlanner';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
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