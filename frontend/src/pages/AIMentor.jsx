import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sun, Moon, Send, Bot, UserIcon, Sparkles, Brain, TrendingUp, BookOpen, Lightbulb, Coffee, Heart, Zap } from "lucide-react";

const QUICK_PROMPTS = [
  { id: 1, text: "What skills should I learn for Data Science?", icon: Brain },
  { id: 2, text: "How to prepare for coding interviews?", icon: TrendingUp },
  { id: 3, text: "Best resources to learn React?", icon: BookOpen },
  { id: 4, text: "Career roadmap for AI/ML Engineer", icon: Sparkles },
  { id: 5, text: "How to build a portfolio?", icon: Zap },
  { id: 6, text: "Tips for learning faster", icon: Lightbulb },
];

const GREETINGS = [
  "Hey! How's your day going? 😊",
  "Hi there! What's on your mind today?",
  "Hello! Ready to level up your career? 🚀",
  "Hey! Great to see you! How can I help?",
];

const CASUAL_RESPONSES = {
  // Greetings
  "hello": [
    "Hey! 👋 How's it going? What would you like to talk about today?",
    "Hi there! 😊 I'm here to help with your career journey. What's on your mind?",
    "Hello! Great to see you! How can I assist you today?",
  ],
  "hi": [
    "Hey! What's up? 😊 Ready to crush some goals?",
    "Hi! How's your learning journey going?",
    "Hey there! What can I help you with today?",
  ],
  "hey": [
    "Hey! 👋 What brings you here today?",
    "Hi! How's everything going?",
    "Hey there! Ready to learn something new?",
  ],
  "good morning": ["Good morning! ☀️ Ready to start the day with some learning?"],
  "good evening": ["Good evening! 🌙 How was your day? Need any career advice?"],
  
  // How are you
  "how are you": [
    "I'm doing great, thanks for asking! 😊 More importantly, how are YOU doing? What's on your mind?",
    "I'm fantastic! Always excited to help people like you. How can I assist you today?",
    "I'm good! Ready to help you succeed. What would you like to know?",
  ],
  
  // Thanks
  "thank": [
    "You're welcome! 😊 Anything else I can help with?",
    "Happy to help! Feel free to ask more questions anytime! 🙌",
    "Glad I could help! What else would you like to know?",
    "No problem! I'm here whenever you need guidance! 💪",
  ],
  
  // Jokes/Fun
  "joke": [
    "Why do programmers prefer dark mode? Because light attracts bugs! 😄 Now, what can I help you with?",
    "Why do Java developers wear glasses? Because they don't C#! 😂 Ready to get serious about your career?",
  ],
  
  "love": [
    "Aww, that's sweet! ❤️ I'm here to support your career journey. What do you need help with?",
  ],
  
  // Confused/Lost
  "confused": [
    "No worries! Let's break it down together. What specifically are you confused about?",
    "I totally get it - career decisions can be overwhelming! Let's start with: what interests you the most?",
  ],
  
  "lost": [
    "Feeling lost is totally normal! 🤗 Let's figure this out together. Tell me: what are you passionate about?",
    "Don't worry, everyone feels lost sometimes! Let's start by understanding your interests. What excites you?",
  ],
  
  // Help
  "help": [
    "Of course! I'm here to help with: ✅ Career guidance, ✅ Learning resources, ✅ Skill development, ✅ Interview prep, ✅ Project ideas. What would you like to explore?",
  ],
};

const DETAILED_RESPONSES = {
  "data science": `Great choice! 📊 Here's your Data Science roadmap:

**Phase 1 (2-3 months):**
→ Python basics (variables, loops, functions)
→ Statistics fundamentals
→ SQL for data querying

**Phase 2 (3-4 months):**
→ Pandas & NumPy for data manipulation
→ Data visualization (Matplotlib, Seaborn)
→ Machine Learning basics (Scikit-learn)

**Phase 3 (4-6 months):**
→ Advanced ML (Deep Learning, NLP)
→ Big Data tools (Spark, Hadoop)
→ Build 3-5 portfolio projects

**Free Resources:**
📺 freeCodeCamp Python course
📺 StatQuest for Statistics
📘 Kaggle for practice datasets

Want me to explain any specific topic in detail?`,

  "web development": `Awesome! 💻 Here's your Web Dev journey:

**Frontend (3-4 months):**
→ HTML, CSS (Flexbox, Grid)
→ JavaScript ES6+ fundamentals
→ React.js (components, hooks, routing)
→ Tailwind CSS for styling

**Backend (3-4 months):**
→ Node.js & Express.js
→ MongoDB/PostgreSQL
→ REST APIs & Authentication
→ Deployment (Vercel, Railway)

**Projects to Build:**
✅ Portfolio website
✅ Todo app with backend
✅ E-commerce site
✅ Real-time chat app

**Best Resources:**
📺 The Odin Project (free, comprehensive)
📺 Traversy Media on YouTube
📘 MDN Web Docs

Which part interests you most - frontend or backend?`,

  "coding interviews": `Let's crack those interviews! 💪

**Data Structures (2-3 months):**
→ Arrays, Strings, LinkedLists
→ Stacks, Queues, Hashmaps
→ Trees, Graphs, Heaps
→ Dynamic Programming basics

**Strategy:**
1️⃣ Solve 5 easy problems daily (week 1-2)
2️⃣ Solve 3 medium problems daily (week 3-8)
3️⃣ Practice mock interviews weekly
4️⃣ Learn problem-solving patterns

**Platform Priority:**
🥇 LeetCode (150+ problems)
🥈 HackerRank for basics
🥉 CodeSignal for company tests

**Pro Tips:**
✅ Focus on understanding, not memorizing
✅ Time yourself (set 30 min limit)
✅ Explain your thought process aloud
✅ Review failed attempts

Want a weekly study plan?`,

  "react": `React is powerful! ⚛️ Here's your learning path:

**Week 1-2: JavaScript Prep**
→ ES6+ features (arrow functions, destructuring)
→ Promises & async/await
→ Array methods (map, filter, reduce)

**Week 3-6: React Fundamentals**
→ Components (functional)
→ Props & State
→ useState & useEffect hooks
→ Event handling
→ Conditional rendering

**Week 7-10: Advanced**
→ React Router for navigation
→ Context API / Redux
→ Custom hooks
→ Performance optimization

**Projects:**
1️⃣ Todo list app
2️⃣ Weather app (API integration)
3️⃣ Movie search app
4️⃣ E-commerce cart

**Free Resources:**
📺 React.dev official docs
📺 Codevolution React tutorial
📺 Scrimba interactive course

Already know JavaScript?`,

  "ai ml engineer": `AI/ML is the future! 🤖 Here's your 12-month roadmap:

**Months 1-3: Foundation**
→ Python programming
→ Linear Algebra & Calculus
→ Statistics & Probability
→ NumPy, Pandas basics

**Months 4-6: Machine Learning**
→ Supervised learning (regression, classification)
→ Unsupervised learning (clustering, PCA)
→ Scikit-learn library
→ Model evaluation metrics

**Months 7-9: Deep Learning**
→ Neural Networks fundamentals
→ TensorFlow/PyTorch
→ CNNs for Computer Vision
→ RNNs/Transformers for NLP

**Months 10-12: Specialization**
→ Choose: NLP, Computer Vision, or RL
→ Work on research papers
→ Kaggle competitions
→ Capstone project

**Salary Range:** ₹8-25 LPA (entry to mid-level)

Which area excites you most - NLP, Computer Vision, or something else?`,

  "career": `Let's find your perfect career path! 🎯

**Step 1: Self-Assessment**
→ What subjects do you enjoy?
→ What are you naturally good at?
→ Do you prefer creative or analytical work?
→ Team player or solo worker?

**Popular Career Paths:**
💻 Software Development (₹4-15 LPA)
📊 Data Science (₹6-20 LPA)
🎨 UI/UX Design (₹4-12 LPA)
🤖 AI/ML Engineer (₹8-25 LPA)
☁️ DevOps Engineer (₹6-18 LPA)
📱 Mobile Development (₹5-15 LPA)

**Next Steps:**
1️⃣ Take our skill assessment test
2️⃣ Complete psychometric analysis
3️⃣ Review personalized roadmap
4️⃣ Start learning!

Tell me: what subjects interest you the most?`,

  "portfolio": `Great question! Your portfolio is your resume 2.0! 🚀

**Must-Have Sections:**
1️⃣ Hero section (name, title, CTA)
2️⃣ About me (story, skills)
3️⃣ Projects (3-5 best works)
4️⃣ Skills (tech stack with icons)
5️⃣ Contact form

**Project Requirements:**
Each project should have:
✅ Live demo link
✅ GitHub repository
✅ Screenshots/GIFs
✅ Tech stack used
✅ Problem it solves

**Design Tips:**
→ Keep it clean & minimal
→ Use good color contrast
→ Make it responsive
→ Add smooth animations
→ Showcase personality

**Tech Stack:**
→ React + Tailwind CSS
→ Next.js for SEO
→ Deploy on Vercel

Want help choosing projects to showcase?`,

  "learning faster": `Smart learning hacks! 🧠

**The Feynman Technique:**
1️⃣ Learn a concept
2️⃣ Explain it to a 10-year-old
3️⃣ Identify knowledge gaps
4️⃣ Review & simplify

**Active Learning:**
✅ Build projects immediately
✅ Teach others what you learn
✅ Join study groups
✅ Practice daily (consistency > intensity)

**Time Management:**
→ Pomodoro: 25 min focus, 5 min break
→ Learn in the morning (peak focus)
→ Review before sleep (memory consolidation)

**Avoid These Mistakes:**
❌ Tutorial hell (watching without doing)
❌ Learning too many things at once
❌ Not taking breaks
❌ Skipping fundamentals

**My Recommendation:**
Focus on ONE skill for 30 days. Build 3 projects. Then move to next skill.

What skill are you currently learning?`,

  "motivation": `You got this! 💪 Here's how to stay motivated:

**Remember Why You Started:**
→ Write down your goals
→ Visualize your success
→ Track small wins daily

**Beat Procrastination:**
1️⃣ Start with just 5 minutes
2️⃣ Break tasks into tiny steps
3️⃣ Remove distractions
4️⃣ Reward yourself

**Stay Consistent:**
→ Learn 1 hour daily (not 7 hours on Sunday)
→ Join communities (Reddit, Discord)
→ Find an accountability partner
→ Share your progress online

**When Feeling Stuck:**
✅ Take a break (go for a walk)
✅ Switch to easier tasks
✅ Watch motivational content
✅ Remember: everyone struggles!

Fun fact: Most successful people failed many times before succeeding. Keep going! 🚀`,

  "salary": `Let's talk money! 💰

**Average Tech Salaries in India:**
→ Fresher (0-1 yr): ₹3-6 LPA
→ Junior (1-3 yrs): ₹6-12 LPA
→ Mid-Level (3-5 yrs): ₹12-25 LPA
→ Senior (5-8 yrs): ₹25-50 LPA
→ Lead (8+ yrs): ₹50L-1Cr+

**High-Paying Skills:**
🥇 AI/ML: ₹8-25 LPA (entry)
🥈 Full Stack: ₹6-18 LPA
🥉 DevOps: ₹8-20 LPA
🏅 Blockchain: ₹10-30 LPA

**How to Increase Salary:**
1️⃣ Master in-demand skills
2️⃣ Build strong portfolio
3️⃣ Get certifications
4️⃣ Switch companies (20-50% hike)
5️⃣ Negotiate confidently

**Pro Tip:** Skills matter more than degree!

Which field interests you most?`,
};

const getRandomResponse = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function AIMentor() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: getRandomResponse(GREETINGS) + "\n\n💡 I can help you with:\n✅ Career guidance\n✅ Learning roadmaps\n✅ Interview prep\n✅ Project ideas\n✅ Skill development\n\nWhat would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [conversationContext, setConversationContext] = useState([]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Check for casual responses first
    for (const [key, responses] of Object.entries(CASUAL_RESPONSES)) {
      if (lowerMsg.includes(key)) {
        return getRandomResponse(responses);
      }
    }
    
    // Check for detailed responses
    for (const [key, response] of Object.entries(DETAILED_RESPONSES)) {
      if (lowerMsg.includes(key)) {
        return response;
      }
    }
    
    // Context-aware responses
    if (lowerMsg.includes("yes") || lowerMsg.includes("yeah") || lowerMsg.includes("sure")) {
      return "Great! 🎉 Which specific topic would you like me to explain in more detail?";
    }
    
    if (lowerMsg.includes("no") || lowerMsg.includes("nope")) {
      return "No worries! What else would you like to know about?";
    }
    
    // Beginner friendly
    if (lowerMsg.includes("beginner") || lowerMsg.includes("start")) {
      return "Perfect! Starting as a beginner is exciting! 🌱\n\nI recommend:\n1️⃣ Choose ONE path (web dev, data science, etc.)\n2️⃣ Learn fundamentals first\n3️⃣ Build small projects\n4️⃣ Stay consistent (1 hour daily)\n\nWhich field interests you? Web Development, Data Science, or something else?";
    }
    
    // Job/Placement
    if (lowerMsg.includes("job") || lowerMsg.includes("placement") || lowerMsg.includes("hire")) {
      return "Looking for jobs? 💼 Here's what you need:\n\n✅ Strong portfolio (3-5 projects)\n✅ Updated resume with keywords\n✅ LinkedIn profile optimization\n✅ DSA skills (for tech roles)\n✅ System design basics\n\nPlatforms to use:\n→ Naukri, LinkedIn, Instahire\n→ AngelList for startups\n→ Company career pages\n\nWant help with resume or interview prep?";
    }
    
    // Projects
    if (lowerMsg.includes("project")) {
      return "Projects are key to standing out! 🚀\n\n**Beginner Projects:**\n→ Todo App\n→ Weather App\n→ Portfolio Website\n\n**Intermediate:**\n→ E-commerce site\n→ Blog with CMS\n→ Chat application\n\n**Advanced:**\n→ Real-time collaboration tool\n→ AI-powered app\n→ Full-stack SaaS product\n\nWhich level are you at? I can suggest specific projects!";
    }
    
    // Default with personality
    const defaultResponses = [
      "Interesting question! 🤔 Could you tell me more about what specifically you'd like to know?",
      "I'd love to help with that! Can you give me more details about your situation?",
      "Great question! To give you the best advice, could you elaborate a bit more?",
      "I'm here to help! 😊 Could you be more specific about what you need?",
    ];
    
    return getRandomResponse(defaultResponses) + "\n\nOr try asking about: web development, data science, career advice, interview prep, or project ideas!";
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationContext(prev => [...prev, text.toLowerCase()]);
    setInput("");
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const aiResponse = {
      id: Date.now() + 1,
      type: "ai",
      text: getAIResponse(text),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleQuickPrompt = (promptText) => {
    sendMessage(promptText);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-950" : "bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50"}`}>
      <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/80 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => window.location.href = "/dashboard"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className={`w-5 h-5 ${darkMode ? "text-white" : "text-black"}`} />
          </motion.button>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                AI Mentor
              </h1>
              <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Premium Feature
              </div>
            </div>
          </div>

          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-lg ${darkMode ? "bg-gray-800 text-yellow-400" : "bg-gray-100 text-gray-700"} transition`}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"} sticky top-24`}
            >
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Quick Prompts
              </h3>
              <div className="space-y-3">
                {QUICK_PROMPTS.map((prompt) => {
                  const Icon = prompt.icon;
                  return (
                    <motion.button
                      key={prompt.id}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className={`w-full p-3 rounded-xl text-left text-sm transition ${
                        darkMode
                          ? "bg-gray-800 hover:bg-gray-750 border border-gray-700"
                          : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`w-4 h-4 mb-2 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                      <div className={`font-medium text-xs ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {prompt.text}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className={`mt-6 p-4 rounded-xl ${darkMode ? "bg-purple-900/20 border border-purple-800/30" : "bg-purple-50 border border-purple-200"}`}>
                <div className={`text-xs font-medium ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                  💡 Pro Tip
                </div>
                <div className={`text-xs mt-1 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                  Be specific! "How to learn Python for data science?" works better than just "Python"
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"} flex flex-col h-[calc(100vh-12rem)]`}
            >
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message, idx) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "ai"
                            ? "bg-gradient-to-br from-purple-600 to-pink-600"
                            : "bg-gradient-to-br from-indigo-600 to-blue-600"
                        }`}>
                          {message.type === "ai" ? <Bot className="w-5 h-5 text-white" /> : <UserIcon className="w-5 h-5 text-white" />}
                        </div>

                        <div>
                          <div className={`px-4 py-3 rounded-2xl ${
                            message.type === "ai"
                              ? darkMode
                                ? "bg-gray-800 border border-gray-700"
                                : "bg-gray-100 border border-gray-200"
                              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          }`}>
                            <div className={`text-sm whitespace-pre-wrap ${
                              message.type === "ai" 
                                ? darkMode ? "text-gray-200" : "text-gray-800"
                                : "text-white"
                            }`}>
                              {message.text}
                            </div>
                          </div>
                          <div className={`text-xs mt-1 ${message.type === "user" ? "text-right" : "text-left"} ${
                            darkMode ? "text-gray-500" : "text-gray-500"
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                      <div className="flex gap-1">
                        {[0, 0.2, 0.4].map((delay, i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay }}
                            className="w-2 h-2 rounded-full bg-purple-500"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className={`p-6 border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
                    placeholder="Ask me anything about your career..."
                    className={`flex-1 px-4 py-3 rounded-xl border ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:ring-2 focus:ring-purple-500 outline-none transition`}
                  />
                  <motion.button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isTyping}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                      input.trim() && !isTyping
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                    whileHover={input.trim() && !isTyping ? { scale: 1.05 } : {}}
                    whileTap={input.trim() && !isTyping ? { scale: 0.95 } : {}}
                  >
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">Send</span>
                  </motion.button>
                </div>

                <div className={`mt-3 text-xs ${darkMode ? "text-gray-500" : "text-gray-500"} text-center`}>
                  💎 Premium feature • Powered by AI • Available 24/7
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}