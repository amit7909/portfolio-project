import { createContext, useState, useContext } from 'react';

const RecruiterContext = createContext();

export const RecruiterProvider = ({ children }) => {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [userPersona, setUserPersona] = useState('tech-recruiter');

  const toggleRecruiterMode = () => {
    setIsRecruiterMode(prev => !prev);
  };

  return (
    <RecruiterContext.Provider value={{ 
      isRecruiterMode, 
      toggleRecruiterMode,
      userPersona,
      setUserPersona
    }}>
      {children}
    </RecruiterContext.Provider>
  );
};

export const useRecruiter = () => useContext(RecruiterContext);