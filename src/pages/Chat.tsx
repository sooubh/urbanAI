import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Trash2, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { AIResponseSelector } from '../components/ui/AIResponseSelector';
import { useChat } from '../hooks/useChat';
import { formatRelativeTime } from '../utils/helpers';

export function Chat() {
  const { messages, isLoading, pendingDualResponse, sendMessage, selectAIResponse, clearChat } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue('');
    await sendMessage(message);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        await sendMessage(imageData, 'image');
      };
      reader.readAsDataURL(file);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleQuickAction = (message: string) => {
    sendMessage(message);
  };

  const getMessageIcon = (message: any) => {
    if (message.role === 'user') {
      return <User className="h-4 w-4" />;
    }
    
    if (message.metadata?.selectedProvider === 'gemini') {
      return <Sparkles className="h-4 w-4" />;
    }
    
    return <Bot className="h-4 w-4" />;
  };

  const getMessageBadge = (message: any) => {
    if (message.role === 'user' || !message.metadata?.selectedProvider) {
      return null;
    }

    const provider = message.metadata.selectedProvider;
    const model = message.metadata.selectedModel;
    
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
        provider === 'gemini' 
          ? 'bg-purple-100 text-purple-700' 
          : 'bg-blue-100 text-blue-700'
      }`}>
        {provider === 'gemini' ? (
          <Sparkles className="h-3 w-3 mr-1" />
        ) : (
          <Bot className="h-3 w-3 mr-1" />
        )}
        {provider === 'gemini' ? 'Gemini' : 'OpenRouter'}
        {model && <span className="ml-1 opacity-75">({model.split('/').pop()})</span>}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">AI Gardening Assistant</h1>
          <p className="text-lg text-gray-600">
            Get expert gardening advice from both OpenRouter and Gemini AI models
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

        {/* Chat Container */}
        <Card variant="elevated" className="h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === 'dual-response' ? (
                  <AIResponseSelector
                    responses={message.metadata.dualResponse}
                    onSelect={selectAIResponse}
                    className="max-w-[90%]"
                  />
                ) : (
                  <div
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      } items-start space-x-3`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === 'user'
                            ? 'bg-primary-600 text-white'
                            : message.metadata?.selectedProvider === 'gemini'
                            ? 'bg-purple-200 text-purple-600'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {getMessageIcon(message)}
                      </div>

                      {/* Message Content */}
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p
                            className={`text-xs ${
                              message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                            }`}
                          >
                            {formatRelativeTime(message.timestamp)}
                          </p>
                          {message.role === 'assistant' && getMessageBadge(message)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Getting responses from both AI models...</p>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="flex items-end space-x-4">
              <div className="flex-1">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about gardening..."
                  disabled={isLoading}
                  className="resize-none"
                />
              </div>
              
              <div className="flex space-x-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={clearChat}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  isLoading={isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <p className="text-xs text-gray-500 mt-2">
              Upload plant photos for identification or ask questions. Responses from both OpenRouter and Gemini AI.
            </p>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow duration-200" onClick={() => handleQuickAction("What are the best plants for a small balcony garden?")}>
            <h3 className="font-medium text-gray-900 mb-2">Balcony Gardening</h3>
            <p className="text-sm text-gray-600">Best plants for small spaces</p>
          </Card>
          
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow duration-200" onClick={() => handleQuickAction("How often should I water my plants?")}>
            <h3 className="font-medium text-gray-900 mb-2">Watering Guide</h3>
            <p className="text-sm text-gray-600">Learn proper watering techniques</p>
          </Card>
          
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow duration-200" onClick={() => handleQuickAction("Help me identify common garden pests and how to treat them.")}>
            <h3 className="font-medium text-gray-900 mb-2">Pest Control</h3>
            <p className="text-sm text-gray-600">Identify and treat plant problems</p>
          </Card>
        </div>
      </div>
    </div>
  );
}