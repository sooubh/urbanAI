interface OpenRouterConfig {
  apiKey: string;
  baseURL?: string;
  defaultModel?: string;
  fallbackModel?: string;
}

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
      detail?: 'low' | 'high' | 'auto';
    };
  }>;
}

interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class OpenRouterService {
  private config: OpenRouterConfig;
  private requestCount = 0;
  private lastRequestTime = 0;
  private readonly RATE_LIMIT_DELAY = 1000; // 1 second between requests
  private readonly MAX_RETRIES = 3;

  constructor(config: OpenRouterConfig) {
    this.config = {
      baseURL: 'https://openrouter.ai/api/v1',
      defaultModel: 'anthropic/claude-3.5-sonnet',
      fallbackModel: 'meta-llama/llama-3.1-8b-instruct',
      ...config,
    };
  }

  private async enforceRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
      const delay = this.RATE_LIMIT_DELAY - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    this.lastRequestTime = Date.now();
    this.requestCount++;
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    retries = this.MAX_RETRIES
  ): Promise<T> {
    try {
      return await operation();
    } catch (error: any) {
      if (retries > 0 && this.isRetryableError(error)) {
        const delay = Math.pow(2, this.MAX_RETRIES - retries) * 1000;
        console.warn(`Retrying OpenRouter request in ${delay}ms. Retries left: ${retries - 1}`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryWithBackoff(operation, retries - 1);
      }
      throw error;
    }
  }

  private isRetryableError(error: any): boolean {
    const retryableStatuses = [429, 500, 502, 503, 504];
    return retryableStatuses.includes(error.status) || 
           error.message?.includes('quota') ||
           error.message?.includes('rate limit') ||
           error.message?.includes('timeout');
  }

  private getHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Urban Harvest AI',
    };
  }

  async generateContent(
    messages: OpenRouterMessage[],
    model?: string,
    options: {
      temperature?: number;
      max_tokens?: number;
      top_p?: number;
      stream?: boolean;
    } = {}
  ): Promise<OpenRouterResponse> {
    await this.enforceRateLimit();

    return this.retryWithBackoff(async () => {
      try {
        const response = await fetch(`${this.config.baseURL}/chat/completions`, {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify({
            model: model || this.config.defaultModel,
            messages,
            temperature: options.temperature || 0.7,
            max_tokens: options.max_tokens || 2048,
            top_p: options.top_p || 0.95,
            stream: options.stream || false,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.choices || data.choices.length === 0) {
          throw new Error('Empty response from OpenRouter API');
        }

        return data;
      } catch (error: any) {
        console.error('OpenRouter API Error:', error);
        throw new Error(`OpenRouter API failed: ${error.message}`);
      }
    });
  }

  async generateStreamContent(
    messages: OpenRouterMessage[],
    model?: string,
    options: {
      temperature?: number;
      max_tokens?: number;
      top_p?: number;
    } = {}
  ): Promise<AsyncGenerator<string, void, unknown>> {
    await this.enforceRateLimit();

    const response = await fetch(`${this.config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        model: model || this.config.defaultModel,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 2048,
        top_p: options.top_p || 0.95,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get response stream reader');
    }

    async function* streamGenerator() {
      try {
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ')) {
              const data = trimmed.slice(6);
              
              if (data === '[DONE]') {
                return;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  yield content;
                }
              } catch (e) {
                // Skip invalid JSON lines
                continue;
              }
            }
          }
        }
      } catch (error: any) {
        console.error('OpenRouter Stream Error:', error);
        throw new Error(`OpenRouter stream failed: ${error.message}`);
      } finally {
        reader.releaseLock();
      }
    }

    return streamGenerator();
  }

  async analyzeImage(
    imageData: string,
    prompt: string,
    model?: string
  ): Promise<string> {
    const messages: OpenRouterMessage[] = [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt,
          },
          {
            type: 'image_url',
            image_url: {
              url: imageData,
              detail: 'high',
            },
          },
        ],
      },
    ];

    // Use a vision-capable model for image analysis
    const visionModel = model || 'anthropic/claude-3.5-sonnet';
    
    try {
      const response = await this.generateContent(messages, visionModel);
      return response.choices[0].message.content;
    } catch (error: any) {
      console.error('OpenRouter Image Analysis Error:', error);
      throw new Error(`OpenRouter image analysis failed: ${error.message}`);
    }
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
    try {
      const response = await fetch(`${this.config.baseURL}/models`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error: any) {
      console.warn('Failed to fetch available models:', error);
      return [];
    }
  }

  getRequestCount(): number {
    return this.requestCount;
  }

  resetRequestCount(): void {
    this.requestCount = 0;
  }
}

export default OpenRouterService;
export type { OpenRouterConfig, OpenRouterMessage, OpenRouterResponse };