export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  location?: string;
  gardenType?: 'balcony' | 'rooftop' | 'indoor' | 'backyard' | 'community';
  experience?: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  careInstructions: string;
  wateringFrequency: string;
  sunlightRequirement: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  growthTime: string;
  imageUrl: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'image' | 'plant-recommendation' | 'dual-response';
  metadata?: any;
}

export interface GardenPlan {
  id: string;
  userId: string;
  name: string;
  spaceType: 'balcony' | 'rooftop' | 'indoor' | 'backyard' | 'community';
  dimensions: {
    length: number;
    width: number;
    unit: 'ft' | 'm';
  };
  sunlightHours: number;
  climate: string;
  recommendedPlants: Plant[];
  layout?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumPost {
  id: string;
  userId: string;
  author: {
    name: string;
    avatar?: string;
  };
  title: string;
  content: string;
  images?: string[];
  tags: string[];
  likes: number;
  replies: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeatherTip {
  id: string;
  type: 'watering' | 'protection' | 'planting' | 'harvesting';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  weatherCondition: string;
  temperature?: number;
  humidity?: number;
  createdAt: Date;
}