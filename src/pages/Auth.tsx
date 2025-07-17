import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { supabase } from '../services/supabaseClient';
import { FaGithub } from 'react-icons/fa';

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (activeTab === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSuccess('Login successful!');
        // TODO: Redirect or update UI after login
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess('Sign up successful! Please check your email to confirm your account.');
        // TODO: Redirect or update UI after signup
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
      // Supabase will redirect automatically
    } catch (err: any) {
      setError(err.message || 'OAuth login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-green-500 rounded-xl p-4 mb-4">
          {/* Placeholder for logo icon */}
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#22c55e"/><path d="M8 14c2.5-2.5 6.5-2.5 9 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M12 8v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <h1 className="text-2xl font-bold text-green-900">Urban Garden</h1>
        <p className="text-green-700">Grow your community, naturally</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex-1 py-2 text-lg font-semibold ${activeTab === 'login' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400'}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-lg font-semibold ${activeTab === 'signup' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400'}`}
            onClick={() => handleTabChange('signup')}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>
          {activeTab === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          {activeTab === 'login' && (
            <div className="flex justify-end">
              <a href="#" className="text-green-600 text-sm hover:underline">Forgot password?</a>
            </div>
          )}
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
          <Button type="submit" className="w-full mt-2" isLoading={loading} disabled={loading}>
            {activeTab === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-4 text-gray-400">Or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={() => handleOAuthLogin('google')} className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 hover:bg-gray-50">
            <svg width="20" height="20" viewBox="0 0 48 48"><g><circle fill="#fff" cx="24" cy="24" r="24"/><path fill="#4285F4" d="M34.6 24.2c0-.7-.1-1.4-.2-2H24v4.1h6c-.3 1.5-1.3 2.7-2.7 3.5v2.9h4.4c2.6-2.4 4.1-5.9 4.1-9.5z"/><path fill="#34A853" d="M24 36c2.7 0 5-0.9 6.7-2.4l-4.4-2.9c-1.2.8-2.7 1.3-4.3 1.3-3.3 0-6-2.2-7-5.2h-4.5v3.2C13.7 33.7 18.5 36 24 36z"/><path fill="#FBBC05" d="M17 26.8c-.3-.8-.5-1.6-.5-2.5s.2-1.7.5-2.5v-3.2h-4.5C11.7 18.3 12 21.1 12 24s-.3 5.7-.5 8.2l4.5-3.2z"/><path fill="#EA4335" d="M24 16.7c1.5 0 2.8.5 3.8 1.4l2.8-2.8C29 13.9 26.7 13 24 13c-5.5 0-10.3 2.3-13.5 6.1l4.5 3.2c1-3 3.7-5.2 7-5.2z"/></g></svg>
            Google
          </button>
          <button type="button" onClick={() => handleOAuthLogin('github')} className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 hover:bg-gray-50">
            <FaGithub size={20} />
            GitHub
          </button>
        </div>
        <div className="text-center mt-6 text-sm">
          {activeTab === 'login' ? (
            <>Don&apos;t have an account?{' '}<button className="text-green-600 hover:underline" onClick={() => handleTabChange('signup')}>Sign up here</button></>
          ) : (
            <>Already have an account?{' '}<button className="text-green-600 hover:underline" onClick={() => handleTabChange('login')}>Login here</button></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth; 