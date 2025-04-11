"use client"

import { useState } from "react"
import { DashboardLayout } from "../../../../../components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Info, Mail, MessageSquare, ShieldAlert, ThumbsDown, ThumbsUp, XCircle } from "lucide-react"

export default function PhishingSimulationPage() {
  const [emailResult, setEmailResult] = useState(null)
  const [smsResult, setSmsResult] = useState(null)
  const [showEmailFeedback, setShowEmailFeedback] = useState(false)
  const [showSmsFeedback, setShowSmsFeedback] = useState(false)

  const handleEmailResponse = (isPhishing) => {
    // This email is a phishing attempt
    const correct = isPhishing === true
    setEmailResult(correct ? "correct" : "incorrect")
    setShowEmailFeedback(true)
  }

  const handleSmsResponse = (isPhishing) => {
    // This SMS is a phishing attempt
    const correct = isPhishing === true
    setSmsResult(correct ? "correct" : "incorrect")
    setShowSmsFeedback(true)
  }

  const resetEmail = () => {
    setEmailResult(null)
    setShowEmailFeedback(false)
  }

  const resetSms = () => {
    setSmsResult(null)
    setShowSmsFeedback(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phishing Simulation</h1>
          <p className="text-muted-foreground">Practice identifying phishing attempts in emails and text messages</p>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                SMS
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Info className="h-3 w-3" />
                Difficulty: Medium
              </Badge>
            </div>
          </div>

          <TabsContent value="email" className="mt-6">
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/50 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Amazon Customer Service</CardTitle>
                    <CardDescription>amazon-secure@amazn-support.com</CardDescription>
                  </div>
                  <div className="text-xs text-muted-foreground">Today, 10:42 AM</div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded bg-primary/10 p-2">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Important: Action Required on Your Amazon Account</h3>
                      <p className="text-sm text-muted-foreground">From: Amazon Customer Service</p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="mb-4">Dear Valued Customer,</p>
                    <p className="mb-4">
                      We have detected unusual activity on your Amazon account. Your account has been temporarily
                      limited until we can verify your information.
                    </p>
                    <p className="mb-4">
                      Please click the link below to verify your account information and restore full access to your
                      account:
                    </p>
                    <div className="mb-4 rounded bg-primary/5 p-2 text-center">
                      <a href="#" className="text-primary underline">
                        https://amazn-secure-verify.com/account/verify
                      </a>
                    </div>
                    <p className="mb-4">
                      If you do not verify your account within 24 hours, your account will be suspended.
                    </p>
                    <p className="mb-4">Thank you for your cooperation.</p>
                    <p>Amazon Customer Service Team</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t bg-muted/30 p-6">
                {!showEmailFeedback ? (
                  <div className="flex w-full flex-col gap-4 sm:flex-row">
                    <Button variant="outline" className="flex-1 gap-2" onClick={() => handleEmailResponse(false)}>
                      <ThumbsUp className="h-4 w-4" />
                      Legitimate Email
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2" onClick={() => handleEmailResponse(true)}>
                      <ThumbsDown className="h-4 w-4" />
                      Phishing Attempt
                    </Button>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    <Alert variant={emailResult === "correct" ? "default" : "destructive"}>
                      <div className="flex items-center gap-2">
                        {emailResult === "correct" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        <AlertTitle>
                          {emailResult === "correct"
                            ? "Correct! This is a phishing email."
                            : "Incorrect. This is a phishing email."}
                        </AlertTitle>
                      </div>
                      <AlertDescription className="mt-2">
                        <p className="mb-2">Signs this is a phishing email:</p>
                        <ul className="ml-6 list-disc space-y-1 text-sm">
                          <li>Misspelled sender email (amazn-support instead of amazon)</li>
                          <li>Suspicious URL (amazn-secure-verify.com is not an Amazon domain)</li>
                          <li>Creates urgency with threats of account suspension</li>
                          <li>Generic greeting ("Valued Customer" instead of your name)</li>
                          <li>Contains grammatical errors and unusual formatting</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                    <Button onClick={resetEmail} className="w-full">
                      Try Another Example
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sms" className="mt-6">
            <div className="mx-auto max-w-md">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/50 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">SMS Simulation</CardTitle>
                    <Badge variant="outline">Unknown Sender</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex h-[400px] flex-col bg-muted/20 p-4">
                    <div className="mt-auto">
                      <div className="mb-4 ml-auto max-w-[80%] rounded-lg bg-primary/10 p-3 text-sm">
                        <p>
                          ALERT: Your bank card has been suspended. Call 888-555-1234 immediately or visit
                          https://secure-bank-verify.com to restore access.
                        </p>
                        <p className="mt-1 text-right text-xs text-muted-foreground">10:30 AM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 border-t bg-muted/30 p-6">
                  {!showSmsFeedback ? (
                    <div className="flex w-full flex-col gap-4 sm:flex-row">
                      <Button variant="outline" className="flex-1 gap-2" onClick={() => handleSmsResponse(false)}>
                        <ThumbsUp className="h-4 w-4" />
                        Legitimate SMS
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2" onClick={() => handleSmsResponse(true)}>
                        <ThumbsDown className="h-4 w-4" />
                        Phishing Attempt
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      <Alert variant={smsResult === "correct" ? "default" : "destructive"}>
                        <div className="flex items-center gap-2">
                          {smsResult === "correct" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          <AlertTitle>
                            {smsResult === "correct"
                              ? "Correct! This is a phishing SMS."
                              : "Incorrect. This is a phishing SMS."}
                          </AlertTitle>
                        </div>
                        <AlertDescription className="mt-2">
                          <p className="mb-2">Signs this is a phishing SMS:</p>
                          <ul className="ml-6 list-disc space-y-1 text-sm">
                            <li>Creates urgency with "ALERT" and suspension claim</li>
                            <li>Comes from an unknown sender (legitimate banks use consistent numbers)</li>
                            <li>Contains a suspicious URL not matching your bank's domain</li>
                            <li>Doesn't mention which bank card or your name</li>
                            <li>Asks you to call an unknown number</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                      <Button onClick={resetSms} className="w-full">
                        Try Another Example
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Phishing Prevention Tips</h2>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-md border p-4">
              <h3 className="mb-2 font-medium">Email Safety</h3>
              <ul className="space-y-1 text-sm">
                <li>• Check sender email addresses carefully for misspellings</li>
                <li>• Hover over links before clicking to see the actual URL</li>
                <li>• Be suspicious of urgent requests or threats</li>
                <li>• Look for personalization (legitimate emails often use your name)</li>
                <li>• Verify requests through official channels, not email links</li>
              </ul>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="mb-2 font-medium">SMS/Text Safety</h3>
              <ul className="space-y-1 text-sm">
                <li>• Never click links in unexpected text messages</li>
                <li>• Don't respond to texts requesting personal information</li>
                <li>• Verify the sender by calling the official number</li>
                <li>• Be wary of shortened URLs in text messages</li>
                <li>• Report suspicious texts to your mobile carrier</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
