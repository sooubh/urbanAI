**Urban Gardening Website Project Blueprint**

---

## 1. Project Overview

**Name:** Urban Harvest AI

**Description:** A dynamic, AI-enhanced website empowering city dwellers to start and maintain urban gardens. Features include a gardening chatbot, plant identification, personalized planning, weather-based tips, and a community hub powered by AI agents.

**Goals:**

- Provide instant, accurate gardening advice via AI
- Enable plant identification through image uploads
- Offer tailored plant suggestions based on user inputs and local conditions
- Deliver proactive care tips by integrating weather data
- Foster a community for sharing and collaboration

---

## 2. Core Features

1. **AI Gardening Assistant Chatbot**
   - Natural-language Q&A on plant care, soil, watering, pests, etc.
2. **Plant Identification**
   - Upload photos → AI identifies species + care instructions
3. **Personal Garden Planner**
   - Input space, light, climate → AI recommends best plants
4. **Smart Tips Generator**
   - Weather-aware notifications: watering reminders, frost alerts
5. **Community Forum**
   - User posts, discussions, photo sharing, AI-moderated highlights
6. **Blog & Resources**
   - Curated articles, tutorials, AI-curated content recommendations

---

## 3. AI Agent Roles & Workflow

| Agent               | Responsibility                                           |
| ------------------- | -------------------------------------------------------- |
| **User Query**      | Routes user input to FAQ DB or AI Chatbot                |
| **FAQ Manager**     | Searches local knowledgebase for pre-defined answers     |
| **AI Orchestrator** | Chooses between GPT-4, Gemini, DeepSeek fallback streams |
| **Image Processor** | Preprocesses & forwards uploads to Plant.id / Vision API |
| **Tip Scheduler**   | Monitors weather API → pushes tips & reminders           |
| **Content Curator** | Fetches blog posts, filters by relevance via AI scoring  |

### Workflow Diagram (Textual)

1. **User enters query or uploads image**
2. **Router checks intent**
   - Text → Forward to FAQ Manager → If no match → AI Orchestrator
   - Image → Forward to Image Processor
3. **AI Orchestrator chooses engine (OpenAI / Gemini / DeepSeek)**
4. **Answer returned and displayed in Chat UI**
5. **For planner: user inputs location, space, light → Formatted prompt → AI returns recommended plants**
6. **Scheduler polls OpenWeather API daily → Triggers Smart Tips**
7. **Community posts monitored by Content Curator → Highlight best posts via AI relevance**

---

## 4. System Architecture

1. **Frontend (React + Tailwind CSS)**

   - Pages: Home, Chatbot, Identifier, Planner, Forum, Blog, Account
   - Components: Chat UI, Upload Widget, Planner Form, Post Feed

2. **Backend**

   - **APIs**: Node.js + Express or Firebase Functions
   - **Endpoints**:
     - `/api/chat` → Orchestrator → OpenAI/Gemini/DeepSeek
     - `/api/identify` → Image Processor → Plant.id
     - `/api/planner` → GPT prompt for suggestions
     - `/api/tips` → Cron-triggered scheduler
     - `/api/posts` → CRUD for forum

3. **Database**

   - Firestore (users, posts, FAQs, logs)
   - Storage: Firebase Storage or S3 (images)

4. **External Services**

   - **OpenAI API**, **Gemini** (chatbot)
   - **DeepSeek API** (fallback)
   - **Plant.id API** / **Google Vision** (identification)
   - **OpenWeather API** (weather data)
   - **Firebase Auth** (user management)

---

## 5. Project Structure

```
/urban-harvest-ai
│
├─ /frontend
│   ├─ /src
│   │   ├─ /components
│   │   ├─ /pages
│   │   └─ /styles
│   └─ package.json
│
├─ /backend
│   ├─ /functions        # Firebase Functions or Express server
│   ├─ /models           # DB schemas
│   ├─ /routes           # API endpoints
│   └─ package.json
│
├─ /docs
│   └─ architecture.md
│
├─ .env.example         # API keys & config
└─ README.md            # Project overview & setup
```

---

## 6. API Keys & Configuration

- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `DEEPSEEK_API_KEY`
- `PLANT_ID_API_KEY`
- `OPENWEATHER_API_KEY`
- `FIREBASE_PROJECT_ID`, `FIREBASE_API_KEY`, etc.

Populate `.env` from `.env.example` before deployment.

---

## 7. Milestones & Timeline

1. **Week 1:** Setup repo, basic pages, user auth
2. **Week 2:** Chatbot + FAQ integration
3. **Week 3:** Plant ID & Planner modules
4. **Week 4:** Tips scheduler & notifications
5. **Week 5:** Community forum + blog
6. **Week 6:** Testing, optimization, deployment

---

## 8. Deployment & Hosting

- **Frontend:** Vercel / Netlify
- **Backend:** Firebase Functions / Heroku
- **Database:** Firestore (multi-region)

---

## 9. Next Steps

- Review architecture with stakeholders
- Assign tasks & set up Kanban board
- Prepare detailed API contracts
- Kick off Week 1 sprint

---

*Prepared for rapid development with AI-agent orchestration to ensure a modular, scalable, and user-centric urban gardening platform.*

