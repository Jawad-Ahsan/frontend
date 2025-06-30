import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, ChevronRight } from "react-feather";
import axios from "axios";
import { toast } from "react-hot-toast";

const MandatoryQuestionnaire = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    chiefComplaint: "",
    currentMedications: "",
    pastConditions: "",
    pastSurgeries: "",
    familyHistory: "",
    lifestyleSmoking: "",
    lifestyleAlcohol: "",
    lifestyleActivity: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("access_token");
      const user_id = localStorage.getItem("user_id");

      if (!token || !user_id) {
        toast.error("Please sign in first");
        navigate("/login");
        return;
      }

      // Prepare data with proper types
      const submissionData = {
        ...formData,
        age: parseInt(formData.age, 10),
        // Ensure all required fields are included
        fullName: formData.fullName.trim(),
        gender: formData.gender,
        chiefComplaint: formData.chiefComplaint.trim(),
        currentMedications: formData.currentMedications.trim(),
        pastConditions: formData.pastConditions.trim(),
        pastSurgeries: formData.pastSurgeries.trim(),
        familyHistory: formData.familyHistory.trim(),
        lifestyleSmoking: formData.lifestyleSmoking,
        lifestyleAlcohol: formData.lifestyleAlcohol,
        lifestyleActivity: formData.lifestyleActivity,
      };

      console.log("Submitting data:", submissionData); // Debug log

      const response = await axios.post(
        "http://localhost:8000/mandatory-questionnaire",
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Questionnaire submitted successfully!");
        navigate("/optional-questionnaire");
      }
    } catch (error) {
      console.error("Full error details:", error); // More detailed logging

      let errorMessage = "Failed to submit questionnaire";
      if (error.response) {
        // Backend returned an error response
        errorMessage =
          error.response.data?.detail ||
          error.response.data?.message ||
          errorMessage;

        // If it's a database error, show a user-friendly message
        if (
          error.response.status === 500 &&
          error.response.data.detail?.includes("Database")
        ) {
          errorMessage =
            "There was a problem saving your information. Please try again.";
        }
      }

      toast.error(errorMessage);

      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        navigate("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 p-4 ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-900"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`w-full max-w-4xl rounded-xl shadow-lg overflow-hidden ${
          darkMode ? "bg-gray-700" : "bg-white"
        }`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-8 relative">
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              darkMode
                ? "bg-gray-600 text-yellow-300"
                : "bg-gray-100 text-gray-700"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <motion.div className="text-center mb-8">
            <motion.h1
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Mandatory Health Questionnaire
            </motion.h1>
            <motion.p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Please complete this required health information
            </motion.p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Identification */}
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-600" : "bg-gray-50"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">
                Patient Identification
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* [Keep all your existing form fields exactly as they were] */}
                {/* Full Name */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? "border-red-500"
                        : darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.age
                        ? "border-red-500"
                        : darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.age}
                    onChange={handleChange}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Gender *
                  </label>
                  <select
                    name="gender"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.gender
                        ? "border-red-500"
                        : darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>
            </div>

            {/* [Keep all other existing sections: Medical History, Lifestyle, etc.] */}
            {/* Medical History Section */}
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-600" : "bg-gray-50"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">Medical History</h2>

              <div className="space-y-4">
                {/* Chief Complaint */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Chief Complaint (Primary reason for seeking help) *
                  </label>
                  <textarea
                    name="chiefComplaint"
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.chiefComplaint
                        ? "border-red-500"
                        : darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.chiefComplaint}
                    onChange={handleChange}
                  />
                  {errors.chiefComplaint && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.chiefComplaint}
                    </p>
                  )}
                </div>

                {/* Current Medications and Past Conditions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Current Medications (including OTC & supplements) *
                    </label>
                    <textarea
                      name="currentMedications"
                      rows={2}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.currentMedications
                          ? "border-red-500"
                          : darkMode
                          ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                          : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                      }`}
                      value={formData.currentMedications}
                      onChange={handleChange}
                    />
                    {errors.currentMedications && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.currentMedications}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Past Medical Conditions (e.g., diabetes, hypertension) *
                    </label>
                    <textarea
                      name="pastConditions"
                      rows={2}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.pastConditions
                          ? "border-red-500"
                          : darkMode
                          ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                          : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                      }`}
                      value={formData.pastConditions}
                      onChange={handleChange}
                    />
                    {errors.pastConditions && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pastConditions}
                      </p>
                    )}
                  </div>
                </div>

                {/* Past Surgeries and Family History */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Previous Surgeries or Hospitalizations *
                    </label>
                    <textarea
                      name="pastSurgeries"
                      rows={2}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.pastSurgeries
                          ? "border-red-500"
                          : darkMode
                          ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                          : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                      }`}
                      value={formData.pastSurgeries}
                      onChange={handleChange}
                    />
                    {errors.pastSurgeries && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pastSurgeries}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Family Medical History (Relevant for Genetic Risks) *
                    </label>
                    <textarea
                      name="familyHistory"
                      rows={2}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.familyHistory
                          ? "border-red-500"
                          : darkMode
                          ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                          : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                      }`}
                      value={formData.familyHistory}
                      onChange={handleChange}
                    />
                    {errors.familyHistory && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.familyHistory}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Lifestyle Section */}
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-600" : "bg-gray-50"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">
                Lifestyle & Risk Factors
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Smoking */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Smoking *
                  </label>
                  <select
                    name="lifestyleSmoking"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.lifestyleSmoking
                        ? "border-red-500"
                        : darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.lifestyleSmoking}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="never">Never</option>
                    <option value="former">Former</option>
                    <option value="current">Current</option>
                  </select>
                  {errors.lifestyleSmoking && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lifestyleSmoking}
                    </p>
                  )}
                </div>

                {/* Alcohol Use */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Alcohol Use *
                  </label>
                  <select
                    name="lifestyleAlcohol"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.lifestyleAlcohol
                        ? "border-red-500"
                        : darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.lifestyleAlcohol}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="never">Never</option>
                    <option value="occasionally">Occasionally</option>
                    <option value="regularly">Regularly</option>
                    <option value="heavy">Heavy</option>
                  </select>
                  {errors.lifestyleAlcohol && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lifestyleAlcohol}
                    </p>
                  )}
                </div>

                {/* Physical Activity */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Physical Activity Level *
                  </label>
                  <select
                    name="lifestyleActivity"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.lifestyleActivity
                        ? "border-red-500"
                        : darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.lifestyleActivity}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                    <option value="very-active">Very Active</option>
                  </select>
                  {errors.lifestyleActivity && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lifestyleActivity}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <motion.button
                type="submit"
                className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                  darkMode
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : (
                  <>
                    Continue to Optional Questions{" "}
                    <ChevronRight className="ml-2" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MandatoryQuestionnaire;
