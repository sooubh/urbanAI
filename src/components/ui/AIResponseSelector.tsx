import { useState } from 'react';
import { Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
// Remove DualAIResponse import and use a simpler Gemini-only response type

interface AIResponseSelectorProps {
  response: {
    text: string;
    model: string;
    provider: 'gemini';
    error?: string;
  };
  onSelect: (response: string) => void;
  className?: string;
}

export function AIResponseSelector({ response, onSelect, className = '' }: AIResponseSelectorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (!response || response.error) {
    return (
      <Card className={`p-4 border-red-200 bg-red-50 ${className}`}>
        <div className="flex items-center space-x-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">AI provider failed</span>
        </div>
        {response?.error && (
          <div className="mt-2 text-sm text-red-600">{response.error}</div>
        )}
      </Card>
    );
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg text-purple-600 bg-purple-100">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-medium text-gray-900">Gemini</span>
          <span className="text-xs text-gray-500">({response.model})</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCopy(response.text)}
          className="p-1"
        >
          {copied ? (
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
          onClick={() => onSelect(response.text)}
          className="w-full"
        >
          Use This Response
        </Button>
      </div>
    </Card>
  );
}