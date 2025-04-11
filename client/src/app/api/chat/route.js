import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { messages } = await req.json()

    const response = await fetch('https://api.magicapi.dev/api/v1/swift-api/gpt-3-5-turbo/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-magicapi-key': process.env.MAGIC_API_KEY,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
      }),
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'AI did not respond.'
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('AI Chat Error:', err)
    return NextResponse.json({ reply: 'An error occurred while generating a response.' }, { status: 500 })
  }
}
