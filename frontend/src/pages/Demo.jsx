import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowLeft, CheckCircle, Sparkles, Target, Brain, Code, Database } from "lucide-react";

const SKILLS = ["JavaScript", "Python", "React", "Node.js", "SQL", "HTML/CSS", "Java", "C++", "Design", "Data Science"];

const INTERESTS = [
  { id: "dev", label: "Web Development", icon: Code },
  { id: "data", label: "Data Science", icon: Database },
  { id: "design", label: "UI/UX Design", icon: Target },
  { id: "ai", label: "AI/ML", icon: Brain },
];

const QUESTIONS = [
  {
    id: 1,
    question: "What type of projects do you enjoy working on?",
    options: [
      "Building websites and web apps",
      "Analyzing data and creating insights",
      "Designing user interfaces",
      "Working with AI and machine learning"
    ]
  },
  {
    id: 2,
    question: "Which best describes your problem-solving approach?",
    options: [
      "Breaking down complex problems into smaller parts",
      "Using data to find patterns and solutions",
      "Creating visual solutions that users love",
      "Experimenting with new technologies"
    ]
  },
  {
    id: 3,
    question: "What motivates you the most?",
    options: [
      "Building something people can use",
      "Discovering insights from data",
      "Creating beautiful experiences",
      "Solving challenging technical problems"
    ]
  }
];

export default function Demo() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [step, setStep] = useState("intro"); // intro, skills, interests, quiz, result
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleInterest = (id) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const calculateResult = () => {
    const score = Object.keys(answers).length;
    const skillScore = selectedSkills.length;
    const interestScore = selectedInterests.length;
    
    const totalScore = ((score / QUESTIONS.length) + (skillScore / 5) + (interestScore / 2)) / 3 * 100;
    
    if (totalScore >= 70) return { level: "Excellent Match!", color: "from-green-500 to-emerald-500", career: "Full Stack Developer" };
    if (totalScore >= 50) return { level: "Good Match!", color: "from-blue-500 to-cyan-500", career: "Frontend Developer" };
    return { level: "Keep Learning!", color: "from-yellow-500 to-orange-500", career: "Junior Developer" };
  };

  const goToResult = () => {
    setStep("result");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const reset = () => {
    setStep("intro");
    setSelectedSkills([]);
    setSelectedInterests([]);
    setAnswers({});
    setShowConfetti(false);
  };

  const currentQuestion = QUESTIONS.find(q => !answers[q.id]);
  const allQuestionsAnswered = Object.keys(answers).length === QUESTIONS.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-950" : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/80 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => window.location.href = "/"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className={`w-5 h-5  ${darkMode ? "text-white" : "text-black"}`} />
            {/* <span className="font-medium">Back to Home</span> */}
          </motion.button>

          <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Career Match Demo
          </h1>

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
          {/* Intro Screen */}
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-8 md:p-12 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"} text-center`}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Sparkles className={`w-16 h-16 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
              </motion.div>
              
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Welcome to Career Match Demo!
              </h2>
              
              <p className={`text-lg mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
                Discover your perfect career path in 3 simple steps. Select your skills, choose your interests, and answer a few questions to get personalized recommendations.
              </p>

              <motion.button
                onClick={() => setStep("skills")}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey 🚀
              </motion.button>
            </motion.div>
          )}

          {/* Skills Selection */}
          {step === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-8 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"}`}
            >
              <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Select Your Skills
              </h2>
              <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Choose at least 2 skills you're comfortable with
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {SKILLS.map((skill) => (
                  <motion.button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`p-4 rounded-xl font-medium transition ${
                      selectedSkills.includes(skill)
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : darkMode
                        ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-750"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && (
                      <CheckCircle className="w-4 h-4 inline ml-2" />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setStep("intro")}
                  className={`px-6 py-3 rounded-xl ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("interests")}
                  disabled={selectedSkills.length < 2}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    selectedSkills.length >= 2
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  Next ({selectedSkills.length}/2)
                </button>
              </div>
            </motion.div>
          )}

          {/* Interests Selection */}
          {step === "interests" && (
            <motion.div
              key="interests"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-8 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"}`}
            >
              <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Choose Your Interests
              </h2>
              <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Select at least 1 area that excites you
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {INTERESTS.map((interest) => {
                  const Icon = interest.icon;
                  return (
                    <motion.button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-6 rounded-xl text-left transition ${
                        selectedInterests.includes(interest.id)
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                          : darkMode
                          ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-750"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-8 h-8 mb-3" />
                      <div className="font-semibold text-lg">{interest.label}</div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setStep("skills")}
                  className={`px-6 py-3 rounded-xl ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("quiz")}
                  disabled={selectedInterests.length < 1}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    selectedInterests.length >= 1
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  Next ({selectedInterests.length}/1)
                </button>
              </div>
            </motion.div>
          )}

          {/* Quiz */}
          {step === "quiz" && currentQuestion && (
            <motion.div
              key={`quiz-${currentQuestion.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-8 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"}`}
            >
              <div className="mb-6">
                <div className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Question {Object.keys(answers).length + 1} of {QUESTIONS.length}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(Object.keys(answers).length / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className={`text-xl md:text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {currentQuestion.question}
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      handleAnswer(currentQuestion.id, idx);
                      if (Object.keys(answers).length + 1 === QUESTIONS.length) {
                        setTimeout(() => goToResult(), 300);
                      }
                    }}
                    className={`w-full p-4 rounded-xl text-left font-medium transition ${
                      darkMode
                        ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-750"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-8 md:p-12 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"} text-center relative overflow-hidden`}
            >
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      initial={{ 
                        x: Math.random() * window.innerWidth, 
                        y: -20,
                        opacity: 1 
                      }}
                      animate={{ 
                        y: window.innerHeight + 20,
                        opacity: 0,
                        rotate: 360
                      }}
                      transition={{ 
                        duration: 2 + Math.random() * 2,
                        delay: Math.random() * 0.5 
                      }}
                    />
                  ))}
                </div>
              )}

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: 2 }}
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${calculateResult().color} flex items-center justify-center`}>
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Congratulations! 🎉
              </h2>

              <div className={`text-2xl font-bold mb-2 bg-gradient-to-r ${calculateResult().color} bg-clip-text text-transparent`}>
                {calculateResult().level}
              </div>

              <p className={`text-lg mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Based on your skills and interests, we recommend: <br />
                <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xl">
                  {calculateResult().career}
                </span>
              </p>

              <div className={`p-6 rounded-xl mb-8 ${darkMode ? "bg-gray-800" : "bg-gray-100"} text-left`}>
                <h3 className={`font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>Your Profile:</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Skills:</span>{" "}
                    <span className="font-medium text-green-600">{selectedSkills.join(", ")}</span>
                  </div>
                  <div>
                    <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Interests:</span>{" "}
                    <span className="font-medium text-green-600">
                      {selectedInterests.map(id => INTERESTS.find(i => i.id === id)?.label).join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Questions Answered:</span>{" "}
                    <span className="font-medium text-green-600">{Object.keys(answers).length}/{QUESTIONS.length}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={() => window.location.href = "/"}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Go to Home
                </motion.button>
                <motion.button
                  onClick={reset}
                  className={`px-8 py-4 rounded-xl font-semibold ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}