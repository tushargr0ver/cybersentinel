🛡️ CyberSentinel

CyberSentinel is an immersive, AI-powered cybersecurity awareness platform that equips users with real-world defense strategies through interactive simulations and gamified learning. From phishing emails and SMS traps to deceptive social engineering chatbots and fake login pages — CyberSentinel trains users to think like attackers and defend like pros.

Leveraging cutting-edge language models (GPT-3.5-turbo via api.market), CyberSentinel dynamically generates personalized scenarios, challenges, and feedback. Appwrite Cloud manages authentication (Google & GitHub OAuth) and persistent user data, enabling seamless onboarding and secure training progression.

Whether you're a casual user or enterprise learner — CyberSentinel transforms cybersecurity training into a hands-on, intuitive experience.

🚀 Key Features

    🔐 Seamless Authentication via Appwrite (GitHub OAuth)

    🧠 AI-powered phishing simulations (Email & SMS-based)

    🤖 Real-time social engineering chatbot simulations

    🧪 Password strength evaluator with adaptive feedback

    🎭 Fake login page spotting exercises

    🧩 AI-generated cybersecurity quizzes and challenges

    📈 Progress tracker for adaptive training and performance

    🏆 Leaderboard to gamify cybersecurity knowledge

    📚 Tips & best practices hub

    🌙 Light/Dark mode toggle across the UI

    📱 Fully mobile-responsive design

    💫 Smooth animations, fluid transitions & modern UI with shadcn

🧱 Tech Stack

Frontend

    Next.js — Lightning-fast web app foundation

    Tailwind CSS — Utility-first styling framework

    shadcn/ui — Accessible, developer-friendly components

    Vercel — Frontend hosting and CI/CD

Backend

    Node.js + Express — Handles simulation logic and AI integrations

    AWS EC2 or Lambda — Scalable backend deployment

AI Integration

    GPT-3.5-turbo via api.market — Drives phishing, chatbot, quiz simulations

Authentication & Database

    Appwrite Cloud — Manages auth (Google & GitHub OAuth), stores progress & feedback

📁 Folder Structure

. ├── app/ → Next.js routes and pages
├── components/ → Reusable UI elements
├── lib/ → Appwrite client and helpers
├── backend/ → Node.js/Express API logic
├── public/ → Static assets
├── styles/ → Tailwind configurations
└── .env.local → Environment configuration

⚙️ Getting Started

    Clone the repository:

    bash git clone https://github.com/your-username/cybersentinel.git cd cybersentinel

    Install frontend dependencies:

    bash npm install

    Configure environment variables in .env.local:

    NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
    NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
    NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_db_id
    NEXT_PUBLIC_API_MARKET_KEY=your_api_market_key

    Start frontend:

    bash npm run dev

    Start backend (optional for custom AI logic):

    bash cd backend
    npm install
    node index.js

📦 Simulated Scenarios

    ✉️ Phishing Emails (AI-generated)

    📲 Phishing SMS (AI-generated)

    💬 Social Engineering Chatbot

    🔐 Password Cracking Simulations

    🧪 Fake Login Page Detection

    🎯 AI-Driven Cybersecurity Quizzes

🙋 FAQ

Q: Is this platform for real cybersecurity protection?

A: No, it’s a simulated training platform for awareness and education purposes.

Q: How does GPT-3.5-turbo get used?

A: Through api.market, GPT-3.5-turbo generates phishing content, simulations, and adaptive quizzes.

Q: Why use Appwrite?

A: Appwrite Cloud offers secure Google/GitHub OAuth, NoSQL storage, and easy SDK integration.

Q: Can I extend this platform?

A: Absolutely — it’s modular with Node.js backend, OpenAI logic, and frontend customization via shadcn + Tailwind.

🧑‍💻 Team CyberSentinels

Built to empower humans against evolving digital threats. 🌐

🪪 License

MIT License
