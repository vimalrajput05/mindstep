import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sun, Moon, Plus, X, Save, Code, Database, Palette, Brain, Briefcase, TrendingUp } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    id: "programming",
    name: "Programming Languages",
    icon: Code,
    skills: ["JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Go", "Rust", "Swift", "Kotlin"]
  },
  {
    id: "web",
    name: "Web Development",
    icon: TrendingUp,
    skills: ["React", "Angular", "Vue.js", "Node.js", "Express", "Django", "Flask", "HTML", "CSS", "Tailwind", "Bootstrap"]
  },
  {
    id: "data",
    name: "Data & Database",
    icon: Database,
    skills: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Data Analysis", "Excel", "Power BI", "Tableau"]
  },
  {
    id: "design",
    name: "Design & UI/UX",
    icon: Palette,
    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "UI Design", "UX Design", "Prototyping", "Wireframing"]
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    icon: Brain,
    skills: ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "Data Science"]
  },
  {
    id: "soft",
    name: "Soft Skills",
    icon: Briefcase,
    skills: ["Communication", "Leadership", "Team Work", "Problem Solving", "Time Management", "Critical Thinking"]
  }
];

export default function SkillManager() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [userSkills, setUserSkills] = useState(() => {
    const saved = localStorage.getItem("userSkills");
    return saved ? JSON.parse(saved) : [];
  });

  const [manualSkill, setManualSkill] = useState("");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState("programming");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleSkill = (skill) => {
    if (userSkills.includes(skill)) {
      setUserSkills(userSkills.filter(s => s !== skill));
    } else {
      setUserSkills([...userSkills, skill]);
    }
  };

  const addManualSkill = () => {
    const trimmed = manualSkill.trim();
    if (trimmed && !userSkills.includes(trimmed)) {
      setUserSkills([...userSkills, trimmed]);
      setManualSkill("");
    }
  };

  const removeSkill = (skill) => {
    setUserSkills(userSkills.filter(s => s !== skill));
  };

  const handleSave = () => {
    localStorage.setItem("userSkills", JSON.stringify(userSkills));
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const activeSkillCategory = SKILL_CATEGORIES.find(cat => cat.id === activeCategory);
  const Icon = activeSkillCategory?.icon;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-950" : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/80 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => window.location.href = "/dashboard"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className={`w-5 h-5 ${darkMode ? "text-white" : "text-black"}`} />
            {/* <span className="font-medium">Back to Dashboard</span> */}
          </motion.button>

          <div className="flex items-center gap-2">
            <Code className={`w-6 h-6 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
            <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              My Skills
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <AnimatePresence>
          {showSaveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-xl bg-green-500 text-white font-medium text-center shadow-lg"
            >
              ✓ Skills updated successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Current Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-1 p-6 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Your Skills
              </h2>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${darkMode ? "bg-indigo-900/30 text-indigo-300" : "bg-indigo-100 text-indigo-600"}`}>
                {userSkills.length}
              </div>
            </div>

            {userSkills.length === 0 ? (
              <div className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No skills added yet</p>
                <p className="text-xs mt-1">Select from categories or add manually</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {userSkills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      darkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {skill}
                    </span>
                    <motion.button
                      onClick={() => removeSkill(skill)}
                      className={`p-1 rounded-lg ${darkMode ? "hover:bg-gray-700 text-red-400" : "hover:bg-gray-200 text-red-600"} transition`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.button
              onClick={handleSave}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-5 h-5" />
              Save Skills
            </motion.button>
          </motion.div>

          {/* Right: Add Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-2 p-6 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"}`}
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Add Skills
            </h2>

            {/* Manual Add */}
            <div className={`p-4 rounded-2xl mb-6 ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-50 border border-gray-200"}`}>
              <h3 className={`text-sm font-semibold mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Add Custom Skill
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualSkill}
                  onChange={(e) => setManualSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addManualSkill()}
                  placeholder="Enter skill name (e.g., TypeScript)"
                  className={`flex-1 px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                />
                <motion.button
                  onClick={addManualSkill}
                  disabled={!manualSkill.trim()}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                    manualSkill.trim()
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  } transition`}
                  whileHover={manualSkill.trim() ? { scale: 1.05 } : {}}
                  whileTap={manualSkill.trim() ? { scale: 0.95 } : {}}
                >
                  <Plus className="w-5 h-5" />
                  Add
                </motion.button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {SKILL_CATEGORIES.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                        activeCategory === category.id
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : darkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-750"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CategoryIcon className="w-4 h-4" />
                      <span className="text-sm">{category.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Skills Grid */}
            <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-50 border border-gray-200"}`}>
              <div className="flex items-center gap-2 mb-4">
                <Icon className={`w-5 h-5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {activeSkillCategory?.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {activeSkillCategory?.skills.map((skill, idx) => {
                  const isSelected = userSkills.includes(skill);
                  return (
                    <motion.button
                      key={idx}
                      onClick={() => toggleSkill(skill)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`p-3 rounded-lg font-medium text-sm border transition ${
                        isSelected
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-lg"
                          : darkMode
                          ? "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{skill}</span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center"
                          >
                            ✓
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className={`mt-6 p-4 rounded-2xl ${darkMode ? "bg-indigo-900/20 border border-indigo-800/30" : "bg-indigo-50 border border-indigo-200"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm ${darkMode ? "text-indigo-300" : "text-indigo-700"}`}>
                    Total Skills Selected
                  </div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userSkills.length}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${darkMode ? "text-indigo-300" : "text-indigo-700"}`}>
                    Tip
                  </div>
                  <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Add 5-10 skills for best results
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}