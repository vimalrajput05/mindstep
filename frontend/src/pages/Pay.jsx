import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Lock, CheckCircle, AlertCircle, ArrowLeft, Sun, Moon } from "lucide-react";

export default function Pay() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Demo payment handler
  const handlePayment = async () => {
    setLoading(true);
    setError("");

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Update user to premium
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      user.plan = "premium";
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }, 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" 
        : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    }`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${
        darkMode 
          ? "bg-gray-900/80 border-b border-gray-800" 
          : "bg-white/80 border-b border-gray-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => window.location.href = "/dashboard"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
            } transition`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </motion.button>

          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-lg ${
              darkMode 
                ? "bg-gray-800 text-yellow-400" 
                : "bg-gray-100 text-gray-700"
            } transition`}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <div className={`rounded-3xl shadow-2xl border p-8 ${
                darkMode 
                  ? "bg-gray-900 border-gray-800" 
                  : "bg-white border-gray-200"
              }`}>
                
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <CreditCard className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <h2 className={`text-3xl font-bold text-center mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Upgrade to Premium
                </h2>
                <p className={`text-center mb-8 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  One-time payment • Lifetime access
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {[
                    "Unlimited Skill Tests",
                    "AI Career Mentor 24/7",
                    "Downloadable PDF Reports",
                    "Interactive Career Roadmaps",
                    "Marksheet OCR Analyzer",
                    "Priority Support"
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Price Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white"
                >
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold">₹99</span>
                    <span className="text-lg opacity-80">/ lifetime</span>
                  </div>
                  <p className="text-center text-sm mt-2 opacity-90">
                    No recurring charges • Cancel anytime
                  </p>
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
                      darkMode 
                        ? "bg-red-900/20 border border-red-800 text-red-400"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                {/* Payment Button */}
                <motion.button
                  onClick={handlePayment}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition text-gray-900 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      Processing Payment...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Lock className="w-5 h-5" />
                      Pay ₹99 (Demo) & Unlock Premium
                    </span>
                  )}
                </motion.button>

                {/* Footer */}
                <div className={`mt-6 text-center text-xs space-y-1 ${
                  darkMode ? "text-gray-500" : "text-gray-500"
                }`}>
                  <p>🔒 Secure payment • Demo mode</p>
                  <p>No real money charged in this demo</p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-bounce" />
              </motion.div>

              <h2 className={`text-4xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                Payment Successful! 🎉
              </h2>
              
              <p className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Unlocking your premium features...
              </p>

              <motion.div
                className="mt-8 flex items-center justify-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <div className="w-2 h-2 bg-pink-500 rounded-full" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}