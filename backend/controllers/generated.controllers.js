const axios = require("axios");
require('dotenv').config()

const apiKey = process.env.API_CHABI;

async function Generate(chatHistory,userdata) { 
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const formattedContents = chatHistory.map(chatItem => ({
            role: chatItem.role === "user" ? "user" : "model",
            parts: [{ text: chatItem.message }]
        }));

        const systemInstruction = {
            role: "user", 
            parts: [{ text: `You are a helpful assistant. Your name is Mohit.this is user name:${userdata?.username} ans Email:${userdata?.email} that is asking to you use this info to give best and short response . don't use * symbol between response` }]
        };

        const payload = {
            contents: [systemInstruction, ...formattedContents]
        };

        const res = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const generatedText = res.data.candidates[0].content.parts[0].text;
        return generatedText;
    } catch (error) {
        console.error("🔴 Gemini API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch completion from Gemini.");
    }
}

module.exports = Generate;
