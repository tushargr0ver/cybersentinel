"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Brain, Info, Lock, Mail, MessageSquare, ShieldAlert } from "lucide-react"

export default function QuizzesPage() {
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswers(Array(quiz.questions.length).fill(-1))
    setShowResults(false)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (showResults) return

    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    if (!activeQuiz) return 0

    let correctCount = 0
    activeQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++
      }
    })

    return Math.round((correctCount / activeQuiz.questions.length) * 100)
  }

  const exitQuiz = () => {
    setActiveQuiz(null)
    setShowResults(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cybersecurity Quizzes</h1>
          <p className="text-muted-foreground">
            Test your knowledge with interactive quizzes on various cybersecurity topics
          </p>
        </div>

        {!activeQuiz ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="flex flex-col overflow-hidden">
                <div className="bg-primary/10 p-6">
                  <quiz.icon className="h-10 w-10 text-primary" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{quiz.title}</CardTitle>
                    <Badge
                      variant={
                        quiz.difficulty === "Easy"
                          ? "outline"
                          : quiz.difficulty === "Medium"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{quiz.questions.length} questions</span>
                    <span>{quiz.timeEstimate}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/30 p-6">
                  <Button onClick={() => startQuiz(quiz)} className="w-full">
                    Start Quiz
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <activeQuiz.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{activeQuiz.title}</CardTitle>
                    <CardDescription>
                      {!showResults
                        ? `Question ${currentQuestionIndex + 1} of ${activeQuiz.questions.length}`
                        : "Quiz Results"}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Info className="h-3 w-3" />
                  {activeQuiz.difficulty}
                </Badge>
              </div>
              {!showResults && (
                <Progress value={((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100} className="mt-2" />
              )}
            </CardHeader>

            <CardContent className="p-6">
              {!showResults ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">
                      {activeQuiz.questions[currentQuestionIndex].question}
                    </h2>

                    <RadioGroup
                      value={selectedAnswers[currentQuestionIndex].toString()}
                      onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
                    >
                      <div className="space-y-3">
                        {activeQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            <Label
                              htmlFor={`option-${index}`}
                              className="flex-1 cursor-pointer rounded-md p-2 hover:bg-muted"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="mb-2 text-2xl font-bold">Your Score: {calculateScore()}%</h2>
                    <Progress
                      value={calculateScore()}
                      className={`h-2 w-full ${calculateScore() >= 70 ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <p className="mt-2 text-muted-foreground">
                      You answered{" "}
                      {activeQuiz.questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length} out of{" "}
                      {activeQuiz.questions.length} questions correctly
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Review Your Answers</h3>
                    {activeQuiz.questions.map((question, qIndex) => (
                      <div key={qIndex} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-start justify-between">
                          <h4 className="font-medium">
                            Question {qIndex + 1}: {question.question}
                          </h4>
                          {selectedAnswers[qIndex] === question.correctAnswer ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Correct
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-500/10 text-red-500">
                              Incorrect
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Your answer: </span>
                            <span
                              className={
                                selectedAnswers[qIndex] === question.correctAnswer ? "text-green-500" : "text-red-500"
                              }
                            >
                              {selectedAnswers[qIndex] >= 0
                                ? question.options[selectedAnswers[qIndex]]
                                : "No answer selected"}
                            </span>
                          </div>

                          {selectedAnswers[qIndex] !== question.correctAnswer && (
                            <div className="text-sm">
                              <span className="font-medium">Correct answer: </span>
                              <span className="text-green-500">{question.options[question.correctAnswer]}</span>
                            </div>
                          )}

                          <Alert variant="default" className="mt-2 bg-muted">
                            <AlertTitle className="flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              Explanation
                            </AlertTitle>
                            <AlertDescription className="mt-1 text-sm">{question.explanation}</AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t bg-muted/30 p-6">
              {!showResults ? (
                <>
                  <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
                    Previous
                  </Button>
                  <Button onClick={goToNextQuestion} disabled={selectedAnswers[currentQuestionIndex] === -1}>
                    {currentQuestionIndex === activeQuiz.questions.length - 1 ? "Finish Quiz" : "Next"}
                  </Button>
                </>
              ) : (
                <Button onClick={exitQuiz} className="w-full">
                  Return to Quizzes
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

const quizzes = [
  {
    id: 1,
    title: "Phishing Awareness",
    description: "Test your ability to identify phishing attempts and email scams",
    icon: Mail,
    difficulty: "Medium",
    timeEstimate: "10 min",
    questions: [
      {
        id: 1,
        question: "Which of the following is NOT a common indicator of a phishing email?",
        options: [
          "Misspelled sender domain (e.g., amazn.com instead of amazon.com)",
          "Urgent requests for personal information",
          "Generic greetings like 'Dear Customer'",
          "Email sent during normal business hours",
        ],
        correctAnswer: 3,
        explanation:
          "Phishing emails can be sent at any time, including during normal business hours. The timing of an email is not a reliable indicator of whether it's legitimate or not. The other options are all common red flags for phishing attempts.",
      },
      {
        id: 2,
        question: "What should you do if you receive a suspicious email claiming to be from your bank?",
        options: [
          "Reply to the email asking for verification",
          "Call the phone number provided in the email",
          "Contact your bank directly using the official phone number from their website",
          "Click the link to check if the website looks legitimate",
        ],
        correctAnswer: 2,
        explanation:
          "You should always contact your bank directly using their official contact information from their website or the back of your bank card. Never use contact information provided in a suspicious email, as it could be fraudulent.",
      },
      {
        id: 3,
        question: "Which of these URLs is most likely legitimate?",
        options: [
          "http://paypal-secure.com/login",
          "http://paypal.com-secure.login.net",
          "https://www.paypal.com/signin",
          "http://secure-paypal.verification.com",
        ],
        correctAnswer: 2,
        explanation:
          "The legitimate URL is https://www.paypal.com/signin. This follows the correct format where 'paypal.com' is the domain name. The other options use various tricks to make the URL appear legitimate, such as including 'paypal' as part of a longer domain name.",
      },
      {
        id: 4,
        question: "What is 'spear phishing'?",
        options: [
          "A phishing attempt targeting a specific individual or organization",
          "A phishing attempt that uses fake social media profiles",
          "A phishing attempt that only works on mobile devices",
          "A phishing attempt that uses voice calls instead of emails",
        ],
        correctAnswer: 0,
        explanation:
          "Spear phishing is a targeted phishing attempt directed at specific individuals or organizations. Unlike general phishing attempts, spear phishing is personalized and often includes information specific to the target to increase credibility.",
      },
      {
        id: 5,
        question: "Which action is safest when you receive an unexpected email attachment?",
        options: [
          "Open it if it's from someone you know",
          "Open it if it's a PDF file since those are generally safe",
          "Scan it with antivirus software before opening",
          "Verify with the sender through a different communication channel before opening",
        ],
        correctAnswer: 3,
        explanation:
          "The safest action is to verify with the sender through a different communication channel (like a phone call) before opening unexpected attachments, even if they appear to be from someone you know. Email accounts can be compromised, and malware can be disguised as any file type.",
      },
    ],
  },
  {
    id: 2,
    title: "Password Security",
    description: "Learn about creating and managing secure passwords",
    icon: Lock,
    difficulty: "Easy",
    timeEstimate: "8 min",
    questions: [
      {
        id: 1,
        question: "Which of the following passwords is most secure?",
        options: ["Password123!", "p@ssw0rd", "Tr0ub4dor&3", "correct-horse-battery-staple"],
        correctAnswer: 3,
        explanation:
          "A long passphrase like 'correct-horse-battery-staple' is more secure than shorter passwords with special characters. The length of a password contributes more to its security than complexity, and passphrases are easier to remember while being harder to crack.",
      },
      {
        id: 2,
        question: "What is the primary benefit of using a password manager?",
        options: [
          "It automatically changes your passwords every month",
          "It allows you to use the same password safely across multiple sites",
          "It generates and stores unique, complex passwords for different accounts",
          "It prevents websites from requiring password changes",
        ],
        correctAnswer: 2,
        explanation:
          "Password managers generate and store unique, complex passwords for different accounts. This allows you to have strong, different passwords for each site without having to remember them all, significantly improving your security.",
      },
      {
        id: 3,
        question: "Which of the following is a secure way to share a password with a colleague?",
        options: [
          "Send it in an email",
          "Text it to their phone",
          "Use a secure password-sharing feature in a password manager",
          "Split it into two parts and send each part through different channels",
        ],
        correctAnswer: 2,
        explanation:
          "Using a secure password-sharing feature in a password manager is the safest option. These features are specifically designed for secure sharing and often include encryption and temporary access controls.",
      },
      {
        id: 4,
        question: "What is two-factor authentication (2FA)?",
        options: [
          "Using two different passwords for the same account",
          "Requiring both a password and a second verification method to log in",
          "Changing your password twice a year",
          "Having two people approve each login attempt",
        ],
        correctAnswer: 1,
        explanation:
          "Two-factor authentication (2FA) requires both a password and a second verification method to log in. This second factor is typically something you have (like a phone for SMS codes or an authenticator app) or something you are (biometrics).",
      },
      {
        id: 5,
        question: "How often should you change your passwords?",
        options: [
          "Every 30 days without exception",
          "Only when there's a reason to believe they've been compromised",
          "Never, if they're strong enough initially",
          "Every time you log in to ensure maximum security",
        ],
        correctAnswer: 1,
        explanation:
          "Current best practice is to change passwords only when there's a reason to believe they've been compromised, such as after a data breach. Frequent mandatory password changes often lead to weaker passwords or minor variations of the same password.",
      },
    ],
  },
  {
    id: 3,
    title: "Social Engineering",
    description: "Understand the tactics used to manipulate people into revealing information",
    icon: MessageSquare,
    difficulty: "Hard",
    timeEstimate: "15 min",
    questions: [
      {
        id: 1,
        question: "What is 'pretexting' in social engineering?",
        options: [
          "Creating a fake website to collect information",
          "Sending text messages pretending to be from a legitimate company",
          "Creating a fabricated scenario to obtain information",
          "Pretending to be a technical support representative",
        ],
        correctAnswer: 2,
        explanation:
          "Pretexting involves creating a fabricated scenario (a pretext) designed to engage a victim and make them more likely to divulge information or perform actions they normally wouldn't. The attacker usually impersonates someone with the right to access certain information.",
      },
      {
        id: 2,
        question: "Which of the following is NOT a common social engineering tactic?",
        options: [
          "Creating a sense of urgency",
          "Appealing to vanity or greed",
          "Providing detailed technical explanations",
          "Impersonating authority figures",
        ],
        correctAnswer: 2,
        explanation:
          "Providing detailed technical explanations is not typically a social engineering tactic. In fact, social engineers often avoid technical details that might raise suspicion. They rely more on emotional manipulation, urgency, and impersonation to achieve their goals.",
      },
      {
        id: 3,
        question: "What is 'tailgating' in physical security?",
        options: [
          "Following someone closely on the highway to intimidate them",
          "Following an authorized person through a secure door without using credentials",
          "Monitoring someone's online activities to gather information",
          "Repeatedly contacting someone to wear down their resistance",
        ],
        correctAnswer: 1,
        explanation:
          "Tailgating in physical security refers to following an authorized person through a secure door or access point without using one's own credentials. It exploits people's politeness and reluctance to question others or close doors on them.",
      },
      {
        id: 4,
        question: "Which of these is the best defense against social engineering attacks?",
        options: [
          "Installing the latest antivirus software",
          "Using complex passwords",
          "Employee education and awareness training",
          "Implementing a firewall",
        ],
        correctAnswer: 2,
        explanation:
          "Employee education and awareness training is the best defense against social engineering attacks. Since these attacks target human psychology rather than technical vulnerabilities, technical solutions like antivirus software and firewalls have limited effectiveness.",
      },
      {
        id: 5,
        question: "What should you do if someone calls claiming to be from IT support and asks for your password?",
        options: [
          "Provide it if they can verify some company information",
          "Give them a temporary password and change it later",
          "Refuse to provide your password and report the incident",
          "Ask them to email you from their company email first",
        ],
        correctAnswer: 2,
        explanation:
          "You should refuse to provide your password and report the incident. Legitimate IT support staff should never ask for your password. This is a classic social engineering tactic, and organizations have procedures to reset passwords without needing to know your current one.",
      },
    ],
  },
  {
    id: 4,
    title: "Cybersecurity Basics",
    description: "Test your knowledge of fundamental cybersecurity concepts",
    icon: ShieldAlert,
    difficulty: "Easy",
    timeEstimate: "12 min",
    questions: [
      {
        id: 1,
        question: "What is malware?",
        options: [
          "Software designed to help manage your computer",
          "Software that performs unwanted actions like stealing data or damaging systems",
          "Hardware that monitors network traffic",
          "A type of firewall protection",
        ],
        correctAnswer: 1,
        explanation:
          "Malware (malicious software) is any software intentionally designed to cause damage to a computer, server, client, or computer network, or to steal data. This includes viruses, worms, trojans, ransomware, spyware, and other harmful programs.",
      },
      {
        id: 2,
        question: "What does a firewall primarily do?",
        options: [
          "Scans for viruses on your computer",
          "Encrypts your internet connection",
          "Monitors and controls incoming and outgoing network traffic",
          "Backs up your important files",
        ],
        correctAnswer: 2,
        explanation:
          "A firewall primarily monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between a trusted network and untrusted networks, such as the internet, blocking or allowing traffic based on its configuration.",
      },
      {
        id: 3,
        question: "What is a VPN used for?",
        options: [
          "Speeding up your internet connection",
          "Creating a secure, encrypted connection over a less secure network",
          "Blocking advertisements while browsing",
          "Scanning websites for malware",
        ],
        correctAnswer: 1,
        explanation:
          "A Virtual Private Network (VPN) creates a secure, encrypted connection over a less secure network, such as the public internet. It allows users to send and receive data across shared or public networks as if their devices were directly connected to a private network, enhancing privacy and security.",
      },
      {
        id: 4,
        question: "What is the purpose of software updates?",
        options: [
          "To add new features only",
          "To fix security vulnerabilities and bugs",
          "To collect user data",
          "To slow down older devices so users buy new ones",
        ],
        correctAnswer: 1,
        explanation:
          "The primary purpose of software updates is to fix security vulnerabilities and bugs. While updates may also add new features or improve performance, addressing security issues is crucial to protect against emerging threats and exploits.",
      },
      {
        id: 5,
        question: "What is a data breach?",
        options: [
          "When a computer crashes and loses data",
          "When unauthorized access results in information being viewed, stolen, or used",
          "When data is accidentally deleted by an employee",
          "When too much data is stored on a single server",
        ],
        correctAnswer: 1,
        explanation:
          "A data breach occurs when unauthorized access to data results in information being viewed, stolen, or used by an individual, application, or service. This can happen through hacking, insider threats, accidental exposure, or physical theft of devices containing sensitive data.",
      },
    ],
  },
  {
    id: 5,
    title: "Online Privacy",
    description: "Learn how to protect your personal information online",
    icon: Brain,
    difficulty: "Medium",
    timeEstimate: "10 min",
    questions: [
      {
        id: 1,
        question: "What information should you avoid sharing on social media?",
        options: [
          "Your favorite movies and books",
          "Photos of your pets",
          "Your full birth date, home address, and phone number",
          "Your opinions on current events",
        ],
        correctAnswer: 2,
        explanation:
          "You should avoid sharing your full birth date, home address, and phone number on social media. This personal information can be used for identity theft, targeted phishing, or to answer security questions for your accounts.",
      },
      {
        id: 2,
        question: "What are cookies in the context of web browsing?",
        options: [
          "Malware that steals your personal information",
          "Small text files stored on your device that remember information about your visit",
          "Programs that speed up your internet connection",
          "Pop-up advertisements",
        ],
        correctAnswer: 1,
        explanation:
          "Cookies are small text files stored on your device by websites you visit. They remember information about your visit, such as your preferred language, login information, and shopping cart contents. While most cookies are harmless, some can track your browsing habits across multiple sites.",
      },
      {
        id: 3,
        question: "What is the primary purpose of private browsing or incognito mode?",
        options: [
          "It makes you completely anonymous online",
          "It prevents websites from tracking your location",
          "It doesn't save your browsing history, cookies, or form data on your device",
          "It encrypts all your internet traffic",
        ],
        correctAnswer: 2,
        explanation:
          "Private browsing or incognito mode primarily prevents your browser from saving your browsing history, cookies, site data, and information entered in forms on your device. It does NOT make you anonymous online, prevent tracking by websites or ISPs, or encrypt your traffic.",
      },
      {
        id: 4,
        question: "Which of these is a good practice for protecting your online privacy?",
        options: [
          "Using the same password across multiple sites for consistency",
          "Accepting all cookies to improve your browsing experience",
          "Regularly reviewing and adjusting privacy settings on your accounts and devices",
          "Sharing your location with all apps to get personalized recommendations",
        ],
        correctAnswer: 2,
        explanation:
          "Regularly reviewing and adjusting privacy settings on your accounts and devices is a good practice for protecting your online privacy. This allows you to control what information is collected and shared about you, limiting your digital footprint.",
      },
      {
        id: 5,
        question: "What does end-to-end encryption provide?",
        options: [
          "Faster message delivery",
          "Protection against viruses in attachments",
          "Assurance that only you and the recipient can read the messages",
          "The ability to recall sent messages",
        ],
        correctAnswer: 2,
        explanation:
          "End-to-end encryption ensures that only you and the recipient can read the messages you send. The messages are encrypted on your device and can only be decrypted by the intended recipient, meaning that even the service provider cannot access the content.",
      },
    ],
  },
]
