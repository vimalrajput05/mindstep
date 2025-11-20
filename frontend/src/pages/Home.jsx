import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Target,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Upload,
  BarChart3,
  Users,
  Moon,
  Sun,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check localStorage for dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`${
          darkMode ? "bg-gray-900/80" : "bg-white/80"
        } backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MindStep
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-600"
                } transition`}
              >
                Features
              </a>
              <a
                href="#pricing"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-600"
                } transition`}
              >
                Pricing
              </a>
              <a
                href="#how"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-600"
                } transition`}
              >
                How It Works
              </a>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 text-yellow-400"
                    : "bg-gray-100 text-gray-700"
                } transition`}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <Link to="/auth">
                <motion.button
                  className={`px-4 py-2 ${
                    darkMode
                      ? "text-indigo-400 hover:bg-gray-800"
                      : "text-indigo-600 hover:bg-indigo-50"
                  } rounded-lg transition`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X
                  className={`w-6 h-6 ${
                    darkMode ? "text-gray-300" : "text-gray-900"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    darkMode ? "text-gray-300" : "text-gray-900"
                  }`}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className={`md:hidden ${
                darkMode ? "bg-gray-900 border-gray-800" : "bg-white"
              } border-t`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-3">
                <a
                  href="#features"
                  className={`block py-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className={`block py-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Pricing
                </a>
                <a
                  href="#how"
                  className={`block py-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  How It Works
                </a>
                <button
                  onClick={toggleDarkMode}
                  className={`w-full py-2 ${
                    darkMode
                      ? "bg-gray-800 text-yellow-400"
                      : "bg-gray-100 text-gray-700"
                  } rounded-lg flex items-center justify-center gap-2`}
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <Link to="/auth">
                  <button
                    className={`w-full py-2 ${
                      darkMode
                        ? "text-indigo-400 border-indigo-400"
                        : "text-indigo-600 border-indigo-600"
                    } border rounded-lg`}
                  >
                    Login
                  </button>
                </Link>

                <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg">
                  Start Free
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="space-y-8" variants={fadeUp}>
          <motion.div
            className={`inline-flex items-center gap-2 px-4 py-2 ${
              darkMode
                ? "bg-indigo-900/50 text-indigo-300"
                : "bg-indigo-100 text-indigo-700"
            } rounded-full text-sm font-medium backdrop-blur-sm`}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            AI-Powered Career Guidance
          </motion.div>

          <motion.h1
            className={`text-5xl md:text-7xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } leading-tight`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Career Confusion?
            <br />
            <motion.span
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Get Clarity With AI
            </motion.span>
          </motion.h1>

          <motion.p
            className={`text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            } max-w-3xl mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Take skill tests, get AI analysis, and discover the perfect career
            path for yourself.
            <br />
            Over 10,000 students have already found their career path! 🚀
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl flex items-center gap-2 text-lg font-semibold"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Test
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
            <Link to="/demo">
              <motion.button
                className={`px-8 py-4 ${
                  darkMode
                    ? "bg-gray-800 text-gray-200 border-gray-700"
                    : "bg-white text-gray-700 border-gray-200"
                } rounded-xl hover:bg-opacity-80 transition shadow-md border text-lg font-semibold`}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className={`flex flex-wrap items-center justify-center gap-6 pt-8 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {["No Credit Card", "Free Forever Plan", "5 Min Setup"].map(
              (text, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{text}</span>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            Why Choose MindStep?
          </h2>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            AI-powered features that help you make the right career decisions
          </p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Brain,
              title: "AI Analysis",
              desc: "Advanced AI analyzes your skills, personality, and academic performance to suggest the best career paths.",
              gradient: "from-indigo-500 to-purple-500",
            },
            {
              icon: Upload,
              title: "Marksheet Scan",
              desc: "Upload your 10th/12th marksheet, OCR technology automatically analyzes subjects and identifies your strengths.",
              gradient: "from-indigo-500 to-purple-500",
            },
            {
              icon: Target,
              title: "Skill Verification",
              desc: "Verify your skills through mini-quizzes. Get real assessments instead of self-reporting.",
              gradient: "from-indigo-500 to-purple-500",
            },
            {
              icon: BarChart3,
              title: "Career Roadmap",
              desc: "Get a step-by-step learning roadmap. Know what to learn and when to learn it, everything becomes clear.",
              gradient: "from-indigo-500 to-purple-500",
            },
            {
              icon: Users,
              title: "Peer Comparison",
              desc: "See what the top 10% students are doing. Learn from the journey of successful students and improve.",
              gradient: "from-indigo-500 to-purple-500",
            },
            {
              icon: Sparkles,
              title: "AI Mentor",
              desc: "24/7 AI chatbot mentor that solves career doubts, suggests resources, and keeps you motivated.",
              gradient: "from-indigo-500 to-purple-500",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className={`${
                darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white"
              } p-8 rounded-2xl shadow-lg border backdrop-blur-sm group`}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <motion.div
                className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                } mb-4`}
              >
                {feature.title}
              </h3>
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } leading-relaxed`}
              >
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section
        id="how"
        className={`${
          darkMode ? "bg-gray-900/50" : "bg-white"
        } py-20 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-4`}
            >
              How It Works?
            </h2>
            <p
              className={`text-xl ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Discover your career path in just 4 simple steps
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Register",
                desc: "Create a free account using your email",
                icon: Sparkles,
              },
              {
                step: "02",
                title: "Complete Tests",
                desc: "Complete skill + psychometric tests",
                icon: Target,
              },
              {
                step: "03",
                title: "Get AI Analysis",
                desc: "Receive personalized career recommendations",
                icon: Brain,
              },
              {
                step: "04",
                title: "Follow Roadmap",
                desc: "Follow your step-by-step learning path",
                icon: Zap,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center group"
                variants={cardVariants}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="relative mx-auto mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                    {item.step}
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.2,
                    }}
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </motion.div>
                </motion.div>
                <h3
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-2`}
                >
                  {item.title}
                </h3>
                <p
                  className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            Simple Pricing, Maximum Value
          </h2>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Start free, upgrade anytime
          </p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Free Plan */}
          <motion.div
            className={`${
              darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white"
            } p-8 rounded-2xl shadow-lg border-2 backdrop-blur-sm`}
            variants={cardVariants}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <h3
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-2`}
            >
              Free
            </h3>
            <div
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-6`}
            >
              ₹0
              <span
                className={`text-lg ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } font-normal`}
              >
                /forever
              </span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Basic skill tests",
                "3 AI career suggestions",
                "Psychometric test",
                "Marksheet upload",
                "5 skills verification",
                "Basic dashboard",
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
            <motion.button
              className={`w-full py-3 border-2 ${
                darkMode
                  ? "border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
                  : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              } rounded-xl transition font-semibold`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Free
            </motion.button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold shadow-lg">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">
              Premium
            </h3>
            <div className="text-4xl font-bold text-white mb-6 relative z-10">
              ₹99
              <span className="text-lg text-indigo-200 font-normal">
                /one-time
              </span>
            </div>
            <ul className="space-y-4 mb-8 relative z-10">
              {[
                "Everything in Free",
                "Unlimited skill verification",
                "Detailed AI analysis",
                "Interactive career roadmap",
                "Downloadable PDF report",
                "Learning tracker",
                "AI mentor chatbot",
                "Peer comparison insights",
                "Job recommendations",
                "Lifetime access",
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.button
              className="w-full py-3 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition font-semibold shadow-lg relative z-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Upgrade Now - ₹99
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <motion.div
          className="max-w-4xl mx-auto text-center px-4 relative z-10"
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Clarity on Your Career
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join 10,000+ students who have already discovered their perfect
            career path
          </p>
          <motion.button
            className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition shadow-xl text-lg font-semibold"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey - It's Free! 🚀
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className={`${
          darkMode ? "bg-black" : "bg-gray-900"
        } text-gray-400 py-12 transition-colors duration-300`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <motion.div
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
                <span className="text-xl font-bold text-white">MindStep</span>
              </motion.div>
              <p className="text-sm">
                AI-powered career guidance platform for smart students.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                {["Features", "Pricing", "How It Works"].map((item, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                {["About Us", "Contact", "Privacy Policy"].map((item, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <motion.li whileHover={{ x: 5 }}>
                  <a href="#" className="hover:text-white transition">
                    Help Center
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="mailto:support@mindstep.com"
                    className="hover:text-white transition"
                  >
                    Email: support@mindstep.com
                  </a>
                </motion.li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2025 MindStep. Made with ❤️ for students.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
