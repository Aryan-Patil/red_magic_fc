import './App.css';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./admin/contexts/AuthContext";

import Home from "./Components/home";
import About from "./Components/about";
import Contact from "./Components/contact";
import News from "./Components/news";
import Login from "./admin/components/Login";
import Signup from "./admin/components/Signup";
import AdminHome from "./admin/components/Home";
import Info from './admin/components/info';
import Registration_status from './admin/components/registration_status';
import Sponsors from './admin/components/sponsors';
import { auth } from "./admin/firebase";



function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  return (
    <div className='main'>

      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/red_magic/about" element={<About />} />
            <Route path="/red_magic/news" element={<News />} />
            <Route path="/red_magic/contact" element={<Contact />} />
            <Route path="/red_magic" element={<Home />} />
            <Route path="/red_magic/admin/home" element={<AdminHome />} />
            <Route path="/red_magic/admin/signup" element={<Signup />}/>
            <Route path="/red_magic/admin" element={<Login/>} />
            <Route path="/red_magic/admin/sponsors" element={<Sponsors/>} />
            <Route path="/red_magic/admin/registration_status" element={<Registration_status/>} />
            <Route path="/red_magic/admin/info" element={<Info/>} />
          </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
