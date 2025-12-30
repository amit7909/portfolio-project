import { motion } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { ArrowRight, Download, Mail, Database, Server, Globe, CheckCircle2 } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

// IMPORT YOUR IMAGE
import profileImg from '../assets/profile.jpg'; 

const Hero = () => {
  const { isRecruiterMode } = useRecruiter();
  const highlightColor = isRecruiterMode ? "text-green-400" : "text-accent";

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden px-6">
      
      {/* Background Decor */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto z-10 flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-10 md:gap-20">
        
        {/* LEFT COLUMN */}
        <div className="flex-1 text-center md:text-left mt-10 md:mt-20">
            
            {/* 1. STATUS BADGE */}
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

            {/* 2. DYNAMIC HEADLINE */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 min-h-[160px] md:min-h-[220px]">
              Building <span className={highlightColor}>Scalable</span> <br />
              <TypeAnimation
                sequence={[
                  'Backend Systems.', 3000,
                  'DevOps Pipelines.', 3000,
                  'Full Stack Apps.', 3000,
                  'Distributed APIs.', 3000
                ]}
                wrapper="span"
                speed={20}
                repeat={Infinity} 
                className={highlightColor}
              />
            </h1>

            {/* 3. RECRUITER SUMMARY VS NORMAL TEXT */}
            {isRecruiterMode ? (
              // --- RECRUITER SUMMARY CARD ---
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-secondary/50 border border-green-500/30 rounded-xl p-6 mb-10 text-left max-w-xl"
              >
                 <h3 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} /> Candidate Snapshot
                 </h3>
                 <ul className="space-y-2 text-textMuted text-sm md:text-base">
                    <li className="flex items-start gap-2">
                       <span className="text-green-500 font-bold">•</span> 
                       <strong>Role:</strong> Backend / Full Stack Engineer (MERN)
                    </li>
                    <li className="flex items-start gap-2">
                       <span className="text-green-500 font-bold">•</span> 
                       <strong>Experience:</strong> Fresher / Freelance Projects
                    </li>
                    <li className="flex items-start gap-2">
                       <span className="text-green-500 font-bold">•</span> 
                       <strong>Availability:</strong> Immediate Joining
                    </li>
                 </ul>
              </motion.div>
            ) : (
              // --- NORMAL SUBTITLE ---
              <p className="text-textMuted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0">
                Passionate about System Design, Distributed Systems, and open-source. I turn complex problems into clean, efficient code.
              </p>
            )}

            {/* 4. ACTION BUTTONS */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              
              {/* BUTTON 1: Resume Download */}
              <a 
                 href="/resume.pdf" 
                 download="Amit_Tiwari_Resume.pdf"
                 className={`
                   px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg
                   ${isRecruiterMode 
                     ? 'bg-green-500 text-primary hover:bg-green-400 hover:scale-105' 
                     : 'bg-accent text-primary hover:bg-white hover:scale-105'}
                 `}
              >
                <Download size={20} />
                {isRecruiterMode ? "Download CV" : "View Projects"}
              </a>
              
              {/* BUTTON 2: Contact Me / Read Blog */}
<a 
   // CHANGE HERE: Check mode. If Recruiter -> Go to Contact form. If Normal -> Go to your Website.
   href={isRecruiterMode ? "#contact" : ""}
   
   // OPEN IN NEW TAB ONLY FOR BLOG:
   target={isRecruiterMode ? "_self" : "_blank"}
   rel={isRecruiterMode ? "" : "noopener noreferrer"}
   
   className="px-8 py-3 rounded-lg font-bold border border-gray-700 text-textMain hover:bg-white/5 hover:border-white transition-all flex items-center gap-2"
>
  <Mail size={20} />
  {isRecruiterMode ? "Contact Me" : "Read Blog"}
</a>
            </div>
        </div>

        {/* RIGHT COLUMN: IMAGE */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 flex justify-center md:justify-end md:mt-20"
        >
            <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-2xl transform scale-110 -z-10 ${isRecruiterMode ? 'bg-green-500/20' : 'bg-accent/20'}`}></div>
                <img 
                    src={profileImg} 
                    alt="Amit Tiwari" 
                    className={`w-64 h-64 md:w-[400px] md:h-[400px] object-cover rounded-full border-4 shadow-2xl relative z-10 transition-colors duration-500 ${isRecruiterMode ? 'border-green-500/50' : 'border-secondary'}`}
                />
            </div>
        </motion.div>

      </div>

      {/* Tech Stack Grid */}
      <div className="mt-20 border-t border-white/5 pt-10 max-w-6xl mx-auto w-full">
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