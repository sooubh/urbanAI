import { useState, useCallback, useRef, useEffect } from 'react';
import AIOrchestrator, { DualAIResponse } from '../services/aiOrchestrator';
import { ChatMessage } from '../types';

interface UseAIOptions {
  type?: 'chat' | 'planning' | 'identification';
  streaming?: boolean;
  dualMode?: boolean;
}

export function useAI(options: UseAIOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const orchestratorRef = useRef<AIOrchestrator | null>(null);

  useEffect(() => {
    orchestratorRef.current = new AIOrchestrator();
  }, []);

  const generateResponse = useCallback(async (
    message: string,
    context?: ChatMessage[]
  ): Promise<string> => {
    if (!orchestratorRef.current) {
      throw new Error('AI Orchestrator not initialized');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await orchestratorRef.current.generateResponse(
        message,
        context,
        options.type
      );
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'AI service unavailable';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [options.type]);

  const generateDualResponse = useCallback(async (
    message: string,
    context?: ChatMessage[]
  ): Promise<DualAIResponse> => {
    if (!orchestratorRef.current) {
      throw new Error('AI Orchestrator not initialized');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await orchestratorRef.current.generateDualResponse(
        message,
        context,
        options.type
      );
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'AI service unavailable';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [options.type]);

  const generateStreamResponse = useCallback(async (
    message: string,
    context?: ChatMessage[]
  ): Promise<AsyncGenerator<string, void, unknown>> => {
    if (!orchestratorRef.current) {
      throw new Error('AI Orchestrator not initialized');
    }

    setIsLoading(true);
    setError(null);

    try {
      const stream = await orchestratorRef.current.generateStreamResponse(
        message,
        context,
        options.type
      );
      return stream;
    } catch (err: any) {
      const errorMessage = err.message || 'AI streaming service unavailable';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [options.type]);

  const analyzeImage = useCallback(async (
    imageData: string,
    prompt: string = 'Identify this plant and provide detailed care instructions for urban gardening'
  ): Promise<string> => {
    if (!orchestratorRef.current) {
      throw new Error('AI Orchestrator not initialized');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await orchestratorRef.current.analyzeImage(imageData, prompt);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Image analysis service unavailable';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeDualImage = useCallback(async (
    imageData: string,
    prompt: string = 'Identify this plant and provide detailed care instructions for urban gardening'
  ): Promise<DualAIResponse> => {
    if (!orchestratorRef.current) {
      throw new Error('AI Orchestrator not initialized');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await orchestratorRef.current.analyzeDualImage(imageData, prompt);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Image analysis service unavailable';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProviderStatus = useCallback(() => {
    return orchestratorRef.current?.getProviderStatus() || [];
  }, []);

  const getCurrentProvider = useCallback(() => {
    return orchestratorRef.current?.getCurrentProvider() || null;
  }, []);

  const getCurrentModel = useCallback(() => {
    return orchestratorRef.current?.getCurrentModel() || null;
  }, []);

  const getAvailableModels = useCallback(async () => {
    return orchestratorRef.current?.getAvailableModels() || [];
  }, []);

  return {
    generateResponse,
    generateDualResponse,
    generateStreamResponse,
    analyzeImage,
    analyzeDualImage,
    getProviderStatus,
    getCurrentProvider,
    getCurrentModel,
    getAvailableModels,
    isLoading,
    error,
  };
}