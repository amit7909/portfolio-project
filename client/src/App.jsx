import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecruiterProvider } from './context/RecruiterContext';

// Components
import Navbar from './components/Navbar';
import RecruiterToggle from './components/RecruiterToggle';
import AiInterviewer from './components/AiInterviewer'; 
import OnboardingTour from './components/OnboardingTour'; // <--- 1. IMPORT ADDED

// Pages
import Hero from './pages/Hero';
import About from './pages/About'; 
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import EditProject from './pages/EditProject';


function App() {
  return (
    <RecruiterProvider>
      <Router>
        
        {/* --- 2. TOUR COMPONENT ADDED HERE --- */}
        {/* This sits above everything else to create the overlay */}
        <OnboardingTour />

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
                
                {/* FLOATING WIDGETS */}
                <RecruiterToggle />
                <AiInterviewer /> 
              </>
            } />

            {/* ROUTE GROUP 2: AUTHENTICATION PAGES */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* ⚠️ Comment this out after you sign up! */}
            <Route path="/admin/signup" element={<Signup />} />

            {/* ROUTE GROUP 3: ADMIN DASHBOARD PAGES */}
            <Route path="/admin/edit/:id" element={<EditProject />} /> 
            
          </Routes>
          
        </div>
      </Router>
    </RecruiterProvider>
  );
}

export default App;