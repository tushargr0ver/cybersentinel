"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Info, Lock, ShieldAlert, X } from "lucide-react"

export default function PasswordTestPage() {
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState([])
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (password) {
      calculateStrength(password)
    } else {
      setStrength(0)
      setFeedback([])
    }
  }, [password])

  const calculateStrength = (pass) => {
    let score = 0
    const issues = []

    // Length check
    if (pass.length < 8) {
      issues.push("Password is too short (minimum 8 characters)")
    } else {
      score += 20
    }

    // Complexity checks
    if (/[A-Z]/.test(pass)) {
      score += 20
    } else {
      issues.push("Add uppercase letters")
    }

    if (/[a-z]/.test(pass)) {
      score += 15
    } else {
      issues.push("Add lowercase letters")
    }

    if (/[0-9]/.test(pass)) {
      score += 20
    } else {
      issues.push("Add numbers")
    }

    if (/[^A-Za-z0-9]/.test(pass)) {
      score += 25
    } else {
      issues.push("Add special characters (!@#$%^&*)")
    }

    // Common patterns check
    if (/123|abc|qwerty|password|admin/i.test(pass)) {
      score -= 20
      issues.push("Avoid common patterns and words")
    }

    // Repeated characters
    if (/(.)\1{2,}/.test(pass)) {
      score -= 15
      issues.push("Avoid repeated characters")
    }

    setStrength(Math.max(0, Math.min(100, score)))
    setFeedback(issues)
  }

  const getStrengthLabel = () => {
    if (strength < 30) return "Very Weak"
    if (strength < 50) return "Weak"
    if (strength < 70) return "Moderate"
    if (strength < 90) return "Strong"
    return "Very Strong"
  }

  const getStrengthColor = () => {
    if (strength < 30) return "bg-red-500"
    if (strength < 50) return "bg-orange-500"
    if (strength < 70) return "bg-yellow-500"
    if (strength < 90) return "bg-green-500"
    return "bg-emerald-500"
  }

  const handleSubmit = () => {
    setShowResult(true)
  }

  const resetTest = () => {
    setPassword("")
    setShowResult(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Password Strength Test</h1>
          <p className="text-muted-foreground">
            Create and test passwords to learn best practices for password security
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Password Analyzer</CardTitle>
                <Badge variant="outline" className="gap-1">
                  <Info className="h-3 w-3" />
                  Interactive Test
                </Badge>
              </div>
              <CardDescription>Enter a password to test its strength and receive feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="password"
                    placeholder="Enter a password to test"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={showResult}
                  />
                  {!showResult && (
                    <Button onClick={handleSubmit} disabled={!password}>
                      Test
                    </Button>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Strength: {getStrengthLabel()}</span>
                    <span>{strength}%</span>
                  </div>
                  <Progress value={strength} className={getStrengthColor()} />
                </div>
              </div>

              {feedback.length > 0 && !showResult && (
                <div className="rounded-md border p-4">
                  <h3 className="mb-2 font-medium">Improvement Suggestions:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {feedback.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <X className="h-4 w-4 text-destructive" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {showResult && (
                <Alert variant={strength >= 70 ? "default" : "destructive"}>
                  <AlertTitle className="flex items-center gap-2">
                    {strength >= 70 ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Good Password!
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-4 w-4" />
                        Vulnerable Password
                      </>
                    )}
                  </AlertTitle>
                  <AlertDescription>
                    {strength >= 70
                      ? "This password meets security standards and would be difficult to crack."
                      : "This password is vulnerable to attacks and should be strengthened."}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="border-t bg-muted/30 p-6">
              {showResult ? (
                <Button onClick={resetTest} className="w-full">
                  Test Another Password
                </Button>
              ) : (
                <div className="text-sm text-muted-foreground">
                  <p className="mb-1 font-medium">Note:</p>
                  <p>
                    This is a simulation. Never enter your real passwords in password strength testers outside of
                    trusted password managers.
                  </p>
                </div>
              )}
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Password Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Strong Password Guidelines:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      At least 12 characters long
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Mix of uppercase and lowercase letters
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Include numbers and special characters
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Avoid personal information
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Use different passwords for different accounts
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Password Strategies:</h3>
                  <div className="rounded-md border p-3">
                    <h4 className="mb-1 text-sm font-medium">Passphrase Method</h4>
                    <p className="text-xs text-muted-foreground">
                      Create a phrase with random words and add numbers and symbols.
                      <br />
                      Example: correct-horse-battery-staple-42!
                    </p>
                  </div>
                  <div className="rounded-md border p-3">
                    <h4 className="mb-1 text-sm font-medium">First Letter Method</h4>
                    <p className="text-xs text-muted-foreground">
                      Take the first letter of each word in a sentence and add numbers and symbols.
                      <br />
                      Example: "I love to eat pizza on Friday nights!" becomes "Il2epoFn!"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Password Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-primary/10 p-4">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Use a Password Manager</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Password managers can generate, store, and autofill strong unique passwords for all your accounts.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Additional Security:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Enable two-factor authentication (2FA) when available</li>
                    <li>• Change passwords regularly (every 3-6 months)</li>
                    <li>• Check for data breaches that may have exposed your passwords</li>
                    <li>• Never share passwords via email or messaging</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
