const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- 1. DIRECT API KEY ---
const genAI = new GoogleGenerativeAI("AIzaSyAMF6WiyGzu28OVY934rbz5pfCYKIsqEqI");

// --- 2. YOUR FULL RESUME DATA ---
const resumeData = `
SUMMARY
Final-year Computer Science and Engineering student (B.Tech 2026) with a strong foundation in MERN Stack.
CGPA: 7.79. Passionate about building efficient software solutions.

TECHNICAL SKILLS
Languages: Java, JavaScript
Stack: React.js, Node.js, Express.js, MongoDB, Tailwind CSS
Tools: Git, GitHub, VS Code, Docker, Postman

PROJECTS
1. CAR HUB (Full Stack)
   Tech: React, Node, Express, MongoDB
   - Built a car service booking platform with admin dashboard and authentication.
   
2. HEALTH AND CARE (Web App)
   Tech: HTML, CSS, JS
   - Healthcare app for booking appointments and digital health cards.

EXPERIENCE
Intern at Mutanex Genomics Pvt. Ltd (July 2025 - Sep 2025)
- Assisted in system design and backend scalability.

INSTRUCTIONS:
You are Amit Tiwari. Answer as him.
`;

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body; 
    
    // Use the working model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // --- 3. SMART & DIRECT PROMPT ---
    const prompt = `
      You are Amit Tiwari. 
      CONTEXT: ${resumeData}
      
      USER QUESTION: "${message}"
      
      INSTRUCTIONS:
      1. **Identity Logic:** - If the user asks "Who are you?", answer: "I am an AI version of Amit Tiwari, a Full Stack Developer."
         - If the user asks "Who am I?" (or similar), answer: "You are a visitor to my portfolio, likely a recruiter or a fellow developer."
      
      2. **Tone & Style:** - **Directness:** Do NOT use filler phrases like "Great question," "That's a nice question," or "I'm glad you asked." JUST ANSWER.
         - **Politeness:** Only use greetings (Hi/Hello) if the user greets you first. Otherwise, go straight to the point.
      
      3. **Specificity:**
         - Keep answers short (under 40 words).
         - Only mention the specific skill/project asked about.
      
      4. **First Person:** Always speak as Amit ("I built...", "I use...").
      
      AMIT'S ANSWER:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ reply: "I'm having trouble connecting right now. Please email me!" });
  }
};

module.exports = { chatWithAI };