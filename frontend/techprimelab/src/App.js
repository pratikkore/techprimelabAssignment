import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import UserLogin from "./components/user-data/UserLogin";
import { useState } from "react";
import SideNavbar from "./components/side-navbar/side-navbar";
import CreateProject from "./components/create-project/create-project";
import Projectlist from "./components/projectlist/projectlist";
import Dashboard from "./components/dashboard/dashboard";
// import SideNavbar from "./components/side-navbar/side-navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState( localStorage.getItem("isLoggedIn"));

  const handleLogin = () => {
    console.log("innn");
    localStorage.setItem("isLoggedIn",true)
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("anv");
    localStorage.setItem("isLoggedIn",false)
    setIsLoggedIn(false);
  };
  return (
    <Router>
    <div className="App">
      {localStorage.getItem("isLoggedIn") ==="true" && <SideNavbar onLogout={handleLogout} />}
      <main>
        <Routes>
          <Route path="/login" element={localStorage.getItem("isLoggedIn") ==="true" ? <Navigate to="/" /> : <UserLogin Route onLogin={handleLogin} />} />
          <Route path="/" element={localStorage.getItem("isLoggedIn") ==="true" ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/create-project" element={localStorage.getItem("isLoggedIn") ==="true" ? <CreateProject /> : <Navigate to="/login" />} />
          <Route path="/projectlist" element={localStorage.getItem("isLoggedIn") ==="true" ? <Projectlist /> : <Navigate to="/login" />} />

        </Routes>
      </main>
    </div>
  </Router>

    
  );
}

export default App;
