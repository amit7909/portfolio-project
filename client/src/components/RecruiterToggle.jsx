import { motion } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { Briefcase, User } from 'lucide-react'; 

const RecruiterToggle = () => {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiter();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
       {!isRecruiterMode && (
         <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-lg mb-1"
         >
            Hiring? Click me!
         </motion.div>
       )}

       <button
         onClick={toggleRecruiterMode}
         className={`
            flex items-center gap-2 px-4 py-3 rounded-full shadow-xl transition-all duration-300
            ${isRecruiterMode ? 'bg-green-500 text-white' : 'bg-secondary text-textMuted border border-gray-700'}
         `}
       >
         {isRecruiterMode ? <Briefcase size={20} /> : <User size={20} />}
         <span className="font-semibold text-sm">
           {isRecruiterMode ? 'Recruiter Mode: ON' : 'Normal View'}
         </span>
       </button>
    </div>
  );
};

export default RecruiterToggle;