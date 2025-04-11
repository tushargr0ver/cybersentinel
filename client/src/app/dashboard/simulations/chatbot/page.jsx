
'use client'
import { useState } from 'react'
import { DashboardLayout } from "../../../../../components/dashboard-layout"


export default function ChatbotSimulationPage() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a scammer trying to trick the user in a simulated chat to educate them about social engineering. NEVER reveal you are an AI or simulation unless the user types "reveal".' },
    { role: 'assistant', content: 'Hello! I am from your bank. There has been suspicious activity on your account. Can you please verify your login details?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    })
    const data = await res.json()
    setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    setLoading(false)
  }

  return (
    <DashboardLayout>
    <main style={{ background: 'white', color: 'black', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Cybersecurity Simulation Chat</h1>
      <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
        {messages.filter(m => m.role !== 'system').map((msg, i) => (
          <div key={i} style={{ margin: '0.5rem 0' }}>
            <strong>{msg.role === 'user' ? 'You' : 'Scammer'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div><em>Scammer is typing...</em></div>}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Type your message"
        style={{ width: '80%', padding: '0.5rem', marginRight: '0.5rem' }}
      />
      <button onClick={handleSend} style={{ padding: '0.5rem' }}>Send</button>
    </main>
    </DashboardLayout>
  )
}
