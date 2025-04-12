"use client"

import { useState } from "react"
import { DashboardLayout } from "../../../../../components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, Info, XCircle, AlertTriangle, Lock, Shield } from "lucide-react"

export default function FakeLoginPage() {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentExample, setCurrentExample] = useState("example1")

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    if (selectedOption) {
      setShowFeedback(true)
    }
  }

  const resetSimulation = () => {
    setSelectedOption(null)
    setShowFeedback(false)
  }

  const isCorrect = (example, option) => {
    if (example === "example1") return option === "fake"
    if (example === "example2") return option === "real"
    return option === "fake"
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fake Login Detection</h1>
          <p className="text-muted-foreground">
            Learn to identify fraudulent login pages designed to steal your credentials
          </p>
        </div>

        <Tabs
          defaultValue="example1"
          value={currentExample}
          onValueChange={(value) => {
            setCurrentExample(value)
            resetSimulation()
          }}
        >
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="example1">Example 1</TabsTrigger>
              <TabsTrigger value="example2">Example 2</TabsTrigger>
              <TabsTrigger value="example3">Example 3</TabsTrigger>
            </TabsList>
            <Badge variant="outline" className="gap-1">
              <Info className="h-3 w-3" />
              Difficulty: Medium
            </Badge>
          </div>

          <TabsContent value="example1" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Is this login page real or fake?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="mb-6 w-full max-w-md overflow-hidden rounded-lg border shadow-sm">
                    <div className="bg-blue-600 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold">Facebook</div>
                        <Lock className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="bg-white p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <h2 className="text-xl font-semibold">Log in to Facebook</h2>
                          <p className="text-sm text-gray-500">Enter your email and password</p>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Email or Phone Number"
                            className="w-full rounded-md border p-2"
                            disabled
                          />
                          <input
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-md border p-2"
                            disabled
                          />
                          <button className="w-full rounded-md bg-blue-600 p-2 text-white" disabled>
                            Log In
                          </button>
                        </div>
                        <div className="text-center text-sm">
                          <a href="#" className="text-blue-600">
                            Forgot Password?
                          </a>
                          <p className="mt-4 text-gray-500">
                            Don't have an account?{" "}
                            <a href="#" className="text-blue-600">
                              Sign Up
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex w-full max-w-md flex-col gap-4">
                    <div className="flex justify-center gap-4">
                      <Button
                        variant={selectedOption === "real" ? "default" : "outline"}
                        onClick={() => handleOptionSelect("real")}
                        disabled={showFeedback}
                      >
                        Real Login Page
                      </Button>
                      <Button
                        variant={selectedOption === "fake" ? "default" : "outline"}
                        onClick={() => handleOptionSelect("fake")}
                        disabled={showFeedback}
                      >
                        Fake Login Page
                      </Button>
                    </div>

                    {selectedOption && !showFeedback && (
                      <Button onClick={handleSubmit} className="mt-2">
                        Submit Answer
                      </Button>
                    )}

                    {showFeedback && (
                      <div className="mt-4 space-y-4">
                        <Alert variant={isCorrect(currentExample, selectedOption) ? "default" : "destructive"}>
                          <div className="flex items-center gap-2">
                            {isCorrect(currentExample, selectedOption) ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            <AlertTitle>
                              {isCorrect(currentExample, selectedOption)
                                ? "Correct! This is a fake login page."
                                : "Incorrect. This is a fake login page."}
                            </AlertTitle>
                          </div>
                          <AlertDescription className="mt-2">
                            <p className="mb-2">Signs this is a fake login page:</p>
                            <ul className="ml-6 list-disc space-y-1 text-sm">
                              <li>The URL (not shown) would be incorrect - not facebook.com</li>
                              <li>Missing security indicators like HTTPS lock in the address bar</li>
                              <li>Slightly off branding and colors compared to the real Facebook</li>
                              <li>Unusual layout and spacing in the form elements</li>
                              <li>Generic error messages or lack of proper validation</li>
                            </ul>
                          </AlertDescription>
                        </Alert>
                        <Button onClick={resetSimulation} className="w-full">
                          Try Another Example
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="example2" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Is this login page real or fake?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="mb-6 w-full max-w-md overflow-hidden rounded-lg border shadow-sm">
                    <div className="bg-gray-100 p-4">
                      <div className="flex items-center justify-between">
                        <img src="/placeholder.svg?height=30&width=100" alt="Google Logo" className="h-8" />
                        <Shield className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="bg-white p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <h2 className="text-xl font-semibold">Sign in</h2>
                          <p className="text-sm text-gray-500">Use your Google Account</p>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Email or phone"
                            className="w-full rounded-md border p-2"
                            disabled
                          />
                          <div className="text-right">
                            <a href="#" className="text-sm text-blue-600">
                              Forgot email?
                            </a>
                          </div>
                        </div>
                        <div className="pt-4 text-sm text-gray-500">
                          <p>
                            Not your computer? Use Guest mode to sign in privately.{" "}
                            <a href="#" className="text-blue-600">
                              Learn more
                            </a>
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                          <a href="#" className="text-sm text-blue-600">
                            Create account
                          </a>
                          <button className="rounded-md bg-blue-600 px-6 py-2 text-white" disabled>
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex w-full max-w-md flex-col gap-4">
                    <div className="flex justify-center gap-4">
                      <Button
                        variant={selectedOption === "real" ? "default" : "outline"}
                        onClick={() => handleOptionSelect("real")}
                        disabled={showFeedback}
                      >
                        Real Login Page
                      </Button>
                      <Button
                        variant={selectedOption === "fake" ? "default" : "outline"}
                        onClick={() => handleOptionSelect("fake")}
                        disabled={showFeedback}
                      >
                        Fake Login Page
                      </Button>
                    </div>

                    {selectedOption && !showFeedback && (
                      <Button onClick={handleSubmit} className="mt-2">
                        Submit Answer
                      </Button>
                    )}

                    {showFeedback && (
                      <div className="mt-4 space-y-4">
                        <Alert variant={isCorrect(currentExample, selectedOption) ? "default" : "destructive"}>
                          <div className="flex items-center gap-2">
                            {isCorrect(currentExample, selectedOption) ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            <AlertTitle>
                              {isCorrect(currentExample, selectedOption)
                                ? "Correct! This is a real Google login page."
                                : "Incorrect. This is a real Google login page."}
                            </AlertTitle>
                          </div>
                          <AlertDescription className="mt-2">
                            <p className="mb-2">Signs this is a real login page:</p>
                            <ul className="ml-6 list-disc space-y-1 text-sm">
                              <li>Correct Google branding and layout</li>
                              <li>Two-step login process (email first, then password)</li>
                              <li>Proper security indicators would be present in the browser</li>
                              <li>Appropriate help text and account creation options</li>
                              <li>Consistent with Google's design language</li>
                            </ul>
                          </AlertDescription>
                        </Alert>
                        <Button onClick={resetSimulation} className="w-full">
                          Try Another Example
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="example3" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Is this login page real or fake?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="mb-6 w-full max-w-md overflow-hidden rounded-lg border shadow-sm">
                    <div className="bg-[#232f3e] p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">amazon</div>
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                    </div>
                    <div className="bg-white p-6">
                      <div className="space-y-4">
                        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                          Your account has been temporarily locked. Please sign in to verify your identity.
                        </div>
                        <div className="text-center">
                          <h2 className="text-xl font-semibold">Sign-In</h2>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email or mobile phone number</label>
                          <input type="text" className="w-full rounded-md border p-2" disabled />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Password</label>
                            <a href="#" className="text-xs text-blue-600">
                              Forgot Password
                            </a>
                          </div>
                          <input type="password" className="w-full rounded-md border p-2" disabled />
                        </div>
                        <button className="w-full rounded-md bg-yellow-400 p-2 text-sm font-medium" disabled>
                          Sign-In
                        </button>
                        <div className="text-center text-xs">
                          <p>
                            By continuing, you agree to Amazon's{" "}
                            <a href="#" className="text-blue-600">
                              Conditions of Use
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-600">
                              Privacy Notice
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex w-full max-w-md flex-col gap-4">
                    <div className="flex justify-center gap-4">
                      <Button
                        variant={selectedOption === "real" ? "default" : "outline"}
                        onClick={() => handleOptionSelect("real")}
                        disabled={showFeedback}
                      >
                        Real Login Page
                      </Button>
                      <Button
                        variant={selectedOption === "fake" ? "default" : "outline"}
                        onClick={() => handleOptionSelect("fake")}
                        disabled={showFeedback}
                      >
                        Fake Login Page
                      </Button>
                    </div>

                    {selectedOption && !showFeedback && (
                      <Button onClick={handleSubmit} className="mt-2">
                        Submit Answer
                      </Button>
                    )}

                    {showFeedback && (
                      <div className="mt-4 space-y-4">
                        <Alert variant={isCorrect(currentExample, selectedOption) ? "default" : "destructive"}>
                          <div className="flex items-center gap-2">
                            {isCorrect(currentExample, selectedOption) ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            <AlertTitle>
                              {isCorrect(currentExample, selectedOption)
                                ? "Correct! This is a fake login page."
                                : "Incorrect. This is a fake login page."}
                            </AlertTitle>
                          </div>
                          <AlertDescription className="mt-2">
                            <p className="mb-2">Signs this is a fake login page:</p>
                            <ul className="ml-6 list-disc space-y-1 text-sm">
                              <li>Urgent security message creating a sense of panic</li>
                              <li>Warning icon in the header (Amazon doesn't use this)</li>
                              <li>Slightly off branding and colors</li>
                              <li>The URL would not be amazon.com (not shown)</li>
                              <li>
                                Requesting both email and password on the same page (Amazon uses a two-step process)
                              </li>
                            </ul>
                          </AlertDescription>
                        </Alert>
                        <Button onClick={resetSimulation} className="w-full">
                          Try Another Example
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>How to Identify Fake Login Pages</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-medium">Check the URL</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Verify the domain name (e.g., amazon.com, not amazon-secure.com)</li>
                  <li>• Look for HTTPS and a padlock icon in the address bar</li>
                  <li>• Watch for misspellings (e.g., amaz0n.com, arnazon.com)</li>
                  <li>• Be wary of subdomains (e.g., amazon.fake-site.com)</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-medium">Examine the Page Content</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Look for poor grammar, spelling errors, or inconsistent language</li>
                  <li>• Check for low-quality logos or images</li>
                  <li>• Be suspicious of urgent security messages</li>
                  <li>• Verify that the page follows the company's typical design</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-medium">Security Indicators</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Check for security certificates by clicking the padlock icon</li>
                  <li>• Verify the site uses HTTPS (encrypted connection)</li>
                  <li>• Look for trusted security badges or seals</li>
                  <li>• Check if the site follows expected login processes</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-medium">Best Practices</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Bookmark official login pages instead of using links</li>
                  <li>• Use a password manager that will only autofill on legitimate sites</li>
                  <li>• Enable two-factor authentication when available</li>
                  <li>• When in doubt, go directly to the official website by typing the URL</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <p>
                Remember: Legitimate companies will never ask you to provide your password through email links or
                unexpected login pages.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
