import React, { useState } from 'react';
import { Mail, MapPin, Users, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-secondary-50 py-12">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-center flex flex-col items-center animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-5 py-2 rounded-full text-base font-semibold shadow-sm mb-6">
          <MessageCircle className="h-5 w-5" />
          <span>Contact Urban Harvest AI</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 mb-4">We'd Love to Hear from You!</h1>
        <p className="text-xl text-gray-700 max-w-2xl mb-8">
          Have a question, suggestion, or just want to say hello? Fill out the form below or reach us directly.
        </p>
        <img src="https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="Contact Urban Harvest AI" className="rounded-2xl shadow-xl w-full max-w-lg mb-8" />
      </section>

      {/* Contact Form & Details */}
      <section className="max-w-3xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <form className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-primary-700 mb-2">Send Us a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border border-primary-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="border border-primary-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="border border-primary-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          {submitted ? (
            <div className="text-green-600 font-semibold">Thank you for reaching out! We'll get back to you soon.</div>
          ) : (
            <Button type="submit" size="lg" className="mt-2">Send Message</Button>
          )}
        </form>
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-primary-700 mb-2 flex items-center gap-2"><Mail className="h-5 w-5" /> Email</h2>
            <a href="mailto:sourabh3527@gmail.com" className="text-primary-600 hover:underline">sourabh3527@gmail.com</a>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-primary-700 mb-2 flex items-center gap-2"><MapPin className="h-5 w-5" /> Location</h2>
            <span className="text-gray-700">Nashik, IN</span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-primary-700 mb-2 flex items-center gap-2"><Users className="h-5 w-5" /> Social</h2>
            <a href="https://twitter.com/" className="text-primary-600 hover:underline">Twitter</a>
            <a href="https://linkedin.com/" className="text-primary-600 hover:underline">LinkedIn</a>
            <a href="https://github.com/" className="text-primary-600 hover:underline">GitHub</a>
          </div>
        </div>
      </section>
    </div>
  );
} 