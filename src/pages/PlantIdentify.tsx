import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Loader2, CheckCircle, Info, Bot, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { AIResponseSelector } from '../components/ui/AIResponseSelector';
import { useAI } from '../hooks/useAI';
import { DualAIResponse } from '../services/aiOrchestrator';
import { useUser, SignInButton } from '@clerk/clerk-react';

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
  disease: string;
  diseaseExplanation: string;
  healthyConfirmation: string;
  careTips: string[];
}

export function PlantIdentify() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [dualResponse, setDualResponse] = useState<DualAIResponse | null>(null);
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { analyzeDualImage } = useAI({ type: 'identification' });
  const { isSignedIn } = useUser();

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
    if (!isSignedIn) return;
    setIsIdentifying(true);
    try {
      const responses = await analyzeDualImage(
        selectedImage,
        `You are a plant pathology and identification expert. Analyze the provided plant image and, using any available location data, return a JSON object with the following fields in this exact order:\n1. plant_name: Common name of the plant (e.g., Tomato, Rose)\n2. scientific_name: Scientific species name (e.g., Solanum lycopersicum)\n3. disease: Name of any visible disease or abnormality (or null if healthy)\n4. disease_explanation: Detailed explanation of the disease (causes, symptoms, spread, and treatment suggestions), or null if healthy\n5. healthy_confirmation: If no disease is detected, a confirmation message that the plant appears healthy\n6. care_tips: Optional care or preventive tips for this species\nReturn ONLY the JSON object, no extra text. The plant_name field must always be present and accurate.`
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
    let parsed: any = {};
    try {
      parsed = JSON.parse(responseText);
    } catch (e) {
      // fallback: show as unstructured text if not valid JSON
      setResult({
        name: 'Unknown',
        scientificName: '',
        confidence: 0,
        description: responseText,
        careInstructions: [],
        commonIssues: [],
        imageUrl: selectedImage || '',
        provider,
        model: dualResponse?.[provider]?.model || 'unknown',
        disease: '',
        diseaseExplanation: '',
        healthyConfirmation: '',
        careTips: [],
      });
      setDualResponse(null);
      return;
    }
    setResult({
      name: parsed.plant_name || 'Unknown',
      scientificName: parsed.scientific_name || '',
      confidence: 95,
      description: '',
      careInstructions: [],
      commonIssues: [],
      imageUrl: selectedImage || '',
      provider,
      model: dualResponse?.[provider]?.model || 'unknown',
      disease: parsed.disease || '',
      diseaseExplanation: parsed.disease_explanation || '',
      healthyConfirmation: parsed.healthy_confirmation || '',
      careTips: Array.isArray(parsed.care_tips) ? parsed.care_tips : (parsed.care_tips ? [parsed.care_tips] : []),
    });
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
                    onClick={isSignedIn ? handleIdentify : undefined}
                    disabled={isIdentifying || !isSignedIn}
                    isLoading={isIdentifying}
                  >
                    Identify
                  </Button>
                  {!isSignedIn && (
                    <SignInButton mode="modal">
                      <Button variant="outline">Sign in to identify</Button>
                    </SignInButton>
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
                    </div>
                    {result.disease ? (
                      <>
                        <div>
                          <span className="font-semibold text-red-600">Disease Detected:</span> {result.disease}
                        </div>
                        <div className="text-gray-700 leading-relaxed">
                          {result.diseaseExplanation}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-green-700 font-semibold">{result.healthyConfirmation}</div>
                        {result.careTips.length > 0 && (
                          <ul className="list-disc pl-5 mt-2 text-gray-700">
                            {result.careTips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
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