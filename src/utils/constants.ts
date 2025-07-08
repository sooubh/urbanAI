export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  IDENTIFY: '/api/identify',
  PLANNER: '/api/planner',
  TIPS: '/api/tips',
  POSTS: '/api/posts',
  WEATHER: '/api/weather',
} as const;

export const PLANT_CATEGORIES = [
  'Herbs',
  'Vegetables',
  'Fruits',
  'Flowers',
  'Succulents',
  'Indoor Plants',
  'Climbing Plants',
  'Root Vegetables',
] as const;

export const GARDEN_TYPES = [
  { value: 'balcony', label: 'Balcony Garden', icon: '🏢' },
  { value: 'rooftop', label: 'Rooftop Garden', icon: '🏠' },
  { value: 'indoor', label: 'Indoor Garden', icon: '🏡' },
  { value: 'backyard', label: 'Backyard Garden', icon: '🌳' },
  { value: 'community', label: 'Community Garden', icon: '🏘️' },
] as const;

export const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'New to gardening' },
  { value: 'intermediate', label: 'Intermediate', description: 'Some gardening experience' },
  { value: 'advanced', label: 'Advanced', description: 'Experienced gardener' },
] as const;

export const SUNLIGHT_REQUIREMENTS = [
  { value: 'low', label: 'Low Light', description: '2-4 hours of indirect sunlight' },
  { value: 'medium', label: 'Medium Light', description: '4-6 hours of sunlight' },
  { value: 'high', label: 'High Light', description: '6+ hours of direct sunlight' },
] as const;