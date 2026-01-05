import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { Briefcase, User, MessageCircle, Phone, Mail, X, ChevronDown } from 'lucide-react'; 

const RecruiterToggle = () => {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiter();
  const [isHireMenuOpen, setHireMenuOpen] = useState(false);

  return (
    // RESPONSIVE FIXES:
    // 1. 'top-20' on mobile, 'md:top-24' on laptop
    // 2. 'right-2' on mobile, 'md:right-6' on laptop to save space
    // 3. 'scale-90' on mobile, 'md:scale-100' on laptop to make it smaller
    <div id="recruiter-toggle" className="fixed top-20 right-2 md:top-24 md:right-6 z-50 flex flex-col items-end gap-2 animate-in slide-in-from-right-10 origin-top-right scale-90 md:scale-100">
       
       {/* --- 1. MODE TOGGLE BUTTON --- */}
       <button
         onClick={toggleRecruiterMode}
         className={`
            flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-full shadow-xl transition-all duration-300 border
            ${isRecruiterMode 
              ? 'bg-green-600 text-white border-green-500' 
              : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'}
         `}
       >
         <div className={`
           w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all
           ${isRecruiterMode ? 'bg-white text-green-600' : 'bg-gray-700 text-gray-400'}
         `}>
           {isRecruiterMode ? <Briefcase size={14} className="md:w-4 md:h-4" /> : <User size={14} className="md:w-4 md:h-4" />}
         </div>
         <div className="flex flex-col items-start text-xs">
            <span className="uppercase tracking-wider opacity-70 text-[8px] md:text-[10px]">
              {isRecruiterMode ? 'Recruiter' : 'View Mode'}
            </span>
            <span className="font-bold text-xs md:text-sm">
              {isRecruiterMode ? 'Active' : 'Normal'}
            </span>
         </div>
       </button>

       {/* --- 2. HIRE ME TRIGGER --- */}
       {!isRecruiterMode && (
         <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setHireMenuOpen(!isHireMenuOpen)}
            className="bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg hover:bg-blue-500 transition-colors flex items-center gap-2 mr-1"
         >
            {isHireMenuOpen ? "Close" : "Hiring?"}
            {isHireMenuOpen ? <X size={12} /> : <ChevronDown size={12} />}
         </motion.button>
       )}

       {/* --- 3. HIRE ME MENU (Popups) --- */}
       <AnimatePresence>
         {isHireMenuOpen && !isRecruiterMode && (
           <motion.div 
             initial={{ opacity: 0, y: -10, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: -10, scale: 0.9 }}
             className="flex flex-col gap-2 mt-1 items-end mr-1"
           >
             <a href="https://wa.me/918982756446" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-full shadow-lg text-[10px] md:text-xs font-bold hover:scale-105 transition-transform">
                WhatsApp <MessageCircle size={12} />
             </a>
             <a href="tel:+918982756446"
                className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-full shadow-lg text-[10px] md:text-xs font-bold hover:scale-105 transition-transform">
                Call Me <Phone size={12} />
             </a>
             <a href="mailto:amittiwari79099@gmail.com"
                className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full shadow-lg text-[10px] md:text-xs font-bold hover:scale-105 transition-transform">
                Email <Mail size={12} />
             </a>
           </motion.div>
         )}
       </AnimatePresence>

    </div>
  );
};

export default RecruiterToggle;