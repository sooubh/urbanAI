import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { PlantIdentify } from './pages/PlantIdentify';
import { GardenPlanner } from './pages/GardenPlanner';
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import SignInPage from './pages/SignIn';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route
            path="/chat"
            element={
              <>
                <SignedOut>
                  <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                      <SignIn routing="path" path="/chat" />
                    </div>
                  </div>
                </SignedOut>
                <SignedIn>
                  <Chat />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/identify"
            element={
              <>
                <SignedOut>
                  <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                      <SignIn routing="path" path="/identify" />
                    </div>
                  </div>
                </SignedOut>
                <SignedIn>
                  <PlantIdentify />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/planner"
            element={
              <>
                <SignedOut>
                  <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                      <SignIn routing="path" path="/planner" />
                    </div>
                  </div>
                </SignedOut>
                <SignedIn>
                  <GardenPlanner />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/community"
            element={
              <>
                <SignedOut>
                  <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                      <SignIn routing="path" path="/community" />
                    </div>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600">Community page coming soon!</p></div>
                </SignedIn>
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <SignedOut>
                  <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                      <SignIn routing="path" path="/blog" />
                    </div>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600">Blog page coming soon!</p></div>
                </SignedIn>
              </>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;