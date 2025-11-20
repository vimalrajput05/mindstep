import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sun, Moon, Save, Edit2, Camera, X, Check, School, GraduationCap, MapPin, Calendar, Mail, Phone, Award, Target, BookOpen, Crown } from "lucide-react";

const AVATAR_OPTIONS = [
  { id: "boy1", gender: "male", emoji: "👦" },
  { id: "boy2", gender: "male", emoji: "🧑" },
  { id: "boy3", gender: "male", emoji: "👨" },
  { id: "boy4", gender: "male", emoji: "👨‍🎓" },
  { id: "girl1", gender: "female", emoji: "👧" },
  { id: "girl2", gender: "female", emoji: "👩" },
  { id: "girl3", gender: "female", emoji: "🧕" },
  { id: "girl4", gender: "female", emoji: "👩‍🎓" },
];

const COVER_IMAGES = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=400&fit=crop",
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
];

export default function Profile() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      location: "",
      bio: "",
      gender: "",
      avatar: "boy1",
      profilePic: "",
      coverImage: COVER_IMAGES[0],
      educationLevel: "",
      schoolClass: "",
      schoolStream: "",
      schoolName: "",
      collegeName: "",
      collegeCourse: "",
      collegeBranch: "",
      collegeYear: "",
      skills: [],
      interests: [],
    };
  });

  const isAdmin = user?.role === "admin" || user?.plan === "admin";
  const isPremium = user?.plan === "premium" || isAdmin;

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    setIsEditing(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const selectedAvatar = AVATAR_OPTIONS.find(a => a.id === profileData.avatar) || AVATAR_OPTIONS[0];
  const isGradient = profileData.coverImage?.startsWith("linear-gradient");

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/80 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <motion.button
            onClick={() => window.location.href = "/dashboard"}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold hidden sm:inline">Back</span>
          </motion.button>

          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"} hover:scale-105 transition`}>
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {!isEditing && (
              <motion.button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit2 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Profile</span>
              </motion.button>
            )}

            {isEditing && (
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setIsEditing(false)}
                  className={`px-4 py-2 rounded-lg font-semibold ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 sm:hidden" />
                  <span className="hidden sm:inline">Cancel</span>
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold shadow-lg flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Success Message */}
      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-green-500 text-white rounded-xl shadow-2xl font-semibold flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Profile Updated Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Cover Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl overflow-hidden shadow-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"}`}
        >
          {/* Cover Image */}
          <div className="relative h-48 sm:h-64 md:h-80">
            {isGradient ? (
              <div style={{ background: profileData.coverImage }} className="w-full h-full" />
            ) : (
              <img src={profileData.coverImage} alt="Cover" className="w-full h-full object-cover" />
            )}
            
            {isEditing && (
              <motion.button
                onClick={() => setShowCoverPicker(!showCoverPicker)}
                className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm text-white rounded-xl hover:bg-black/70 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Camera className="w-5 h-5" />
              </motion.button>
            )}

            {/* Cover Picker */}
            <AnimatePresence>
              {showCoverPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-16 right-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border dark:border-gray-700 grid grid-cols-4 gap-2 max-w-sm"
                >
                  {COVER_IMAGES.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        handleChange("coverImage", img);
                        setShowCoverPicker(false);
                      }}
                      className={`h-16 rounded-lg overflow-hidden border-2 ${profileData.coverImage === img ? "border-indigo-600" : "border-gray-300 dark:border-gray-600"}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {img.startsWith("linear-gradient") ? (
                        <div style={{ background: img }} className="w-full h-full" />
                      ) : (
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Section */}
          <div className="relative px-4 sm:px-8 pb-6">
            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 sm:-mt-20">
              <div className="relative">
                <motion.div
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 ${darkMode ? "border-gray-900" : "border-white"} shadow-2xl overflow-hidden ${
                    profileData.gender === "male"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                      : profileData.gender === "female"
                      ? "bg-gradient-to-br from-pink-500 to-rose-500"
                      : "bg-gradient-to-br from-gray-500 to-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {profileData.profilePic ? (
                    <img src={profileData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {selectedAvatar.emoji}
                    </div>
                  )}
                </motion.div>

                {isEditing && (
                  <motion.button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicUpload}
                />
              </div>

              {/* Name & Role */}
              <div className="flex-1 text-center sm:text-left mb-4 sm:mb-0">
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter your name"
                    className={`text-2xl sm:text-3xl font-bold mb-2 px-3 py-1 rounded-lg border ${
                      darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-indigo-500 outline-none w-full max-w-md`}
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-bold ">{profileData.name || "Your Name"}</h1>
                )}

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  {isAdmin && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full text-sm font-bold flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      Admin
                    </span>
                  )}
                  {isPremium && !isAdmin && (
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold">
                      Premium
                    </span>
                  )}
                  {profileData.educationLevel === "school" && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                      <School className="w-4 h-4" />
                      {profileData.schoolClass || "School Student"}
                    </span>
                  )}
                  {profileData.educationLevel === "college" && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${darkMode ? "bg-green-900/30 text-green-300" : "bg-green-50 text-green-700"}`}>
                      <GraduationCap className="w-4 h-4" />
                      {profileData.collegeYear || "College Student"}
                    </span>
                  )}
                </div>

                {profileData.bio && !isEditing && (
                  <p className={` text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{profileData.bio}</p>
                )}
              </div>

              {/* Stats (for non-admin) */}
              {!isAdmin && (
                <div className="flex gap-6 sm:gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">5</div>
                    <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">85%</div>
                    <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Progress</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
            >
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <div>
                      <label className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1 block`}>Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1 block`}>Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1 block`}>Location</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        placeholder="City, Country"
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {profileData.email && (
                      <div className="flex items-center gap-3">
                        <Mail className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                        <span className="text-sm">{profileData.email}</span>
                      </div>
                    )}
                    {profileData.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                        <span className="text-sm">{profileData.phone}</span>
                      </div>
                    )}
                    {profileData.location && (
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                        <span className="text-sm">{profileData.location}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>

            {/* Quick Stats (for students) */}
            {!isAdmin && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
              >
                <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm">Tests Completed</span>
                    </div>
                    <span className="font-bold">5/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm">Skills Verified</span>
                    </div>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Learning Hours</span>
                    </div>
                    <span className="font-bold">48h</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
            >
              <h3 className="text-lg font-bold mb-4">About</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"} focus:ring-2 focus:ring-indigo-500 outline-none resize-none`}
                />
              ) : (
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {profileData.bio || "No bio added yet. Click edit to add one!"}
                </p>
              )}
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
            >
              <h3 className="text-lg font-bold mb-4">Education Details</h3>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Education Level</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["school", "college"].map((level) => (
                        <button
                          key={level}
                          onClick={() => handleChange("educationLevel", level)}
                          className={`p-3 rounded-lg font-medium border transition ${
                            profileData.educationLevel === level
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : darkMode
                              ? "bg-gray-800 border-gray-700"
                              : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          {level === "school" ? <School className="w-5 h-5 mx-auto mb-1" /> : <GraduationCap className="w-5 h-5 mx-auto mb-1" />}
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {profileData.educationLevel === "school" && (
                    <>
                      <input
                        type="text"
                        value={profileData.schoolName}
                        onChange={(e) => handleChange("schoolName", e.target.value)}
                        placeholder="School Name"
                        className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                      <select
                        value={profileData.schoolClass}
                        onChange={(e) => handleChange("schoolClass", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none`}
                      >
                        <option value="">Select Class</option>
                        {["8th", "9th", "10th", "11th", "12th"].map((cls) => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                      </select>
                    </>
                  )}

                  {profileData.educationLevel === "college" && (
                    <>
                      <input
                        type="text"
                        value={profileData.collegeName}
                        onChange={(e) => handleChange("collegeName", e.target.value)}
                        placeholder="College Name"
                        className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={profileData.collegeCourse}
                          onChange={(e) => handleChange("collegeCourse", e.target.value)}
                          placeholder="Course (e.g., B.Tech)"
                          className={`px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none`}
                        />
                        <input
                          type="text"
                          value={profileData.collegeBranch}
                          onChange={(e) => handleChange("collegeBranch", e.target.value)}
                          placeholder="Branch"
                          className={`px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none`}
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                  {profileData.educationLevel === "school" ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <School className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                        <span className="font-semibold">{profileData.schoolName || "School not specified"}</span>
                      </div>
                      {profileData.schoolClass && (
                        <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Class: {profileData.schoolClass} {profileData.schoolStream && `(${profileData.schoolStream})`}
                        </div>
                      )}
                    </div>
                  ) : profileData.educationLevel === "college" ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                        <span className="font-semibold">{profileData.collegeName || "College not specified"}</span>
                      </div>
                      {(profileData.collegeCourse || profileData.collegeBranch) && (
                        <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {profileData.collegeCourse} {profileData.collegeBranch && `- ${profileData.collegeBranch}`}
                        </div>
                      )}
                      {profileData.collegeYear && (
                        <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Year: {profileData.collegeYear}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      No education details added yet
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Admin Panel Access (Admin Only) */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-xl`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Admin Controls</h3>
                </div>
                <p className="text-sm mb-4 text-white/90">
                  You have admin privileges. Access advanced features and manage the platform.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition">
                    User Management
                  </button>
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition">
                    Analytics
                  </button>
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition">
                    Content Manager
                  </button>
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition">
                    Settings
                  </button>
                </div>
              </motion.div>
            )}

            {/* Avatar Picker (Editing Mode) */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-lg"}`}
              >
                <h3 className="text-lg font-bold mb-4">Choose Avatar</h3>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {AVATAR_OPTIONS.filter(a => !profileData.gender || a.gender === profileData.gender).map((avatar) => (
                    <motion.button
                      key={avatar.id}
                      onClick={() => handleChange("avatar", avatar.id)}
                      className={`p-3 rounded-xl text-3xl border-2 transition ${
                        profileData.avatar === avatar.id
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                          : darkMode
                          ? "border-gray-700 hover:border-gray-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {avatar.emoji}
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Gender</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["male", "female"].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => handleChange("gender", gender)}
                        className={`p-3 rounded-lg font-medium border transition ${
                          profileData.gender === gender
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : darkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-gray-50 border-gray-300"
                        }`}
                      >
                        {gender === "male" ? "👨 Male" : "👩 Female"}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}