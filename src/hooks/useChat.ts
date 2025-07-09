import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';
import { generateId } from '../utils/helpers';
import { useAI } from './useAI';
import { useLocalStorage } from './useLocalStorage';

const INITIAL_MESSAGE: ChatMessage = {
  id: generateId(),
  content: "Hello! I'm your AI gardening assistant powered by Gemini AI. I can help you with plant care, garden planning, pest control, and much more. What would you like to know about urban gardening?",
  role: 'assistant',
  timestamp: new Date(),
  type: 'text',
};

export function useChat() {
  const [storedMessages, setStoredMessages] = useLocalStorage<ChatMessage[]>('chat-messages', [INITIAL_MESSAGE]);
  const [messages, setMessages] = useState<ChatMessage[]>(storedMessages);
  const [isLoading, setIsLoading] = useState(false);

  const { generateResponse, analyzeImage } = useAI({ 
    type: 'chat',
    streaming: true
  });

  // Sync state to localStorage
  const updateMessages = (msgs: ChatMessage[]) => {
    setMessages(msgs);
    setStoredMessages(msgs);
  };

  const sendMessage = useCallback(async (content: string, type: 'text' | 'image' = 'text') => {
    const userMessage: ChatMessage = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date(),
      type,
    };

    updateMessages([...messages, userMessage]);
    setIsLoading(true);

    try {
      let aiResponse: string = '';
      if (type === 'image') {
        aiResponse = await analyzeImage(
          content, 
          'Identify this plant and provide detailed care instructions, common issues, and growing tips for urban gardening.'
        );
      } else {
        aiResponse = await generateResponse(content, messages.slice(-10));
      }

      const assistantMessage: ChatMessage = {
        id: generateId(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
        type: 'text',
      };
      updateMessages([...messages, userMessage, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: generateId(),
        content: `I'm sorry, I encountered an error: ${error.message}. Please try again or check your internet connection.`,
        role: 'assistant',
        timestamp: new Date(),
        type: 'text',
      };
      updateMessages([...messages, userMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, generateResponse, analyzeImage]);

  const clearChat = useCallback(() => {
    updateMessages([INITIAL_MESSAGE]);
  }, []);

  const startNewConversation = useCallback(() => {
    updateMessages([INITIAL_MESSAGE]);
  }, []);

  // Keep messages in sync with localStorage
  // (If localStorage changes externally, update state)
  // This is optional, but can be added with useEffect if needed.

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    startNewConversation,
  };
}