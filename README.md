# Urban Harvest AI

A dynamic, AI-enhanced website empowering city dwellers to start and maintain urban gardens. Features include a gardening chatbot, plant identification, personalized planning, weather-based tips, and a community hub powered by AI agents.

## 🌱 Features

- **AI Gardening Assistant**: Natural-language Q&A on plant care, soil, watering, pests, etc.
- **Plant Identification**: Upload photos → AI identifies species + care instructions
- **Personal Garden Planner**: Input space, light, climate → AI recommends best plants
- **Smart Tips Generator**: Weather-aware notifications: watering reminders, frost alerts
- **Community Forum**: User posts, discussions, photo sharing, AI-moderated highlights
- **Blog & Resources**: Curated articles, tutorials, AI-curated content recommendations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys for external services (see `.env.example`)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd urban-harvest-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual API keys
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Card)
│   └── layout/         # Layout components (Header, Footer)
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
└── main.tsx           # Application entry point
```

## 🔧 Configuration

### API Keys Required

- **OpenAI API**: For AI chatbot functionality
- **Gemini API**: Alternative AI provider
- **DeepSeek API**: Fallback AI provider
- **Plant.id API**: For plant identification
- **OpenWeather API**: For weather-based tips
- **Firebase**: For authentication and database

### Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
VITE_PLANT_ID_API_KEY=your_plant_id_api_key_here
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

## 🎨 Design System

The application uses a comprehensive design system built with Tailwind CSS:

- **Colors**: Primary (green), Secondary (yellow), Accent (blue)
- **Typography**: Inter font family with consistent sizing
- **Components**: Modular, reusable components with consistent styling
- **Animations**: Smooth transitions and micro-interactions

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Consistent naming conventions
- Modular component architecture

## 🚀 Deployment

The application is designed to be deployed on:

- **Frontend**: Vercel, Netlify, or similar
- **Backend**: Firebase Functions, Heroku, or similar
- **Database**: Firestore (recommended)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Plant images from [Pexels](https://pexels.com)
- Icons from [Lucide React](https://lucide.dev)
- UI components inspired by modern design systems
- AI capabilities powered by OpenAI, Google Gemini, and DeepSeek

## 📞 Support

For support, email hello@urbanharvest.ai or join our community forum.

---

*Prepared for rapid development with AI-agent orchestration to ensure a modular, scalable, and user-centric urban gardening platform.*