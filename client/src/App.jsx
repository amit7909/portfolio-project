import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecruiterProvider } from './context/RecruiterContext';

// Components
import Navbar from './components/Navbar';
import RecruiterToggle from './components/RecruiterToggle';

// Pages
import Hero from './pages/Hero';
import About from './pages/About'; 
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import EditProject from './pages/EditProject'; // <--- 1. NEW IMPORT

function App() {
  return (
    <RecruiterProvider>
      <Router>
        <div className="bg-primary min-h-screen text-textMain font-sans selection:bg-accent selection:text-primary">
          
          <Routes>
            {/* ROUTE GROUP 1: PUBLIC PORTFOLIO */}
            <Route path="/" element={
              <>
                <Navbar /> 
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Experience />
                <Contact />
                <RecruiterToggle />
              </>
            } />

            {/* ROUTE GROUP 2: AUTHENTICATION PAGES */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* ⚠️ Comment this out after you sign up! */}
            <Route path="/admin/signup" element={<Signup />} />

            {/* ROUTE GROUP 3: ADMIN DASHBOARD PAGES */}
            {/* This :id allows us to grab the project ID from the URL */}
            <Route path="/admin/edit/:id" element={<EditProject />} /> 
            
          </Routes>
          
        </div>
      </Router>
    </RecruiterProvider>
  );
}

export default App;