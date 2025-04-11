import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/get-quiz', async (req, res) => {
  const prompt = `Create 15 multiple-choice questions (MCQs) about dos and donts during common attacks on common cyber attacks on ordinary people and how to stay safe. Format them in this exact JSON structure:
1
[
  {
    "question": "What is phishing?",
    "options": ["A type of malware", "A scam to steal info", "An antivirus", "A firewall"],
    "answerIndex": 1
  }
]
`;

  try {
    const response = await fetch('https://api.magicapi.dev/api/v1/swift-api/gpt-3-5-turbo/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-magicapi-key': process.env.MAGIC_API_KEY,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const rawText = await response.text();
    console.log('📥 Raw response from Magic API:', rawText);

    const data = JSON.parse(rawText);
    const content = data?.choices?.[0]?.message?.content;

    if (!content) throw new Error("No 'content' found in response");

    // 🧼 Clean the content by extracting JSON inside ```json ... ```
    const match = content.match(/```json\s*([\s\S]*?)```/);
    if (!match) throw new Error("No valid JSON block found in response");

    const cleanedJson = match[1].trim();
    const questions = JSON.parse(cleanedJson);

    res.json({ questions });
  } catch (error) {
    console.error('❌ Error fetching quiz:', error.message);
    res.status(500).json({ error: 'Failed to generate quiz.' });
  }
});

app.post('/api/get-next-message', async (req, res) => {
    const { chatHistory } = req.body;
  
    const prompt = `
  You are simulating a cybercriminal in a social engineering attack. Continue the chat realistically.
  Use tricks like fake job offers, impersonating banks, or fake emergencies. Stay convincing.
  Chat History:
  ${chatHistory.map(msg => `${msg.role === 'user' ? 'Victim' : 'Attacker'}: ${msg.content}`).join('\n')}
  
  Respond as "Attacker" in a casual, WhatsApp-like message.
  `;
  
    try {
      const response = await fetch("https://api.magicapi.dev/api/v1/swift-api/gpt-3-5-turbo/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-magicapi-key': process.env.MAGIC_API_KEY,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You simulate social engineering attacker chat messages' },
            ...chatHistory,
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        }),
      });
  
      const data = await response.json();
      const attackerMessage = data.choices?.[0]?.message?.content;
      res.json({ message: attackerMessage });
    } catch (error) {
      console.error("❌ Backend Error:", error);
      res.status(500).json({ error: "Failed to fetch AI response" });
    }
  });
  
 

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
