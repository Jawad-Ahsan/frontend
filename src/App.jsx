// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainLayout from "./components/Home/MainLayout";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import MandatoryQuestionnaire from "./components/MandatoryQuestionnaire";
import OptionalQuestionnaire from "./components/OptionalQuestionnaire";
import ForgotPassword from "./components/ForgotPassword";
import DevTeam from "./components/DevTeam";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* IMPORTANT: Add a '*' to the path to enable nested routing */}
        <Route path="/home/*" element={<MainLayout />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dev-team" element={<DevTeam />} />
        <Route
          path="/mandatory-questionnaire"
          element={<MandatoryQuestionnaire />}
        />
        <Route
          path="/optional-questionnaire"
          element={<OptionalQuestionnaire />}
        />
      </Routes>
    </Router>
  );
}

export default App;
