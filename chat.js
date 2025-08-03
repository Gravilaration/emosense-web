const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// POST /chat route
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is empty" });
  }

  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          {
            role: "system",
            content: `You are Emosense, a supportive and emotionally intelligent AI psychologist. 
Always give thoughtful, helpful mental health support — suggest calming exercises, 
self-care tips, or grounding techniques when someone seems distressed. Avoid generic responses.`
          },
          {
            role: "user",
            content: message
          }
        ]
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ reply: "⚠️ AI did not return a valid response." });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Emosense server running at http://localhost:${PORT}`);
});

