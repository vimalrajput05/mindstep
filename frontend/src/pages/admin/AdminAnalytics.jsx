import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Sun, Moon, TrendingUp, Users, DollarSign, 
  Activity, Calendar, Download, RefreshCw, BarChart3,
  Award, Target, BookOpen, Crown
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AdminAnalytics() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [timeRange, setTimeRange] = useState("7days"); // 7days, 30days, 90days, 1year

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Demo data
  const userGrowthData = [
    { month: "Jan", users: 120, premium: 20 },
    { month: "Feb", users: 180, premium: 35 },
    { month: "Mar", users: 250, premium: 52 },
    { month: "Apr", users: 320, premium: 78 },
    { month: "May", users: 420, premium: 105 },
    { month: "Jun", users: 580, premium: 145 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 1980 },
    { month: "Feb", revenue: 3465 },
    { month: "Mar", revenue: 5148 },
    { month: "Apr", revenue: 7722 },
    { month: "May", revenue: 10395 },
    { month: "Jun", revenue: 14355 },
  ];

  const testCompletionData = [
    { name: "Skill Test", value: 450, color: "#6366f1" },
    { name: "Psychometric", value: 320, color: "#ec4899" },
    { name: "Aptitude", value: 280, color: "#10b981" },
  ];

  const planDistribution = [
    { name: "Free", value: 435, color: "#9ca3af" },
    { name: "Premium", value: 145, color: "#f59e0b" },
  ];

  const stats = {
    totalRevenue: "₹14,355",
    totalUsers: 580,
    premiumUsers: 145,
    conversionRate: "25%",
    avgTestsPerUser: 3.2,
    activeUsers: 412,
    testsCompleted: 1050,
    completionRate: "78%"
  };

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      stats,
      userGrowth: userGrowthData,
      revenue: revenueData,
      testCompletion: testCompletionData,
      planDistribution
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics-report.json";
    a.click();
  };

  const StatCard = ({ icon: Icon, label, value, change, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className="flex items-center gap-1 text-sm font-semibold text-green-500">
            <TrendingUp className="w-4 h-4" />
            {change}
          </div>
        )}
      </div>
      <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </motion.div>
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Analytics Dashboard</h1>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Real-time insights & metrics
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-indigo-500 outline-none`}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>

              <motion.button
                onClick={exportReport}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={DollarSign} 
            label="Total Revenue" 
            value={stats.totalRevenue} 
            change="+28%" 
            color="from-green-500 to-emerald-500"
          />
          <StatCard 
            icon={Users} 
            label="Total Users" 
            value={stats.totalUsers} 
            change="+38%" 
            color="from-indigo-500 to-purple-500"
          />
          <StatCard 
            icon={Crown} 
            label="Premium Users" 
            value={stats.premiumUsers} 
            change="+42%" 
            color="from-yellow-400 to-orange-500"
          />
          <StatCard 
            icon={Activity} 
            label="Active Users" 
            value={stats.activeUsers} 
            change="+15%" 
            color="from-blue-500 to-cyan-500"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">User Growth</h3>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Last 6 months</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                    border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
                    borderRadius: "12px"
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} name="Total Users" />
                <Line type="monotone" dataKey="premium" stroke="#f59e0b" strokeWidth={3} name="Premium Users" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Revenue Growth</h3>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>₹ INR</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                    border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
                    borderRadius: "12px"
                  }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Test Completion Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <h3 className="text-lg font-bold mb-6">Test Completion by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={testCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {testCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Plan Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <h3 className="text-lg font-bold mb-6">User Plan Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
        >
          <h3 className="text-lg font-bold mb-6">Key Performance Metrics</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>Conversion Rate</div>
              <div className="text-3xl font-bold text-green-500">{stats.conversionRate}</div>
              <div className="text-xs text-green-500 mt-1">+5.2% from last month</div>
            </div>
            <div>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>Avg Tests/User</div>
              <div className="text-3xl font-bold text-blue-500">{stats.avgTestsPerUser}</div>
              <div className="text-xs text-blue-500 mt-1">+0.4 from last month</div>
            </div>
            <div>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>Tests Completed</div>
              <div className="text-3xl font-bold text-purple-500">{stats.testsCompleted}</div>
              <div className="text-xs text-purple-500 mt-1">+18% from last month</div>
            </div>
            <div>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>Completion Rate</div>
              <div className="text-3xl font-bold text-orange-500">{stats.completionRate}</div>
              <div className="text-xs text-orange-500 mt-1">+3% from last month</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}