# AI Interactive Journal 🧠

A personal journaling app powered by Socratic-style AI reflection.  
The user writes freely about their day, and the AI responds with open-ended, thought-provoking questions — not advice, not coaching.

---

## ✨ Project Goals

- Provide a private space for daily journaling.
- Encourage self-reflection through gentle Socratic questioning.
- Practice clean UI, React/Next.js architecture, and AI integration.

---

## 🧩 Tech Stack

- **Framework:** Next.js 14 (App Router + TypeScript)
- **AI Model:** DeepSeek R1 via API
- **Deployment:** Vercel (planned)
- **Optional Features (Future):**
  - Authentication (NextAuth / Supabase / Clerk)
  - Persistent storage (PostgreSQL / SQLite / Supabase)
  - Entry history with date filtering
  - Multi-language support

---

## ✅ MVP Features

- [ ] Text area for writing daily entry
- [ ] Submit entry and receive AI response (via DeepSeek)
- [ ] Display date + response below the entry
- [ ] Simple and clean UI
- [ ] Basic loading state
- [ ] Environment variable for API key

---

## 🚧 Future Roadmap

- [ ] Add user authentication
- [ ] Save entries in a database
- [ ] View past entries and responses
- [ ] Mobile-friendly layout
- [ ] Mood/emotion tagging

---

## 📦 Getting Started

1. Clone the repo:
   ```bash
   git clone git@github.com:marcelavbc/ai-interactive-journal.git
   cd ai-interactive-journal
   
2. Install dependencies:
   ```bash
npm install

3. Create .env.local and add your API key:
   ```bash
    DEEPSEEK_API_KEY=your-key-here

4. Start the development server:
       ```bash
       npm run dev
