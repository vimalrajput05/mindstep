import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Sun, Moon, Users, Search, Filter, Crown, 
  Trash2, Edit, Check, X, Mail, Calendar, TrendingUp,
  Shield, AlertCircle, Download, RefreshCw
} from "lucide-react";

export default function AdminUserManagement() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("all"); // all, free, premium
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Load demo users from localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem("allUsers");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Demo users
      const demoUsers = [
        { id: 1, name: "Raj Kumar", email: "raj@example.com", plan: "premium", role: "user", joinedDate: "2024-01-15", testsCompleted: 12, progress: 78 },
        { id: 2, name: "Priya Singh", email: "priya@example.com", plan: "free", role: "user", joinedDate: "2024-02-10", testsCompleted: 3, progress: 34 },
        { id: 3, name: "Amit Sharma", email: "amit@example.com", plan: "premium", role: "user", joinedDate: "2024-01-20", testsCompleted: 15, progress: 89 },
        { id: 4, name: "Neha Gupta", email: "neha@example.com", plan: "free", role: "user", joinedDate: "2024-03-05", testsCompleted: 2, progress: 23 },
        { id: 5, name: "Vikram Patel", email: "vikram@example.com", plan: "premium", role: "user", joinedDate: "2024-02-28", testsCompleted: 8, progress: 56 },
        { id: 6, name: "Anita Desai", email: "anita@example.com", plan: "free", role: "user", joinedDate: "2024-03-12", testsCompleted: 1, progress: 12 },
      ];
      setUsers(demoUsers);
      localStorage.setItem("allUsers", JSON.stringify(demoUsers));
    }
  }, []);

  const stats = {
    total: users.length,
    premium: users.filter(u => u.plan === "premium").length,
    free: users.filter(u => u.plan === "free").length,
    active: users.filter(u => u.testsCompleted > 0).length
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === "all" || user.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = users.filter(u => u.id !== selectedUser.id);
    setUsers(updated);
    localStorage.setItem("allUsers", JSON.stringify(updated));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const saveEdit = () => {
    const updated = users.map(u => u.id === selectedUser.id ? selectedUser : u);
    setUsers(updated);
    localStorage.setItem("allUsers", JSON.stringify(updated));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const toggleUserPlan = (userId) => {
    const updated = users.map(u => 
      u.id === userId ? { ...u, plan: u.plan === "free" ? "premium" : "free" } : u
    );
    setUsers(updated);
    localStorage.setItem("allUsers", JSON.stringify(updated));
  };

  const exportData = () => {
    const csv = [
      "Name,Email,Plan,Tests Completed,Progress,Joined Date",
      ...users.map(u => `${u.name},${u.email},${u.plan},${u.testsCompleted},${u.progress}%,${u.joinedDate}`)
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users-data.csv";
    a.click();
  };

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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">User Management</h1>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Admin Dashboard
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-lg ${darkMode ? "bg-gray-800 text-yellow-400" : "bg-gray-100 text-gray-700"}`}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total Users</div>
                <div className="text-2xl font-bold">{stats.total}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Premium</div>
                <div className="text-2xl font-bold">{stats.premium}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Free Users</div>
                <div className="text-2xl font-bold">{stats.free}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Active Users</div>
                <div className="text-2xl font-bold">{stats.active}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters & Actions */}
        <div className={`p-6 rounded-2xl mb-6 ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                  darkMode 
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className={`px-4 py-3 rounded-xl border ${
                  darkMode 
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
              >
                <option value="all">All Plans</option>
                <option value="free">Free Only</option>
                <option value="premium">Premium Only</option>
              </select>

              <motion.button
                onClick={exportData}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Export</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className={`rounded-2xl overflow-hidden ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Tests</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredUsers.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleUserPlan(user.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.plan === "premium"
                            ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900"
                            : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {user.plan === "premium" ? "✨ Premium" : "Free"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{user.testsCompleted}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full h-2 max-w-[100px]">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${user.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{user.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{user.joinedDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          onClick={() => handleEdit(user)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(user)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className={`w-12 h-12 mx-auto mb-3 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>No users found</p>
            </div>
          )}
        </div>
      </main>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"}`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Delete User</h3>
                <p className={`text-sm mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Are you sure you want to delete <strong>{selectedUser?.name}</strong>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Edit User</h3>
                <button onClick={() => setShowEditModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      darkMode 
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-indigo-500 outline-none`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      darkMode 
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-indigo-500 outline-none`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Plan
                  </label>
                  <select
                    value={selectedUser.plan}
                    onChange={(e) => setSelectedUser({ ...selectedUser, plan: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      darkMode 
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-indigo-500 outline-none`}
                  >
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}