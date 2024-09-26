import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp"; // Import the SignUp component
import Dashboard from "./Dashboard";
import "./index.css";

const App = () => {
  const [currentView, setCurrentView] = useState("login"); // 'login', 'signup', 'dashboard'

  const handleLoginSuccess = () => {
    setCurrentView("dashboard");
  };

  const handleSignUpSuccess = () => {
    setCurrentView("login"); // Redirect to login after successful sign up or directly to 'dashboard' if you prefer
  };

  const switchToSignUp = () => {
    setCurrentView("signup");
  };

  const switchToLogin = () => {
    setCurrentView("login");
  };

  return (
    <div>
      {currentView === "dashboard" && <Dashboard />}
      {currentView === "login" && (
        <div>
          <Login onLoginSuccess={handleLoginSuccess} />
          <button onClick={switchToSignUp}>Sign Up</button>
        </div>
      )}
      {currentView === "signup" && (
        <div>
          <SignUp onSignUpSuccess={handleSignUpSuccess} />
          <button onClick={switchToLogin}>Back to Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
