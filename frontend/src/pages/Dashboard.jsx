// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Crown,
  Lock,
  LogOut,
  Target,
  CheckCircle,
  Star,
  Gift,
  ShieldCheck,
  BookOpen,
  Users,
  Briefcase,
  TrendingUp,
  Sun,
  Moon,
  Activity,
  DownloadCloud,
  X,
  User,
  Bot,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Load profile data
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved
      ? JSON.parse(saved)
      : {
          name: user?.name || "",
          gender: "",
          avatar: "boy1",
        };
  });

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  // Reload profile data when returning to dashboard
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("userProfile");
      if (saved) {
        setProfileData(JSON.parse(saved));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const displayUser = user ?? {
    name: "Guest",
    email: "",
    plan: "free",
    role: "user",
  };
  const isAdmin = displayUser.role === "admin" || displayUser.plan === "admin";
  const isPremium = displayUser.plan === "premium" || isAdmin;

  // Avatar emoji map
  const avatarEmojis = {
    boy1: "👦",
    boy2: "🧑",
    boy3: "👨",
    boy4: "👨‍🎓",
    girl1: "👧",
    girl2: "👩",
    girl3: "🧕",
    girl4: "👩‍🎓",
  };

  const stats = {
    progressPercent: 45,
    testsTaken: 2,
    testsTotal: 3,
    skillsVerified: 4,
    skillsTotal: 10,
    aiSuggestion: "Data Analytics",
  };

  const psych = {
    openness: 72,
    conscientiousness: 63,
    extraversion: 38,
    agreeableness: 55,
    neuroticism: 28,
    label: "Analytical Thinker",
  };

  const marksheet = {
    subjects: [
      { name: "Mathematics", marks: 92 },
      { name: "Physics", marks: 88 },
      { name: "Chemistry", marks: 80 },
      { name: "English", marks: 76 },
    ],
    topSubjects: ["Mathematics", "Physics"],
    recommendedFields: ["Engineering", "Data Science", "Research"],
  };

  const learningTracker = [
    { week: "W1", hours: 4 },
    { week: "W2", hours: 6 },
    { week: "W3", hours: 8 },
    { week: "W4", hours: 10 },
  ];

  const roadmap = [
    {
      id: 1,
      title: "Basics — Python, SQL",
      eta: "1-2 months",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Entry — Data Analyst",
      eta: "3-6 months",
      difficulty: "Medium",
    },
    {
      id: 3,
      title: "Mid — Machine Learning",
      eta: "1-2 years",
      difficulty: "Hard",
    },
    {
      id: 4,
      title: "Senior — Lead / Research",
      eta: "3-5 years",
      difficulty: "Very Hard",
    },
  ];

  const jobs = [
    { title: "Data Analyst - TCS", location: "Bengaluru", salary: "3-6 LPA" },
    { title: "Intern - Data Science", location: "Remote", salary: "Stipend" },
    {
      title: "Junior ML Engineer - Startup",
      location: "Hyderabad",
      salary: "6-10 LPA",
    },
  ];

  const ProgressBar = ({ value = 0, h = 8 }) => (
    <div
      className={`w-full bg-gray-200 dark:bg-gray-800 rounded-full h-${h} overflow-hidden`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
      />
    </div>
  );

  const StatCard = ({
    label,
    value,
    hint,
    icon: Icon,
    colorClass = "from-indigo-500 to-purple-500",
  }) => (
    <motion.div
      whileHover={{ y: -6 }}
      className={`p-4 rounded-2xl bg-white dark:bg-gray-800/60 border dark:border-gray-700 shadow-sm`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-300">
            {label}
          </div>
          <div className="text-xl font-bold mt-1">{value}</div>
          {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
        </div>
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  const upgradeToPremium = async () => {
    if (!user) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900));
    const upgraded = { ...user, plan: "premium", upgradedAt: Date.now() };
    localStorage.setItem("user", JSON.stringify(upgraded));
    setUser(upgraded);
    setBusy(false);
    setShowUpgradeModal(false);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"
      }`}
    >
      {/* NAV */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md ${
          darkMode
            ? "bg-gray-900/70 border-b border-gray-800"
            : "bg-white/80 border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">MindStep</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                AI Career Guidance
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Profile Icon with Avatar */}
            <Link to="/profile">
              <motion.div
                className={`relative cursor-pointer ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                } rounded-full p-1 transition group`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                    profileData.gender === "male"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                      : profileData.gender === "female"
                      ? "bg-gradient-to-br from-pink-500 to-rose-500"
                      : "bg-gradient-to-br from-gray-500 to-gray-600"
                  } shadow-lg`}
                >
                  {avatarEmojis[profileData.avatar] || "👤"}
                </div>
                {/* Hover tooltip */}
                <div
                  className={`absolute top-full right-0 mt-2 px-3 py-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}
                >
                  <div className="text-sm font-medium">
                    {profileData.name || "Guest"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Click to edit profile
                  </div>
                </div>
              </motion.div>
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <div
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                isPremium
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
              }`}
            >
              {isAdmin ? "Admin" : isPremium ? "Premium" : "Free"}
            </div>

            <button
              onClick={logout}
              className="ml-2 px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold flex items-center gap-2 hover:scale-105 transition"
            >
              <LogOut className="w-4 h-4" />{" "}
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="space-y-8"
        >
          {/* HERO / WELCOME */}
          <motion.section
            variants={fadeIn}
            className={`p-6 rounded-2xl ${
              darkMode
                ? "bg-gray-900/60 border-gray-800"
                : "bg-white border-gray-200"
            } border shadow-lg`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Welcome back,{" "}
                  <span className="text-indigo-500">
                    {profileData.name || displayUser.name || "Learner"}
                  </span>{" "}
                  👋
                </h1>
                <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                  Track progress, run tests, and follow a personalized career
                  roadmap.
                </p>
                <div className="mt-4 max-w-xl">
                  <ProgressBar value={stats.progressPercent} h={3} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert("Take next test (demo)")}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  <Target className="w-4 h-4 inline mr-2" /> Take Next Test
                </button>

                {!isPremium && (
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold shadow-lg hover:scale-105 transition"
                  >
                    <Crown className="w-4 h-4 inline mr-2" /> Upgrade
                  </button>
                )}
              </div>
            </div>
          </motion.section>

          {/* TOP STATS */}
          <motion.section
            variants={fadeIn}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard
              label="Progress"
              value={`${stats.progressPercent}%`}
              hint="Overall completion"
              icon={TrendingUp}
              colorClass="from-indigo-500 to-purple-500"
            />
            <StatCard
              label="Tests Taken"
              value={`${stats.testsTaken}/${stats.testsTotal}`}
              hint="Skill tests"
              icon={CheckCircle}
              colorClass="from-green-500 to-emerald-500"
            />
            <StatCard
              label="Skills Verified"
              value={`${stats.skillsVerified}/${stats.skillsTotal}`}
              hint="Verified skills"
              icon={Star}
              colorClass="from-blue-500 to-cyan-500"
            />
            <StatCard
              label="AI Suggestion"
              value={stats.aiSuggestion}
              hint="Top recommendation"
              icon={Sparkles}
              colorClass="from-purple-500 to-pink-500"
            />
          </motion.section>

          {/* THREE-COLUMN: Tests / Psych / Marksheet */}
          <motion.section
            variants={fadeIn}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Skill Tests */}
            <motion.article
              variants={fadeIn}
              whileHover={{ y: -6 }}
              className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-gray-900/60 border-gray-800"
                  : "bg-white border-gray-200"
              } border shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Skill Tests
                    </div>
                    <div className="text-lg font-bold">
                      3 Categories • Verification
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Auto scoring</div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold">A. Technical</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    Programming, Tools (MCQ verify)
                  </div>
                </div>
                <div>
                  <div className="font-semibold">B. Soft Skills</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    Communication & scenarios
                  </div>
                </div>
                <div>
                  <div className="font-semibold">C. Aptitude</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    Reasoning & quantitative
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigate("/skilltest")}
                  className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                >
                  Start Test
                </button>
                <Link to="/skills">
                  <button
                    onClick={() => navigate("/skills")}
                    className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    View
                  </button>
                </Link>
              </div>
            </motion.article>

            {/* Psychometric */}
            <motion.article
              variants={fadeIn}
              whileHover={{ y: -6 }}
              className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-gray-900/60 border-gray-800"
                  : "bg-white border-gray-200"
              } border shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Psychometric
                    </div>
                    <div className="text-lg font-bold">{psych.label}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">20 Q • Quick</div>
              </div>

              <div className="space-y-2">
                {[
                  ["Openness", psych.openness],
                  ["Conscientiousness", psych.conscientiousness],
                  ["Extraversion", psych.extraversion],
                  ["Agreeableness", psych.agreeableness],
                  ["Neuroticism", psych.neuroticism],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-sm">
                      <div className="font-medium">{k}</div>
                      <div className="text-xs text-gray-500">{v}%</div>
                    </div>
                    <div className="mt-1">
                      <ProgressBar value={v} h={2} />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/psychometric")}
                className="w-full mt-5 py-2 rounded-lg  font-semibold hover:bg-indigo-700 
              bg-indigo-600
              text-white transition"
              >
                Start Test
              </button>
            </motion.article>

            {/* Marksheet OCR */}

            <motion.article
              variants={fadeIn}
              whileHover={{ y: -6 }}
              className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-gray-900/60 border-gray-800"
                  : "bg-white border-gray-200"
              } border shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Marksheet OCR
                    </div>
                    <div className="text-lg font-bold">Academic Strength</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Scan & Analyze</div>
              </div>

              <div className="space-y-2 text-sm">
                {marksheet.subjects.map((s) => (
                  <div key={s.name} className="flex justify-between">
                    <div>{s.name}</div>
                    <div className="font-semibold text-indigo-600">
                      {s.marks}%
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs bg-gray-50 dark:bg-gray-900/40 p-3 rounded-lg">
                <div>
                  Top subjects:{" "}
                  <strong>{marksheet.topSubjects.join(", ")}</strong>
                </div>
                <div className="mt-1">
                  Recommended fields: {marksheet.recommendedFields.join(", ")}
                </div>
              </div>

              {/* ADD THIS BUTTON */}
              <Link to="/marksheet">
                <motion.button
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Scan Marksheet
                </motion.button>
              </Link>
            </motion.article>
          </motion.section>

          {/* PREMIUM: Roadmap & Learning */}
<motion.section
  variants={fadeIn}
  className="grid lg:grid-cols-2 gap-6"
>
  <motion.div
    className={`p-6 rounded-2xl ${
      darkMode
        ? "bg-gray-900/60 border-gray-800"
        : "bg-white border-gray-200"
    } border shadow-lg relative`}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold">Interactive Career Roadmap</h3>
      <div
        className={`px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-gray-900`}
      >
        PREMIUM
      </div>
    </div>

    <div
      className={`p-4 rounded-xl ${
        darkMode ? "bg-gray-900/50" : "bg-gray-50"
      } mb-4`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-semibold">
            Plan Your Career Path
          </div>
          <div
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore interactive milestones, track progress, and get personalized career guidance tailored to your goals.
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-2 text-sm mb-4">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>Step-by-step career planning with milestones</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>Progress tracking and difficulty assessments</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>Personalized recommendations for skill development</span>
      </div>
    </div>

    {isPremium ? (
      <Link to="/career-roadmap">
        <motion.button
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Target className="w-5 h-5" />
          Open Career Roadmap
        </motion.button>
      </Link>
    ) : (
      <motion.button
        onClick={() => setShowUpgradeModal(true)}
        className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Crown className="w-4 h-4 inline mr-2" />
        Upgrade to Unlock
      </motion.button>
    )}
  </motion.div>

  <motion.div
    className={`p-6 rounded-2xl ${
      darkMode
        ? "bg-gray-900/60 border-gray-800"
        : "bg-white border-gray-200"
    } border shadow-lg relative`}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold">AI Career Mentor</h3>
      <div
        className={`px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-gray-900`}
      >
        PREMIUM
      </div>
    </div>

    <div
      className={`p-4 rounded-xl ${
        darkMode ? "bg-gray-900/50" : "bg-gray-50"
      } mb-4`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-semibold">
            AI Mentor: "Ask me anything!"
          </div>
          <div
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Get instant career guidance, learning resources, and
            personalized advice 24/7.
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-2 text-sm mb-4">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>Career guidance & roadmap planning</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>Learning resources & course recommendations</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>Interview preparation tips</span>
      </div>
    </div>

    {isPremium ? (
      <Link to="/ai-mentor">
        <motion.button
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Bot className="w-5 h-5" />
          Open AI Mentor
        </motion.button>
      </Link>
    ) : (
      <motion.button
        onClick={() => setShowUpgradeModal(true)}
        className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Crown className="w-4 h-4 inline mr-2" />
        Upgrade to Unlock
      </motion.button>
    )}
  </motion.div>
</motion.section>

          {/* LEARNING TRACKER & PEER COMPARISON */}
          <motion.section
            variants={fadeIn}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Learning Tracker Card */}
            <motion.div
              className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-gray-900/60 border-gray-800"
                  : "bg-white border-gray-200"
              } border shadow-lg md:col-span-2`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Learning Tracker</h3>
                <div className="text-xs text-gray-500">Track your progress</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-900/50" : "bg-gray-50"
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">This Week</div>
                  <div className="text-2xl font-bold">12.5h</div>
                  <div className="text-xs text-gray-500">
                    +3.5h from last week
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-900/50" : "bg-gray-50"
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">
                    Total Activities
                  </div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs text-gray-500">Across 4 weeks</div>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="flex items-end gap-2 h-24 mb-4">
                {learningTracker.map((w, i) => {
                  const max = 12;
                  const heightPct = (w.hours / max) * 100;
                  return (
                    <div
                      key={w.week}
                      className="flex-1 flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className="w-full rounded-t-xl bg-gradient-to-t from-indigo-500 to-purple-500"
                      />
                      <div className="text-xs mt-1">{w.week}</div>
                      <div className="text-xs text-gray-500">{w.hours}h</div>
                    </div>
                  );
                })}
              </div>

              <Link to="/learning-tracker">
                <motion.button
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrendingUp className="w-4 h-4" />
                  View Full Tracker
                </motion.button>
              </Link>
            </motion.div>

             {/* Peer Insights */}
<motion.div
  className={`p-6 rounded-2xl ${
    darkMode
      ? "bg-gray-900/60 border-gray-800"
      : "bg-white border-gray-200"
  } border shadow-lg`}
>
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-bold">Peer Insights</h3>
    <div className="text-xs text-gray-500 dark:text-gray-400">Top 10%</div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 mb-4">
    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
        Verified skills (top)
      </div>
      <div className="text-2xl font-bold">12+</div>
    </div>
    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
        Avg placement
      </div>
      <div className="text-lg font-bold leading-tight">
        TCS, Accenture, Infosys
      </div>
    </div>
    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40 sm:col-span-2 lg:col-span-1">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
        Improve by
      </div>
      <div className="text-lg font-bold leading-tight">
        Projects + Verified skills
      </div>
    </div>
  </div>

  <Link
    to="/peer-insights"
    className="block w-full px-4 py-3 rounded-xl bg-purple-600 text-white font-semibold text-center hover:bg-purple-700 transition-colors duration-200"
  >
    View Peer Insights
  </Link>
</motion.div>

          </motion.section>

          {/* FOOTER */}
          <motion.footer
            variants={fadeIn}
            className="text-center py-6 text-sm text-gray-500"
          >
            © {new Date().getFullYear()} MindStep — Demo UI. Replace mocks with
            real data & payment integration.
          </motion.footer>
        </motion.div>
      </main>

      {/* UPGRADE MODAL */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowUpgradeModal(false)}
            />
            <motion.div
              initial={{ y: 40, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="relative z-10 w-full max-w-xl p-6 rounded-2xl bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    Upgrade to Premium
                  </div>
                  <h3 className="text-2xl font-bold">
                    Get lifetime access — ₹99
                  </h3>
                  <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                    Unlock interactive roadmap, PDF reports, unlimited
                    verifications & more.
                  </p>

                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />{" "}
                      Unlimited skill verification
                    </li>
                    <li className="flex items-center gap-2">
                      <DownloadCloud className="w-4 h-4 text-indigo-500" />{" "}
                      Downloadable PDF report
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-yellow-500" /> AI
                      mentor access
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => navigate("/pay")}
                  disabled={busy}
                  className={`px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold shadow-lg ${
                    busy ? "opacity-60" : "hover:scale-105"
                  }`}
                >
                  {busy ? "Processing..." : "Pay ₹99 & Upgrade"}
                </button>
                <button
                  onClick={() => alert("Learn payment (demo)")}
                  className="px-4 py-3 rounded-xl border"
                >
                  How payment works
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
