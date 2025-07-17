import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, MessageCircle, Camera, MapPin, Users, BookOpen, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../services/supabaseClient';
import { FaChevronDown } from 'react-icons/fa';

const navigation = [
  { name: 'Home', href: '/', icon: Leaf },
  { name: 'AI Assistant', href: '/chat', icon: MessageCircle },
  { name: 'Plant ID', href: '/identify', icon: Camera },
  { name: 'Garden Planner', href: '/planner', icon: MapPin },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Blog', href: '/blog', icon: BookOpen },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors duration-200">
              <Leaf className="h-6 w-6 text-primary-600" />
            </div>
            <span className="text-xl font-bold">Urban Harvest AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu - removed Clerk logic, just show Get Started button */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Button size="sm" asChild>
                  <Link to="/auth?tab=login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            ) : (
              <div className="relative flex items-center">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <img
                    src={user.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=' + (user.email || 'U')}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <FaChevronDown className="text-gray-600" />
                </button>
                {dropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 bg-black bg-opacity-20 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    {/* Popup */}
                    <div className="fixed top-20 right-8 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 animate-fade-in flex flex-col">
                      <div className="flex flex-col items-center px-4 pt-4 pb-2 border-b border-gray-100">
                        <img
                          src={user.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=' + (user.email || 'U')}
                          alt="Profile"
                          className="w-12 h-12 rounded-full border border-gray-200 mb-2"
                        />
                        <div className="font-semibold text-gray-900 text-base truncate w-full text-center">{user.user_metadata?.full_name || user.email}</div>
                        <div className="text-xs text-gray-500 truncate w-full text-center">{user.email}</div>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-6 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition rounded-t-xl text-center"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-center px-6 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition rounded-b-xl border-t border-gray-100"
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {/* Removed Clerk sign-in/out buttons for mobile */}
          </div>
        </div>
      )}
    </header>
  );
}