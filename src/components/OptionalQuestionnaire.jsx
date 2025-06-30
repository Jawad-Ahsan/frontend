import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, ChevronRight, SkipForward } from "react-feather";
import axios from "axios";
import { toast } from "react-hot-toast";

const OptionalQuestionnaire = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    raceEthnicity: "",
    occupation: "",
    livingSituation: "",
    foodHousing: "",
    stressLevel: "",
    mentalHealthHistory: "",
    sleepQuality: "",
    sexualActivity: "",
    contraceptiveUse: "",
    pregnancyStatus: "",
    preferredLanguage: "",
    culturalConsiderations: "",
    allergies: "",
    diet: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://localhost:8000/optional-questionnaire",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Optional questionnaire submitted successfully!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.response?.data?.detail ||
          "Failed to submit optional questionnaire"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    navigate("/home");
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
              Optional Health Questionnaire
            </motion.h1>
            <motion.p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Additional information to help personalize your experience
            </motion.p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Social Determinants */}
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-600" : "bg-gray-50"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">
                Social Determinants of Health
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Race/Ethnicity
                  </label>
                  <select
                    name="raceEthnicity"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.raceEthnicity}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="white">White</option>
                    <option value="black">Black/African American</option>
                    <option value="hispanic">Hispanic/Latino</option>
                    <option value="asian">Asian</option>
                    <option value="native">Native American</option>
                    <option value="pacific">Pacific Islander</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Living Situation
                  </label>
                  <select
                    name="livingSituation"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.livingSituation}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="alone">Alone</option>
                    <option value="with-family">With family</option>
                    <option value="with-roommates">With roommates</option>
                    <option value="homeless">Homeless</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Access to Healthy Food & Safe Housing
                  </label>
                  <select
                    name="foodHousing"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.foodHousing}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mental Health */}
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-600" : "bg-gray-50"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">
                Mental & Emotional Health
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Stress Levels
                  </label>
                  <select
                    name="stressLevel"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.stressLevel}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="very-high">Very High</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    History of Anxiety/Depression
                  </label>
                  <select
                    name="mentalHealthHistory"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.mentalHealthHistory}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="none">None</option>
                    <option value="self-diagnosed">Self-diagnosed</option>
                    <option value="diagnosed">Professionally diagnosed</option>
                    <option value="treated">Currently treated</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Sleep Quality
                  </label>
                  <select
                    name="sleepQuality"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.sleepQuality}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Health Preferences */}
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-600" : "bg-gray-50"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">Health Preferences</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Preferred Language
                  </label>
                  <input
                    type="text"
                    name="preferredLanguage"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Cultural/Religious Considerations
                  </label>
                  <input
                    type="text"
                    name="culturalConsiderations"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.culturalConsiderations}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Known Allergies
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.allergies}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Diet
                  </label>
                  <select
                    name="diet"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "border-gray-500 bg-gray-700 text-white focus:ring-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-500"
                    }`}
                    value={formData.diet}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="standard">Standard</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-free</option>
                    <option value="keto">Keto</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <motion.button
                type="button"
                onClick={handleSkip}
                className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                  darkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-200 hover:bg-gray-300"
                } ${darkMode ? "text-white" : "text-gray-700"}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                Skip <SkipForward className="ml-2" />
              </motion.button>

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
                    Continue to Home <ChevronRight className="ml-2" />
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

export default OptionalQuestionnaire;
