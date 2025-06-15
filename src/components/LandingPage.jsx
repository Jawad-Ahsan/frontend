import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  ChevronRight,
  ArrowUp,
  MessageCircle,
  BookOpen,
  HelpCircle,
  Users,
  BarChart2,
} from "react-feather";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Resources", id: "resources" },
    { name: "FAQ", id: "faq" },
    { name: "About", id: "about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Sample data
  const testimonials = [
    {
      quote:
        "MindMate helped me manage my anxiety better than anything I've tried before.",
      author: "Sarah J.",
      role: "Teacher",
    },
    {
      quote:
        "The mood tracking feature gave me insights into patterns I never noticed.",
      author: "Michael T.",
      role: "Software Developer",
    },
    {
      quote:
        "Finally an app that makes mental health approachable and practical.",
      author: "Lisa M.",
      role: "Nurse",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "92%", label: "Report Improved Mood" },
    { value: "4.9", label: "App Rating" },
    { value: "24/7", label: "Support Available" },
  ];

  const faqs = [
    {
      question: "Is MindMate free to use?",
      answer:
        "Yes, our basic features are completely free. We offer premium features with additional benefits.",
    },
    {
      question: "How does MindMate protect my privacy?",
      answer:
        "We use end-to-end encryption and never share your data with third parties.",
    },
    {
      question: "Can I use MindMate without creating an account?",
      answer:
        "Some features are available without an account, but for full functionality we recommend signing up.",
    },
  ];

  const blogPosts = [
    {
      title: "5 Mindfulness Techniques for Beginners",
      excerpt:
        "Learn simple practices to reduce stress and improve focus in your daily life.",
      category: "Mindfulness",
    },
    {
      title: "Understanding Mood Patterns",
      excerpt:
        "How tracking your emotions can reveal important insights about your mental health.",
      category: "Mental Health",
    },
    {
      title: "Building Resilience Through Journaling",
      excerpt:
        "Discover the therapeutic benefits of regular journaling practice.",
      category: "Journaling",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Navigation Bar */}
      <nav
        className={`sticky top-0 z-50 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-md py-4`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            MindMate
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative"
              >
                <a
                  href={`#${item.id}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    darkMode ? "hover:text-blue-300" : "hover:text-blue-600"
                  } transition-colors`}
                >
                  {item.name}
                </a>
                {hoveredItem === item.id && (
                  <motion.div
                    layoutId="underline"
                    className={`absolute bottom-0 left-0 w-full h-0.5 ${
                      darkMode ? "bg-blue-400" : "bg-blue-600"
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md font-medium ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
              onClick={() => navigate("/login")}
            >
              Log In
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-12 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Mental Wellness
              </span>{" "}
              Companion
            </h1>
            <p
              className={`text-lg mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              MindMate helps you track your mood, practice mindfulness, and
              improve your mental health journey with personalized tools and
              resources.
            </p>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-md font-medium ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
                onClick={() => navigate("/signup")}
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-md font-medium ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                } ${darkMode ? "text-white" : "text-gray-700"}`}
                onClick={() => {
                  const featuresSection = document.getElementById("features");
                  featuresSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className={`md:w-1/2 flex justify-center`}
          >
            <div
              className={`relative w-full max-w-md h-80 rounded-2xl ${
                darkMode ? "bg-gray-700" : "bg-blue-100"
              } overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20"></div>
              <motion.img
                src="https://play-lh.googleusercontent.com/3hasRHyxrNRhLiwAfJTcNEyP1Pq8YMlwpm30ylANoIVVbrFiK_nqE_keJKpyhquOrw=w3840-h2160-rw"
                alt="MindMate App Screenshot"
                className="absolute inset-0 w-full h-full object-cover z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Designed to support your mental health journey with intuitive
              tools and resources
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mood Tracking",
                description:
                  "Track your emotions daily and visualize patterns over time with our intuitive dashboard.",
                icon: "📊",
              },
              {
                title: "Guided Meditations",
                description:
                  "Access a growing library of mindfulness exercises tailored to your needs and experience level.",
                icon: "🧘‍♂️",
              },
              {
                title: "Journal Prompts",
                description:
                  "Thoughtful prompts to help you reflect, process emotions, and cultivate self-awareness.",
                icon: "📝",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white hover:bg-gray-50"
                } shadow-lg hover:shadow-xl transition-all`}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {feature.description}
                </p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className={`flex items-center mt-4 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  } font-medium`}
                >
                  Learn more <ChevronRight size={16} className="ml-1" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        id="stats"
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join thousands who have transformed their mental health journey
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`text-4xl font-bold mb-2 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Real stories from people who found support through MindMate
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } shadow-lg`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      darkMode ? "bg-gray-600" : "bg-blue-100"
                    } flex items-center justify-center mr-4`}
                  >
                    <MessageCircle
                      className={darkMode ? "text-blue-300" : "text-blue-600"}
                    />
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p
                  className={`italic ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources/Blog Section */}
      <section
        id="resources"
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Resources & Blog
            </h2>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Learn more about mental health and wellness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`h-48 ${
                    darkMode ? "bg-gray-700" : "bg-blue-100"
                  } flex items-center justify-center`}
                >
                  <BookOpen
                    size={48}
                    className={darkMode ? "text-blue-300" : "text-blue-600"}
                  />
                </div>
                <div className="p-6">
                  <div
                    className={`text-sm font-semibold mb-2 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p
                    className={`mb-4 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {post.excerpt}
                  </p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className={`flex items-center ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    } font-medium`}
                  >
                    Read more <ChevronRight size={16} className="ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Find answers to common questions about MindMate
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`mb-4 rounded-lg overflow-hidden ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } shadow-md`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex justify-between items-center p-6 text-left ${
                    darkMode ? "hover:bg-gray-600" : "hover:bg-gray-50"
                  }`}
                >
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`px-6 pb-6 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 mb-12 md:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About MindMate
              </h2>
              <p
                className={`text-lg mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Founded in 2023, MindMate was created by a team of mental health
                professionals and technologists who believe in making mental
                wellness accessible to everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ y: -5 }}
                  onClick={() => navigate("/dev-team")}
                  className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      darkMode
                        ? "bg-gray-700 text-blue-400"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <Users size={24} />
                  </div>
                  <span className="font-medium">Meet Our Team</span>
                </motion.button>

                {[
                  { icon: <BarChart2 size={24} />, label: "Data-Driven" },
                  { icon: <HelpCircle size={24} />, label: "24/7 Support" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`flex items-center space-x-2 p-3 rounded-lg ${
                      darkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        darkMode
                          ? "bg-gray-700 text-blue-400"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 md:pl-12"
            >
              <div
                className={`rounded-xl p-8 ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                <p
                  className={`mb-6 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  To empower individuals to take control of their mental health
                  through accessible, evidence-based tools and resources.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-md font-medium ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                  onClick={() => navigate("/signup")}
                >
                  Join Our Community
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-blue-500 text-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
