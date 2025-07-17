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
import Community from './pages/community';
import Blog from './pages/blog';
import BlogPost from './pages/blogPost';
import About from './pages/about';
import Contact from './pages/contact';
import Auth from './pages/Auth';
import Profile from './pages/profile';

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
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;