import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Sun, Moon, Save, Bell, Shield, Database, 
  Mail, Globe, DollarSign, Palette, CheckCircle
} from "lucide-react";

export default function AdminSettings() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("adminSettings");
    return saved ? JSON.parse(saved) : {
      // General
      siteName: "MindStep",
      siteDescription: "AI-Powered Career Guidance Platform",
      supportEmail: "support@mindstep.com",
      
      // Features
      enableRegistration: true,
      enablePremium: true,
      enableTests: true,
      enableAIMentor: true,
      
      // Notifications
      emailNotifications: true,
      welcomeEmail: true,
      paymentReceipts: true,
      weeklyReports: true,
      
      // Pricing
      premiumPrice: 99,
      currency: "INR",
      paymentGateway: "razorpay",
      
      // Security
      twoFactorAuth: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      
      // Database
      autoBackup: true,
      backupFrequency: "daily",
      retentionDays: 30,
    };
  });

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleSave = () => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingSection = ({ title, icon: Icon, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  const ToggleSwitch = ({ label, value, onChange, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <div className="font-medium">{label}</div>
        {description && (
          <div className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {description}
          </div>
        )}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-14 h-7 rounded-full transition ${
          value ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700"
        }`}
      >
        <motion.div
          animate={{ x: value ? 28 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
        />
      </button>
    </div>
  );

  const InputField = ({ label, value, onChange, type = "text", placeholder }) => (
    <div className="py-3">
      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border ${
          darkMode 
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-gray-50 border-gray-300 text-gray-900"
        } focus:ring-2 focus:ring-indigo-500 outline-none`}
      />
    </div>
  );

  const SelectField = ({ label, value, onChange, options }) => (
    <div className="py-3">
      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border ${
          darkMode 
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-gray-50 border-gray-300 text-gray-900"
        } focus:ring-2 focus:ring-indigo-500 outline-none`}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );

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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Admin Settings</h1>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Configure platform settings
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleSave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
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

      {/* Success Message */}
      {showSaveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-green-500 text-white rounded-xl shadow-2xl font-semibold flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Settings saved successfully!
        </motion.div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* General Settings */}
        <SettingSection title="General Settings" icon={Globe}>
          <InputField
            label="Site Name"
            value={settings.siteName}
            onChange={(v) => handleChange("siteName", v)}
            placeholder="MindStep"
          />
          <InputField
            label="Site Description"
            value={settings.siteDescription}
            onChange={(v) => handleChange("siteDescription", v)}
            placeholder="AI-Powered Career Guidance Platform"
          />
          <InputField
            label="Support Email"
            value={settings.supportEmail}
            onChange={(v) => handleChange("supportEmail", v)}
            type="email"
            placeholder="support@mindstep.com"
          />
        </SettingSection>

        {/* Features */}
        <SettingSection title="Features Control" icon={Palette}>
          <ToggleSwitch
            label="User Registration"
            value={settings.enableRegistration}
            onChange={(v) => handleChange("enableRegistration", v)}
            description="Allow new users to sign up"
          />
          <ToggleSwitch
            label="Premium Plans"
            value={settings.enablePremium}
            onChange={(v) => handleChange("enablePremium", v)}
            description="Enable premium subscription features"
          />
          <ToggleSwitch
            label="Skill Tests"
            value={settings.enableTests}
            onChange={(v) => handleChange("enableTests", v)}
            description="Allow users to take skill tests"
          />
          <ToggleSwitch
            label="AI Mentor"
            value={settings.enableAIMentor}
            onChange={(v) => handleChange("enableAIMentor", v)}
            description="Enable AI career mentor chatbot"
          />
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Email Notifications" icon={Mail}>
          <ToggleSwitch
            label="Email Notifications"
            value={settings.emailNotifications}
            onChange={(v) => handleChange("emailNotifications", v)}
            description="Master toggle for all email notifications"
          />
          <ToggleSwitch
            label="Welcome Email"
            value={settings.welcomeEmail}
            onChange={(v) => handleChange("welcomeEmail", v)}
            description="Send welcome email to new users"
          />
          <ToggleSwitch
            label="Payment Receipts"
            value={settings.paymentReceipts}
            onChange={(v) => handleChange("paymentReceipts", v)}
            description="Send email receipts for payments"
          />
          <ToggleSwitch
            label="Weekly Progress Reports"
            value={settings.weeklyReports}
            onChange={(v) => handleChange("weeklyReports", v)}
            description="Send weekly learning progress reports"
          />
        </SettingSection>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pricing */}
          <SettingSection title="Pricing & Payments" icon={DollarSign}>
            <InputField
              label="Premium Price"
              value={settings.premiumPrice}
              onChange={(v) => handleChange("premiumPrice", parseInt(v))}
              type="number"
              placeholder="99"
            />
            <SelectField
              label="Currency"
              value={settings.currency}
              onChange={(v) => handleChange("currency", v)}
              options={[
                { value: "INR", label: "₹ INR (Indian Rupee)" },
                { value: "USD", label: "$ USD (US Dollar)" },
                { value: "EUR", label: "€ EUR (Euro)" },
              ]}
            />
            <SelectField
              label="Payment Gateway"
              value={settings.paymentGateway}
              onChange={(v) => handleChange("paymentGateway", v)}
              options={[
                { value: "razorpay", label: "Razorpay" },
                { value: "stripe", label: "Stripe" },
                { value: "paypal", label: "PayPal" },
              ]}
            />
          </SettingSection>

          {/* Security */}
          <SettingSection title="Security Settings" icon={Shield}>
            <ToggleSwitch
              label="Two-Factor Authentication"
              value={settings.twoFactorAuth}
              onChange={(v) => handleChange("twoFactorAuth", v)}
              description="Require 2FA for admin accounts"
            />
            <InputField
              label="Session Timeout (minutes)"
              value={settings.sessionTimeout}
              onChange={(v) => handleChange("sessionTimeout", parseInt(v))}
              type="number"
              placeholder="30"
            />
            <InputField
              label="Max Login Attempts"
              value={settings.maxLoginAttempts}
              onChange={(v) => handleChange("maxLoginAttempts", parseInt(v))}
              type="number"
              placeholder="5"
            />
          </SettingSection>
        </div>

        {/* Database */}
        <SettingSection title="Database & Backup" icon={Database}>
          <ToggleSwitch
            label="Automatic Backups"
            value={settings.autoBackup}
            onChange={(v) => handleChange("autoBackup", v)}
            description="Enable automatic database backups"
          />
          <SelectField
            label="Backup Frequency"
            value={settings.backupFrequency}
            onChange={(v) => handleChange("backupFrequency", v)}
            options={[
              { value: "hourly", label: "Every Hour" },
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
            ]}
          />
          <InputField
            label="Data Retention (days)"
            value={settings.retentionDays}
            onChange={(v) => handleChange("retentionDays", parseInt(v))}
            type="number"
            placeholder="30"
          />
        </SettingSection>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border-2 ${
            darkMode ? "bg-red-900/10 border-red-800" : "bg-red-50 border-red-200"
          }`}
        >
          <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
            Danger Zone
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => {
                if (confirm("Clear all cache? This cannot be undone.")) {
                  localStorage.clear();
                  alert("Cache cleared!");
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Clear All Cache
            </button>
            <button
              onClick={() => {
                if (confirm("Reset all settings to default? This cannot be undone.")) {
                  localStorage.removeItem("adminSettings");
                  window.location.reload();
                }
              }}
              className="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Reset to Defaults
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}