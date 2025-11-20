import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowLeft, Brain, Target, Users, Lightbulb, Heart, Zap } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    category: "Openness",
    icon: Lightbulb,
    question: "I enjoy exploring new ideas and trying different approaches to problems.",
    tip: "Think about how you react to new experiences and learning opportunities."
  },
  {
    id: 2,
    category: "Conscientiousness",
    icon: Target,
    question: "I prefer to plan things in advance and stick to schedules.",
    tip: "Consider your organizational habits and attention to detail."
  },
  {
    id: 3,
    category: "Extraversion",
    icon: Users,
    question: "I feel energized when working with others and socializing.",
    tip: "Reflect on whether you recharge through social interaction or alone time."
  },
  {
    id: 4,
    category: "Agreeableness",
    icon: Heart,
    question: "I prioritize maintaining harmony and helping others over my own interests.",
    tip: "Think about how you handle conflicts and your approach to teamwork."
  },
  {
    id: 5,
    category: "Neuroticism",
    icon: Zap,
    question: "I often worry about things that might go wrong.",
    tip: "Consider your emotional responses to stress and uncertainty."
  },
  {
    id: 6,
    category: "Openness",
    icon: Lightbulb,
    question: "I enjoy creative and artistic activities more than routine tasks.",
    tip: "Think about your preference for creativity vs. structure."
  },
  {
    id: 7,
    category: "Conscientiousness",
    icon: Target,
    question: "I complete tasks thoroughly even when they're difficult or boring.",
    tip: "Reflect on your persistence and attention to quality."
  },
  {
    id: 8,
    category: "Extraversion",
    icon: Users,
    question: "I am usually the one to initiate conversations in social settings.",
    tip: "Consider your comfort level with taking social initiative."
  },
  {
    id: 9,
    category: "Agreeableness",
    icon: Heart,
    question: "I find it easy to trust others and see the best in people.",
    tip: "Think about your default assumptions about others' intentions."
  },
  {
    id: 10,
    category: "Neuroticism",
    icon: Zap,
    question: "I remain calm and composed even in stressful situations.",
    tip: "Reflect on your emotional stability under pressure."
  }
];

const OPTIONS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
];

export default function PsychometricTest() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const Icon = currentQuestion?.icon;

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateResults = () => {
    const categoryScores = {
      Openness: [],
      Conscientiousness: [],
      Extraversion: [],
      Agreeableness: [],
      Neuroticism: []
    };

    QUESTIONS.forEach(q => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        categoryScores[q.category].push(answer);
      }
    });

    const results = {};
    Object.keys(categoryScores).forEach(category => {
      const scores = categoryScores[category];
      const avg = scores.length > 0 
        ? scores.reduce((a, b) => a + b, 0) / scores.length 
        : 0;
      results[category] = Math.round((avg / 5) * 100);
    });

    return results;
  };

  const getPersonalityType = (results) => {
    const { Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism } = results;
    
    if (Openness > 70 && Conscientiousness > 70) {
      return {
        type: "The Innovator",
        desc: "You combine creativity with discipline, making you excellent at bringing ideas to life.",
        careers: ["Product Manager", "Entrepreneur", "UX Designer"]
      };
    } else if (Extraversion > 70 && Agreeableness > 70) {
      return {
        type: "The Collaborator",
        desc: "You excel in team environments and building relationships.",
        careers: ["Team Lead", "HR Manager", "Sales Manager"]
      };
    } else if (Conscientiousness > 70 && Neuroticism < 30) {
      return {
        type: "The Achiever",
        desc: "You're organized, reliable, and handle pressure well.",
        careers: ["Project Manager", "Operations Manager", "Engineer"]
      };
    } else if (Openness > 70 && Extraversion < 30) {
      return {
        type: "The Thinker",
        desc: "You prefer deep, independent work and creative problem-solving.",
        careers: ["Data Scientist", "Researcher", "Software Developer"]
      };
    } else {
      return {
        type: "The Balanced Professional",
        desc: "You have a well-rounded personality adaptable to various roles.",
        careers: ["Business Analyst", "Consultant", "Full Stack Developer"]
      };
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-950" : "bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/80 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => window.location.href = "/dashboard"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className={`w-5 h-5  ${darkMode ? "text-white" : "text-black"}`} />
            {/* <span className="font-medium">Back to Dashboard</span> */}
          </motion.button>

          <div className="flex items-center gap-2">
            <Brain className={`w-6 h-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
            <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Psychometric Test
            </h1>
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`p-8 md:p-10 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"}`}
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Question {currentIndex + 1} of {QUESTIONS.length}
                  </span>
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <div className={`text-xs font-medium ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                      {currentQuestion.category}
                    </div>
                    <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Personality Assessment
                    </div>
                  </div>
                </div>

                <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {currentQuestion.question}
                </h2>

                <div className={`p-4 rounded-lg ${darkMode ? "bg-purple-900/20 border border-purple-800/30" : "bg-purple-50 border border-purple-200"}`}>
                  <p className={`text-sm ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                    💡 {currentQuestion.tip}
                  </p>
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-3 mb-8">
                {OPTIONS.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-5 rounded-xl text-left font-medium transition ${
                        isSelected
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                          : darkMode
                          ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-750"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.label}</span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                          >
                            ✓
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between gap-3">
                <motion.button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`px-6 py-3 rounded-xl font-medium ${
                    currentIndex === 0
                      ? "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                      : darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-750"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  whileHover={currentIndex > 0 ? { scale: 1.05 } : {}}
                  whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
                >
                  Previous
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  disabled={answers[currentQuestion.id] === undefined}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    answers[currentQuestion.id] !== undefined
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                  whileHover={answers[currentQuestion.id] !== undefined ? { scale: 1.05 } : {}}
                  whileTap={answers[currentQuestion.id] !== undefined ? { scale: 0.95 } : {}}
                >
                  {currentIndex === QUESTIONS.length - 1 ? "View Results" : "Next"}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`p-8 md:p-10 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"}`}
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <Brain className={`w-16 h-16 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                </motion.div>
                
                <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Your Psychometric Profile
                </h2>
                
                <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xl mb-2`}>
                  {getPersonalityType(calculateResults()).type}
                </div>
                
                <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
                  {getPersonalityType(calculateResults()).desc}
                </p>
              </div>

              {/* Trait Scores */}
              <div className="space-y-6 mb-8">
                {Object.entries(calculateResults()).map(([trait, score]) => {
                  const traitIcons = {
                    Openness: Lightbulb,
                    Conscientiousness: Target,
                    Extraversion: Users,
                    Agreeableness: Heart,
                    Neuroticism: Zap
                  };
                  const TraitIcon = traitIcons[trait];
                  
                  return (
                    <div key={trait} className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <TraitIcon className={`w-5 h-5 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                          <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {trait}
                          </span>
                        </div>
                        <span className={`text-lg font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                          {score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Career Recommendations */}
              <div className={`p-6 rounded-xl ${darkMode ? "bg-purple-900/20 border border-purple-800/30" : "bg-purple-50 border border-purple-200"} mb-8`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Recommended Careers
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getPersonalityType(calculateResults()).careers.map((career, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-lg font-medium ${darkMode ? "bg-purple-800/50 text-purple-200" : "bg-purple-200 text-purple-800"}`}
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={() => window.location.href = "/dashboard"}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Dashboard
                </motion.button>
                <motion.button
                  onClick={reset}
                  className={`px-8 py-4 rounded-xl font-semibold ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retake Test
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}