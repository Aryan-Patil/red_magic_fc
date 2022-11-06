import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Header from "./Components/header"
  import Home from "./Components/home";
  import About from "./Components/about";
  import Contact from "./Components/contact";
  import News from "./Components/news";

export default function user() {
  return (
    <div>
         <Header />
      <Routes>
        <Route path="/red_magic/about" element={<About />} />
        <Route path="/red_magic/news" element={<News />} />
        <Route path="/red_magic/contact" element={<Contact />} />
        <Route path="" element={<Home />} />
      </Routes>
    </div>
  )
}
