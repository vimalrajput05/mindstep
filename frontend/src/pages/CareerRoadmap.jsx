import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sun,
  Moon,
  CheckCircle,
  Circle,
  Clock,
  Book,
  Youtube,
  ExternalLink,
  TrendingUp,
  Award,
  Calendar,
} from "lucide-react";

const CAREER_FIELDS = [
  { id: "data-science", name: "Data Science & Analytics", icon: "📊", color: "from-blue-500 to-cyan-500" },
  { id: "web-dev", name: "Web Development", icon: "💻", color: "from-purple-500 to-pink-500" },
  { id: "ai-ml", name: "AI & Machine Learning", icon: "🤖", color: "from-green-500 to-emerald-500" },
  { id: "mobile-dev", name: "Mobile Development", icon: "📱", color: "from-orange-500 to-red-500" },
  { id: "devops", name: "DevOps & Cloud", icon: "☁️", color: "from-indigo-500 to-purple-500" },
  { id: "cybersecurity", name: "Cybersecurity", icon: "🔒", color: "from-red-500 to-pink-500" },
];

const ROADMAPS = {
  "data-science": [
    {
      phase: "Foundation (1-2 months)",
      topics: [
        {
          id: "ds-1",
          name: "Python Basics",
          hours: 40,
          weeks: 2,
          description: "Variables, loops, functions, OOP concepts",
          resources: [
            { type: "youtube", title: "Python Full Course - FreeCodeCamp", link: "https://youtube.com/watch?v=rfscVS0vtbw" },
          ],
        },
        {
          id: "ds-2",
          name: "SQL & Databases",
          hours: 30,
          weeks: 2,
          description: "Queries, joins, aggregations, database design",
          resources: [
            { type: "youtube", title: "SQL Tutorial - Programming with Mosh", link: "https://youtube.com/watch?v=7S_tz1z_5bA" },
          ],
        },
      ],
    },
    {
      phase: "Core Skills (3-4 months)",
      topics: [
        {
          id: "ds-4",
          name: "Pandas & NumPy",
          hours: 40,
          weeks: 3,
          description: "Data manipulation, cleaning, transformation",
          resources: [
            { type: "youtube", title: "Pandas Tutorial - Corey Schafer", link: "https://youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS" },
          ],
        },
      ],
    },
  ],
  "web-dev": [
    {
      phase: "Frontend Basics (2-3 months)",
      topics: [
        {
          id: "web-1",
          name: "HTML & CSS",
          hours: 40,
          weeks: 3,
          description: "Semantic HTML, Flexbox, Grid, responsive design",
          resources: [
            { type: "youtube", title: "HTML & CSS Full Course", link: "https://youtube.com/watch?v=G3e-cpL7ofc" },
          ],
        },
      ],
    },
  ],
};

export default function CareerRoadmap() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [selectedField, setSelectedField] = useState(null);
  const [completedTopics, setCompletedTopics] = useState({});

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const toggleTopicComplete = (topicId) => {
    setCompletedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const calculateProgress = () => {
    if (!selectedField) return 0;
    const roadmap = ROADMAPS[selectedField];
    if (!roadmap) return 0;
    const allTopics = roadmap.flatMap((phase) => phase.topics);
    const completed = allTopics.filter((t) => completedTopics[t.id]).length;
    return Math.round((completed / allTopics.length) * 100);
  };

  const calculateTimeRemaining = () => {
    if (!selectedField) return { weeks: 0, hours: 0 };
    const roadmap = ROADMAPS[selectedField];
    if (!roadmap) return { weeks: 0, hours: 0 };
    const allTopics = roadmap.flatMap((phase) => phase.topics);
    const remaining = allTopics.filter((t) => !completedTopics[t.id]);
    const totalHours = remaining.reduce((sum, t) => sum + t.hours, 0);
    const totalWeeks = remaining.reduce((sum, t) => sum + t.weeks, 0);
    return { weeks: totalWeeks, hours: totalHours };
  };

  if (!selectedField) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}>
        <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/70 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </a>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition">
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-indigo-500">Career Path</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Select a field to get your personalized roadmap with courses, resources, and time estimates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAREER_FIELDS.map((field) => (
              <motion.button
                key={field.id}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedField(field.id)}
                className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg text-left transition-all hover:shadow-2xl`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${field.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                  {field.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{field.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Complete roadmap with curated resources</p>
              </motion.button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  const currentField = CAREER_FIELDS.find((f) => f.id === selectedField);
  const roadmap = ROADMAPS[selectedField] || [];
  const progress = calculateProgress();
  const timeRemaining = calculateTimeRemaining();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}>
      <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/70 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button onClick={() => setSelectedField(null)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Change Field</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold">{progress}% Complete</div>
              <div className="text-xs text-gray-500">{timeRemaining.weeks}w {timeRemaining.hours}h remaining</div>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition">
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${currentField.color} flex items-center justify-center text-3xl shadow-lg`}>
                {currentField.icon}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{currentField.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your personalized learning roadmap</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-900/50" : "bg-gray-50"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
                <div className="text-2xl font-bold">{progress}%</div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-900/50" : "bg-gray-50"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <div className="text-xs text-gray-500">Time Left</div>
                </div>
                <div className="text-2xl font-bold">{timeRemaining.weeks}w</div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-900/50" : "bg-gray-50"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div className="text-xs text-gray-500">Hours Left</div>
                </div>
                <div className="text-2xl font-bold">{timeRemaining.hours}h</div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-900/50" : "bg-gray-50"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
                <div className="text-2xl font-bold">{Object.values(completedTopics).filter((v) => v === true).length}</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }} className={`h-full bg-gradient-to-r ${currentField.color}`} />
            </div>
          </div>

          {roadmap.map((phase, phaseIdx) => (
            <div key={phaseIdx}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentField.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                  {phaseIdx + 1}
                </div>
                <h2 className="text-2xl font-bold">{phase.phase}</h2>
              </div>

              <div className="space-y-4">
                {phase.topics.map((topic) => {
                  const isCompleted = completedTopics[topic.id];
                  return (
                    <motion.div
                      key={topic.id}
                      whileHover={{ x: 4 }}
                      className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg transition-all ${isCompleted ? "opacity-70" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        <button onClick={() => toggleTopicComplete(topic.id)} className="mt-1 flex-shrink-0">
                          {isCompleted ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-gray-400 hover:text-indigo-500 transition" />}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className={`text-xl font-bold ${isCompleted ? "line-through" : ""}`}>{topic.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{topic.description}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                <Clock className="w-4 h-4" />
                                {topic.hours}h
                              </div>
                              <div className="text-xs text-gray-500 mt-1">~{topic.weeks} weeks</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {topic.resources.map((resource, idx) => (
                              <a
                                key={idx}
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? "bg-gray-900/50 hover:bg-gray-900" : "bg-gray-50 hover:bg-gray-100"} transition group`}
                              >
                                {resource.type === "youtube" ? <Youtube className="w-5 h-5 text-red-500 flex-shrink-0" /> : <Book className="w-5 h-5 text-blue-500 flex-shrink-0" />}
                                <span className="text-sm flex-1">{resource.title}</span>
                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition flex-shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="text-center py-8 text-sm text-gray-500">
            <p>✨ Keep learning consistently! Mark topics as you complete them to track your progress.</p>
          </div>
        </div>
      </main>
    </div>
  );
}