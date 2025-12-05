import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Sun, Moon, Plus, Edit, Trash2, Save, X,
  BookOpen, Target, Brain, CheckCircle, AlertCircle
} from "lucide-react";

export default function AdminContent() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [activeTab, setActiveTab] = useState("questions"); // questions, resources, roadmaps
  const [questions, setQuestions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Load demo questions
  useEffect(() => {
    const saved = localStorage.getItem("adminQuestions");
    if (saved) {
      setQuestions(JSON.parse(saved));
    } else {
      const demoQuestions = [
        {
          id: 1,
          category: "technical",
          question: "What is React?",
          options: ["A library", "A framework", "A language", "A database"],
          correctAnswer: 0,
          difficulty: "easy",
          points: 10
        },
        {
          id: 2,
          category: "aptitude",
          question: "If x + 5 = 12, what is x?",
          options: ["5", "7", "12", "17"],
          correctAnswer: 1,
          difficulty: "easy",
          points: 10
        },
        {
          id: 3,
          category: "soft-skills",
          question: "What is effective communication?",
          options: [
            "Speaking loudly",
            "Clear and concise message delivery",
            "Using complex words",
            "Interrupting others"
          ],
          correctAnswer: 1,
          difficulty: "medium",
          points: 15
        }
      ];
      setQuestions(demoQuestions);
      localStorage.setItem("adminQuestions", JSON.stringify(demoQuestions));
    }
  }, []);

  const [newQuestion, setNewQuestion] = useState({
    category: "technical",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    difficulty: "easy",
    points: 10
  });

  const saveQuestions = (updated) => {
    setQuestions(updated);
    localStorage.setItem("adminQuestions", JSON.stringify(updated));
  };

  const addQuestion = () => {
    if (!newQuestion.question || newQuestion.options.some(opt => !opt)) {
      alert("Please fill all fields!");
      return;
    }

    const question = {
      ...newQuestion,
      id: Date.now()
    };

    saveQuestions([...questions, question]);
    setShowAddModal(false);
    setNewQuestion({
      category: "technical",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      difficulty: "easy",
      points: 10
    });
  };

  const deleteQuestion = () => {
    const updated = questions.filter(q => q.id !== selectedItem.id);
    saveQuestions(updated);
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const editQuestion = () => {
    const updated = questions.map(q => q.id === selectedItem.id ? selectedItem : q);
    saveQuestions(updated);
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const stats = {
    totalQuestions: questions.length,
    technical: questions.filter(q => q.category === "technical").length,
    aptitude: questions.filter(q => q.category === "aptitude").length,
    softSkills: questions.filter(q => q.category === "soft-skills").length,
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-gray-950 text-gray-100" : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900"
    }`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${
        darkMode ? "bg-gray-900/80 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => window.location.href = "/dashboard"}
                className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Content Manager</h1>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Manage questions & resources
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setShowAddModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </motion.button>

              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? "bg-gray-800 text-yellow-400" : "bg-gray-100 text-gray-700"}`}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-500" />
              <div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total</div>
                <div className="text-2xl font-bold">{stats.totalQuestions}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-500" />
              <div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Technical</div>
                <div className="text-2xl font-bold">{stats.technical}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-green-500" />
              <div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Aptitude</div>
                <div className="text-2xl font-bold">{stats.aptitude}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-purple-500" />
              <div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Soft Skills</div>
                <div className="text-2xl font-bold">{stats.softSkills}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Questions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl overflow-hidden ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Question Bank</h2>
            
            {questions.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className={`w-12 h-12 mx-auto mb-3 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>No questions yet. Add your first question!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-4 rounded-xl border ${
                      darkMode 
                        ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    } transition`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            q.category === "technical" 
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : q.category === "aptitude"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                          }`}>
                            {q.category}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            q.difficulty === "easy"
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                              : q.difficulty === "medium"
                              ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                              : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                          }`}>
                            {q.difficulty}
                          </span>
                          <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {q.points} points
                          </span>
                        </div>
                        <div className="font-semibold mb-2">{q.question}</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {q.options.map((opt, i) => (
                            <div
                              key={i}
                              className={`px-3 py-2 rounded-lg ${
                                i === q.correctAnswer
                                  ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium"
                                  : darkMode ? "bg-gray-700" : "bg-white"
                              }`}
                            >
                              {String.fromCharCode(65 + i)}. {opt}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => {
                            setSelectedItem(q);
                            setShowEditModal(true);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            setSelectedItem(q);
                            setShowDeleteModal(true);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Add Question Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto ${
                darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Add New Question</h3>
                <button onClick={() => setShowAddModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Category
                    </label>
                    <select
                      value={newQuestion.category}
                      onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-indigo-500 outline-none`}
                    >
                      <option value="technical">Technical</option>
                      <option value="aptitude">Aptitude</option>
                      <option value="soft-skills">Soft Skills</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Difficulty
                    </label>
                    <select
                      value={newQuestion.difficulty}
                      onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-indigo-500 outline-none`}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Points
                    </label>
                    <input
                      type="number"
                      value={newQuestion.points}
                      onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-indigo-500 outline-none`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Question
                  </label>
                  <textarea
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    rows={3}
                    placeholder="Enter your question..."
                    className={`w-full px-4 py-3 rounded-xl border ${
                      darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-indigo-500 outline-none resize-none`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Options (Select correct answer)
                  </label>
                  {newQuestion.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-3 mb-3">
                      <input
                        type="radio"
                        name="correct"
                        checked={newQuestion.correctAnswer === i}
                        onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: i })}
                        className="w-5 h-5"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const options = [...newQuestion.options];
                          options[i] = e.target.value;
                          setNewQuestion({ ...newQuestion, options });
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        className={`flex-1 px-4 py-3 rounded-xl border ${
                          darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        } focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold ${
                    darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={addQuestion}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Question
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit & Delete Modals similar to Add Modal */}
      {/* (Implementation similar to Add Modal but with selectedItem state) */}
    </div>
  );
}