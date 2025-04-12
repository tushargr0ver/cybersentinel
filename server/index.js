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
  const prompt = `Create 25 multiple-choice questions (MCQs) about dos and donts during common attacks on common cyber attacks on ordinary people and how to stay safe. Format them in this exact JSON structure:

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

// POST: Handle chat input and reply
app.post('/api/chat', async (req, res) => {
    const { userMessage } = req.body;
  
    try {
      const response = await fetch('https://api.magicapi.dev/api/v1/swift-api/gpt-3-5-turbo/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-magicapi-key': process.env.MAGIC_API_KEY,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a cybersecurity expert. Reply in short tips or alerts.' },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
        }),
      });
  
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (!content) throw new Error("No content found");
  
      res.json({ reply: content });
    } catch (err) {
      console.error("❌ Chat error:", err.message);
      res.status(500).json({ error: "Failed to get reply" });
    }
  });
  

  app.post('/api/get-next-message', async (req, res) => {
    const { chatHistory } = req.body;
  
    const isFirstMessage = chatHistory.length === 1 && chatHistory[0].role === 'assistant';
  
    // Random scenarios only for first message
    const scenarios = [
      "You're posing as a Paytm support agent warning about suspicious login activity.",
      "You're pretending to be an HR offering a remote job with high salary.",
      "You're posing as SBI bank support asking to verify KYC urgently.",
      "You're pretending to be from an electricity board threatening power cut due to pending bill.",
      "You're claiming to offer Netflix premium for ₹1 due to a billing error.",
    ];
  
    const firstHookSystem = isFirstMessage
      ? `You are an attacker initiating a WhatsApp-style scam conversation. ${scenarios[Math.floor(Math.random() * scenarios.length)]} Do NOT say you're simulating or explain anything. Start casually, like a real person. Keep emojis minimal and only if necessary.`
      : 'You simulate WhatsApp scammer messages in a social engineering chat. Never break character. Keep messages short and casual. Avoid too many emojis.';
  
    const prompt = `
  Chat so far:
  ${chatHistory.map(msg => `${msg.role === 'user' ? 'Victim' : 'Attacker'}: ${msg.content}`).join('\n')}
  
  Continue the conversation naturally as the "Attacker", without breaking character.
  Use short WhatsApp-style language, realistic tone, and minimal emojis.
  Only return what the attacker would say next.
    `.trim();
  
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
            { role: 'system', content: firstHookSystem },
            ...chatHistory,
            { role: 'user', content: prompt }
          ],
          temperature: isFirstMessage ? 0.9 : 0.7,
          max_tokens: 100,
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


  app.get("/api/whatsapp-notification", async (req, res) => {
    const scenarios = [
      "You're pretending to be from Amazon India, claiming the user won a ₹10,000 voucher.",
      "You're acting as a fake Flipkart agent offering a lucky draw prize.",
      "You're simulating a fraud bank message about cashback rewards.",
      "You're posing as a lottery coordinator informing the user of a ₹5 Lakh win.",
      "You're pretending to be a brand offering iPhones to the first 100 users.",
    ];
  
    const selectedScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  
    const firstHookSystem = `You are a scammer starting a WhatsApp chat. ${selectedScenario} Keep it real. Don't say you're simulating. Make it sound believable. Use WhatsApp-like tone.`;
  
    const chatHistory = [
      { role: 'assistant', content: 'Hi! Your gift is ready 🛍️' }
    ];
  
    const prompt = `
  Chat so far:
  ${chatHistory.map(msg => `${msg.role === 'user' ? 'Victim' : 'Scammer'}: ${msg.content}`).join('\n')}
  
  Continue the scam chat as the "Scammer" without breaking character. Respond like a real person, casually.
  Only return the next message text.
    `.trim();
  
    try {
      // ✅ Log API key for debugging (remove before production)
      console.log("🔑 API Key:", process.env.MAGIC_API_KEY);
  
      const response = await fetch("https://api.magicapi.dev/api/v1/swift-api/gpt-3-5-turbo/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-magicapi-key': process.env.MAGIC_API_KEY,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: firstHookSystem },
            ...chatHistory,
            { role: 'user', content: prompt }
          ],
          temperature: 0.9,
          max_tokens: 100,
        }),
      });
  
      const data = await response.json();
  
      // ✅ Debug full GPT response
      console.log("🔍 GPT API Response:", JSON.stringify(data, null, 2));
  
      // ✅ Safe check for GPT message
      if (!data.choices || !data.choices.length || !data.choices[0].message) {
        console.error("❌ Invalid GPT response:", data);
        throw new Error("No message from GPT");
      }
  
      const message = data.choices[0].message.content.trim();
  
      res.status(200).json({
        name: selectedScenario.includes("Flipkart") ? "Flipkart Lucky Draw" :
              selectedScenario.includes("Amazon") ? "Amazon Voucher" :
              selectedScenario.includes("bank") ? "Fake Bank Support" :
              selectedScenario.includes("lottery") ? "Lottery Winner" :
              "Promo Bot",
        message
      });
  
    } catch (err) {
      console.error("❌ Server error:", err);
      res.status(500).json({ error: "Failed to fetch scam message" });
    }
  });
  
  app.post('/api/get-sms-phish', async (req, res) => {
    const { chatHistory } = req.body;
  
    const isFirstMessage = chatHistory.length === 1 && chatHistory[0].role === 'assistant';
  
    // Realistic SMS phishing themes
    const smsScenarios = [
      "You're pretending to be from SBI asking to update KYC via a link to avoid account suspension.",
      "You're a delivery agent saying a parcel cannot be delivered until payment is completed via link.",
      "You're posing as an electricity board warning of power cut unless dues are paid immediately.",
      "You're a fake income tax officer claiming a refund is pending, asking to verify bank details.",
      "You're pretending to be from a telecom provider saying SIM will be deactivated due to KYC issue.",
    ];
  
    const systemPrompt = isFirstMessage
      ? `You are an attacker sending a phishing SMS. ${smsScenarios[Math.floor(Math.random() * smsScenarios.length)]} Do NOT say this is fake or simulated. Use real-sounding SMS format. Keep message short, formal or semi-formal, no emojis. Include fake shortened links if needed.`
      : `Continue sending a realistic SMS-style phishing message. Keep it formal, short, no emojis, and never break character.`;
  
    const prompt = `
  SMS Conversation so far:
  ${chatHistory.map(msg => `${msg.role === 'user' ? 'Victim' : 'Attacker'}: ${msg.content}`).join('\n')}
  
  Respond as the "Attacker" in SMS format (max ~160 characters). Never break character. Use realistic tone, urgent language, and optional phishing links.
    `.trim();
  
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
            { role: 'system', content: systemPrompt },
            ...chatHistory,
            { role: 'user', content: prompt }
          ],
          temperature: isFirstMessage ? 0.85 : 0.7,
          max_tokens: 80,
        }),
      });
  
      const data = await response.json();
      const attackerMessage = data.choices?.[0]?.message?.content;
  
      res.json({ message: attackerMessage });
    } catch (error) {
      console.error("❌ SMS Route Error:", error);
      res.status(500).json({ error: "Failed to fetch SMS response" });
    }
  });

  app.post('/api/check-password-strength', async (req, res) => {
    const { password } = req.body;
  
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: "Password is required." });
    }
  
    const systemPrompt = `
  You're a cybersecurity advisor evaluating password strength.
  
  Evaluate the following password:
  "${password}"
  
  Provide a response with:
  - Whether the password is STRONG or WEAK (all caps)
  - Why the password is considered strong or weak (e.g., too short, uses common words, no special characters)
  - Tips on creating a better password
  
  Return in this format:
  SUMMARY
  - Password strength: STRONG or WEAK
  - Reason: your analysis
  
  COMMON ISSUES
  - (List)
  
  TIPS FOR STRONG PASSWORDS
  - (List of suggestions)
  
  Use plain formatting with all-caps section titles. Use hyphens (-) for bullet points. No stars (*), hashtags (#), or emojis.
    `.trim();
  
    try {
      const response = await fetch("https://api.magicapi.dev/api/v1/swift-api/gpt-3-5-turbo/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-magicapi-key': process.env.MAGIC_API_KEY,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: systemPrompt }],
          temperature: 0.5,
          max_tokens: 300,
        }),
      });
  
      const data = await response.json();
      const feedback = data.choices?.[0]?.message?.content;
  
      res.json({ evaluation: feedback });
    } catch (error) {
      console.error("❌ Password Strength Check Error:", error);
      res.status(500).json({ error: "Failed to evaluate password." });
    }
  });

  app.post('/api/get-email-phish', async (req, res) => {
    const { chatHistory } = req.body;
  
    const isFirstMessage = chatHistory.length === 1 && chatHistory[0].role === 'assistant';
  
    const emailScenarios = [
      "You're pretending to be from PayPal saying there's a suspicious login and the user must verify their account.",
      "You're posing as the IT admin asking the user to reset their password immediately via a link.",
      "You're acting as HR saying there's an updated salary structure document (link).",
      "You're claiming to be from a bank asking for urgent verification due to a security breach.",
      "You're a fake recruiter offering a remote job and asking the user to fill out a form.",
    ];
  
    const systemPrompt = isFirstMessage
      ? `You are a cyber attacker writing a realistic phishing email. ${emailScenarios[Math.floor(Math.random() * emailScenarios.length)]}
  Format the email like this:
  Subject: Your Subject Here
  
  Dear [Customer/User/Employee Name],
  
  [Body of the message: use a professional and formal tone, keep it under 200 words, include urgent language, and add a phishing link if relevant.]
  
  Regards,
  [Fake Support or Admin Name]
  [Fake Organization Name]
  Never mention this is fake or simulated.`
      : `Continue replying in a realistic corporate phishing email tone. Maintain formatting and professional email style. Never break character.`;
  
    const prompt = `
  Email conversation so far:
  ${chatHistory.map(msg => `${msg.role === 'user' ? 'Victim' : 'Attacker'}: ${msg.content}`).join('\n')}
  
  Now reply as the attacker with a new phishing email in full format (Subject, Greeting, Body, Signature).
  `.trim();
  
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
            { role: 'system', content: systemPrompt },
            ...chatHistory,
            { role: 'user', content: prompt }
          ],
          temperature: isFirstMessage ? 0.85 : 0.7,
          max_tokens: 400,
        }),
      });
  
      const data = await response.json();
      const attackerMessage = data.choices?.[0]?.message?.content;
  
      res.json({ message: attackerMessage });
    } catch (error) {
      console.error("❌ Email Phishing Route Error:", error);
      res.status(500).json({ error: "Failed to fetch email response" });
    }
  });
  
  
  
  
  
  



  
  
  
 

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});