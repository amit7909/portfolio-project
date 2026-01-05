import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Bot, Send, X, Mic, MicOff, MessageSquare, Phone, Settings, Info } from 'lucide-react';

const AiInterviewer = () => {
  const [isHidden, setIsHidden] = useState(true); 
  const [mode, setMode] = useState('menu'); 
  const [showGuide, setShowGuide] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm AI Amit. Ask me about my projects, skills, or experience." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  const messagesEndRef = useRef(null);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('ai_guide_seen');
    if (!hasSeenGuide) setTimeout(() => setShowGuide(true), 2000);

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      const bestVoice = voices.findIndex(v => 
        v.name.includes('Google US English') || v.name.includes('Microsoft Zira')
      );
      if (bestVoice !== -1) setSelectedVoiceIndex(bestVoice);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const dismissGuide = () => {
    setShowGuide(false);
    localStorage.setItem('ai_guide_seen', 'true');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isHidden, mode]);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = availableVoices[selectedVoiceIndex];
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9; 
    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (!recognition) return alert("Please use Chrome/Edge for voice.");
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      window.speechSynthesis.cancel(); 
      setIsListening(true);
      recognition.start();
      recognition.onresult = (e) => {
        setIsListening(false);
        handleSend(null, e.results[0][0].transcript);
      };
    }
  };

  const handleSend = async (e, manualText = null) => {
    if (e) e.preventDefault();
    const textToSend = manualText || input;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/v1/ai/interview', { message: textToSend });
      const reply = res.data.reply;
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      if (mode === 'voice') speak(reply);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: "⚠️ Server Error" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const openMode = (newMode) => {
    window.speechSynthesis.cancel(); 
    setMode(newMode);
    setIsHidden(false);
    dismissGuide();
  };

  const closeWindow = () => {
    window.speechSynthesis.cancel(); 
    setIsHidden(true);
  };

  return (
    // RESPONSIVE POSITION: 'left-4' on mobile, 'md:left-6' on desktop
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 font-sans flex flex-col items-start gap-4">

      {/* ONBOARDING GUIDE */}
      {showGuide && isHidden && (
        <div className="absolute bottom-20 left-0 w-64 bg-white text-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 animate-bounce hidden md:block">
          {/* Note: I hid the guide on very small mobile screens (hidden md:block) to prevent overlap, remove 'hidden md:block' if you want it everywhere */}
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-blue-600 flex items-center gap-2"><Info size={16}/> Interview Me!</h4>
            <button onClick={dismissGuide} className="text-gray-400 hover:text-gray-600"><X size={14}/></button>
          </div>
          <p className="text-sm text-gray-600">Hi! I'm an AI version of Amit. Click below to <b>Chat</b> or <b>Voice Call</b> with me!</p>
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-200"></div>
        </div>
      )}

      {/* BUTTON DOCK */}
      {isHidden && (
        <div id="ai-bot-dock" className="flex flex-col gap-3 animate-in slide-in-from-left-10">
          <button onClick={() => openMode('voice')} className="group flex items-center gap-0 hover:gap-3 bg-green-600 text-white p-3 rounded-full shadow-lg hover:pr-6 transition-all duration-300">
            <div className="w-8 h-8 flex items-center justify-center"><Phone size={20} /></div>
            <span className="w-0 overflow-hidden group-hover:w-auto group-hover:opacity-100 opacity-0 whitespace-nowrap transition-all duration-300">Call Me</span>
          </button>
          <button onClick={() => openMode('chat')} className="group flex items-center gap-0 hover:gap-3 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:pr-6 transition-all duration-300">
            <div className="w-8 h-8 flex items-center justify-center"><MessageSquare size={20} /></div>
            <span className="w-0 overflow-hidden group-hover:w-auto group-hover:opacity-100 opacity-0 whitespace-nowrap transition-all duration-300">Chat</span>
          </button>
        </div>
      )}

      {/* MAIN WINDOW */}
      <div className={`transition-all duration-300 origin-bottom-left ${isHidden ? 'opacity-0 scale-0 pointer-events-none absolute' : 'opacity-100 scale-100'}`}>
        
        {/* CHAT UI */}
        {mode === 'chat' && (
          // RESPONSIVE WIDTH: w-[90vw] on mobile, w-80 on desktop
          <div className="bg-gray-900 border border-gray-700 w-[90vw] md:w-80 h-[60vh] md:h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
              <span className="font-bold flex items-center gap-2"><Bot size={18}/> Chat with Amit</span>
              <div className="flex gap-2">
                <button onClick={() => setMode('voice')} className="hover:bg-blue-500 p-1 rounded"><Phone size={16}/></button>
                <button onClick={closeWindow}><X size={18}/></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900/95 scrollbar-thin">
              {messages.map((m, i) => (
                <div key={i} className={`p-3 rounded-lg text-sm max-w-[85%] ${m.sender === 'user' ? 'ml-auto bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'}`}>
                  {m.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="p-3 bg-gray-800 flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask me anything..." className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-full text-sm outline-none border border-gray-600 focus:border-blue-500" />
              <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-2 rounded-full"><Send size={18}/></button>
            </form>
          </div>
        )}

        {/* VOICE UI */}
        {mode === 'voice' && (
          // RESPONSIVE WIDTH: w-[90vw] on mobile, w-72 on desktop
          <div className="bg-gray-900 border border-gray-700 w-[90vw] md:w-72 h-[60vh] md:h-96 rounded-3xl shadow-2xl flex flex-col items-center justify-between py-6 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => setShowSettings(!showSettings)} className="text-gray-400 hover:text-white"><Settings size={18}/></button>
              <button onClick={closeWindow} className="text-gray-400 hover:text-red-500"><X size={18}/></button>
            </div>
            {showSettings && (
              <div className="absolute top-12 right-4 bg-gray-800 p-2 rounded-lg border border-gray-600 z-10 w-48">
                <select className="w-full bg-gray-900 text-white text-xs p-1 rounded" onChange={(e) => setSelectedVoiceIndex(e.target.value)} value={selectedVoiceIndex}>
                  {availableVoices.map((v, i) => <option key={i} value={i}>{v.name.slice(0, 20)}...</option>)}
                </select>
              </div>
            )}
            <div className="mt-8 text-center">
              <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${isListening ? 'bg-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'bg-green-500/10'}`}>
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-gray-800">
                  <Bot size={48} />
                </div>
              </div>
              <p className="text-white font-bold mt-6 text-xl">AI Amit</p>
              <p className="text-gray-400 text-sm mt-1 animate-pulse">{isLoading ? "Thinking..." : isListening ? "Listening..." : "Tap mic to speak"}</p>
            </div>
            <div className="flex gap-4">
               <button onClick={() => setMode('chat')} className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-white"><MessageSquare size={20}/></button>
               <button onClick={toggleMic} className={`p-5 rounded-full transition-all duration-300 shadow-xl ${isListening ? 'bg-red-500 hover:bg-red-600 scale-110' : 'bg-white text-black hover:bg-gray-200'}`}>
                {isListening ? <MicOff size={24} className="text-white"/> : <Mic size={24}/>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AiInterviewer;