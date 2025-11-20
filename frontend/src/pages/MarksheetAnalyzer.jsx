import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sun,
  Moon,
  Upload,
  Plus,
  X,
  Save,
  Camera,
  FileText,
  TrendingUp,
  Award,
  BookOpen,
  Trash2,
} from "lucide-react";

const STREAM_SUBJECTS = {
  PCM: ["Physics", "Chemistry", "Mathematics"],
  PCB: ["Physics", "Chemistry", "Biology"],
  PCMB: ["Physics", "Chemistry", "Mathematics", "Biology"],
  Commerce: ["Accountancy", "Business Studies", "Economics"],
  Arts: ["History", "Political Science", "Economics", "Sociology"],
};

const CLASSES = ["8th", "9th", "10th", "11th", "12th"];
const STREAMS = ["PCM", "PCB", "PCMB", "Commerce", "Arts"];

export default function MarksheetAnalyzer() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [savedMarksheets, setSavedMarksheets] = useState(() => {
    const saved = localStorage.getItem("marksheets");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentClass, setCurrentClass] = useState("");
  const [currentStream, setCurrentStream] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [additionalSubjects, setAdditionalSubjects] = useState([]);
  const [uploadMode, setUploadMode] = useState("manual"); // manual or upload
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    if (currentStream && STREAM_SUBJECTS[currentStream]) {
      const mainSubjects = STREAM_SUBJECTS[currentStream].map((name) => ({
        name,
        marks: "",
        isMain: true,
      }));
      setSubjects(mainSubjects);
    }
  }, [currentStream]);

  const handleClassChange = (cls) => {
    setCurrentClass(cls);
    if (cls === "11th" || cls === "12th") {
      // Stream required
    } else {
      setCurrentStream("");
      setSubjects([]);
      setAdditionalSubjects([]);
    }
    setShowResult(false);
  };

  const handleMarksChange = (index, value, isAdditional = false) => {
    const marks = parseInt(value) || 0;
    if (marks > 100) return;

    if (isAdditional) {
      const updated = [...additionalSubjects];
      updated[index].marks = value;
      setAdditionalSubjects(updated);
    } else {
      const updated = [...subjects];
      updated[index].marks = value;
      setSubjects(updated);
    }
  };

  const addAdditionalSubject = () => {
    setAdditionalSubjects([
      ...additionalSubjects,
      { name: "", marks: "", isMain: false },
    ]);
  };

  const updateAdditionalSubjectName = (index, name) => {
    const updated = [...additionalSubjects];
    updated[index].name = name;
    setAdditionalSubjects(updated);
  };

  const removeAdditionalSubject = (index) => {
    setAdditionalSubjects(additionalSubjects.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulate OCR processing
    setTimeout(() => {
      // Demo data - in real app, this would use OCR library
      const demoData = [
        { name: "Mathematics", marks: "92", isMain: true },
        { name: "Physics", marks: "88", isMain: true },
        { name: "Chemistry", marks: "85", isMain: true },
        { name: "English", marks: "78", isMain: false },
      ];

      setSubjects(demoData.filter((s) => s.isMain));
      setAdditionalSubjects(demoData.filter((s) => !s.isMain));
      alert("✓ Marksheet scanned successfully!");
    }, 1500);
  };

  const calculateResult = () => {
    const allSubjects = [...subjects, ...additionalSubjects].filter(
      (s) => s.name && s.marks
    );

    if (allSubjects.length === 0) {
      alert("Please enter at least one subject with marks!");
      return;
    }

    const total = allSubjects.reduce(
      (sum, s) => sum + (parseInt(s.marks) || 0),
      0
    );
    const percentage = (total / (allSubjects.length * 100)) * 100;

    const sorted = [...allSubjects].sort(
      (a, b) => parseInt(b.marks) - parseInt(a.marks)
    );
    const topSubjects = sorted.slice(0, 3).map((s) => s.name);

    const mainSubjectAvg =
      subjects.length > 0
        ? subjects.reduce((sum, s) => sum + (parseInt(s.marks) || 0), 0) /
          subjects.length
        : 0;

    let recommendedFields = [];
    if (currentStream === "PCM" || currentStream === "PCMB") {
      recommendedFields = [
        "Engineering",
        "Computer Science",
        "Data Science",
        "Research",
      ];
    } else if (currentStream === "PCB") {
      recommendedFields = [
        "Medicine",
        "Biotechnology",
        "Life Sciences",
        "Healthcare",
      ];
    } else if (currentStream === "Commerce") {
      recommendedFields = ["Business", "Finance", "CA", "Economics"];
    } else if (currentStream === "Arts") {
      recommendedFields = ["Humanities", "Social Work", "Law", "Journalism"];
    } else {
      recommendedFields = ["Science", "Commerce", "Arts", "Technology"];
    }

    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B+";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else grade = "D";

    setResult({
      class: currentClass,
      stream: currentStream,
      subjects: allSubjects,
      total,
      percentage: percentage.toFixed(2),
      grade,
      topSubjects,
      mainSubjectAvg: mainSubjectAvg.toFixed(2),
      recommendedFields,
      timestamp: new Date().toISOString(),
    });

    setShowResult(true);
  };

  const saveMarksheet = () => {
    if (!result) return;

    const updated = [...savedMarksheets, result];
    setSavedMarksheets(updated);
    localStorage.setItem("marksheets", JSON.stringify(updated));

    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const deleteMarksheet = (index) => {
    if (!confirm("Are you sure you want to delete this marksheet?")) return;

    const updated = savedMarksheets.filter((_, i) => i !== index);
    setSavedMarksheets(updated);
    localStorage.setItem("marksheets", JSON.stringify(updated));
  };

  const resetForm = () => {
    setCurrentClass("");
    setCurrentStream("");
    setSubjects([]);
    setAdditionalSubjects([]);
    setShowResult(false);
    setResult(null);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark bg-gray-950"
          : "bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50"
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
            {/* <span className="font-medium">Back to Dashboard</span> */}
          </motion.button>

          <div className="flex items-center gap-2">
            <BookOpen
              className={`w-6 h-6 ${
                darkMode ? "text-emerald-400" : "text-emerald-600"
              }`}
            />
            <h1
              className={`text-xl md:text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Marksheet Analyzer
            </h1>
          </div>

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
      </header>

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
              ✓ Marksheet saved successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-2 p-6 rounded-3xl ${
              darkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white shadow-xl"
            }`}
          >
            <h2
              className={`text-xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Enter Marksheet Details
            </h2>

            {/* Class Selection */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Select Class *
              </label>
              <div className="grid grid-cols-5 gap-2">
                {CLASSES.map((cls) => (
                  <motion.button
                    key={cls}
                    onClick={() => handleClassChange(cls)}
                    className={`p-3 rounded-lg font-medium border transition ${
                      currentClass === cls
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600"
                        : darkMode
                        ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-750"
                        : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cls}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Stream Selection (for 11th/12th) */}
            {(currentClass === "11th" || currentClass === "12th") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6"
              >
                <label
                  className={`block text-sm font-medium mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Select Stream *
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {STREAMS.map((stream) => (
                    <motion.button
                      key={stream}
                      onClick={() => setCurrentStream(stream)}
                      className={`p-2 rounded-lg text-sm font-medium border transition ${
                        currentStream === stream
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : darkMode
                          ? "bg-gray-800 border-gray-700 text-gray-300"
                          : "bg-gray-50 border-gray-300 text-gray-700"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {stream}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Upload Mode Toggle */}
            {currentClass && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <div className="flex gap-3 mb-4">
                  <motion.button
                    onClick={() => setUploadMode("manual")}
                    className={`flex-1 p-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      uploadMode === "manual"
                        ? "bg-emerald-600 text-white"
                        : darkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FileText className="w-4 h-4" />
                    Manual Entry
                  </motion.button>
                  <motion.button
                    onClick={() => setUploadMode("upload")}
                    className={`flex-1 p-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      uploadMode === "upload"
                        ? "bg-emerald-600 text-white"
                        : darkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Camera className="w-4 h-4" />
                    Upload Image
                  </motion.button>
                </div>

                {/* Upload Section */}
                {uploadMode === "upload" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`p-6 rounded-2xl border-2 border-dashed ${
                      darkMode
                        ? "border-gray-700 bg-gray-800/50"
                        : "border-gray-300 bg-gray-50"
                    }`}
                  >
                    <div className="text-center">
                      <Upload
                        className={`w-12 h-12 mx-auto mb-3 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <p
                        className={`text-sm mb-3 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Upload marksheet photo for automatic scanning
                      </p>
                      <label className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium cursor-pointer hover:bg-emerald-700 transition">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        Choose Image
                      </label>
                      <p
                        className={`text-xs mt-2 ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        Supports: JPG, PNG (Max 5MB)
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Manual Entry */}
                {uploadMode === "manual" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Main Subjects */}
                    {subjects.length > 0 && (
                      <div
                        className={`p-4 rounded-2xl ${
                          darkMode
                            ? "bg-gray-800/50 border border-gray-700"
                            : "bg-emerald-50 border border-emerald-200"
                        }`}
                      >
                        <h3
                          className={`text-sm font-semibold mb-3 ${
                            darkMode ? "text-emerald-400" : "text-emerald-700"
                          }`}
                        >
                          Main Subjects ({currentStream})
                        </h3>
                        <div className="space-y-3">
                          {subjects.map((subject, idx) => (
                            <div key={idx} className="flex gap-3">
                              <div
                                className={`flex-1 px-4 py-3 rounded-lg font-medium ${
                                  darkMode
                                    ? "bg-gray-900 text-white"
                                    : "bg-white text-gray-900"
                                }`}
                              >
                                {subject.name}
                              </div>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={subject.marks}
                                onChange={(e) =>
                                  handleMarksChange(idx, e.target.value)
                                }
                                placeholder="Marks"
                                className={`w-24 px-4 py-3 rounded-lg border text-center font-medium ${
                                  darkMode
                                    ? "bg-gray-900 border-gray-700 text-white"
                                    : "bg-white border-gray-300 text-gray-900"
                                } focus:ring-2 focus:ring-emerald-500 outline-none`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Subjects */}
                    <div
                      className={`p-4 rounded-2xl ${
                        darkMode
                          ? "bg-gray-800/50 border border-gray-700"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          className={`text-sm font-semibold ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Additional Subjects
                        </h3>
                        <motion.button
                          onClick={addAdditionalSubject}
                          className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {additionalSubjects.length === 0 ? (
                        <p
                          className={`text-xs text-center py-4 ${
                            darkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          Click + to add more subjects
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {additionalSubjects.map((subject, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input
                                type="text"
                                value={subject.name}
                                onChange={(e) =>
                                  updateAdditionalSubjectName(
                                    idx,
                                    e.target.value
                                  )
                                }
                                placeholder="Subject name"
                                className={`flex-1 px-4 py-3 rounded-lg border ${
                                  darkMode
                                    ? "bg-gray-900 border-gray-700 text-white"
                                    : "bg-white border-gray-300 text-gray-900"
                                } focus:ring-2 focus:ring-emerald-500 outline-none`}
                              />
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={subject.marks}
                                onChange={(e) =>
                                  handleMarksChange(idx, e.target.value, true)
                                }
                                placeholder="Marks"
                                className={`w-24 px-4 py-3 rounded-lg border text-center ${
                                  darkMode
                                    ? "bg-gray-900 border-gray-700 text-white"
                                    : "bg-white border-gray-300 text-gray-900"
                                } focus:ring-2 focus:ring-emerald-500 outline-none`}
                              />
                              <motion.button
                                onClick={() => removeAdditionalSubject(idx)}
                                className={`p-3 rounded-lg ${
                                  darkMode
                                    ? "hover:bg-gray-700 text-red-400"
                                    : "hover:bg-gray-200 text-red-600"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="w-5 h-5" />
                              </motion.button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            {currentClass && (
              <div className="flex gap-3">
                <motion.button
                  onClick={calculateResult}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrendingUp className="w-5 h-5" />
                  Analyze Results
                </motion.button>
                <motion.button
                  onClick={resetForm}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reset
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Right: Results & Saved Marksheets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Current Result */}
            {showResult && result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-3xl ${
                  darkMode
                    ? "bg-gray-900 border border-gray-800"
                    : "bg-white shadow-xl"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Analysis Result
                  </h2>
                  <div
                    className={`px-4 py-2 rounded-full text-2xl font-bold ${
                      result.grade === "A+" || result.grade === "A"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                    }`}
                  >
                    {result.grade}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Class
                    </div>
                    <div
                      className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {result.class} {result.stream && `(${result.stream})`}
                    </div>
                  </div>

                  <div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Percentage
                    </div>
                    <div
                      className={`text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent`}
                    >
                      {result.percentage}%
                    </div>
                  </div>

                  <div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mb-2`}
                    >
                      Top Subjects
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.topSubjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mb-2`}
                    >
                      Recommended Fields
                    </div>
                    <div className="space-y-1">
                      {result.recommendedFields.map((field, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <Award className="w-4 h-4 text-emerald-600" />
                          {field}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={saveMarksheet}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="w-5 h-5" />
                  Save Marksheet
                </motion.button>
              </motion.div>
            )}

            {/* Saved Marksheets */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-6 rounded-3xl ${
                darkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white shadow-xl"
              }`}
            >
              <h2
                className={`text-xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Saved Marksheets ({savedMarksheets.length})
              </h2>

              {savedMarksheets.length === 0 ? (
                <div
                  className={`text-center py-8 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No marksheets saved yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {savedMarksheets
                    .slice()
                    .reverse()
                    .map((ms, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`p-4 rounded-lg ${
                          darkMode
                            ? "bg-gray-800 border border-gray-700"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`font-semibold ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {ms.class} {ms.stream && `(${ms.stream})`}
                              </span>
                              <span
                                className={`px-2 py-1 rounded text-xs font-bold ${
                                  ms.grade === "A+" || ms.grade === "A"
                                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                }`}
                              >
                                {ms.grade}
                              </span>
                            </div>
                            <div
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {ms.percentage}% • {ms.subjects.length} subjects
                            </div>
                          </div>
                          <motion.button
                            onClick={() =>
                              deleteMarksheet(savedMarksheets.length - 1 - idx)
                            }
                            className={`p-2 rounded-lg ${
                              darkMode
                                ? "hover:bg-gray-700 text-red-400"
                                : "hover:bg-gray-200 text-red-600"
                            } transition`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
