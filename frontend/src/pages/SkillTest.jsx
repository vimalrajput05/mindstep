import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Target, Code, MessageCircle, Brain, CheckCircle,
  XCircle, Clock, Award, TrendingUp, AlertCircle, Sun, Moon, Sparkles
} from "lucide-react";

export default function SkillTest() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [currentCategory, setCurrentCategory] = useState(null); // null | 'technical' | 'soft' | 'aptitude'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Timer
  useEffect(() => {
    if (currentCategory && !showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentCategory, showResults, timeLeft]);

  const categories = [
    {
      id: 'technical',
      name: 'Technical Skills',
      icon: Code,
      desc: 'Programming, Tools & Technologies',
      gradient: 'from-indigo-500 to-purple-500',
      questions: [
        {
          q: "Which programming language is known for web development?",
          options: ["Python", "JavaScript", "C++", "Swift"],
          correct: 1
        },
        {
          q: "What does HTML stand for?",
          options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
          correct: 0
        },
        {
          q: "Which Git command creates a new branch?",
          options: ["git new branch", "git create branch", "git branch <name>", "git add branch"],
          correct: 2
        },
        {
          q: "What is the purpose of CSS?",
          options: ["Database management", "Styling web pages", "Server-side logic", "Testing code"],
          correct: 1
        },
        {
          q: "Which of these is a JavaScript framework?",
          options: ["Django", "Laravel", "React", "Flask"],
          correct: 2
        }
      ]
    },
    {
      id: 'soft',
      name: 'Soft Skills',
      icon: MessageCircle,
      desc: 'Communication & Leadership',
      gradient: 'from-pink-500 to-rose-500',
      questions: [
        {
          q: "A team member disagrees with your approach. What do you do?",
          options: [
            "Ignore their opinion and continue",
            "Listen actively and find common ground",
            "Argue until they agree",
            "Escalate to management immediately"
          ],
          correct: 1
        },
        {
          q: "You're leading a project and a deadline is missed. How do you respond?",
          options: [
            "Blame the team member responsible",
            "Analyze what went wrong and adjust the plan",
            "Panic and overwork everyone",
            "Hide the issue from stakeholders"
          ],
          correct: 1
        },
        {
          q: "During a presentation, you forget key points. What should you do?",
          options: [
            "Freeze and give up",
            "Make up false information",
            "Stay calm, acknowledge it, and move forward",
            "Blame the presentation software"
          ],
          correct: 2
        },
        {
          q: "A colleague takes credit for your work. Your response?",
          options: [
            "Confront them publicly",
            "Discuss privately and clarify facts with manager",
            "Do nothing and let it go",
            "Spread negative rumors about them"
          ],
          correct: 1
        },
        {
          q: "You receive constructive criticism. How do you handle it?",
          options: [
            "Get defensive and argue",
            "Accept gracefully and work on improvement",
            "Ignore it completely",
            "Take it personally and sulk"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 'aptitude',
      name: 'Aptitude',
      icon: Brain,
      desc: 'Logical Reasoning & Problem Solving',
      gradient: 'from-emerald-500 to-teal-500',
      questions: [
        {
          q: "If 5 + 3 = 28, 9 + 1 = 810, 8 + 6 = 214, then 5 + 4 = ?",
          options: ["19", "91", "20", "45"],
          correct: 0
        },
        {
          q: "Find the next number in sequence: 2, 6, 12, 20, 30, ?",
          options: ["40", "42", "38", "44"],
          correct: 1
        },
        {
          q: "If CAT is coded as 3120, what is DOG?",
          options: ["4157", "41517", "4147", "41516"],
          correct: 0
        },
        {
          q: "A clock shows 3:15. What is the angle between hour and minute hands?",
          options: ["0°", "7.5°", "15°", "22.5°"],
          correct: 1
        },
        {
          q: "Complete the series: J, F, M, A, M, ?",
          options: ["J", "A", "S", "N"],
          correct: 0
        }
      ]
    }
  ];

  const selectedCategory = categories.find(c => c.id === currentCategory);
  const totalQuestions = selectedCategory?.questions.length || 0;
  const currentQ = selectedCategory?.questions[currentQuestion];

  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateResults = () => {
    if (!selectedCategory) return { score: 0, percentage: 0, correct: 0, wrong: 0 };
    
    let correct = 0;
    selectedCategory.questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    
    const wrong = Object.keys(answers).length - correct;
    const percentage = Math.round((correct / totalQuestions) * 100);
    
    return { score: correct, percentage, correct, wrong, total: totalQuestions };
  };

  const results = calculateResults();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900'}`}>
      
      {/* Header */}
      <motion.header 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 backdrop-blur-xl ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'} border-b shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => window.location.href = '/dashboard'}
                className={`p-2 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div>
                <h1 className="text-xl font-bold">Skill Tests</h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentCategory ? selectedCategory?.name : 'Choose a category'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {currentCategory && !showResults && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
              )}
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100'} transition`}
                whileHover={{ scale: 1.1, rotate: 180 }}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Category Selection */}
        {!currentCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Choose Your Test Category
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Select a category to start your skill assessment
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => {
                    setCurrentCategory(cat.id);
                    setCurrentQuestion(0);
                    setAnswers({});
                    setShowResults(false);
                    setTimeLeft(600);
                  }}
                  className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border shadow-xl cursor-pointer`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4`}>
                    <cat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {cat.name}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {cat.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{cat.questions.length} Questions</span>
                    <span className="text-xs text-gray-500">10 mins</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Question View */}
        {currentCategory && !showResults && currentQ && (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            {/* Progress */}
            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Question {currentQuestion + 1} of {totalQuestions}</span>
                <span className="text-sm text-gray-500">{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% Complete</span>
              </div>
              <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                  className={`h-2 rounded-full bg-gradient-to-r ${selectedCategory.gradient}`}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border shadow-xl`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-xs font-semibold mb-6`}>
                <selectedCategory.icon className="w-4 h-4" />
                {selectedCategory.name}
              </div>

              <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentQ.q}
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((option, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl text-left transition ${
                      answers[currentQuestion] === i
                        ? `bg-gradient-to-r ${selectedCategory.gradient} text-white shadow-lg`
                        : darkMode
                        ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        answers[currentQuestion] === i ? 'bg-white/20' : darkMode ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <motion.button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-xl font-semibold ${
                  currentQuestion === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : darkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white hover:bg-gray-50 border'
                }`}
                whileHover={currentQuestion > 0 ? { scale: 1.05 } : {}}
              >
                Previous
              </motion.button>

              <div className="flex-1 flex justify-center gap-2">
                {Array.from({ length: totalQuestions }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentQuestion
                        ? `bg-gradient-to-r ${selectedCategory.gradient}`
                        : answers[i] !== undefined
                        ? darkMode ? 'bg-gray-600' : 'bg-gray-400'
                        : darkMode ? 'bg-gray-800' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
                className={`px-6 py-3 rounded-xl font-semibold ${
                  answers[currentQuestion] === undefined
                    ? 'opacity-50 cursor-not-allowed bg-gray-400'
                    : `bg-gradient-to-r ${selectedCategory.gradient} text-white shadow-lg`
                }`}
                whileHover={answers[currentQuestion] !== undefined ? { scale: 1.05 } : {}}
              >
                {currentQuestion === totalQuestions - 1 ? 'Submit' : 'Next'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${selectedCategory.gradient} flex items-center justify-center`}
              >
                {results.percentage >= 70 ? (
                  <CheckCircle className="w-12 h-12 text-white" />
                ) : results.percentage >= 50 ? (
                  <AlertCircle className="w-12 h-12 text-white" />
                ) : (
                  <XCircle className="w-12 h-12 text-white" />
                )}
              </motion.div>
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Test Complete!
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {selectedCategory?.name}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800/60' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="text-sm text-gray-500 mb-1">Score</div>
                <div className="text-3xl font-bold">{results.score}/{results.total}</div>
              </div>
              <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800/60' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="text-sm text-gray-500 mb-1">Percentage</div>
                <div className="text-3xl font-bold text-indigo-500">{results.percentage}%</div>
              </div>
              <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800/60' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div className={`text-xl font-bold ${
                  results.percentage >= 70 ? 'text-green-500' : results.percentage >= 50 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {results.percentage >= 70 ? 'Excellent!' : results.percentage >= 50 ? 'Good' : 'Needs Improvement'}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                onClick={() => {
                  setCurrentCategory(null);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className={`flex-1 py-3 rounded-xl font-semibold ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border'}`}
                whileHover={{ scale: 1.02 }}
              >
                Try Another Test
              </motion.button>
              <motion.button
                onClick={() => window.location.href = '/dashboard'}
                className={`flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r ${selectedCategory.gradient} text-white shadow-lg`}
                whileHover={{ scale: 1.02 }}
              >
                Back to Dashboard
              </motion.button>
            </div>
          </motion.div>
        )}

      </main>
    </div>
  );
}