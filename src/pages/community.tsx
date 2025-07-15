import React from 'react';
import { Users, MessageCircle, Sparkles, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function Community() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-secondary-50 py-12">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center flex flex-col items-center animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-5 py-2 rounded-full text-base font-semibold shadow-sm mb-6">
          <Users className="h-5 w-5" />
          <span>Urban Harvest Community</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 mb-4">Grow Together, Learn Together</h1>
        <p className="text-xl text-gray-700 max-w-2xl mb-8">
          Join a vibrant community of urban gardeners, plant lovers, and sustainability enthusiasts. Share your experiences, ask questions, and get inspired by fellow members from around the world.
        </p>
        <Button size="lg" asChild className="shadow-lg">
          <Link to="/chat">
            <MessageCircle className="h-5 w-5 mr-2" /> Join the Conversation
          </Link>
        </Button>
      </section>

      {/* Community Highlights */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-primary-700 mb-8 text-center flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-400" /> Community Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <Leaf className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Featured Member: Sarah Chen</h3>
            <p className="text-gray-600 text-center">Turned her balcony into a lush oasis and shares daily plant care tips with the community.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <Users className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Discussion</h3>
            <p className="text-gray-600 text-center">"What are the best shade-tolerant herbs for city gardens?" — 42 replies and counting!</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <Sparkles className="h-10 w-10 text-yellow-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Tip</h3>
            <p className="text-gray-600 text-center">Use recycled containers for creative, eco-friendly planters. Share your upcycled garden ideas!</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-primary-700 mb-4">Ready to Join the Urban Harvest Community?</h2>
        <p className="text-lg text-gray-700 mb-6">Sign up, introduce yourself, and start growing with us today!</p>
        <Button size="lg" asChild className="shadow-lg">
          <Link to="/chat">
            <MessageCircle className="h-5 w-5 mr-2" /> Start Chatting
          </Link>
        </Button>
      </section>
    </div>
  );
} 