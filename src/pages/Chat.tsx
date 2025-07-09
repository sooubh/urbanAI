import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Trash2, Bot, User, Sparkles, Smile, Copy, Share2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { AIResponseSelector } from '../components/ui/AIResponseSelector';
import { useChat } from '../hooks/useChat';
import { formatRelativeTime } from '../utils/helpers';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { PlantLoadingAnimation } from '../components/ui/PlantLoadingAnimation';

function renderFormattedText(text: string) {
  // Split by lines for heading detection
  return text.split('\n').map((line, idx) => {
    // Heading: line starts with #
    if (line.trim().startsWith('#')) {
      return (
        <h3 key={idx} className="font-bold text-lg mb-1">{line.replace(/^#+\s*/, '')}</h3>
      );
    }
    // Bold: text between **
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return <span key={idx}>{parts}<br/></span>;
  });
}

export function Chat() {
  const { messages, isLoading, sendMessage, startNewConversation } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isSignedIn } = useUser();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !isSignedIn) return;
    await sendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isSignedIn) return;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        await sendMessage(imageData, 'image');
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMsgId(id);
      setTimeout(() => setCopiedMsgId(null), 1500);
    } catch {}
  };

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  const getMessageIcon = (message: any) => {
    if (message.role === 'user') {
      return <User className="h-5 w-5" />;
    }
    return <Sparkles className="h-5 w-5 text-purple-500" />;
  };

  // Quick action reference cards (not shown in this version)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* New Conversation Button */}
      <div className="flex justify-center pt-8 pb-2">
        <button
          onClick={startNewConversation}
          className="border border-primary-300 text-primary-600 rounded-lg px-4 py-1 text-sm hover:bg-primary-50 transition shadow-sm"
        >
          + New Conversation
        </button>
      </div>
      {/* Messages */}
      <div className="flex-1 flex flex-col items-center justify-start pt-4 pb-40 px-2">
        <div className="w-full" style={{ maxWidth: '70vw', margin: '0 auto' }}>
          {messages.map((message, idx) => (
            <div
              key={message.id}
              className={`w-full flex mb-4 group ${message.role === 'user' ? 'justify-end' : 'justify-center'}`}
            >
              <div
                className={`relative max-w-xl px-5 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                  message.role === 'user'
                    ? 'bg-gray-100 text-gray-900 rounded-br-md'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
                style={{ wordBreak: 'break-word' }}
              >
                <div className="text-base leading-relaxed">
                  {message.type === 'image' ? (
                    <img src={message.content} alt="Uploaded" className="rounded-lg max-w-xs max-h-60 object-contain" />
                  ) : (
                    renderFormattedText(message.content)
                  )}
                </div>
                {/* Copy and Share buttons at the bottom right */}
                <div className="flex gap-2 items-center justify-end mt-4">
                  <button
                    className="p-1 rounded hover:bg-purple-50 text-purple-500 transition"
                    title="Copy"
                    onClick={() => handleCopy(message.content, message.id)}
                  >
                    {copiedMsgId === message.id ? (
                      <span className="text-xs text-green-600">Copied!</span>
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    className="p-1 rounded hover:bg-green-50 text-green-500 transition"
                    title="Share"
                    onClick={() => handleShare(message.content)}
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Show plant loading animation if waiting for AI response */}
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
            <div className="w-full flex mb-4 justify-start">
              <div className="relative max-w-xl px-5 py-3 rounded-2xl shadow-sm border border-gray-200 bg-white flex items-center gap-3">
                <PlantLoadingAnimation size={40} transparent align="left" showText={false} />
                <span className="text-gray-400 text-base">Gemini is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 w-full flex items-center justify-center bg-transparent pb-6"
        style={{ zIndex: 10 }}
      >
        <div className="w-full" style={{ maxWidth: '70vw', margin: '0 auto' }}>
          <div className="flex items-center bg-white rounded-2xl shadow-lg px-4 py-3 border border-gray-200">
            <input
              type="text"
              placeholder="Ask anything"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading || !isSignedIn}
              className="flex-1 bg-transparent outline-none border-none text-base px-2"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={!isSignedIn}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!isSignedIn}
              className="ml-2 text-gray-400 hover:text-primary-600 transition"
              title="Upload image"
            >
              <Upload className="h-5 w-5" />
            </button>
            <button
              type="submit"
              disabled={isLoading || !isSignedIn || !inputValue.trim()}
              className="ml-2 text-primary-600 hover:text-primary-800 transition"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}