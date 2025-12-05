import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Crown,
  Lock,
  LogOut,
  Target,
  CheckCircle,
  Star,
  TrendingUp,
  Sun,
  Moon,
  Activity,
  DownloadCloud,
  X,
  BookOpen,
  Bot,
  Zap,
  Award,
  BarChart3,
  Calendar,
  MessageSquare,
  Shield,
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved
      ? JSON.parse(saved)
      : { name: user?.name || "", gender: "", avatar: "boy1" };
  });

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const displayUser = user ?? {
    name: "Guest",
    email: "",
    plan: "free",
    role: "user",
  };
  const isAdmin = displayUser.role === "admin";
  const isPremium = displayUser.plan === "premium" || isAdmin;

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    if (!user) window.location.href = "/auth";
  }, [user]);

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
    progress: 45,
    testsTaken: isPremium ? 8 : 2,
    testsLimit: isPremium ? "∞" : "3",
    skillsVerified: 12,
    learningHours: 48,
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/auth";
  };

  const FeatureCard = ({
    icon: Icon,
    title,
    description,
    locked,
    onClick,
    color,
    badge,
  }) => (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setHoveredCard(title)}
      onHoverEnd={() => setHoveredCard(null)}
      onClick={locked ? () => setShowUpgradeModal(true) : onClick}
      className={`relative p-6 rounded-2xl cursor-pointer overflow-hidden ${
        darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"
      } ${locked ? "opacity-75" : ""}`}
    >
      {locked && (
        <div className="absolute top-3 right-3 z-10">
          <div className="px-2 py-1 bg-yellow-400 text-gray-900 rounded-full text-xs font-bold flex items-center gap-1">
            <Crown className="w-3 h-3" />
            PREMIUM
          </div>
        </div>
      )}

      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p
        className={`text-sm ${
          darkMode ? "text-gray-400" : "text-gray-600"
        } mb-4`}
      >
        {description}
      </p>

      {badge && (
        <div
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
            darkMode
              ? "bg-indigo-900/30 text-indigo-300"
              : "bg-indigo-50 text-indigo-700"
          }`}
        >
          <Zap className="w-3 h-3" />
          {badge}
        </div>
      )}

      {locked && hoveredCard === title && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl"
        >
          <div className="text-center text-white px-4">
            <Lock className="w-10 h-10 mx-auto mb-2" />
            <p className="font-semibold">Upgrade to Premium</p>
            <p className="text-xs mt-1 opacity-80">
              Unlock this feature for ₹99
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const StatBox = ({ icon: Icon, label, value, color }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-xl ${
        darkMode ? "bg-gray-900" : "bg-white shadow-lg"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {label}
          </div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-950 text-gray-100"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md ${
          darkMode
            ? "bg-gray-900/80 border-b border-gray-800"
            : "bg-white/80 border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="text-xl font-bold">MindStep</div>
                <div
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  AI Career Guidance
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a href="/profile">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl cursor-pointer ${
                    profileData.gender === "male"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                      : profileData.gender === "female"
                      ? "bg-gradient-to-br from-pink-500 to-rose-500"
                      : "bg-gradient-to-br from-gray-500 to-gray-600"
                  } shadow-lg`}
                >
                  {avatarEmojis[profileData.avatar] || "👤"}
                </motion.div>
              </a>

              <motion.button
                whileHover={{ rotate: 180 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              <div
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  isPremium
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900"
                    : isAdmin
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {isAdmin ? "👑 Admin" : isPremium ? "✨ Premium" : "Free"}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <div
            className={`p-8 rounded-3xl ${
              darkMode ? "bg-gray-900" : "bg-white shadow-xl"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Welcome back,{" "}
                  <span className="text-indigo-500">
                    {profileData.name || displayUser.name}
                  </span>
                  ! 👋
                </h1>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Track your progress, take tests, and unlock your career
                  potential
                </p>
              </div>

              {!isPremium && !isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUpgradeModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-xl font-bold shadow-lg flex items-center gap-2"
                >
                  <Crown className="w-5 h-5" />
                  Upgrade to Premium
                </motion.button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Overall Progress</span>
                <span className="font-bold text-indigo-600">
                  {stats.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox
              icon={Target}
              label="Tests Taken"
              value={`${stats.testsTaken}/${stats.testsLimit}`}
              color="from-indigo-500 to-purple-500"
            />
            <StatBox
              icon={Award}
              label="Skills Verified"
              value={stats.skillsVerified}
              color="from-green-500 to-emerald-500"
            />
            <StatBox
              icon={Calendar}
              label="Learning Hours"
              value={`${stats.learningHours}h`}
              color="from-blue-500 to-cyan-500"
            />
            <StatBox
              icon={TrendingUp}
              label="Progress"
              value={`${stats.progress}%`}
              color="from-purple-500 to-pink-500"
            />
          </div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skill Tests */}
            <FeatureCard
              icon={Target}
              title="Skill Tests"
              description="Take technical, soft skills, and aptitude tests to verify your abilities"
              color="from-indigo-600 to-purple-600"
              badge={isPremium ? "Unlimited" : `${3 - stats.testsTaken} left`}
              onClick={() => (window.location.href = "/skilltest")}
            />

            {/* Psychometric Test */}
            <FeatureCard
              icon={Activity}
              title="Psychometric Test"
              description="Discover your personality traits and career compatibility"
              color="from-pink-500 to-rose-500"
              badge="20 Questions"
              onClick={() => (window.location.href = "/psychometric")}
            />

            {/* Marksheet Analyzer */}
            <FeatureCard
              icon={BookOpen}
              title="Marksheet Analyzer"
              description="Upload your marksheet and get AI-powered career recommendations"
              color="from-emerald-500 to-teal-500"
              badge="OCR Powered"
              locked={!isPremium && !isAdmin}
              onClick={() => (window.location.href = "/marksheet")}
            />

            {/* Career Roadmap */}
            <FeatureCard
              icon={BarChart3}
              title="Career Roadmap"
              description="Interactive career paths with milestones and progress tracking"
              color="from-blue-600 to-cyan-600"
              badge="6 Fields"
              locked={!isPremium && !isAdmin}
              onClick={() => (window.location.href = "/career-roadmap")}
            />

            {/* AI Mentor */}
            <FeatureCard
              icon={Bot}
              title="AI Career Mentor"
              description="24/7 AI assistant for career guidance and learning resources"
              color="from-purple-600 to-pink-600"
              badge="Smart AI"
              locked={!isPremium && !isAdmin}
              onClick={() => (window.location.href = "/ai-mentor")}
            />

            {/* Learning Tracker */}
            <FeatureCard
              icon={TrendingUp}
              title="Learning Tracker"
              description="Track your daily learning activities and maintain streaks"
              color="from-orange-500 to-red-500"
              badge="Track Progress"
              onClick={() => (window.location.href = "/learning-tracker")}
            />
          </div>

          {/* Admin Panel (Admin Only) */}
          {isAdmin && (
            <motion.div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6" />
                <h3 className="text-xl font-bold">Admin Dashboard</h3>
              </div>
              <div className="grid md:grid-cols-4 gap-3">
                <button
                  onClick={() => (window.location.href = "/admin/users")}
                  className="px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition"
                >
                  User Management
                </button>
                <button
                  onClick={() => (window.location.href = "/admin/analytics")}
                  className="px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition"
                >
                  Analytics
                </button>
                <button
                  onClick={() => (window.location.href = "/admin/content")}
                  className="px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition"
                >
                  Content Manager
                </button>
                <button
                  onClick={() => (window.location.href = "/admin/settings")}
                  className="px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition"
                >
                  Settings
                </button>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <div
            className={`p-6 rounded-2xl ${
              darkMode ? "bg-gray-900" : "bg-white shadow-lg"
            }`}
          >
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/profile")}
                className={`p-4 rounded-xl text-left ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-750"
                    : "bg-gray-50 hover:bg-gray-100"
                } transition`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <span className="text-lg">
                      {avatarEmojis[profileData.avatar]}
                    </span>
                  </div>
                  <span className="font-semibold">Edit Profile</span>
                </div>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Update your information
                </p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/skills")}
                className={`p-4 rounded-xl text-left ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-750"
                    : "bg-gray-50 hover:bg-gray-100"
                } transition`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">Manage Skills</span>
                </div>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Add or verify your skills
                </p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Coming soon!")}
                className={`p-4 rounded-xl text-left ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-750"
                    : "bg-gray-50 hover:bg-gray-100"
                } transition`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">Community</span>
                </div>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Connect with peers
                </p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Download feature coming soon!")}
                className={`p-4 rounded-xl text-left ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-750"
                    : "bg-gray-50 hover:bg-gray-100"
                } transition`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <DownloadCloud className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Download Report</span>
                </div>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Get PDF report
                </p>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg p-8 rounded-3xl ${
                darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"
              } shadow-2xl`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } mb-1`}
                  >
                    Upgrade to
                  </div>
                  <h2 className="text-3xl font-bold">Premium ✨</h2>
                </div>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className={`p-2 rounded-lg ${
                    darkMode ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">
                  ₹99{" "}
                  <span className="text-lg font-normal text-gray-500">
                    / lifetime
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  One-time payment, lifetime access
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  "Unlimited skill tests & verifications",
                  "AI Career Mentor - 24/7 access",
                  "Interactive career roadmaps",
                  "Marksheet OCR analyzer",
                  "Download PDF reports",
                  "Priority support",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => (window.location.href = "/pay")}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-xl font-bold text-lg shadow-lg"
              >
                Upgrade Now - ₹99
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
