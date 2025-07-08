import OpenRouterService from '../openrouter';

// Mock fetch globally
global.fetch = jest.fn();

describe('OpenRouterService', () => {
  let openRouterService: OpenRouterService;
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    openRouterService = new OpenRouterService({
      apiKey: mockApiKey,
    });
    jest.clearAllMocks();
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limiting between requests', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({
          choices: [{ message: { content: 'Test response' } }],
          usage: { total_tokens: 10 }
        }),
      };

      (fetch as jest.Mock).mockResolvedValue(mockResponse);

      const startTime = Date.now();
      
      // Make two consecutive requests
      await openRouterService.generateContent([
        { role: 'user', content: 'Test prompt 1' }
      ]);
      await openRouterService.generateContent([
        { role: 'user', content: 'Test prompt 2' }
      ]);
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should take at least 1 second due to rate limiting
      expect(duration).toBeGreaterThanOrEqual(1000);
    });
  });

  describe('Error Handling', () => {
    it('should retry on retryable errors', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        json: () => Promise.resolve({ error: { message: 'Rate limit exceeded' } }),
      };

      const mockSuccessResponse = {
        ok: true,
        json: () => Promise.resolve({
          choices: [{ message: { content: 'Success after retry' } }],
          usage: { total_tokens: 10 }
        }),
      };

      (fetch as jest.Mock)
        .mockResolvedValueOnce(mockErrorResponse)
        .mockResolvedValueOnce(mockSuccessResponse);

      const result = await openRouterService.generateContent([
        { role: 'user', content: 'Test prompt' }
      ]);
      
      expect(result.choices[0].message.content).toBe('Success after retry');
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should throw error after max retries', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve({ error: { message: 'Server error' } }),
      };

      (fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

      await expect(openRouterService.generateContent([
        { role: 'user', content: 'Test prompt' }
      ])).rejects.toThrow('OpenRouter API failed');
    });
  });

  describe('Content Generation', () => {
    it('should generate content successfully', async () => {
      const expectedResponse = 'Generated content';
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({
          choices: [{ 
            message: { content: expectedResponse },
            finish_reason: 'stop'
          }],
          usage: { total_tokens: 10 }
        }),
      };

      (fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await openRouterService.generateContent([
        { role: 'user', content: 'Test prompt' }
      ]);
      
      expect(result.choices[0].message.content).toBe(expectedResponse);
    });

    it('should handle empty responses', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({
          choices: [],
          usage: { total_tokens: 0 }
        }),
      };

      (fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(openRouterService.generateContent([
        { role: 'user', content: 'Test prompt' }
      ])).rejects.toThrow('Empty response from OpenRouter API');
    });
  });

  describe('Image Analysis', () => {
    it('should analyze images successfully', async () => {
      const expectedResponse = 'This is a plant image analysis';
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({
          choices: [{ message: { content: expectedResponse } }],
          usage: { total_tokens: 20 }
        }),
      };

      (fetch as jest.Mock).mockResolvedValue(mockResponse);

      const imageData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...';
      const result = await openRouterService.analyzeImage(imageData, 'Identify this plant');
      
      expect(result).toBe(expectedResponse);
      
      const fetchCall = (fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);
      
      expect(requestBody.messages[0].content).toEqual([
        { type: 'text', text: 'Identify this plant' },
        { 
          type: 'image_url', 
          image_url: { 
            url: imageData, 
            detail: 'high' 
          } 
        }
      ]);
    });
  });

  describe('Streaming', () => {
    it('should handle streaming responses', async () => {
      const mockStreamData = [
        'data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n',
        'data: {"choices":[{"delta":{"content":" world"}}]}\n\n',
        'data: [DONE]\n\n'
      ];

      const mockResponse = {
        ok: true,
        body: {
          getReader: () => ({
            read: jest.fn()
              .mockResolvedValueOnce({ 
                done: false, 
                value: new TextEncoder().encode(mockStreamData[0]) 
              })
              .mockResolvedValueOnce({ 
                done: false, 
                value: new TextEncoder().encode(mockStreamData[1]) 
              })
              .mockResolvedValueOnce({ 
                done: false, 
                value: new TextEncoder().encode(mockStreamData[2]) 
              })
              .mockResolvedValueOnce({ done: true }),
            releaseLock: jest.fn(),
          }),
        },
      };

      (fetch as jest.Mock).mockResolvedValue(mockResponse);

      const stream = await openRouterService.generateStreamContent([
        { role: 'user', content: 'Test prompt' }
      ]);

      const chunks = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      expect(chunks).toEqual(['Hello', ' world']);
    });
  });
});