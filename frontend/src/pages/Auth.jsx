import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sun,
  Moon,
  X,
  Shield,
  Crown,
  Sparkles,
} from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", next.toString());
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      window.location.href = "/dashboard";
    }
  }, []);

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill all required fields");
      return;
    }

    // Admin Check - Special Password
    const ADMIN_PASSWORD = "VK0195";
    const isAdmin = password === ADMIN_PASSWORD;

    const user = {
      email,
      name: isLogin ? name || email.split("@")[0] : name,
      plan: isAdmin ? "admin" : "free",
      role: isAdmin ? "admin" : "user",
      loggedAt: Date.now(),
    };

    localStorage.setItem("user", JSON.stringify(user));

    if (isAdmin) {
      alert(
        "🎉 Welcome Admin! You have access to both Free & Premium features!"
      );
    }

    window.location.href = "/dashboard";
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900"
      }`}
    >
      {/* Close Button */}
      <motion.button
        onClick={() => (window.location.href = "/")}
        className={`absolute top-6 left-6 p-3 rounded-xl ${
          darkMode
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
            : "bg-white text-gray-700 hover:bg-gray-100"
        } shadow-lg transition-colors`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Dark Mode Toggle */}
      <motion.button
        onClick={toggleDarkMode}
        className={`absolute top-6 right-6 p-3 rounded-xl ${
          darkMode ? "bg-gray-800 text-yellow-400" : "bg-white text-gray-700"
        } shadow-lg`}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      <motion.div
        className={`w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-md border ${
          darkMode
            ? "bg-gray-800/80 border-gray-700"
            : "bg-white/90 border-gray-200"
        }`}
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            MindStep
          </h2>
          <p
            className={`text-sm mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            AI-Powered Career Guidance
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h3
                className={`text-2xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Welcome Back! 👋
              </h3>
              <p
                className={`text-sm mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Sign in to access your dashboard
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-gray-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email address"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:ring-2 focus:ring-indigo-400 outline-none transition ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-gray-400" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:ring-2 focus:ring-indigo-400 outline-none transition ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                >
                  Login
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              <p
                className={`mt-6 text-center text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                New to MindStep?{" "}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setPassword("");
                  }}
                  className="text-indigo-500 hover:text-indigo-600 font-semibold underline"
                >
                  Create Account
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
            >
              <h3
                className={`text-2xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Create Account ✨
              </h3>
              <p
                className={`text-sm mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Start with free plan — upgrade anytime!
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-4 text-gray-400" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Full name"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:ring-2 focus:ring-indigo-400 outline-none transition ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-gray-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email address"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:ring-2 focus:ring-indigo-400 outline-none transition ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-gray-400" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:ring-2 focus:ring-indigo-400 outline-none transition ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                >
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              <p
                className={`mt-6 text-center text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setPassword("");
                  }}
                  className="text-indigo-500 hover:text-indigo-600 font-semibold underline"
                >
                  Login
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div
          className={`mt-6 pt-6 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className={darkMode ? "text-gray-500" : "text-gray-400"}>
              Secure login with
            </span>
            <Shield className="w-3 h-3 text-green-500" />
            <span className={darkMode ? "text-gray-500" : "text-gray-400"}>
              256-bit encryption
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
