import React from 'react';
import { Leaf, Sparkles, Users, Sun } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-secondary-50 py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center flex flex-col items-center animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-5 py-2 rounded-full text-base font-semibold shadow-sm mb-6">
          <Sparkles className="h-5 w-5" />
          <span>About Urban Harvest AI</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 mb-4">Empowering Urban Gardeners Everywhere</h1>
        <p className="text-xl text-gray-700 max-w-2xl mb-8">
          Our mission is to make urban gardening accessible, sustainable, and enjoyable for everyone—no matter your space or experience level.
        </p>
        <img src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="Urban gardening" className="rounded-2xl shadow-xl w-full max-w-lg mb-8" />
      </section>

      {/* Team Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-primary-700 mb-8 flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-400" /> Meet the Team
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" alt="Founder" className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-primary-100" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sourabh Singh</h3>
            <p className="text-gray-700 mb-2">Founder & Lead Developer</p>
            <p className="text-gray-600">Sourabh is passionate about technology, sustainability, and helping city dwellers reconnect with nature. With a background in AI and urban agriculture, he created Urban Harvest AI to empower people to grow their own food and build greener cities.</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-primary-700 mb-8 flex items-center gap-2">
          <Sun className="h-6 w-6 text-yellow-400" /> Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <Leaf className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainability</h3>
            <p className="text-gray-600 text-center">We believe in eco-friendly practices and helping people grow food in harmony with nature.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <Sparkles className="h-10 w-10 text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600 text-center">We use the latest AI technology to make gardening smarter, easier, and more fun for everyone.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <Users className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600 text-center">We foster a supportive, inclusive community where everyone can learn, share, and grow together.</p>
          </div>
        </div>
      </section>
    </div>
  );
} 