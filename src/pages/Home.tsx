import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Camera, MapPin, Users, Sparkles, Leaf, Sun, Droplets, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { supabase } from '../services/supabaseClient';
import AdComponent from '../components/AdComponent';

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
  {
    name: 'Priya Patel',
    role: 'Community Gardener',
    content: 'I love connecting with other gardeners and sharing tips. The community hub is so welcoming!',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
  {
    name: 'Tom Müller',
    role: 'Urban Farmer',
    content: 'Urban Harvest AI made it easy to start growing my own food in the city. Highly recommend!',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
  {
    name: 'Aisha Al-Farsi',
    role: 'Sustainability Advocate',
    content: 'The eco-friendly gardening tips are fantastic. My garden is greener and healthier than ever.',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
  {
    name: 'Lucas Silva',
    role: 'Balcony Botanist',
    content: 'I never thought I could grow so much on my small balcony. The AI suggestions are spot on!',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
  {
    name: 'Emily Nguyen',
    role: 'Plant Parent',
    content: 'The reminders and care tips keep my plants thriving. I feel like a real plant expert now!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
  {
    name: 'Ahmed Hassan',
    role: 'Rooftop Gardener',
    content: 'The weather-based advice is so helpful. My rooftop garden has never looked better.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
  {
    name: 'Julia Rossi',
    role: 'Urban Green Thumb',
    content: 'Urban Harvest AI is a must-have for anyone who wants to garden in the city. Love it!',
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

  // Testimonials Carousel
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const getSlidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
    }
    return 1;
  };
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => setAnimating(false), 400);
    return () => clearTimeout(timeout);
  }, [testimonialIndex, slidesToShow]);
  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const maxIndex = testimonials.length - slidesToShow;
  const goPrev = () => setTestimonialIndex(i => Math.max(0, i - 1));
  const goNext = () => setTestimonialIndex(i => Math.min(maxIndex, i + 1));
  const visibleTestimonials = testimonials.slice(testimonialIndex, testimonialIndex + slidesToShow);

  // Blog preview state
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogError, setBlogError] = useState<string | null>(null);
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setBlogLoading(true);
      setBlogError(null);
      const { data, error } = await supabase
        .from('blog_post')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) {
        setBlogError('Failed to load blog posts.');
        setBlogPosts([]);
      } else {
        setBlogPosts(data || []);
      }
      setBlogLoading(false);
    };
    fetchBlogPosts();
  }, []);

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
              <Button size="lg" className="group shadow-lg" asChild>
                <Link to="/auth">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
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
      <AdComponent adSlot="4917883161" />
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
      <AdComponent adSlot="1274151626" />

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 animate-fade-in">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-extrabold text-primary-700">Loved by Urban Gardeners</h2>
          <p className="text-xl text-gray-600">See what our community has to say about their gardening journey</p>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 disabled:opacity-30"
            onClick={goPrev}
            disabled={testimonialIndex === 0}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6 text-green-700" />
          </button>
          <div className="flex gap-8 justify-center">
            {visibleTestimonials.map((testimonial, idx) => (
              <Card
                key={testimonial.name}
                variant="elevated"
                className={`text-center bg-white/90 rounded-2xl shadow-xl border-0 p-6 flex flex-col items-center w-full max-w-xs transition-all duration-500 ease-in-out
                  ${animating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
              >
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
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 disabled:opacity-30"
            onClick={goNext}
            disabled={testimonialIndex === maxIndex}
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6 text-green-700" />
          </button>
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
              <Button size="lg" variant="secondary" className="group shadow-lg" asChild>
                <Link to="/auth">
                  Start Growing Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
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

      {/* About & Features Zig-Zag Section */}
      <section className="w-full bg-gradient-to-b from-green-50 via-white to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-700 mb-4">About Urban Harvest AI</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">Urban Harvest AI empowers city dwellers to create and maintain thriving urban gardens. Whether you have a balcony, rooftop, backyard, or indoor space, our AI-powered assistant provides expert advice, plant identification, and personalized planning tailored to your unique environment.</p>
          </div>
          {/* Zig-Zag Features */}
          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
            
              <div className="flex-1 order-1 lg:order-2 flex justify-center">
                <img src="https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="AI Gardening Assistant" className="rounded-3xl shadow-xl w-full max-w-md border-4 border-green-100" />
              </div>
              <div className="flex-1 order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-green-800 mb-4">AI Gardening Assistant</h3>
                <p className="text-lg text-gray-700 mb-4">Get instant answers to your gardening questions, from plant care and pest control to soil health and watering schedules.</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 order-2 lg:order-2">
                <h3 className="text-3xl font-bold text-green-800 mb-4">Plant Identification</h3>
                <p className="text-lg text-gray-700 mb-4">Upload photos to identify plants and receive detailed care instructions, including scientific names and disease diagnosis.</p>
              </div>
              <div className="flex-1 order-1 lg:order-1 flex justify-center">
                <img src="https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Plant Identification" className="rounded-3xl shadow-xl w-full max-w-md border-4 border-green-100" />
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              
              <div className="flex-1 order-1 lg:order-2 flex justify-center">
                <img src="https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Personalized Garden Planner" className="rounded-3xl shadow-xl w-full max-w-md border-4 border-green-100" />
              </div>
              <div className="flex-1 order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-green-800 mb-4">Personalized Garden Planner</h3>
                <p className="text-lg text-gray-700 mb-4">Receive custom plant recommendations and layout suggestions based on your space, sunlight, and goals.</p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 order-2 lg:order-2">
                <h3 className="text-3xl font-bold text-green-800 mb-4">Community Hub</h3>
                <p className="text-lg text-gray-700 mb-4">Connect with fellow urban gardeners, share tips, and learn from a growing community passionate about sustainable city living.</p>
              </div>
              <div className="flex-1 order-1 lg:order-1 flex justify-center">
                <img src="https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Community Hub" className="rounded-3xl shadow-xl w-full max-w-md border-4 border-green-100" />
              </div>
            </div>
            {/* Feature 5 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 order-1 lg:order-2 flex justify-center">
                <img src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Weather-Based Tips" className="rounded-3xl shadow-xl w-full max-w-md border-4 border-green-100" />
              </div>
              <div className="flex-1 order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-green-800 mb-4">Weather-Based Tips</h3>
                <p className="text-lg text-gray-700 mb-4">Get AI-generated reminders and advice based on your local climate and forecast.</p>
              </div>
            </div>
          </div>
          {/* Why Urban Gardening */}
          <div className="mt-24 text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-primary-700 mb-4 flex items-center justify-center gap-2">
              <Leaf className="h-8 w-8 text-green-400" /> Why Choose Urban Gardening?
            </h3>
            <p className="text-gray-700 text-lg mb-2">Urban gardening transforms unused city spaces into productive, green environments. Benefits include improved air quality, access to fresh produce, stress reduction, and fostering a sense of community. With the help of AI, even beginners can achieve gardening success and contribute to a more sustainable urban future.</p>
            <p className="text-primary-700 text-xl font-semibold mt-6">Start your urban gardening journey today with Urban Harvest AI – the smart way to grow in the city.</p>
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