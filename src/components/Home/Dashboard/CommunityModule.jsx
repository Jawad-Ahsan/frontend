import { useState } from "react";
import { motion } from "framer-motion";

const CommunityModule = ({ darkMode }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My Anxiety Journey",
      content: "Sharing my experience with anxiety and what helped me cope...",
      author: "Jane D.",
      date: "2 days ago",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      title: "Meditation Tips",
      content:
        "Here are some techniques that worked for me when starting meditation...",
      author: "Michael T.",
      date: "1 week ago",
      likes: 42,
      comments: 15,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handleAddPost = () => {
    if (newPost.trim() === "") return;

    const post = {
      id: Date.now(),
      title: "New Post",
      content: newPost,
      author: "You",
      date: "Just now",
      likes: 0,
      comments: 0,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div
      className={`h-full overflow-auto p-6 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Community
      </h2>

      {/* New Post */}
      <div
        className={`p-5 rounded-xl mb-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow`}
      >
        <h3
          className={`text-lg font-semibold mb-3 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Share with the community
        </h3>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className={`w-full h-24 px-4 py-3 rounded-lg mb-3 ${
            darkMode
              ? "bg-gray-700 text-white placeholder-gray-400"
              : "bg-gray-100 text-gray-800 placeholder-gray-500"
          } border ${
            darkMode
              ? "border-gray-600 focus:border-blue-500"
              : "border-gray-300 focus:border-blue-400"
          } focus:outline-none focus:ring-1 ${
            darkMode ? "focus:ring-blue-500" : "focus:ring-blue-400"
          }`}
        />
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddPost}
            className={`px-5 py-2 rounded-lg font-medium ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Post
          </motion.button>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className={`w-10 h-10 rounded-full ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                } flex items-center justify-center font-medium ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {post.author.charAt(0)}
              </div>
              <div>
                <div
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {post.author}
                </div>
                <div
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {post.date}
                </div>
              </div>
            </div>
            <h4
              className={`font-bold text-lg mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {post.title}
            </h4>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {post.content}
            </p>
            <div className="flex space-x-4 text-sm">
              <button
                className={`flex items-center ${
                  darkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="mr-1">❤️</span> {post.likes}
              </button>
              <button
                className={`flex items-center ${
                  darkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="mr-1">💬</span> {post.comments}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityModule;
