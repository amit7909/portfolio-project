import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { Download, Mail, Database, Server, Globe, CheckCircle2 } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import profilePic from '../assets/profile.jpg'; 

const Hero = () => {
  const { isRecruiterMode } = useRecruiter();
  const highlightColor = isRecruiterMode ? "text-green-400" : "text-accent";

  // --- STATE FOR 3D ROTATION ---
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // --- MOUSE EVENT HANDLERS ---
  const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      // UPDATE: Increased multiplier from 20 to 50 for Stronger Tilt
      const rotateY = xPct * 50; 
      const rotateX = -yPct * 50; 

      setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
  };

  const handleBlogClick = (e) => {
    if (!isRecruiterMode) {
      e.preventDefault();
      alert("📢 The Blog feature is under construction! \n\nCheck back in a few days for technical articles.");
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden px-6">
      
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto z-10 w-full"> {/* Increased max-width for bigger layout */}
        
        <div className="mb-8 flex justify-center md:justify-start"></div>

        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-10 md:gap-10">
        
          {/* LEFT COLUMN */}
          <div className="flex-1 text-center md:text-left mt-4 z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                  inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 border
                  ${isRecruiterMode 
                    ? 'bg-green-900/20 text-green-400 border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]' 
                    : 'bg-secondary text-accent border-accent/20'}
                `}
              >
                {isRecruiterMode ? (
                   <><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span> OPEN TO WORK</>
                ) : (
                   '🚀 BACKEND ENGINEER'
                )}
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 min-h-[160px] md:min-h-[220px]">
                Building <span className={highlightColor}>Scalable</span> <br />
                <TypeAnimation
                  sequence={[
                    'Backend Systems.', 3000, 'DevOps Pipelines.', 3000, 'Full Stack Apps.', 3000, 'Distributed APIs.', 3000
                  ]}
                  wrapper="span" speed={20} repeat={Infinity} className={highlightColor}
                />
              </h1>

              {isRecruiterMode ? (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="bg-secondary/50 border border-green-500/30 rounded-xl p-6 mb-10 text-left max-w-xl mx-auto md:mx-0"
                >
                   <h3 className="text-green-400 font-bold mb-3 flex items-center gap-2"><CheckCircle2 size={18} /> Candidate Snapshot</h3>
                   <ul className="space-y-2 text-textMuted text-sm md:text-base">
                      <li className="flex items-start gap-2"><span className="text-green-500 font-bold">•</span> <strong>Role:</strong> Backend / Full Stack Engineer (MERN)</li>
                      <li className="flex items-start gap-2"><span className="text-green-500 font-bold">•</span> <strong>Experience:</strong> Fresher / Freelance Projects</li>
                      <li className="flex items-start gap-2"><span className="text-green-500 font-bold">•</span> <strong>Availability:</strong> Immediate Joining</li>
                   </ul>
                </motion.div>
              ) : (
                <p className="text-textMuted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0">
                  Passionate about System Design, Distributed Systems, and open-source. I turn complex problems into clean, efficient code.
                </p>
              )}

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a href="/resume.pdf" download="Amit_Tiwari_Resume.pdf" className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg ${isRecruiterMode ? 'bg-green-500 text-primary hover:bg-green-400 hover:scale-105' : 'bg-accent text-primary hover:bg-white hover:scale-105'}`}>
                  <Download size={20} /> Download CV
                </a>
                <a href={isRecruiterMode ? "#contact" : "#"} onClick={handleBlogClick} className="px-8 py-3 rounded-lg font-bold border border-gray-700 text-textMain hover:bg-white/5 hover:border-white transition-all flex items-center gap-2 cursor-pointer">
                  <Mail size={20} /> {isRecruiterMode ? "Contact Me" : "Read Blog"}
                </a>
              </div>
          </div>

          {/* RIGHT COLUMN (BIGGER PHOTO & FASTER EFFECT) */}
          <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 flex justify-center md:justify-end md:mt-0 mt-10"
              style={{ perspective: "1000px" }} 
          >
              <div className="relative group">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 rounded-full blur-3xl transform scale-105 -z-10 transition-colors duration-500 ${isRecruiterMode ? 'bg-green-500/30' : 'bg-accent/30'}`}></div>
                  
                  {/* IMAGE CONTAINER */}
                  <motion.div 
                    animate={{ 
                        rotateX: rotate.x, 
                        rotateY: rotate.y,
                        scale: 1 
                    }}
                    // UPDATE: Increased Stiffness (400) for faster reaction
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ transformStyle: "preserve-3d" }} 
                    className={`
                      relative 
                      /* SIZE UPDATE: */
                      w-72 h-72               /* Mobile Size (Safe) */
                      md:w-[450px] md:h-[450px] /* Laptop Size (Huge) */
                      overflow-hidden rounded-full border-4 shadow-2xl cursor-pointer
                      ${isRecruiterMode ? 'border-green-500/50 shadow-green-500/30' : 'border-secondary shadow-accent/30'}
                      transition-colors duration-500
                    `}
                  >
                    <img 
                      src={profilePic} 
                      alt="Amit Tiwari" 
                      className="w-full h-full object-cover scale-[1.05]" 
                    />
                    
                    {/* Glossy Reflection Overlay for extra 3D feel */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </motion.div>
              </div>
          </motion.div>

        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="mt-20 border-t border-white/5 pt-10 max-w-6xl mx-auto w-full mb-10">
        <p className="text-textMuted text-sm mb-4 uppercase tracking-wider text-center md:text-left">Core Tech Stack</p>
        <div className="flex justify-center md:justify-start gap-8 text-textMuted overflow-x-auto pb-4">
           <div className="flex items-center gap-2 hover:text-green-400 transition-colors"><Server size={20}/> Node.js</div>
           <div className="flex items-center gap-2 hover:text-green-400 transition-colors"><Database size={20}/> MongoDB</div>
           <div className="flex items-center gap-2 hover:text-green-400 transition-colors"><Globe size={20}/> REST APIs</div>
           <div className="flex items-center gap-2 hover:text-green-400 transition-colors">🐳 Docker</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;