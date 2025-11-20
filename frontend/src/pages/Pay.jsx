import React, { useEffect, useState } from "react";
import { ArrowLeft, Moon, Sun, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Pay() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleDemoPayment = () => {
    setSuccess(true);

    setTimeout(() => {
      localStorage.setItem("premium", "true");
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 p-6 transition">
      
      {/* HEADER */}
      <div className="w-full max-w-xl flex justify-between items-center mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600"
        >
          <ArrowLeft /> Back to Dashboard
        </button>

        <button
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      {/* PAYMENT CARD */}
      {!success ? (
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-xl p-8 rounded-2xl animate-[slideUp_0.4s_ease]">
          <h1 className="text-3xl font-bold text-center">Upgrade to Premium</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
            Get lifetime access to all premium features
          </p>

          <div className="mt-6 space-y-3 text-gray-700 dark:text-gray-200">
            <p>✔ Unlimited Skill Verification</p>
            <p>✔ Downloadable PDF Reports</p>
            <p>✔ AI Mentor Access</p>
            <p>✔ Interactive Career Roadmap</p>
          </div>

          <button
            onClick={handleDemoPayment}
            className="w-full mt-8 py-4 text-lg font-bold rounded-xl 
                       bg-gradient-to-r from-yellow-400 to-orange-500 
                       shadow-lg hover:scale-[1.03] transition"
          >
            Pay ₹99 (Demo) & Unlock Premium
          </button>

          <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            Demo Payment — No real money charged
          </p>
        </div>
      ) : (
        /* SUCCESS ANIMATION */
        <div className="w-full max-w-xl flex flex-col items-center mt-20 animate-[fadeIn_0.4s]">
          <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />

          <h2 className="text-3xl font-bold mt-4">
            Payment Successful 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Unlocking your premium access...
          </p>
        </div>
      )}
    </div>
  );
}
