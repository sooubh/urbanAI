import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Camera, MapPin, Users, Sparkles, Leaf, Sun, Droplets } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

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
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Urban Gardening</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Grow Your
                <span className="text-primary-600 block">Urban Garden</span>
                with AI
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform any urban space into a thriving garden with personalized AI guidance, 
                plant identification, and a supportive community of fellow gardeners.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/chat">Try AI Assistant</Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Urban garden with vegetables and herbs"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Garden Health</div>
                      <div className="text-sm text-gray-600">Excellent (94%)</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Droplets className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Next Watering</div>
                      <div className="text-sm text-gray-600">In 2 days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform provides all the tools and knowledge you need 
            to create and maintain a thriving urban garden.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                variant="elevated" 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="group-hover:text-primary-600 transition-colors duration-200">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Link 
                    to={feature.href}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200"
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

      {/* Stats Section */}
      <section className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Loved by Urban Gardeners
          </h2>
          <p className="text-xl text-gray-600">
            See what our community has to say about their gardening journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} variant="elevated" className="text-center">
              <CardContent className="pt-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Urban Garden?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Join thousands of urban gardeners who are already growing fresh food 
              in their city spaces with AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group">
                Start Growing Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}