// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   Sun,
//   Moon,
//   Plus,
//   X,
//   Save,
//   TrendingUp,
//   Calendar,
//   Clock,
//   Award,
//   Target,
//   BookOpen,
//   Trash2,
// } from "lucide-react";

// const LEARNING_CATEGORIES = [
//   {
//     id: "technical",
//     label: "Technical Skills",
//     icon: BookOpen,
//     color: "from-blue-500 to-cyan-500",
//   },
//   {
//     id: "projects",
//     label: "Projects",
//     icon: Target,
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     id: "courses",
//     label: "Online Courses",
//     icon: Award,
//     color: "from-green-500 to-emerald-500",
//   },
//   {
//     id: "reading",
//     label: "Reading/Docs",
//     icon: BookOpen,
//     color: "from-orange-500 to-red-500",
//   },
// ];

// export default function LearningTracker() {
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("darkMode");
//     return saved === "true";
//   });

//   const [learningData, setLearningData] = useState(() => {
//     const saved = localStorage.getItem("learningData");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           weeklyHours: [],
//           activities: [],
//           goals: [],
//         };
//   });

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showGoalModal, setShowGoalModal] = useState(false);
//   const [showSaveSuccess, setShowSaveSuccess] = useState(false);

//   const [newActivity, setNewActivity] = useState({
//     title: "",
//     category: "technical",
//     hours: "",
//     date: new Date().toISOString().split("T")[0],
//     description: "",
//   });

//   const [newGoal, setNewGoal] = useState({
//     title: "",
//     targetHours: "",
//     deadline: "",
//     category: "technical",
//   });

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("darkMode", darkMode.toString());
//   }, [darkMode]);

//   const saveData = () => {
//     localStorage.setItem("learningData", JSON.stringify(learningData));
//     setShowSaveSuccess(true);
//     setTimeout(() => setShowSaveSuccess(false), 3000);
//   };

//   const addActivity = () => {
//     if (!newActivity.title || !newActivity.hours) {
//       alert("Please fill title and hours!");
//       return;
//     }

//     const activity = {
//       ...newActivity,
//       id: Date.now(),
//       timestamp: new Date().toISOString(),
//     };

//     setLearningData((prev) => ({
//       ...prev,
//       activities: [activity, ...prev.activities],
//     }));

//     setNewActivity({
//       title: "",
//       category: "technical",
//       hours: "",
//       date: new Date().toISOString().split("T")[0],
//       description: "",
//     });

//     setShowAddModal(false);
//     saveData();
//   };

//   const deleteActivity = (id) => {
//     if (!confirm("Delete this activity?")) return;
//     setLearningData((prev) => ({
//       ...prev,
//       activities: prev.activities.filter((a) => a.id !== id),
//     }));
//     saveData();
//   };

//   const addGoal = () => {
//     if (!newGoal.title || !newGoal.targetHours) {
//       alert("Please fill goal details!");
//       return;
//     }

//     const goal = {
//       ...newGoal,
//       id: Date.now(),
//       progress: 0,
//       completed: false,
//     };

//     setLearningData((prev) => ({
//       ...prev,
//       goals: [...prev.goals, goal],
//     }));

//     setNewGoal({
//       title: "",
//       targetHours: "",
//       deadline: "",
//       category: "technical",
//     });

//     setShowGoalModal(false);
//     saveData();
//   };

//   const deleteGoal = (id) => {
//     if (!confirm("Delete this goal?")) return;
//     setLearningData((prev) => ({
//       ...prev,
//       goals: prev.goals.filter((g) => g.id !== id),
//     }));
//     saveData();
//   };

//   const toggleGoalComplete = (id) => {
//     setLearningData((prev) => ({
//       ...prev,
//       goals: prev.goals.map((g) =>
//         g.id === id ? { ...g, completed: !g.completed } : g
//       ),
//     }));
//     saveData();
//   };

//   // Calculate weekly stats
//   const getWeeklyData = () => {
//     const weeks = [];
//     const now = new Date();

//     for (let i = 3; i >= 0; i--) {
//       const weekStart = new Date(now);
//       weekStart.setDate(now.getDate() - i * 7);
//       const weekEnd = new Date(weekStart);
//       weekEnd.setDate(weekStart.getDate() + 6);

//       const weekActivities = learningData.activities.filter((a) => {
//         const actDate = new Date(a.date);
//         return actDate >= weekStart && actDate <= weekEnd;
//       });

//       const totalHours = weekActivities.reduce(
//         (sum, a) => sum + parseFloat(a.hours || 0),
//         0
//       );

//       weeks.push({
//         label: `W${4 - i}`,
//         hours: totalHours,
//         activities: weekActivities.length,
//       });
//     }

//     return weeks;
//   };

//   const weeklyData = getWeeklyData();
//   const totalHours = learningData.activities.reduce(
//     (sum, a) => sum + parseFloat(a.hours || 0),
//     0
//   );
//   const totalActivities = learningData.activities.length;
//   const avgHoursPerWeek =
//     weeklyData.length > 0
//       ? (
//           weeklyData.reduce((sum, w) => sum + w.hours, 0) / weeklyData.length
//         ).toFixed(1)
//       : 0;

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 ${
//         darkMode
//           ? "dark bg-gray-950"
//           : "bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50"
//       }`}
//     >
//       {/* Header */}
//       <header
//         className={`sticky top-0 z-50 backdrop-blur-md ${
//           darkMode
//             ? "bg-gray-900/80 border-b border-gray-800"
//             : "bg-white/80 border-b border-gray-200"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//           <motion.button
//             onClick={() => (window.location.href = "/dashboard")}
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//               darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
//             } transition`}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ArrowLeft
//               className={`w-5 h-5  ${darkMode ? "text-white" : "text-black"}`}
//             />
//             {/* <span className="font-medium">Back to Dashboard</span> */}
//           </motion.button>

//           <div className="flex items-center gap-2">
//             <TrendingUp
//               className={`w-6 h-6 ${
//                 darkMode ? "text-indigo-400" : "text-indigo-600"
//               }`}
//             />
//             <h1
//               className={`text-xl md:text-2xl font-bold ${
//                 darkMode ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Learning Tracker
//             </h1>
//           </div>

//           <motion.button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`p-3 rounded-lg ${
//               darkMode
//                 ? "bg-gray-800 text-yellow-400"
//                 : "bg-gray-100 text-gray-700"
//             } transition`}
//             whileHover={{ scale: 1.1, rotate: 15 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {darkMode ? (
//               <Sun className="w-5 h-5" />
//             ) : (
//               <Moon className="w-5 h-5" />
//             )}
//           </motion.button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Success Message */}
//         <AnimatePresence>
//           {showSaveSuccess && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="mb-6 p-4 rounded-xl bg-green-500 text-white font-medium text-center shadow-lg"
//             >
//               ✓ Data saved successfully!
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`p-6 rounded-2xl ${
//               darkMode
//                 ? "bg-gray-900 border border-gray-800"
//                 : "bg-white shadow-lg"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <div
//                   className={`text-sm ${
//                     darkMode ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Total Hours
//                 </div>
//                 <div
//                   className={`text-3xl font-bold ${
//                     darkMode ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   {totalHours.toFixed(1)}
//                 </div>
//               </div>
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
//                 <Clock className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className={`p-6 rounded-2xl ${
//               darkMode
//                 ? "bg-gray-900 border border-gray-800"
//                 : "bg-white shadow-lg"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <div
//                   className={`text-sm ${
//                     darkMode ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Activities
//                 </div>
//                 <div
//                   className={`text-3xl font-bold ${
//                     darkMode ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   {totalActivities}
//                 </div>
//               </div>
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
//                 <Target className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className={`p-6 rounded-2xl ${
//               darkMode
//                 ? "bg-gray-900 border border-gray-800"
//                 : "bg-white shadow-lg"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <div
//                   className={`text-sm ${
//                     darkMode ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Avg/Week
//                 </div>
//                 <div
//                   className={`text-3xl font-bold ${
//                     darkMode ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   {avgHoursPerWeek}h
//                 </div>
//               </div>
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
//                 <TrendingUp className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className={`p-6 rounded-2xl ${
//               darkMode
//                 ? "bg-gray-900 border border-gray-800"
//                 : "bg-white shadow-lg"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <div
//                   className={`text-sm ${
//                     darkMode ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Goals
//                 </div>
//                 <div
//                   className={`text-3xl font-bold ${
//                     darkMode ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   {learningData.goals.filter((g) => g.completed).length}/
//                   {learningData.goals.length}
//                 </div>
//               </div>
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
//                 <Award className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left Column: Chart + Activities */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Weekly Chart */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`p-6 rounded-3xl ${
//                 darkMode
//                   ? "bg-gray-900 border border-gray-800"
//                   : "bg-white shadow-xl"
//               }`}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h2
//                   className={`text-xl font-bold ${
//                     darkMode ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   Weekly Progress
//                 </h2>
//                 <div
//                   className={`text-sm ${
//                     darkMode ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Last 4 weeks
//                 </div>
//               </div>

//               <div className="flex items-end gap-4 h-48">
//                 {weeklyData.map((week, idx) => {
//                   const maxHours = Math.max(
//                     ...weeklyData.map((w) => w.hours),
//                     10
//                   );
//                   const heightPct = (week.hours / maxHours) * 100;

//                   return (
//                     <div
//                       key={idx}
//                       className="flex-1 flex flex-col items-center"
//                     >
//                       <motion.div
//                         initial={{ height: 0 }}
//                         animate={{ height: `${heightPct}%` }}
//                         transition={{ duration: 0.8, delay: idx * 0.1 }}
//                         className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-purple-600 min-h-[20px]"
//                       />
//                       <div
//                         className={`text-sm mt-2 font-medium ${
//                           darkMode ? "text-white" : "text-gray-900"
//                         }`}
//                       >
//                         {week.label}
//                       </div>
//                       <div
//                         className={`text-xs ${
//                           darkMode ? "text-gray-400" : "text-gray-600"
//                         }`}
//                       >
//                         {week.hours.toFixed(1)}h
//                       </div>
//                       <div
//                         className={`text-xs ${
//                           darkMode ? "text-gray-500" : "text-gray-500"
//                         }`}
//                       >
//                         {week.activities} activities
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </motion.div>

//             {/* Recent Activities */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`p-6 rounded-3xl ${
//                 darkMode
//                   ? "bg-gray-900 border border-gray-800"
//                   : "bg-white shadow-xl"
//               }`}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h2
//                   className={`text-xl font-bold ${
//                     darkMode ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   Recent Activities
//                 </h2>
//                 <motion.button
//                   onClick={() => setShowAddModal(true)}
//                   className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium flex items-center gap-2"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Activity
//                 </motion.button>
//               </div>

//               {learningData.activities.length === 0 ? (
//                 <div
//                   className={`text-center py-12 ${
//                     darkMode ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                   <p className="text-sm">
//                     No activities yet. Start tracking your learning!
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
//                   {learningData.activities.map((activity, idx) => {
//                     const category = LEARNING_CATEGORIES.find(
//                       (c) => c.id === activity.category
//                     );
//                     const Icon = category?.icon || BookOpen;

//                     return (
//                       <motion.div
//                         key={activity.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: idx * 0.05 }}
//                         className={`p-4 rounded-xl ${
//                           darkMode
//                             ? "bg-gray-800 border border-gray-700"
//                             : "bg-gray-50 border border-gray-200"
//                         }`}
//                       >
//                         <div className="flex items-start justify-between">
//                           <div className="flex items-start gap-3 flex-1">
//                             <div
//                               className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category?.color} flex items-center justify-center flex-shrink-0`}
//                             >
//                               <Icon className="w-5 h-5 text-white" />
//                             </div>
//                             <div className="flex-1">
//                               <div
//                                 className={`font-semibold ${
//                                   darkMode ? "text-white" : "text-gray-900"
//                                 }`}
//                               >
//                                 {activity.title}
//                               </div>
//                               {activity.description && (
//                                 <div
//                                   className={`text-sm mt-1 ${
//                                     darkMode ? "text-gray-400" : "text-gray-600"
//                                   }`}
//                                 >
//                                   {activity.description}
//                                 </div>
//                               )}
//                               <div
//                                 className={`flex items-center gap-3 mt-2 text-xs ${
//                                   darkMode ? "text-gray-500" : "text-gray-500"
//                                 }`}
//                               >
//                                 <span className="flex items-center gap-1">
//                                   <Clock className="w-3 h-3" />
//                                   {activity.hours}h
//                                 </span>
//                                 <span className="flex items-center gap-1">
//                                   <Calendar className="w-3 h-3" />
//                                   {new Date(activity.date).toLocaleDateString()}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                           <motion.button
//                             onClick={() => deleteActivity(activity.id)}
//                             className={`p-2 rounded-lg ${
//                               darkMode
//                                 ? "hover:bg-gray-700 text-red-400"
//                                 : "hover:bg-gray-200 text-red-600"
//                             }`}
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </motion.button>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               )}
//             </motion.div>
//           </div>

//           {/* Right Column: Goals */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`p-6 rounded-3xl ${
//               darkMode
//                 ? "bg-gray-900 border border-gray-800"
//                 : "bg-white shadow-xl"
//             }`}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h2
//                 className={`text-xl font-bold ${
//                   darkMode ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Learning Goals
//               </h2>
//               <motion.button
//                 onClick={() => setShowGoalModal(true)}
//                 className="p-2 rounded-lg bg-indigo-600 text-white"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Plus className="w-4 h-4" />
//               </motion.button>
//             </div>

//             {learningData.goals.length === 0 ? (
//               <div
//                 className={`text-center py-12 ${
//                   darkMode ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                 <p className="text-sm">No goals set yet</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {learningData.goals.map((goal, idx) => {
//                   const category = LEARNING_CATEGORIES.find(
//                     (c) => c.id === goal.category
//                   );

//                   return (
//                     <motion.div
//                       key={goal.id}
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: idx * 0.05 }}
//                       className={`p-4 rounded-xl ${
//                         goal.completed
//                           ? darkMode
//                             ? "bg-green-900/20 border border-green-800"
//                             : "bg-green-50 border border-green-200"
//                           : darkMode
//                           ? "bg-gray-800 border border-gray-700"
//                           : "bg-gray-50 border border-gray-200"
//                       }`}
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex-1">
//                           <div
//                             className={`font-semibold ${
//                               goal.completed ? "line-through opacity-60" : ""
//                             } ${darkMode ? "text-white" : "text-gray-900"}`}
//                           >
//                             {goal.title}
//                           </div>
//                           <div
//                             className={`text-xs mt-1 ${
//                               darkMode ? "text-gray-500" : "text-gray-600"
//                             }`}
//                           >
//                             Target: {goal.targetHours}h
//                             {goal.deadline &&
//                               ` • ${new Date(
//                                 goal.deadline
//                               ).toLocaleDateString()}`}
//                           </div>
//                         </div>
//                         <motion.button
//                           onClick={() => deleteGoal(goal.id)}
//                           className={`p-1 rounded ${
//                             darkMode
//                               ? "hover:bg-gray-700 text-red-400"
//                               : "hover:bg-gray-200 text-red-600"
//                           }`}
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                         >
//                           <X className="w-4 h-4" />
//                         </motion.button>
//                       </div>

//                       <motion.button
//                         onClick={() => toggleGoalComplete(goal.id)}
//                         className={`w-full px-3 py-2 rounded-lg text-sm font-medium ${
//                           goal.completed
//                             ? "bg-green-600 text-white"
//                             : darkMode
//                             ? "bg-gray-700 text-gray-300"
//                             : "bg-gray-200 text-gray-700"
//                         }`}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         {goal.completed ? "✓ Completed" : "Mark Complete"}
//                       </motion.button>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             )}
//           </motion.div>
//         </div>

//         {/* Add Activity Modal */}
//         <AnimatePresence>
//           {showAddModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
//               onClick={() => setShowAddModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.9, y: 20 }}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full max-w-lg p-6 rounded-2xl ${
//                   darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"
//                 }`}
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h3
//                     className={`text-xl font-bold ${
//                       darkMode ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     Add Learning Activity
//                   </h3>
//                   <button onClick={() => setShowAddModal(false)}>
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label
//                       className={`block text-sm font-medium mb-2 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       Activity Title *
//                     </label>
//                     <input
//                       type="text"
//                       value={newActivity.title}
//                       onChange={(e) =>
//                         setNewActivity({
//                           ...newActivity,
//                           title: e.target.value,
//                         })
//                       }
//                       placeholder="e.g., React Tutorial"
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         darkMode
//                           ? "bg-gray-800 border-gray-700 text-white"
//                           : "bg-white border-gray-300 text-gray-900"
//                       } focus:ring-2 focus:ring-indigo-500 outline-none`}
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label
//                         className={`block text-sm font-medium mb-2 ${
//                           darkMode ? "text-gray-300" : "text-gray-700"
//                         }`}
//                       >
//                         Hours *
//                       </label>
//                       <input
//                         type="number"
//                         step="0.5"
//                         value={newActivity.hours}
//                         onChange={(e) =>
//                           setNewActivity({
//                             ...newActivity,
//                             hours: e.target.value,
//                           })
//                         }
//                         placeholder="2.5"
//                         className={`w-full px-4 py-3 rounded-lg border ${
//                           darkMode
//                             ? "bg-gray-800 border-gray-700 text-white"
//                             : "bg-white border-gray-300 text-gray-900"
//                         } focus:ring-2 focus:ring-indigo-500 outline-none`}
//                       />
//                     </div>

//                     <div>
//                       <label
//                         className={`block text-sm font-medium mb-2 ${
//                           darkMode ? "text-gray-300" : "text-gray-700"
//                         }`}
//                       >
//                         Date
//                       </label>
//                       <input
//                         type="date"
//                         value={newActivity.date}
//                         onChange={(e) =>
//                           setNewActivity({
//                             ...newActivity,
//                             date: e.target.value,
//                           })
//                         }
//                         className={`w-full px-4 py-3 rounded-lg border ${
//                           darkMode
//                             ? "bg-gray-800 border-gray-700 text-white"
//                             : "bg-white border-gray-300 text-gray-900"
//                         } focus:ring-2 focus:ring-indigo-500 outline-none`}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label
//                       className={`block text-sm font-medium mb-2 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       Category
//                     </label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {LEARNING_CATEGORIES.map((cat) => (
//                         <button
//                           key={cat.id}
//                           onClick={() =>
//                             setNewActivity({ ...newActivity, category: cat.id })
//                           }
//                           className={`p-3 rounded-lg font-medium border transition ${
//                             newActivity.category === cat.id
//                               ? "bg-indigo-600 text-white border-indigo-600"
//                               : darkMode
//                               ? "bg-gray-800 border-gray-700 text-gray-300"
//                               : "bg-gray-50 border-gray-300 text-gray-700"
//                           }`}
//                         >
//                           {cat.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <label
//                       className={`block text-sm font-medium mb-2 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       Description (Optional)
//                     </label>
//                     <textarea
//                       value={newActivity.description}
//                       onChange={(e) =>
//                         setNewActivity({
//                           ...newActivity,
//                           description: e.target.value,
//                         })
//                       }
//                       placeholder="What did you learn?"
//                       rows={3}
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         darkMode
//                           ? "bg-gray-800 border-gray-700 text-white"
//                           : "bg-white border-gray-300 text-gray-900"
//                       } focus:ring-2 focus:ring-indigo-500 outline-none`}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-3 mt-6">
//                   <button
//                     onClick={() => setShowAddModal(false)}
//                     className={`flex-1 px-6 py-3 rounded-xl font-semibold ${
//                       darkMode
//                         ? "bg-gray-800 text-gray-300"
//                         : "bg-gray-200 text-gray-700"
//                     }`}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={addActivity}
//                     className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold"
//                   >
//                     Add Activity
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Add Goal Modal */}
//         <AnimatePresence>
//           {showGoalModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
//               onClick={() => setShowGoalModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.9, y: 20 }}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full max-w-lg p-6 rounded-2xl ${
//                   darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"
//                 }`}
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h3
//                     className={`text-xl font-bold ${
//                       darkMode ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     Set Learning Goal
//                   </h3>
//                   <button onClick={() => setShowGoalModal(false)}>
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label
//                       className={`block text-sm font-medium mb-2 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       Goal Title *
//                     </label>
//                     <input
//                       type="text"
//                       value={newGoal.title}
//                       onChange={(e) =>
//                         setNewGoal({ ...newGoal, title: e.target.value })
//                       }
//                       placeholder="e.g., Complete React Course"
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         darkMode
//                           ? "bg-gray-800 border-gray-700 text-white"
//                           : "bg-white border-gray-300 text-gray-900"
//                       } focus:ring-2 focus:ring-indigo-500 outline-none`}
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label
//                         className={`block text-sm font-medium mb-2 ${
//                           darkMode ? "text-gray-300" : "text-gray-700"
//                         }`}
//                       >
//                         Target Hours *
//                       </label>
//                       <input
//                         type="number"
//                         value={newGoal.targetHours}
//                         onChange={(e) =>
//                           setNewGoal({
//                             ...newGoal,
//                             targetHours: e.target.value,
//                           })
//                         }
//                         placeholder="20"
//                         className={`w-full px-4 py-3 rounded-lg border ${
//                           darkMode
//                             ? "bg-gray-800 border-gray-700 text-white"
//                             : "bg-white border-gray-300 text-gray-900"
//                         } focus:ring-2 focus:ring-indigo-500 outline-none`}
//                       />
//                     </div>

//                     <div>
//                       <label
//                         className={`block text-sm font-medium mb-2 ${
//                           darkMode ? "text-gray-300" : "text-gray-700"
//                         }`}
//                       >
//                         Deadline
//                       </label>
//                       <input
//                         type="date"
//                         value={newGoal.deadline}
//                         onChange={(e) =>
//                           setNewGoal({ ...newGoal, deadline: e.target.value })
//                         }
//                         className={`w-full px-4 py-3 rounded-lg border ${
//                           darkMode
//                             ? "bg-gray-800 border-gray-700 text-white"
//                             : "bg-white border-gray-300 text-gray-900"
//                         } focus:ring-2 focus:ring-indigo-500 outline-none`}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label
//                       className={`block text-sm font-medium mb-2 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       Category
//                     </label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {LEARNING_CATEGORIES.map((cat) => (
//                         <button
//                           key={cat.id}
//                           onClick={() =>
//                             setNewGoal({ ...newGoal, category: cat.id })
//                           }
//                           className={`p-3 rounded-lg font-medium border transition ${
//                             newGoal.category === cat.id
//                               ? "bg-indigo-600 text-white border-indigo-600"
//                               : darkMode
//                               ? "bg-gray-800 border-gray-700 text-gray-300"
//                               : "bg-gray-50 border-gray-300 text-gray-700"
//                           }`}
//                         >
//                           {cat.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 mt-6">
//                   <button
//                     onClick={() => setShowGoalModal(false)}
//                     className={`flex-1 px-6 py-3 rounded-xl font-semibold ${
//                       darkMode
//                         ? "bg-gray-800 text-gray-300"
//                         : "bg-gray-200 text-gray-700"
//                     }`}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={addGoal}
//                     className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold"
//                   >
//                     Set Goal
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sun,
  Moon,
  Plus,
  X,
  Save,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Target,
  BookOpen,
  Trash2,
  Download,
  Bell,
  Flame,
  BarChart3,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const LEARNING_CATEGORIES = [
  {
    id: "technical",
    label: "Technical Skills",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Target,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "courses",
    label: "Online Courses",
    icon: Award,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "reading",
    label: "Reading/Docs",
    icon: BookOpen,
    color: "from-orange-500 to-red-500",
  },
];

export default function LearningTracker() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [learningData, setLearningData] = useState(() => {
    const saved = localStorage.getItem("learningData");
    return saved
      ? JSON.parse(saved)
      : {
          weeklyHours: [],
          activities: [],
          goals: [],
          streak: 0,
          lastActivityDate: null,
        };
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [newActivity, setNewActivity] = useState({
    title: "",
    category: "technical",
    hours: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [newGoal, setNewGoal] = useState({
    title: "",
    targetHours: "",
    deadline: "",
    category: "technical",
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Update streak
  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = learningData.lastActivityDate;
    if (lastDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastDate === yesterdayStr) {
      setLearningData((prev) => ({
        ...prev,
        streak: prev.streak + 1,
        lastActivityDate: today,
      }));
    } else if (lastDate !== today) {
      setLearningData((prev) => ({
        ...prev,
        streak: 1,
        lastActivityDate: today,
      }));
    }
  }, [learningData.activities]);

  const saveData = () => {
    localStorage.setItem("learningData", JSON.stringify(learningData));
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const addActivity = () => {
    if (!newActivity.title || !newActivity.hours) {
      alert("Please fill title and hours!");
      return;
    }

    const activity = {
      ...newActivity,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };

    setLearningData((prev) => ({
      ...prev,
      activities: [activity, ...prev.activities],
    }));

    setNewActivity({
      title: "",
      category: "technical",
      hours: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });

    setShowAddModal(false);
    saveData();
  };

  const deleteActivity = (id) => {
    if (!confirm("Delete this activity?")) return;
    setLearningData((prev) => ({
      ...prev,
      activities: prev.activities.filter((a) => a.id !== id),
    }));
    saveData();
  };

  const addGoal = () => {
    if (!newGoal.title || !newGoal.targetHours) {
      alert("Please fill goal details!");
      return;
    }

    const goal = {
      ...newGoal,
      id: Date.now(),
      progress: 0,
      completed: false,
    };

    setLearningData((prev) => ({
      ...prev,
      goals: [...prev.goals, goal],
    }));

    setNewGoal({
      title: "",
      targetHours: "",
      deadline: "",
      category: "technical",
    });

    setShowGoalModal(false);
    saveData();
  };

  const deleteGoal = (id) => {
    if (!confirm("Delete this goal?")) return;
    setLearningData((prev) => ({
      ...prev,
      goals: prev.goals.filter((g) => g.id !== id),
    }));
    saveData();
  };

  const toggleGoalComplete = (id) => {
    setLearningData((prev) => ({
      ...prev,
      goals: prev.goals.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g
      ),
    }));
    saveData();
  };

  const exportData = (format) => {
    let dataStr = "";
    if (format === "json") {
      dataStr = JSON.stringify(learningData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "learning-data.json";
      a.click();
    } else if (format === "csv") {
      const csv = [
        "Title,Category,Hours,Date,Description",
        ...learningData.activities.map((a) =>
          `"${a.title}","${a.category}","${a.hours}","${a.date}","${a.description}"`
        ),
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "learning-activities.csv";
      a.click();
    }
    setShowExportModal(false);
  };

  // Calculate weekly stats
  const getWeeklyData = () => {
    const weeks = [];
    const now = new Date();

    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const weekActivities = learningData.activities.filter((a) => {
        const actDate = new Date(a.date);
        return actDate >= weekStart && actDate <= weekEnd;
      });

      const totalHours = weekActivities.reduce(
        (sum, a) => sum + parseFloat(a.hours || 0),
        0
      );

      weeks.push({
        label: `W${4 - i}`,
        hours: totalHours,
        activities: weekActivities.length,
      });
    }

    return weeks;
  };

  const weeklyData = getWeeklyData();
  const totalHours = learningData.activities.reduce(
    (sum, a) => sum + parseFloat(a.hours || 0),
    0
  );
  const totalActivities = learningData.activities.length;
  const avgHoursPerWeek =
    weeklyData.length > 0
      ? (
          weeklyData.reduce((sum, w) => sum + w.hours, 0) / weeklyData.length
        ).toFixed(1)
      : 0;

  // Check for notifications
  useEffect(() => {
    const overdueGoals = learningData.goals.filter(
      (g) => !g.completed && g.deadline && new Date(g.deadline) < new Date()
    );
    setNotifications(overdueGoals.map((g) => `Goal "${g.title}" is overdue!`));
  }, [learningData.goals]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark bg-gray-950"
          : "bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => (window.location.href = "/dashboard")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
            } transition`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft
              className={`w-5 h-5  ${darkMode ? "text-white" : "text-black"}`}
            />
            {/* <span className="hidden sm:inline font-medium">Back to Dashboard</span> */}
          </motion.button>

          <div className="flex items-center gap-2">
            <TrendingUp
              className={`w-6 h-6 ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
            <h1
              className={`text-xl md:text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Learning Tracker
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <motion.button
                onClick={() => setNotifications([])}
                className="relative p-2 rounded-lg bg-red-500 text-white"
                whileHover={{ scale: 1.1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-white text-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              </motion.button>
            )}
            <motion.button
              onClick={() => setShowExportModal(true)}
              className={`p-3 rounded-lg ${
                darkMode
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-gray-100 text-gray-700"
              } transition`}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
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
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
          >
            <div className="bg-red-500 text-white p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <div>
                <strong>Notifications:</strong> {notifications.join(", ")}
              </div>
              <button
                onClick={() => setNotifications([])}
                className="ml-auto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <AnimatePresence>
          {showSaveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-xl bg-green-500 text-white font-medium text-center shadow-lg"
            >
              ✓ Data saved successfully!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl ${
              darkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Hours
                </div>
                <div
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {totalHours.toFixed(1)}
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl ${
              darkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Activities
                </div>
                <div
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {totalActivities}
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-2xl ${
              darkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Avg/Week
                </div>
                <div
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {avgHoursPerWeek}h
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-2xl ${
              darkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Goals
                </div>
                <div
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {learningData.goals.filter((g) => g.completed).length}/
                  {learningData.goals.length}
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

                    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-6 rounded-2xl ${
              darkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Streak
                </div>
                <div
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {learningData.streak}
                </div>
                <div
                  className={`text-xs ${
                    darkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  days
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column: Chart + Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-3xl ${
                darkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white shadow-xl"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Weekly Progress
                </h2>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Last 4 weeks
                </div>
              </div>

              <div className="flex items-end gap-4 h-48">
                {weeklyData.map((week, idx) => {
                  const maxHours = Math.max(
                    ...weeklyData.map((w) => w.hours),
                    10
                  );
                  const heightPct = (week.hours / maxHours) * 100;

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-purple-600 min-h-[20px]"
                      />
                      <div
                        className={`text-sm mt-2 font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {week.label}
                      </div>
                      <div
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {week.hours.toFixed(1)}h
                      </div>
                      <div
                        className={`text-xs ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {week.activities} activities
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-3xl ${
                darkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white shadow-xl"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Recent Activities
                </h2>
                <motion.button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                  Add Activity
                </motion.button>
              </div>

              {learningData.activities.length === 0 ? (
                <div
                  className={`text-center py-12 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    No activities yet. Start tracking your learning!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {learningData.activities.map((activity, idx) => {
                    const category = LEARNING_CATEGORIES.find(
                      (c) => c.id === activity.category
                    );
                    const Icon = category?.icon || BookOpen;

                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`p-4 rounded-xl ${
                          darkMode
                            ? "bg-gray-800 border border-gray-700"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category?.color} flex items-center justify-center flex-shrink-0`}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div
                                className={`font-semibold ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {activity.title}
                              </div>
                              {activity.description && (
                                <div
                                  className={`text-sm mt-1 ${
                                    darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  {activity.description}
                                </div>
                              )}
                              <div
                                className={`flex items-center gap-3 mt-2 text-xs ${
                                  darkMode ? "text-gray-500" : "text-gray-500"
                                }`}
                              >
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {activity.hours}h
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(activity.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => deleteActivity(activity.id)}
                            className={`p-2 rounded-lg ${
                              darkMode
                                ? "hover:bg-gray-700 text-red-400"
                                : "hover:bg-gray-200 text-red-600"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-3xl ${
              darkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white shadow-xl"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Learning Goals
              </h2>
              <motion.button
                onClick={() => setShowGoalModal(true)}
                className="p-2 rounded-lg bg-indigo-600 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>

            {learningData.goals.length === 0 ? (
              <div
                className={`text-center py-12 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No goals set yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {learningData.goals.map((goal, idx) => {
                  const category = LEARNING_CATEGORIES.find(
                    (c) => c.id === goal.category
                  );

                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-4 rounded-xl ${
                        goal.completed
                          ? darkMode
                            ? "bg-green-900/20 border border-green-800"
                            : "bg-green-50 border border-green-200"
                          : darkMode
                          ? "bg-gray-800 border border-gray-700"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div
                            className={`font-semibold ${
                              goal.completed ? "line-through opacity-60" : ""
                            } ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {goal.title}
                          </div>
                          <div
                            className={`text-xs mt-1 ${
                              darkMode ? "text-gray-500" : "text-gray-600"
                            }`}
                          >
                            Target: {goal.targetHours}h
                            {goal.deadline &&
                              ` • ${new Date(
                                goal.deadline
                              ).toLocaleDateString()}`}
                          </div>
                        </div>
                        <motion.button
                          onClick={() => deleteGoal(goal.id)}
                          className={`p-1 rounded ${
                            darkMode
                              ? "hover:bg-gray-700 text-red-400"
                              : "hover:bg-gray-200 text-red-600"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>

                      <motion.button
                        onClick={() => toggleGoalComplete(goal.id)}
                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium ${
                          goal.completed
                            ? "bg-green-600 text-white"
                            : darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {goal.completed ? "✓ Completed" : "Mark Complete"}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* Add Activity Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-lg p-6 rounded-2xl ${
                  darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Add Learning Activity
                  </h3>
                  <button onClick={() => setShowAddModal(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Activity Title *
                    </label>
                    <input
                      type="text"
                      value={newActivity.title}
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g., React Tutorial"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-indigo-500 outline-none`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Hours *
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={newActivity.hours}
                        onChange={(e) =>
                          setNewActivity({
                            ...newActivity,
                            hours: e.target.value,
                          })
                        }
                        placeholder="2.5"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        } focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        value={newActivity.date}
                        onChange={(e) =>
                          setNewActivity({
                            ...newActivity,
                            date: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        } focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {LEARNING_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() =>
                            setNewActivity({ ...newActivity, category: cat.id })
                          }
                          className={`p-3 rounded-lg font-medium border transition ${
                            newActivity.category === cat.id
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : darkMode
                              ? "bg-gray-800 border-gray-700 text-gray-300"
                              : "bg-gray-50 border-gray-300 text-gray-700"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Description (Optional)
                    </label>
                    <textarea
                      value={newActivity.description}
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          description: e.target.value,
                        })
                      }
                      placeholder="What did you learn?"
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-indigo-500 outline-none`}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold ${
                      darkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addActivity}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold"
                  >
                    Add Activity
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

                {/* Add Goal Modal */}
        <AnimatePresence>
          {showGoalModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setShowGoalModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-lg p-6 rounded-2xl ${
                  darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Set Learning Goal
                  </h3>
                  <button onClick={() => setShowGoalModal(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Goal Title *
                    </label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, title: e.target.value })
                      }
                      placeholder="e.g., Complete React Course"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-indigo-500 outline-none`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Target Hours *
                      </label>
                      <input
                        type="number"
                        value={newGoal.targetHours}
                        onChange={(e) =>
                          setNewGoal({
                            ...newGoal,
                            targetHours: e.target.value,
                          })
                        }
                        placeholder="20"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        } focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Deadline
                      </label>
                      <input
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, deadline: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        } focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {LEARNING_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() =>
                            setNewGoal({ ...newGoal, category: cat.id })
                          }
                          className={`p-3 rounded-lg font-medium border transition ${
                            newGoal.category === cat.id
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : darkMode
                              ? "bg-gray-800 border-gray-700 text-gray-300"
                              : "bg-gray-50 border-gray-300 text-gray-700"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowGoalModal(false)}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold ${
                      darkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addGoal}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold"
                  >
                    Set Goal
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Export Modal */}
        <AnimatePresence>
          {showExportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setShowExportModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-md p-6 rounded-2xl ${
                  darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Export Data
                  </h3>
                  <button onClick={() => setShowExportModal(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => exportData("json")}
                    className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold"
                  >
                    Export as JSON
                  </button>
                  <button
                    onClick={() => exportData("csv")}
                    className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold"
                  >
                    Export as CSV
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}