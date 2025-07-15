import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Camera, MapPin, Users, Sparkles, Leaf, Sun, Droplets, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useState } from 'react';
import { useEffect } from 'react';

const features = [
  {
    icon: MessageCircle,
    title: 'AI Gardening Assistant',
    description: 'Get instant, expert advice on plant care, pest control, and growing techniques from our AI-powered chatbot.',
    href: '/chat',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Camera,
    title: 'Plant Identification',
    description: 'Upload a photo of any plant and get instant identification with detailed care instructions.',
    href: '/identify',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: MapPin,
    title: 'Garden Planner',
    description: 'Design your perfect urban garden with AI recommendations based on your space and conditions.',
    href: '/planner',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Users,
    title: 'Community Hub',
    description: 'Connect with fellow urban gardeners, share experiences, and learn from the community.',
    href: '/community',
    color: 'bg-orange-100 text-orange-600',
  },
];

const stats = [
  { label: 'Plants Identified', value: '50K+' },
  { label: 'Gardens Planned', value: '12K+' },
  { label: 'Community Members', value: '25K+' },
  { label: 'Success Rate', value: '94%' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Balcony Gardener',
    content: 'Urban Harvest AI transformed my tiny balcony into a thriving garden. The AI assistant helped me choose the perfect plants for my space!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
  {
    name: 'Marcus Johnson',
    role: 'Rooftop Farmer',
    content: 'The plant identification feature is incredible. I can now identify and care for plants I find around the city. Game changer!',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Indoor Plant Enthusiast',
    content: 'The personalized garden planning helped me maximize my indoor space. My plants have never been healthier!',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
];

export function Home() {
  // For FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqList = [
    {
      q: 'How does the AI gardening assistant work?',
      a: 'Our AI uses advanced natural language processing and plant science databases to provide accurate, real-time answers to your gardening questions.'
    },
    {
      q: 'Is plant identification accurate?',
      a: 'Yes, our platform leverages state-of-the-art image recognition and expert-verified data to identify thousands of plant species and diagnose common diseases.'
    },
    {
      q: 'Can I use Urban Harvest AI for indoor gardening?',
      a: 'Absolutely! Our recommendations cover indoor, balcony, rooftop, and outdoor urban gardens.'
    },
    {
      q: 'Is the community free to join?',
      a: 'Yes, joining our community hub is free and open to all urban gardening enthusiasts.'
    },
    // New FAQs
    {
      q: 'Does Urban Harvest AI work on mobile devices?',
      a: 'Yes, our platform is fully responsive and works seamlessly on smartphones, tablets, and desktops.'
    },
    {
      q: 'How is my privacy protected?',
      a: 'We use industry-standard security and never sell your data. You can read our full privacy policy for details on data handling.'
    },
    {
      q: 'Does the platform provide weather-based gardening tips?',
      a: 'Yes, we integrate with weather APIs to offer timely, location-based gardening advice and reminders.'
    },
    {
      q: 'What should I do if the AI gives an incorrect answer?',
      a: 'While our AI is highly accurate, mistakes can happen. You can ask follow-up questions, consult our blog, or reach out to the community for help.'
    },
    {
      q: 'Can I suggest new features or report bugs?',
      a: 'Absolutely! We welcome feedback and suggestions. Please use the contact form or email us to share your ideas or report issues.'
    },
  ];

  // Animated progress bar logic
  const statData = [
    { label: 'Plants Identified', value: 50000, display: '50K+', color: 'bg-green-500' },
    { label: 'Gardens Planned', value: 12000, display: '12K+', color: 'bg-purple-500' },
    { label: 'Community Members', value: 25000, display: '25K+', color: 'bg-blue-500' },
    { label: 'Success Rate', value: 94, display: '94%', color: 'bg-yellow-400' },
  ];

  return (
    <div className="space-y-24 bg-gradient-to-b from-white via-primary-50 to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-100 border-b border-gray-100">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-5 py-2 rounded-full text-base font-semibold shadow-sm">
              <Sparkles className="h-5 w-5" />
              <span>AI-Powered Urban Gardening</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Grow Your
              <span className="text-primary-600 block">Urban Garden</span>
              with AI
            </h1>
            <p className="text-2xl text-gray-700 leading-relaxed max-w-xl">
              Transform any urban space into a thriving garden with personalized AI guidance, plant identification, and a supportive community of fellow gardeners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group shadow-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button variant="outline" size="lg" asChild className="shadow-lg">
                <Link to="/chat">Try AI Assistant</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              {stats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-primary-700 drop-shadow-lg">{stat.value}</div>
                  <div className="text-base text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center animate-slide-up">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Urban garden with vegetables and herbs"
                className="rounded-3xl shadow-2xl border-8 border-white w-full max-w-lg"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Garden Health</div>
                  <div className="text-sm text-gray-600">Excellent (94%)</div>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Next Watering</div>
                  <div className="text-sm text-gray-600">In 2 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl font-extrabold text-primary-700 tracking-tight">Everything You Need to Succeed</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform provides all the tools and knowledge you need to create and maintain a thriving urban garden.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                variant="elevated" 
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer rounded-2xl border-0 bg-white/90">
                <CardHeader>
                  <div className={`inline-flex p-4 rounded-full shadow-lg ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="group-hover:text-primary-600 transition-colors duration-200 text-lg font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-base min-h-[60px]">{feature.description}</p>
                  <Link 
                    to={feature.href}
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-primary-100 via-white to-secondary-100 my-12 rounded-full opacity-60" />

      {/* Stats Section as Progress Bars */}
      <section className="relative overflow-hidden shadow-inner bg-primary-50 py-20 animate-fade-in">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-primary-700 mb-10 text-center">Our Impact</h2>
          <div className="space-y-10">
            {statData.map((stat, idx) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-lg font-semibold text-gray-700">{stat.label}</span>
                  <AnimatedNumber value={stat.value} display={stat.display} duration={1200 + idx * 400} />
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <AnimatedBar value={stat.value} max={stat.label === 'Success Rate' ? 100 : 50000} color={stat.color} duration={1200 + idx * 400} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-primary-100 via-white to-secondary-100 my-12 rounded-full opacity-60" />

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 animate-fade-in">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-extrabold text-primary-700">Loved by Urban Gardeners</h2>
          <p className="text-xl text-gray-600">See what our community has to say about their gardening journey</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} variant="elevated" className="text-center bg-white/90 rounded-2xl shadow-xl border-0 p-6 flex flex-col items-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary-100 shadow-lg"
                />
                <p className="text-gray-600 mb-4 italic text-lg max-w-xs">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-primary-100 via-white to-secondary-100 my-12 rounded-full opacity-60" />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-extrabold">Ready to Start Your Urban Garden?</h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Join thousands of urban gardeners who are already growing fresh food 
              in their city spaces with AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group shadow-lg">
                Start Growing Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 shadow-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-primary-100 via-white to-secondary-100 my-12 rounded-full opacity-60" />

      {/* Quick Links Section - visually prominent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center gap-8">
          <div className="space-y-2 w-full text-center">
            <h2 className="text-2xl font-bold text-primary-700">Quick Links</h2>
            <p className="text-gray-600">Jump directly to our most popular features and resources:</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center w-full">
            <Link to="/chat" className="inline-flex items-center px-5 py-3 bg-primary-600 text-white rounded-lg font-medium shadow hover:bg-primary-700 transition">
              <MessageCircle className="h-5 w-5 mr-2" /> AI Assistant
            </Link>
            <Link to="/identify" className="inline-flex items-center px-5 py-3 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700 transition">
              <Camera className="h-5 w-5 mr-2" /> Plant ID
            </Link>
            <Link to="/planner" className="inline-flex items-center px-5 py-3 bg-purple-600 text-white rounded-lg font-medium shadow hover:bg-purple-700 transition">
              <MapPin className="h-5 w-5 mr-2" /> Garden Planner
            </Link>
            <Link to="/community" className="inline-flex items-center px-5 py-3 bg-orange-600 text-white rounded-lg font-medium shadow hover:bg-orange-700 transition">
              <Users className="h-5 w-5 mr-2" /> Community
            </Link>
            <Link to="/blog" className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition">
              <BookOpen className="h-5 w-5 mr-2" /> Blog
            </Link>
          </div>
        </div>
      </section>

      {/* About/Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary-700">Why Choose Urban Harvest AI?</h2>
            <p className="text-gray-700 text-lg">
              Urban Harvest AI is the leading platform for city dwellers who want to grow their own food, beautify their spaces, and connect with a vibrant gardening community. Our AI-driven tools make gardening accessible for everyone, from beginners to experts.
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Personalized, expert gardening advice 24/7</li>
              <li>Instant plant identification and care tips</li>
              <li>Custom garden planning for any space</li>
              <li>Weather-based reminders and smart notifications</li>
              <li>Active, supportive community and blog resources</li>
            </ul>
            <p className="text-gray-600 text-base">
              Start your journey to a greener, healthier, and more sustainable urban lifestyle today!
            </p>
          </div>
          <div className="flex justify-center">
            <img src="https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Urban gardening tools and plants" className="rounded-2xl shadow-xl w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-700">From Our Blog</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore the latest tips, guides, and inspiration for urban gardening, plant care, and sustainable living.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example blog cards - replace with dynamic content if available */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <img src="https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" alt="Balcony garden inspiration" className="rounded-lg mb-4 h-40 object-cover" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">10 Balcony Garden Ideas for Small Spaces</h3>
            <p className="text-gray-600 flex-1">Maximize your urban space with creative container gardening, vertical planters, and easy-to-grow edible plants. Learn how to turn any balcony into a lush retreat.</p>
            <Link to="/blog" className="mt-4 text-primary-600 font-medium hover:underline">Read More</Link>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <img src="https://images.pexels.com/photos/212324/pexels-photo-212324.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" alt="Plant care tips" className="rounded-lg mb-4 h-40 object-cover" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Essential Plant Care Tips for Beginners</h3>
            <p className="text-gray-600 flex-1">Discover the basics of watering, sunlight, soil, and pest management. Our AI assistant answers your most common plant care questions.</p>
            <Link to="/blog" className="mt-4 text-primary-600 font-medium hover:underline">Read More</Link>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <img src="https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" alt="Community gardening" className="rounded-lg mb-4 h-40 object-cover" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">How to Start a Community Garden in Your City</h3>
            <p className="text-gray-600 flex-1">Step-by-step guide to organizing, funding, and growing a successful community garden. Connect with neighbors and make a positive impact.</p>
            <Link to="/blog" className="mt-4 text-primary-600 font-medium hover:underline">Read More</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - visually improved, now with accordion */}
      <section className="max-w-5xl mx-auto px-4 py-16 animate-fade-in">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-primary-700">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">Find answers to common questions about urban gardening, our AI tools, and the Urban Harvest AI platform.</p>
        </div>
        <div className="space-y-4">
          {faqList.map((faq, idx) => (
            <div key={faq.q} className="rounded-xl bg-white/90 shadow-md border border-primary-100 overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-primary-300 transition"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="text-lg font-semibold text-primary-700">{faq.q}</span>
                <span className={`ml-4 transition-transform duration-200 ${openFaq === idx ? 'rotate-90' : ''}`}>▶</span>
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`px-6 pb-5 text-gray-700 text-base transition-all duration-300 ${openFaq === idx ? 'block' : 'hidden'}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content Section - indexable, keyword-rich, visually unobtrusive */}
      <section className="max-w-5xl mx-auto px-4 py-16 animate-fade-in">
        <div className="bg-white/90 rounded-3xl shadow-2xl border border-primary-100 p-10 md:p-16 flex flex-col gap-10 items-center relative overflow-hidden">
          <div className="absolute -top-10 -left-10 opacity-10 pointer-events-none select-none">
            <Leaf className="w-40 h-40 text-primary-200" />
          </div>
          <div className="w-full flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary-700 flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-primary-400" />
                About Urban Harvest AI: Your Urban Gardening Companion
              </h2>
              <p className="text-gray-700 text-lg">
                Urban Harvest AI is an innovative platform dedicated to empowering city dwellers to create and maintain thriving urban gardens. Whether you have a balcony, rooftop, backyard, or indoor space, our AI-powered gardening assistant provides expert advice, plant identification, and personalized garden planning tailored to your unique environment. Our mission is to make urban gardening accessible, sustainable, and enjoyable for everyone.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <img src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" alt="Urban gardening illustration" className="rounded-2xl shadow-xl w-64 h-64 object-cover border-4 border-primary-100" />
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-2xl font-bold text-primary-700 mb-6 flex items-center gap-2">
              <Sun className="h-6 w-6 text-yellow-400" /> Key Features of Urban Harvest AI
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <MessageCircle className="h-8 w-8 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg text-gray-900">AI Gardening Assistant</div>
                  <div className="text-gray-700">Get instant answers to your gardening questions, from plant care and pest control to soil health and watering schedules.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Camera className="h-8 w-8 text-green-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg text-gray-900">Plant Identification</div>
                  <div className="text-gray-700">Upload photos to identify plants and receive detailed care instructions, including scientific names and disease diagnosis.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-8 w-8 text-purple-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg text-gray-900">Personalized Garden Planner</div>
                  <div className="text-gray-700">Receive custom plant recommendations and layout suggestions based on your space, sunlight, and goals.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg text-gray-900">Community Hub</div>
                  <div className="text-gray-700">Connect with fellow urban gardeners, share tips, and learn from a growing community passionate about sustainable city living.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Sun className="h-8 w-8 text-yellow-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg text-gray-900">Weather-Based Tips</div>
                  <div className="text-gray-700">Get AI-generated reminders and advice based on your local climate and forecast.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-2xl font-bold text-primary-700 mb-4 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-400" /> Why Choose Urban Gardening?
            </h3>
            <p className="text-gray-700 text-lg mb-2">
              Urban gardening transforms unused city spaces into productive, green environments. Benefits include improved air quality, access to fresh produce, stress reduction, and fostering a sense of community. With the help of AI, even beginners can achieve gardening success and contribute to a more sustainable urban future.
            </p>
          </div>
          <div className="w-full text-center mt-6">
            <p className="text-primary-700 text-xl font-semibold">Start your urban gardening journey today with Urban Harvest AI – the smart way to grow in the city.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Animated number component
function AnimatedNumber({ value, display, duration }: { value: number; display: string; duration: number }) {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    let start = 0;
    let end = value;
    let startTime: number | null = null;
    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(end);
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [value, duration]);
  return <span className="text-xl md:text-2xl font-bold text-primary-700 min-w-[60px] text-right">{display.includes('%') ? `${count}%` : count >= 1000 ? `${Math.floor(count / 1000)}K+` : count}</span>;
}

// Animated bar component
function AnimatedBar({ value, max, color, duration }: { value: number; max: number; color: string; duration: number }) {
  const [width, setWidth] = React.useState(0);
  useEffect(() => {
    let start = 0;
    let end = Math.min(100, (value / max) * 100);
    let startTime: number | null = null;
    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const current = progress * end;
      setWidth(current);
      if (progress < 1) requestAnimationFrame(animate);
      else setWidth(end);
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [value, max, duration]);
  return (
    <div className="h-4 rounded-full transition-all duration-700" style={{ width: width + '%', background: undefined }}>
      <div className={`h-4 rounded-full transition-all duration-700 ${color}`} style={{ width: '100%' }} />
    </div>
  );
}