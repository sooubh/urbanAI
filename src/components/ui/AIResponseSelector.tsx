import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bot, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { DualAIResponse } from '../../services/aiOrchestrator';

interface AIResponseSelectorProps {
  responses: DualAIResponse;
  onSelect: (response: string, provider: 'openrouter' | 'gemini') => void;
  className?: string;
}

export function AIResponseSelector({ responses, onSelect, className = '' }: AIResponseSelectorProps) {
  const [selectedProvider, setSelectedProvider] = useState<'openrouter' | 'gemini' | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedProvider, setCopiedProvider] = useState<string | null>(null);

  const handleSelect = (provider: 'openrouter' | 'gemini') => {
    const response = responses[provider];
    if (response && !response.error) {
      setSelectedProvider(provider);
      onSelect(response.text, provider);
      setIsExpanded(false);
    }
  };

  const handleCopy = async (text: string, provider: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedProvider(provider);
      setTimeout(() => setCopiedProvider(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const getProviderIcon = (provider: 'openrouter' | 'gemini') => {
    return provider === 'openrouter' ? (
      <Bot className="h-4 w-4" />
    ) : (
      <Sparkles className="h-4 w-4" />
    );
  };

  const getProviderName = (provider: 'openrouter' | 'gemini') => {
    return provider === 'openrouter' ? 'OpenRouter' : 'Gemini';
  };

  const getProviderColor = (provider: 'openrouter' | 'gemini') => {
    return provider === 'openrouter' 
      ? 'text-blue-600 bg-blue-100' 
      : 'text-purple-600 bg-purple-100';
  };

  const availableResponses = Object.entries(responses).filter(
    ([_, response]) => response && !response.error
  );

  const errorResponses = Object.entries(responses).filter(
    ([_, response]) => response && response.error
  );

  if (availableResponses.length === 0) {
    return (
      <Card className={`p-4 border-red-200 bg-red-50 ${className}`}>
        <div className="flex items-center space-x-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">All AI providers failed</span>
        </div>
        {errorResponses.length > 0 && (
          <div className="mt-2 space-y-1">
            {errorResponses.map(([provider, response]) => (
              <div key={provider} className="text-sm text-red-600">
                <span className="font-medium capitalize">{provider}:</span> {response?.error}
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  }

  if (availableResponses.length === 1) {
    const [provider, response] = availableResponses[0] as [keyof DualAIResponse, NonNullable<DualAIResponse[keyof DualAIResponse]>];
    
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-lg ${getProviderColor(provider)}`}>
              {getProviderIcon(provider)}
            </div>
            <span className="font-medium text-gray-900">{getProviderName(provider)}</span>
            <span className="text-xs text-gray-500">({response.model})</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(response.text, provider)}
            className="p-1"
          >
            {copiedProvider === provider ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {response.text}
        </div>
        <div className="mt-3">
          <Button
            size="sm"
            onClick={() => handleSelect(provider)}
            className="w-full"
          >
            Use This Response
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Choose AI Response</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Quick Selection Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableResponses.map(([provider, response]) => {
            const typedProvider = provider as keyof DualAIResponse;
            const typedResponse = response as NonNullable<DualAIResponse[keyof DualAIResponse]>;
            
            return (
              <div
                key={provider}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedProvider === provider
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleSelect(typedProvider)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 rounded-lg ${getProviderColor(typedProvider)}`}>
                      {getProviderIcon(typedProvider)}
                    </div>
                    <span className="font-medium text-gray-900">{getProviderName(typedProvider)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(typedResponse.text, provider);
                    }}
                    className="p-1"
                  >
                    {copiedProvider === provider ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  Model: {typedResponse.model}
                </div>
                
                {isExpanded ? (
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {typedResponse.text}
                  </div>
                ) : (
                  <div className="text-sm text-gray-700 line-clamp-3">
                    {typedResponse.text.substring(0, 150)}...
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Error Messages */}
        {errorResponses.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-sm text-red-700">
              <div className="font-medium mb-1">Some providers failed:</div>
              {errorResponses.map(([provider, response]) => (
                <div key={provider} className="text-xs">
                  <span className="font-medium capitalize">{provider}:</span> {response?.error}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}