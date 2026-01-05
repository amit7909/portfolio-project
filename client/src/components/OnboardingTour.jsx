import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';

const OnboardingTour = () => {
  const [step, setStep] = useState(0); // 0: Hidden, 1: Welcome, 2: Recruiter, 3: AI Bot
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the tour
    const tourDone = localStorage.getItem('portfolio_tour_completed');
    
    // If NOT seen, start the tour after 1 second
    if (!tourDone) {
      setTimeout(() => {
        setIsVisible(true);
        setStep(1);
      }, 1000);
    }
  }, []);

  const nextStep = () => setStep(prev => prev + 1);
  
  const endTour = () => {
    setIsVisible(false);
    localStorage.setItem('portfolio_tour_completed', 'true'); // Save that they saw it!
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans">
      
      {/* 1. DARK BACKDROP (Click to skip) */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={endTour}></div>

      {/* --- STEP 1: WELCOME CARD (Center) --- */}
      {step === 1 && (
        <div className="relative bg-white text-gray-900 p-8 rounded-2xl shadow-2xl max-w-md text-center animate-in zoom-in-95 duration-300 mx-4 z-10">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            👋
          </div>
          <h2 className="text-2xl font-bold mb-2">Hi, I'm Amit!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Welcome to my interactive portfolio. I've built some unique features to help you navigate my work.
            <br/><br/>
            Can I give you a quick 10-second tour?
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={endTour} className="px-5 py-2 text-gray-500 hover:text-gray-800 font-medium">No thanks</button>
            <button 
              onClick={nextStep} 
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2"
            >
              Sure, let's go <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      )}

      {/* --- STEP 2: RECRUITER TOGGLE (Top Right) --- */}
      {step === 2 && (
        <div className="absolute top-28 right-10 md:right-20 max-w-xs animate-bounce-slow z-10">
          {/* Arrow pointing up-right */}
          <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45"></div>
          
          <div className="bg-white p-5 rounded-xl shadow-xl relative">
            <h3 className="font-bold text-lg text-blue-600 mb-1">Are you hiring?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Toggle this switch to activate <strong>Recruiter Mode</strong>. It highlights key info like my availability and resume instantly.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">1 of 2</span>
              <button onClick={nextStep} className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* --- STEP 3: AI BOT (Bottom Left) --- */}
      {step === 3 && (
        <div className="absolute bottom-28 left-10 max-w-xs animate-bounce-slow z-10">
          {/* Arrow pointing down-left */}
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white rotate-45"></div>
          
          <div className="bg-white p-5 rounded-xl shadow-xl relative">
            <h3 className="font-bold text-lg text-green-600 mb-1">Meet AI Amit</h3>
            <p className="text-sm text-gray-600 mb-4">
              I cloned myself! Click <strong>"Call Me"</strong> to speak with my AI using your voice, or use the chat. It knows my entire resume.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">2 of 2</span>
              <button onClick={endTour} className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-1">
                Got it <Check size={14}/>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OnboardingTour;