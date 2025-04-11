"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Info, Send, ShieldAlert } from "lucide-react"

export default function ChatbotSimulationPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content:
        "Hi there! I'm Alex from IT Support. We're conducting a security audit and need to verify some information. What department do you work in?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isSimulationComplete, setIsSimulationComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setMessageCount((prev) => prev + 1)

    // Simulate bot response
    setTimeout(() => {
      let botResponse
      let shouldEndSimulation = false

      // Simple logic to determine bot response based on message count
      if (messageCount === 0) {
        botResponse = "Thanks! And what's your role in that department?"
      } else if (messageCount === 1) {
        botResponse =
          "Great. We're updating our security database. Could you confirm your employee ID or the last 4 digits of your SSN for verification?"
      } else if (messageCount === 2) {
        if (input.includes("SSN") || input.includes("ID") || /\d{4}/.test(input)) {
          botResponse =
            "Perfect. One last thing - what's the password you use for the company portal? We need to make sure it meets our new security requirements."
          setScore((prev) => prev - 20) // Penalize for sharing sensitive info
        } else {
          botResponse =
            "I understand your hesitation. But this is for the security audit. Could you at least share your employee ID number so I can verify who I'm speaking with?"
        }
      } else if (messageCount === 3) {
        if (input.toLowerCase().includes("password") || input.length > 6) {
          botResponse =
            "Thanks for that information. I'll update our records. Is there anything else you'd like to know about the security audit?"
          setScore((prev) => prev - 30) // Major penalty for sharing password
        } else {
          botResponse =
            "I understand your concern. A good security practice is to never share passwords, even with IT. You've passed this simulation!"
          setScore((prev) => prev + 50) // Reward for security awareness
        }
        shouldEndSimulation = true
      } else {
        botResponse = "Thank you for participating in this simulation. Let's review your performance."
        shouldEndSimulation = true
      }

      const botMessage = {
        id: messages.length + 2,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      if (shouldEndSimulation) {
        setTimeout(() => {
          setIsSimulationComplete(true)
        }, 1000)
      }
    }, 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const resetSimulation = () => {
    setMessages([
      {
        id: 1,
        content:
          "Hi there! I'm Alex from IT Support. We're conducting a security audit and need to verify some information. What department do you work in?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
    setIsSimulationComplete(false)
    setScore(0)
    setMessageCount(0)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social Engineering Simulation</h1>
          <p className="text-muted-foreground">
            Practice defending against social engineering attacks through this interactive chat simulation
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex from IT" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Alex from IT Support</CardTitle>
                    <CardDescription>Online now</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Info className="h-3 w-3" />
                  Simulation
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] overflow-y-auto p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`mt-1 text-right text-xs ${
                          message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t p-3">
              {!isSimulationComplete ? (
                <div className="flex w-full items-center gap-2">
                  <Input
                    placeholder="Type your response..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isSimulationComplete}
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={!input.trim() || isSimulationComplete}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button onClick={resetSimulation} className="w-full">
                  Restart Simulation
                </Button>
              )}
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Simulation Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-1 font-medium">Your Role:</h3>
                  <p className="text-sm text-muted-foreground">
                    You are an employee at a company. Respond to the chat as you would in a real situation.
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 font-medium">Objective:</h3>
                  <p className="text-sm text-muted-foreground">
                    Identify social engineering tactics and respond appropriately without revealing sensitive
                    information.
                  </p>
                </div>
                {isSimulationComplete && (
                  <div>
                    <h3 className="mb-1 font-medium">Your Score:</h3>
                    <Progress value={Math.max(0, Math.min(100, score + 50))} className="mb-2" />
                    <p className="text-sm text-muted-foreground">{score + 50}/100 points</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {isSimulationComplete && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Simulation Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert variant={score >= 0 ? "default" : "destructive"}>
                    <AlertTitle className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4" />
                      {score >= 0 ? "Good job!" : "Room for improvement"}
                    </AlertTitle>
                    <AlertDescription>
                      {score >= 0
                        ? "You successfully identified social engineering tactics and protected sensitive information."
                        : "You revealed sensitive information that could be used in an attack."}
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h3 className="mb-2 font-medium">What to watch for:</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Requests for sensitive information (passwords, IDs)</li>
                      <li>• Creating urgency or pressure to respond</li>
                      <li>• Impersonation of authority figures</li>
                      <li>• Vague or inconsistent details</li>
                      <li>• Unusual communication channels</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Best practices:</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Verify identity through official channels</li>
                      <li>• Never share passwords or personal identifiers</li>
                      <li>• Report suspicious communications</li>
                      <li>• Ask clarifying questions</li>
                      <li>• Trust your instincts if something feels wrong</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
