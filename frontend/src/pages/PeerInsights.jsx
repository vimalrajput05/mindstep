import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Moon,
  Sun,
  Users,
  Award,
  TrendingUp,
  BarChart3,
  Star,
  Brain,
  ChartLine,
  Zap,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export default function PeerInsights() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Apply dark mode to document and persist in localStorage
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  const [showComparison, setShowComparison] = useState(false);

  const yourPerformance = [
    { skill: "Technical", score: 78, learned: true },
    { skill: "Aptitude", score: 72, learned: true },
    { skill: "Soft Skills", score: 69, learned: false },
  ];

  const peersPerformance = [
    { skill: "Technical", score: 65, learned: true },
    { skill: "Aptitude", score: 60, learned: false },
    { skill: "Soft Skills", score: 70, learned: true },
  ];

  const combinedData = yourPerformance.map((item, index) => ({
    skill: item.skill,
    you: item.score,
    peers: peersPerformance[index].score,
    gap: item.score - peersPerformance[index].score,
    learned: item.learned,
    needed: !item.learned,
  }));

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"
      }`}
    >
      {/* Top Bar */}
      <motion.header
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className={`sticky top-0 z-50 backdrop-blur-md ${
          darkMode
            ? "bg-gray-900/70 border-b border-gray-800"
            : "bg-white/80 border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
              darkMode
                ? "bg-gray-900 border-gray-700 hover:bg-gray-800"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </Link>

          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="text-purple-500 w-6 h-6" /> Peer Insights
          </h1>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-xl shadow-lg transition ${
              darkMode ? "bg-gray-900" : "bg-white"
            } hover:scale-105`}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="text-yellow-400 w-5 h-5" />
            ) : (
              <Moon className="text-gray-700 w-5 h-5" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-8"
        >
          {/* Performance Overview */}
          <motion.section
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl shadow-lg border transition ${
                darkMode
                  ? "bg-gray-900/60 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="text-blue-500 w-5 h-5" /> Your Performance
              </h3>
              <ul className="space-y-2">
                {yourPerformance.map((item) => (
                  <li key={item.skill} className="flex justify-between">
                    <span>{item.skill}</span>
                    <span className="font-semibold">{item.score}%</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl shadow-lg border transition ${
                darkMode
                  ? "bg-gray-900/60 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="text-green-500 w-5 h-5" /> Average Peer Performance
              </h3>
              <ul className="space-y-2">
                {peersPerformance.map((item) => (
                  <li key={item.skill} className="flex justify-between">
                    <span>{item.skill}</span>
                    <span className="font-semibold">{item.score}%</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.section>

          {/* Compare Button */}
          <motion.section variants={fadeIn} className="text-center">
            <motion.button
              onClick={() => setShowComparison(!showComparison)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
            >
              <Zap className="w-5 h-5 inline mr-2" />
              {showComparison ? "Hide Comparison" : "Compare Performances"}
            </motion.button>
          </motion.section>

          {/* Comparison Graph */}
          <AnimatePresence>
            {showComparison && (
              <motion.section
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={slideUp}
                className={`p-6 rounded-2xl shadow-lg border transition ${
                  darkMode
                    ? "bg-gray-900/60 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <BarChart3 className="text-orange-500 w-5 h-5" /> Performance Comparison & Insights
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Blue bars: Your scores. Gray bars: Peers' scores. Green highlights: What you've learned well. Red highlights: Areas needing improvement (based on peer strengths).
                </p>

                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={combinedData}>
                    <XAxis
                      dataKey="skill"
                      tick={{ fill: darkMode ? "#d1d5db" : "#6b7280" }}
                    />
                    <YAxis
                      tick={{ fill: darkMode ? "#d1d5db" : "#6b7280" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                        border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                      formatter={(value, name) => [
                        `${value}%`,
                        name === "you" ? "You" : "Peers",
                      ]}
                    />
                    <Bar dataKey="you" fill="#3b82f6" />
                    <Bar dataKey="peers" fill="#e5e7eb" />
                  </BarChart>
                </ResponsiveContainer>

                {/* Insights List */}
                <div className="mt-6 space-y-3">
                  <h3 className="font-bold text-lg">Key Insights from Comparison:</h3>
                  {combinedData.map((item) => (
                    <motion.div
                      key={item.skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className={`p-3 rounded-lg ${
                        item.gap > 0
                          ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                          : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.gap > 0 ? (
                          <Star className="text-green-500 w-5 h-5" />
                        ) : (
                          <TrendingUp className="text-red-500 w-5 h-5" />
                        )}
                        <strong>{item.skill}:</strong>
                        {item.gap > 0
                          ? `You're ahead by ${item.gap}%. Keep learning from peers in this area!`
                          : `Peers are stronger by ${Math.abs(item.gap)}%. Focus on improving here to match their performance.`}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Recommendations */}
          <motion.section
            variants={fadeIn}
            className={`p-6 rounded-2xl shadow-lg border transition ${
              darkMode
                ? "bg-gray-900/60 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Brain className="text-purple-500 w-5 h-5" /> Actionable Tips from Peer Insights
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Based on what top-performing peers are doing, here's how to improve your skills and close gaps.
            </p>

            <ul className="space-y-4">
              <motion.li
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40"
              >
                <Star className="text-yellow-400 w-5 h-5 mt-0.5" />
                <div>
                  <strong>Learn from Peers:</strong> Study how top students in Soft Skills excel (e.g., practice communication daily). Aim to match their 70% average.
                </div>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40"
              >
                <Star className="text-yellow-400 w-5 h-5 mt-0.5" />
                <div>
                  <strong>Build Strengths:</strong> Since you're strong in Technical and Aptitude, create projects to showcase and attract recruiters like TCS.
                </div>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40"
              >
                <Star className="text-yellow-400 w-5 h-5 mt-0.5" />
                <div>
                  <strong>Target Weaknesses:</strong> Focus on Soft Skills by joining peer study groups or mock interviews to bridge the gap.
                </div>
              </motion.li>
            </ul>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}