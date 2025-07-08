import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';
import { generateId } from '../utils/helpers';
import { useAI } from './useAI';
import { DualAIResponse } from '../services/aiOrchestrator';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      content: "Hello! I'm your AI gardening assistant powered by both OpenRouter and Gemini AI. I can help you with plant care, garden planning, pest control, and much more. What would you like to know about urban gardening?",
      role: 'assistant',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingDualResponse, setPendingDualResponse] = useState<{
    id: string;
    responses: DualAIResponse;
  } | null>(null);
  
  const { generateDualResponse, analyzeDualImage, generateStreamResponse } = useAI({ 
    type: 'chat',
    streaming: true,
    dualMode: true
  });

  const sendMessage = useCallback(async (content: string, type: 'text' | 'image' = 'text') => {
    const userMessage: ChatMessage = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date(),
      type,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (type === 'image') {
        // Handle dual image analysis
        const dualResponse = await analyzeDualImage(
          content, 
          'Identify this plant and provide detailed care instructions, common issues, and growing tips for urban gardening.'
        );

        // Show dual response selector
        const selectorMessage: ChatMessage = {
          id: generateId(),
          content: '',
          role: 'assistant',
          timestamp: new Date(),
          type: 'dual-response',
          metadata: { dualResponse }
        };

        setMessages(prev => [...prev, selectorMessage]);
        setPendingDualResponse({
          id: selectorMessage.id,
          responses: dualResponse
        });
      } else {
        // Handle dual text generation
        const dualResponse = await generateDualResponse(content, messages.slice(-10));

        // Show dual response selector
        const selectorMessage: ChatMessage = {
          id: generateId(),
          content: '',
          role: 'assistant',
          timestamp: new Date(),
          type: 'dual-response',
          metadata: { dualResponse }
        };

        setMessages(prev => [...prev, selectorMessage]);
        setPendingDualResponse({
          id: selectorMessage.id,
          responses: dualResponse
        });
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: generateId(),
        content: `I'm sorry, I encountered an error: ${error.message}. Please try again or check your internet connection.`,
        role: 'assistant',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, generateDualResponse, analyzeDualImage]);

  const selectAIResponse = useCallback((responseText: string, provider: 'openrouter' | 'gemini') => {
    if (!pendingDualResponse) return;

    // Replace the dual response selector with the selected response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === pendingDualResponse.id 
          ? {
              ...msg,
              content: responseText,
              type: 'text' as const,
              metadata: { 
                ...msg.metadata, 
                selectedProvider: provider,
                selectedModel: pendingDualResponse.responses[provider]?.model
              }
            }
          : msg
      )
    );

    setPendingDualResponse(null);
  }, [pendingDualResponse]);

  const clearChat = useCallback(() => {
    setMessages([{
      id: generateId(),
      content: "Hello! I'm your AI gardening assistant powered by both OpenRouter and Gemini AI. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
      type: 'text',
    }]);
    setPendingDualResponse(null);
  }, []);

  return {
    messages,
    isLoading,
    pendingDualResponse,
    sendMessage,
    selectAIResponse,
    clearChat,
  };
}