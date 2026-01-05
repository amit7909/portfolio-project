const { GoogleGenerativeAI } = require("@google/generative-ai");

// FIX: Quotes added here
const API_KEY = "AIzaSyAMF6WiyGzu28OVY934rbz5pfCYKIsqEqI"; 

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  try {
    console.log("Checking available models...");
    
    // Test 1: Try Flash Model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.countTokens("Hello");
    console.log("✅ SUCCESS! 'gemini-1.5-flash' is working.");
    console.log("Token count:", result);

  } catch (error) {
    console.log("\n❌ 'gemini-1.5-flash' failed.");
    console.log("Reason:", error.message);
    
    console.log("\n--- Trying 'gemini-pro' ---");
    try {
        const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result2 = await model2.countTokens("Hello");
        console.log("✅ SUCCESS! 'gemini-pro' is working.");
    } catch (err2) {
        console.log("❌ 'gemini-pro' also failed.");
        console.log("Reason:", err2.message);
    }
  }
}

listModels();