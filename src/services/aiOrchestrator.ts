import OpenRouterService, { OpenRouterMessage } from './openrouter';
import GeminiService from './gemini';
import { ChatMessage } from '../types';

interface AIProvider {
  name: string;
  service: OpenRouterService | GeminiService;
  priority: number;
  isAvailable: boolean;
  lastError?: string;
}

interface DualAIResponse {
  openrouter?: {
    text: string;
    model: string;
    provider: 'openrouter';
    error?: string;
  };
  gemini?: {
    text: string;
    model: string;
    provider: 'gemini';
    error?: string;
  };
}

class AIOrchestrator {
  private providers: AIProvider[] = [];
  private openRouterService: OpenRouterService | null = null;
  private geminiService: GeminiService | null = null;

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders(): void {
    // Initialize OpenRouter
    if (import.meta.env.VITE_OPENROUTER_API_KEY) {
      this.openRouterService = new OpenRouterService({
        apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
      });

      this.providers.push({
        name: 'openrouter',
        service: this.openRouterService,
        priority: 1,
        isAvailable: true,
      });
    }

    // Initialize Gemini
    if (import.meta.env.VITE_GEMINI_API_KEY) {
      this.geminiService = new GeminiService({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
        model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash-exp',
      });

      this.providers.push({
        name: 'gemini',
        service: this.geminiService,
        priority: 2,
        isAvailable: true,
      });
    }
  }

  private convertChatMessages(messages: ChatMessage[]): OpenRouterMessage[] {
    return messages.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }));
  }

  private getSystemPrompt(type: string): string {
    const systemPrompts = {
      chat: `You are an expert urban gardening assistant. Provide helpful, accurate advice about plant care, urban farming, container gardening, and sustainable growing practices. Keep responses practical, actionable, and encouraging. Focus on solutions that work in urban environments with limited space.`,
      
      planning: `You are a garden planning specialist. Help users design optimal urban gardens based on their space, climate, and preferences. Provide specific plant recommendations with spacing, care requirements, growing tips, and seasonal considerations. Consider factors like sunlight, water access, and container limitations.`,
      
      identification: `You are a plant identification expert. Analyze plant images and provide accurate species identification, detailed care instructions, common problems, and growing tips. Be specific about plant characteristics you observe and provide actionable advice for urban gardening contexts.`
    };

    return systemPrompts[type as keyof typeof systemPrompts] || systemPrompts.chat;
  }

  async generateDualResponse(
    message: string,
    context?: ChatMessage[],
    type: 'chat' | 'planning' | 'identification' = 'chat'
  ): Promise<DualAIResponse> {
    const responses: DualAIResponse = {};
    const systemPrompt = this.getSystemPrompt(type);
    
    // Prepare messages for OpenRouter
    const openRouterMessages: OpenRouterMessage[] = [
      { role: 'system', content: systemPrompt },
    ];

    if (context && context.length > 0) {
      openRouterMessages.push(...this.convertChatMessages(context.slice(-10)));
    }
    openRouterMessages.push({ role: 'user', content: message });

    // Prepare prompt for Gemini
    const geminiPrompt = `${systemPrompt}\n\nUser: ${message}`;

    // Execute both requests concurrently
    const promises = [];

    // OpenRouter request
    if (this.openRouterService) {
      promises.push(
        this.openRouterService.generateContent(
          openRouterMessages,
          import.meta.env.VITE_OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet'
        ).then(response => {
          responses.openrouter = {
            text: response.choices[0].message.content,
            model: import.meta.env.VITE_OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet',
            provider: 'openrouter',
          };
        }).catch(error => {
          responses.openrouter = {
            text: '',
            model: import.meta.env.VITE_OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet',
            provider: 'openrouter',
            error: error.message,
          };
        })
      );
    }

    // Gemini request
    if (this.geminiService) {
      promises.push(
        this.geminiService.generateContent(geminiPrompt).then(response => {
          responses.gemini = {
            text: response.text,
            model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash-exp',
            provider: 'gemini',
          };
        }).catch(error => {
          responses.gemini = {
            text: '',
            model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash-exp',
            provider: 'gemini',
            error: error.message,
          };
        })
      );
    }

    await Promise.allSettled(promises);
    return responses;
  }

  async generateResponse(
    message: string,
    context?: ChatMessage[],
    type: 'chat' | 'planning' | 'identification' = 'chat'
  ): Promise<string> {
    // For backward compatibility, return OpenRouter response
    const dualResponse = await this.generateDualResponse(message, context, type);
    
    if (dualResponse.openrouter && !dualResponse.openrouter.error) {
      return dualResponse.openrouter.text;
    }
    
    if (dualResponse.gemini && !dualResponse.gemini.error) {
      return dualResponse.gemini.text;
    }
    
    throw new Error('All AI providers failed');
  }

  async generateStreamResponse(
    message: string,
    context?: ChatMessage[],
    type: 'chat' | 'planning' | 'identification' = 'chat'
  ): Promise<AsyncGenerator<string, void, unknown>> {
    // Use OpenRouter for streaming (Gemini streaming can be added later)
    if (!this.openRouterService) {
      throw new Error('OpenRouter service not available');
    }

    const systemPrompt = this.getSystemPrompt(type);
    const messages: OpenRouterMessage[] = [
      { role: 'system', content: systemPrompt },
    ];

    if (context && context.length > 0) {
      messages.push(...this.convertChatMessages(context.slice(-10)));
    }
    messages.push({ role: 'user', content: message });

    try {
      return await this.openRouterService.generateStreamContent(
        messages,
        import.meta.env.VITE_OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet'
      );
    } catch (error: any) {
      console.error('Streaming failed:', error);
      
      // Fallback to regular generation
      const response = await this.generateResponse(message, context, type);
      
      async function* fallbackGenerator() {
        yield response;
      }
      
      return fallbackGenerator();
    }
  }

  async analyzeDualImage(imageData: string, prompt: string): Promise<DualAIResponse> {
    const responses: DualAIResponse = {};
    const promises = [];

    // OpenRouter image analysis
    if (this.openRouterService) {
      promises.push(
        this.openRouterService.analyzeImage(
          imageData,
          prompt,
          'anthropic/claude-3.5-sonnet'
        ).then(response => {
          responses.openrouter = {
            text: response,
            model: 'anthropic/claude-3.5-sonnet',
            provider: 'openrouter',
          };
        }).catch(error => {
          responses.openrouter = {
            text: '',
            model: 'anthropic/claude-3.5-sonnet',
            provider: 'openrouter',
            error: error.message,
          };
        })
      );
    }

    // Gemini image analysis
    if (this.geminiService) {
      promises.push(
        this.geminiService.analyzeImage(imageData, prompt).then(response => {
          responses.gemini = {
            text: response.text,
            model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash-exp',
            provider: 'gemini',
          };
        }).catch(error => {
          responses.gemini = {
            text: '',
            model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash-exp',
            provider: 'gemini',
            error: error.message,
          };
        })
      );
    }

    await Promise.allSettled(promises);
    return responses;
  }

  async analyzeImage(imageData: string, prompt: string): Promise<string> {
    // For backward compatibility
    const dualResponse = await this.analyzeDualImage(imageData, prompt);
    
    if (dualResponse.openrouter && !dualResponse.openrouter.error) {
      return dualResponse.openrouter.text;
    }
    
    if (dualResponse.gemini && !dualResponse.gemini.error) {
      return dualResponse.gemini.text;
    }
    
    throw new Error('All AI providers failed for image analysis');
  }

  getCurrentProvider(): string | null {
    return this.providers.length > 0 ? this.providers[0].name : null;
  }

  getCurrentModel(): string | null {
    return import.meta.env.VITE_OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';
  }

  getProviderStatus(): Array<{ 
    name: string; 
    available: boolean; 
    error?: string;
  }> {
    return this.providers.map(p => ({
      name: p.name,
      available: p.isAvailable,
      error: p.lastError,
    }));
  }

  async getAvailableModels(): Promise<Array<{
    id: string;
    name: string;
    description?: string;
    pricing?: {
      prompt: string;
      completion: string;
    };
  }>> {
    if (this.openRouterService) {
      try {
        return await this.openRouterService.getAvailableModels();
      } catch (error) {
        console.warn('Failed to fetch available models:', error);
      }
    }
    return [];
  }
}

export default AIOrchestrator;
export type { DualAIResponse };