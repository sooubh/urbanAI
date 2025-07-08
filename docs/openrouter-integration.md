# OpenRouter Integration Documentation

## Overview

This document provides comprehensive guidance for integrating OpenRouter AI into the Urban Harvest AI application. OpenRouter provides access to multiple state-of-the-art AI models through a unified API, offering flexibility and redundancy.

## System Requirements

### Memory Requirements
- **Minimum**: 256MB RAM for basic operations
- **Recommended**: 512MB+ RAM for optimal performance
- **Browser**: Modern browsers with ES2020+ support

### Processing Requirements
- **CPU**: Modern processor with JavaScript support
- **Network**: Stable internet connection (minimum 1 Mbps)
- **Storage**: 10MB for caching and temporary files

### Supported Platforms
- **Web Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Node.js**: Version 18+ (for server-side operations)
- **Mobile**: iOS 14+, Android 10+

## API Configuration

### Environment Variables
```bash
# Required
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional Configuration
VITE_OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
VITE_OPENROUTER_FALLBACK_MODEL=meta-llama/llama-3.1-8b-instruct
```

### Available Models
OpenRouter provides access to multiple AI models:

#### Premium Models
- **Claude 3.5 Sonnet** (`anthropic/claude-3.5-sonnet`)
  - Excellent for complex reasoning and analysis
  - Best for plant identification and detailed advice
  - Vision capabilities for image analysis

- **GPT-4o** (`openai/gpt-4o`)
  - Strong general-purpose model
  - Good for conversational AI
  - Vision capabilities

#### Cost-Effective Models
- **Llama 3.1 8B** (`meta-llama/llama-3.1-8b-instruct`)
  - Fast and efficient
  - Good for simple queries
  - Cost-effective fallback option

- **Mistral 7B** (`mistralai/mistral-7b-instruct`)
  - Balanced performance and cost
  - Good for general gardening advice

### Rate Limits
- **Requests per minute**: Varies by model (typically 60-200)
- **Tokens per minute**: Varies by model (typically 10K-100K)
- **Concurrent requests**: 10 maximum
- **Image uploads**: 20 per minute

## Implementation Examples

### Basic Text Generation
```typescript
import { useAI } from '../hooks/useAI';

function ChatComponent() {
  const { generateResponse, isLoading, error, getCurrentModel } = useAI({ type: 'chat' });

  const handleSendMessage = async (message: string) => {
    try {
      const response = await generateResponse(message);
      console.log('AI Response:', response);
      console.log('Current Model:', getCurrentModel());
    } catch (err) {
      console.error('Generation failed:', err);
    }
  };

  return (
    <div>
      {isLoading && <div>Generating response...</div>}
      {error && <div>Error: {error}</div>}
      {/* Chat UI components */}
    </div>
  );
}
```

### Streaming Responses
```typescript
function StreamingChat() {
  const { generateStreamResponse } = useAI({ streaming: true });
  const [streamedContent, setStreamedContent] = useState('');

  const handleStreamMessage = async (message: string) => {
    setStreamedContent('');
    
    try {
      const stream = await generateStreamResponse(message);
      
      for await (const chunk of stream) {
        setStreamedContent(prev => prev + chunk);
      }
    } catch (err) {
      console.error('Streaming failed:', err);
    }
  };

  return (
    <div>
      <div>{streamedContent}</div>
    </div>
  );
}
```

### Image Analysis with Vision Models
```typescript
function PlantIdentifier() {
  const { analyzeImage, isLoading } = useAI();

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      
      try {
        const analysis = await analyzeImage(
          imageData,
          'Identify this plant species, provide care instructions, common problems, and growing tips for urban gardening'
        );
        console.log('Plant Analysis:', analysis);
      } catch (err) {
        console.error('Image analysis failed:', err);
      }
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
      />
      {isLoading && <div>Analyzing image...</div>}
    </div>
  );
}
```

### Model Selection and Fallbacks
```typescript
function AdvancedChat() {
  const { generateResponse, getAvailableModels, getProviderStatus } = useAI();
  const [models, setModels] = useState([]);

  useEffect(() => {
    const loadModels = async () => {
      const availableModels = await getAvailableModels();
      setModels(availableModels);
    };
    
    loadModels();
  }, []);

  const handleComplexQuery = async (message: string) => {
    try {
      // Use Claude 3.5 Sonnet for complex analysis
      const response = await generateResponse(message);
      return response;
    } catch (err) {
      console.error('Primary model failed, trying fallback:', err);
      // Automatic fallback is handled by the orchestrator
      throw err;
    }
  };

  return (
    <div>
      <div>Available Models: {models.length}</div>
      <div>Provider Status: {JSON.stringify(getProviderStatus())}</div>
    </div>
  );
}
```

## Security Best Practices

### API Key Management
```typescript
// ✅ Good: Environment variables
const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

// ❌ Bad: Hardcoded keys
const apiKey = 'sk-or-v1-...'; // Never do this!

// ✅ Good: Validation
if (!apiKey || apiKey.length < 20) {
  throw new Error('Invalid OpenRouter API key');
}
```

### Input Validation and Sanitization
```typescript
function validateInput(input: string): boolean {
  // Check for malicious content
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .trim()
    .slice(0, 8000); // Limit length
}
```

### Request Headers Security
```typescript
const getSecureHeaders = () => ({
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': window.location.origin, // Required by OpenRouter
  'X-Title': 'Urban Harvest AI', // Optional but recommended
});
```

## Performance Optimization

### Response Caching
```typescript
class ResponseCache {
  private cache = new Map<string, { 
    response: string; 
    timestamp: number; 
    model: string;
  }>();
  private readonly TTL = 10 * 60 * 1000; // 10 minutes

  generateKey(messages: any[], model: string): string {
    return btoa(JSON.stringify({ messages: messages.slice(-3), model }));
  }

  get(key: string): string | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.response;
  }

  set(key: string, response: string, model: string): void {
    this.cache.set(key, {
      response,
      model,
      timestamp: Date.now(),
    });

    // Cleanup old entries
    if (this.cache.size > 100) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }
}
```

### Request Optimization
```typescript
class RequestOptimizer {
  private requestQueue: Array<{
    messages: any[];
    resolve: Function;
    reject: Function;
    priority: number;
  }> = [];
  
  private processing = false;

  async addRequest(
    messages: any[], 
    priority: number = 1
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ messages, resolve, reject, priority });
      this.requestQueue.sort((a, b) => b.priority - a.priority);
      
      if (!this.processing) {
        this.processQueue();
      }
    });
  }

  private async processQueue(): Promise<void> {
    this.processing = true;

    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift()!;
      
      try {
        const response = await openRouterService.generateContent(request.messages);
        request.resolve(response.choices[0].message.content);
      } catch (error) {
        request.reject(error);
      }

      // Rate limiting delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.processing = false;
  }
}
```

## Monitoring and Analytics

### Usage Tracking
```typescript
class UsageTracker {
  private metrics = {
    requestCount: 0,
    totalTokens: 0,
    averageResponseTime: 0,
    errorRate: 0,
    modelUsage: new Map<string, number>(),
  };

  recordRequest(
    duration: number, 
    tokens: number, 
    model: string,
    success: boolean
  ): void {
    this.metrics.requestCount++;
    this.metrics.totalTokens += tokens;
    this.metrics.averageResponseTime = 
      (this.metrics.averageResponseTime + duration) / 2;
    
    // Track model usage
    const currentUsage = this.metrics.modelUsage.get(model) || 0;
    this.metrics.modelUsage.set(model, currentUsage + 1);
    
    if (!success) {
      this.metrics.errorRate = 
        (this.metrics.errorRate * (this.metrics.requestCount - 1) + 1) / 
        this.metrics.requestCount;
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      modelUsage: Object.fromEntries(this.metrics.modelUsage),
    };
  }

  getCostEstimate(): number {
    // Rough cost estimation based on token usage
    const avgCostPerToken = 0.00002; // $0.02 per 1K tokens
    return this.metrics.totalTokens * avgCostPerToken;
  }
}
```

### Error Monitoring
```typescript
class ErrorMonitor {
  private errors: Array<{
    timestamp: Date;
    error: string;
    model: string;
    context: any;
  }> = [];

  logError(error: Error, model: string, context: any = {}): void {
    this.errors.push({
      timestamp: new Date(),
      error: error.message,
      model,
      context,
    });

    // Keep only last 100 errors
    if (this.errors.length > 100) {
      this.errors.shift();
    }

    // Send to monitoring service in production
    if (import.meta.env.PROD) {
      this.sendToMonitoring(error, model, context);
    }
  }

  private sendToMonitoring(error: Error, model: string, context: any): void {
    // Implementation for error reporting service
    console.error('Production Error:', { error, model, context });
  }

  getErrorStats() {
    const last24h = this.errors.filter(
      e => Date.now() - e.timestamp.getTime() < 24 * 60 * 60 * 1000
    );

    return {
      total: this.errors.length,
      last24h: last24h.length,
      byModel: this.groupBy(last24h, 'model'),
    };
  }

  private groupBy(array: any[], key: string) {
    return array.reduce((groups, item) => {
      const group = item[key] || 'unknown';
      groups[group] = (groups[group] || 0) + 1;
      return groups;
    }, {});
  }
}
```

## Testing Protocol

### Unit Tests
```typescript
describe('OpenRouter Integration', () => {
  test('should generate valid responses', async () => {
    const service = new OpenRouterService({ 
      apiKey: 'test-key' 
    });
    
    const messages = [{ role: 'user', content: 'Test prompt' }];
    const response = await service.generateContent(messages);
    
    expect(response.choices).toBeDefined();
    expect(response.choices[0].message.content).toBeDefined();
    expect(response.choices[0].message.content.length).toBeGreaterThan(0);
  });

  test('should handle rate limiting', async () => {
    // Test rate limiting implementation
    const startTime = Date.now();
    
    await Promise.all([
      service.generateContent([{ role: 'user', content: 'Test 1' }]),
      service.generateContent([{ role: 'user', content: 'Test 2' }])
    ]);
    
    const duration = Date.now() - startTime;
    expect(duration).toBeGreaterThanOrEqual(1000);
  });

  test('should retry on failures', async () => {
    // Mock network failure then success
    const mockFetch = jest.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          choices: [{ message: { content: 'Success' } }]
        })
      });

    global.fetch = mockFetch;

    const response = await service.generateContent([
      { role: 'user', content: 'Test' }
    ]);

    expect(response.choices[0].message.content).toBe('Success');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
```

### Integration Tests
```typescript
describe('AI Orchestrator with OpenRouter', () => {
  test('should use appropriate models for different tasks', async () => {
    const orchestrator = new AIOrchestrator();
    
    // Chat should use default model
    const chatResponse = await orchestrator.generateResponse(
      'How do I water tomatoes?',
      [],
      'chat'
    );
    expect(chatResponse).toContain('water');

    // Planning should use Claude for detailed analysis
    const planResponse = await orchestrator.generateResponse(
      'Plan a 4x4 garden',
      [],
      'planning'
    );
    expect(planResponse).toContain('garden');
  });

  test('should handle image analysis with vision models', async () => {
    const orchestrator = new AIOrchestrator();
    const mockImageData = 'data:image/jpeg;base64,/9j/4AAQ...';
    
    const result = await orchestrator.analyzeImage(
      mockImageData, 
      'Identify this plant'
    );
    
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  test('should fallback to alternative models on failure', async () => {
    // Mock primary model failure
    const orchestrator = new AIOrchestrator();
    
    // Should still get a response via fallback
    const response = await orchestrator.generateResponse(
      'Test message',
      [],
      'chat'
    );
    
    expect(response).toBeDefined();
  });
});
```

### Load Testing
```typescript
describe('Performance Tests', () => {
  test('should handle concurrent requests efficiently', async () => {
    const orchestrator = new AIOrchestrator();
    const startTime = Date.now();
    
    const promises = Array(5).fill(null).map((_, i) => 
      orchestrator.generateResponse(`Test prompt ${i}`)
    );
    
    const results = await Promise.allSettled(promises);
    const successful = results.filter(r => r.status === 'fulfilled');
    const duration = Date.now() - startTime;
    
    expect(successful.length).toBeGreaterThan(3); // 60% success rate minimum
    expect(duration).toBeLessThan(30000); // Should complete within 30 seconds
  });

  test('should maintain performance under load', async () => {
    const orchestrator = new AIOrchestrator();
    const iterations = 10;
    const durations: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      await orchestrator.generateResponse('Quick test');
      durations.push(Date.now() - start);
    }
    
    const avgDuration = durations.reduce((a, b) => a + b) / durations.length;
    expect(avgDuration).toBeLessThan(5000); // Average under 5 seconds
  });
});
```

## Known Limitations

### API Limitations
- **Context Window**: Varies by model (4K-200K tokens)
- **Image Size**: 20MB maximum per image
- **Request Timeout**: 60 seconds maximum
- **Rate Limits**: Vary by model and plan

### Model-Specific Limitations
- **Claude 3.5 Sonnet**: Higher cost, excellent quality
- **GPT-4o**: Good balance of cost and performance
- **Llama 3.1**: Lower cost, reduced capabilities
- **Vision Models**: Limited to Claude and GPT-4o

### Browser Limitations
- **CORS**: Must include proper referer headers
- **Storage**: Limited local storage for caching
- **Memory**: Large responses may cause issues on mobile

## Troubleshooting

### Common Issues

#### API Key Problems
```typescript
// Validate API key format
function validateApiKey(key: string): boolean {
  return key.startsWith('sk-or-v1-') && key.length > 20;
}

// Check key permissions
async function testApiKey(): Promise<boolean> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    return response.ok;
  } catch {
    return false;
  }
}
```

#### Rate Limit Handling
```typescript
async function handleRateLimit(error: any): Promise<void> {
  if (error.status === 429) {
    const retryAfter = error.headers?.['retry-after'] || 60;
    console.log(`Rate limited, waiting ${retryAfter} seconds`);
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
  }
}
```

#### Model Availability
```typescript
async function checkModelAvailability(model: string): Promise<boolean> {
  try {
    const models = await openRouterService.getAvailableModels();
    return models.some(m => m.id === model);
  } catch {
    return false;
  }
}
```

This comprehensive integration guide provides everything needed to successfully implement OpenRouter AI in the Urban Harvest AI application, with proper error handling, security measures, and performance optimization.