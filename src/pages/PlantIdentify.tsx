import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Loader2, CheckCircle, Info, Bot, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { AIResponseSelector } from '../components/ui/AIResponseSelector';
import { useAI } from '../hooks/useAI';
import { DualAIResponse } from '../services/aiOrchestrator';

interface IdentificationResult {
  name: string;
  scientificName: string;
  confidence: number;
  description: string;
  careInstructions: string[];
  commonIssues: string[];
  imageUrl: string;
  provider: 'openrouter' | 'gemini';
  model: string;
}

export function PlantIdentify() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [dualResponse, setDualResponse] = useState<DualAIResponse | null>(null);
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { analyzeDualImage } = useAI({ type: 'identification' });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
        setDualResponse(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentify = async () => {
    if (!selectedImage) return;

    setIsIdentifying(true);
    
    try {
      const responses = await analyzeDualImage(
        selectedImage,
        'Identify this plant species and provide detailed information including: scientific name, common name, care instructions, watering needs, sunlight requirements, common problems, and growing tips for urban gardening. Be specific and practical.'
      );
      
      setDualResponse(responses);
    } catch (error: any) {
      console.error('Error identifying plant:', error);
      // Handle error appropriately
    } finally {
      setIsIdentifying(false);
    }
  };

  const handleSelectResponse = (responseText: string, provider: 'openrouter' | 'gemini') => {
    // Parse the response and create a structured result
    const mockResult: IdentificationResult = {
      name: 'Identified Plant',
      scientificName: 'Species name',
      confidence: 95,
      description: responseText.substring(0, 200) + '...',
      careInstructions: [
        'Water regularly but avoid overwatering',
        'Provide adequate sunlight',
        'Use well-draining soil',
        'Monitor for pests and diseases'
      ],
      commonIssues: [
        'Overwatering can cause root rot',
        'Insufficient light may cause leggy growth',
        'Watch for common pests'
      ],
      imageUrl: 'https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      provider,
      model: dualResponse?.[provider]?.model || 'unknown'
    };

    setResult(mockResult);
    setDualResponse(null);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setResult(null);
    setDualResponse(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Plant Identification</h1>
          <p className="text-lg text-gray-600">
            Upload a photo to get plant identification from both OpenRouter and Gemini AI
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Bot className="h-4 w-4 text-blue-600" />
              <span>OpenRouter</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>Gemini AI</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <Card variant="elevated">
          <CardContent className="p-8">
            {!selectedImage ? (
              <div className="text-center space-y-6">
                <div className="mx-auto w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  <Camera className="h-12 w-12 text-primary-600" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Upload Plant Photo
                  </h3>
                  <p className="text-gray-600">
                    Take a clear photo of the plant you want to identify. 
                    Both AI models will analyze it for comprehensive results.
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  <Button
                    size="lg"
                    onClick={() => fileInputRef.current?.click()}
                    className="group"
                  >
                    <Upload className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Choose Photo
                  </Button>
                  
                  <p className="text-sm text-gray-500">
                    Supports JPG, PNG, and WebP formats
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative max-w-md mx-auto">
                  <img
                    src={selectedImage}
                    alt="Plant to identify"
                    className="w-full rounded-lg shadow-md"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-center space-y-4">
                  <Button
                    size="lg"
                    onClick={handleIdentify}
                    disabled={isIdentifying}
                    isLoading={isIdentifying}
                    className="group"
                  >
                    {isIdentifying ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Analyzing with Both AI Models...
                      </>
                    ) : (
                      <>
                        <Camera className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                        Identify Plant with Dual AI
                      </>
                    )}
                  </Button>
                  
                  {isIdentifying && (
                    <p className="text-sm text-gray-600">
                      Getting analysis from OpenRouter and Gemini AI...
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dual Response Selector */}
        {dualResponse && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Choose Your Preferred Analysis
            </h2>
            <AIResponseSelector
              responses={dualResponse}
              onSelect={handleSelectResponse}
            />
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <CardTitle className="text-green-700">Plant Identified!</CardTitle>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    result.provider === 'gemini' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {result.provider === 'gemini' ? (
                      <Sparkles className="h-4 w-4 mr-1" />
                    ) : (
                      <Bot className="h-4 w-4 mr-1" />
                    )}
                    {result.provider === 'gemini' ? 'Gemini' : 'OpenRouter'}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={result.imageUrl}
                      alt={result.name}
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{result.name}</h3>
                      <p className="text-lg text-gray-600 italic">{result.scientificName}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {result.confidence}% confidence
                        </span>
                        <span className="text-xs text-gray-500">
                          Model: {result.model}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {result.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Care Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    <span>Care Instructions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-orange-600" />
                    <span>Common Issues</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.commonIssues.map((issue, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Better Identification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">Clear Photos</h4>
                <p className="text-sm text-gray-600">Take sharp, well-lit photos with good focus</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Info className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900">Multiple Angles</h4>
                <p className="text-sm text-gray-600">Include leaves, flowers, and overall plant structure</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900">Dual AI Analysis</h4>
                <p className="text-sm text-gray-600">Compare results from both AI models for accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}