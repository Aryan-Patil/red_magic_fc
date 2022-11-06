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
            <Route path="/red_magic/admin/home" element={<AdminHome name={userName} />} />
            <Route path="/red_magic/admin/signup" element={<Signup />}/>
            <Route path="/red_magic/admin" element={<Login/>} />
          </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
