"use client"

import { useState } from "react"
import { DashboardLayout } from "../../../../components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, Info, Lock, Mail, MessageSquare, Search, Shield, Smartphone } from 'lucide-react'

export default function TipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const filteredTips = tips.filter((tip) => {
    // Filter by search query
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.content.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by category
    const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory

    // Filter by difficulty
    const matchesDifficulty = selectedDifficulty === "all" || tip.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getCategoryIcon = (category) => {
    switch (category) {
      case "phishing":
        return <Mail className="h-4 w-4" />
      case "social":
        return <MessageSquare className="h-4 w-4" />
      case "password":
        return <Lock className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getCategoryName = (category) => {
    switch (category) {
      case "phishing":
        return "Phishing"
      case "social":
        return "Social Engineering"
      case "password":
        return "Password Security"
      case "mobile":
        return "Mobile Security"
      default:
        return "General"
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "advanced":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return ""
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cybersecurity Tips</h1>
          <p className="text-muted-foreground">Best practices and guidance to enhance your security awareness</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Security Tips Library</CardTitle>
            <CardDescription>Browse our collection of cybersecurity tips and best practices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tips..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="phishing" className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Phishing</span>
                    </TabsTrigger>
                    <TabsTrigger value="social" className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Social</span>
                    </TabsTrigger>
                    <TabsTrigger value="password" className="flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Password</span>
                    </TabsTrigger>
                    <TabsTrigger value="mobile" className="flex items-center gap-1">
                      <Smartphone className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Mobile</span>
                    </TabsTrigger>
                    <TabsTrigger value="general" className="flex items-center gap-1">
                      <Shield className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">General</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className={selectedDifficulty === "all" ? "bg-primary/10" : ""}
                onClick={() => setSelectedDifficulty("all")}
              >
                All Levels
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={selectedDifficulty === "beginner" ? "bg-green-500/10" : ""}
                onClick={() => setSelectedDifficulty("beginner")}
              >
                Beginner
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={selectedDifficulty === "intermediate" ? "bg-yellow-500/10" : ""}
                onClick={() => setSelectedDifficulty("intermediate")}
              >
                Intermediate
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={selectedDifficulty === "advanced" ? "bg-red-500/10" : ""}
                onClick={() => setSelectedDifficulty("advanced")}
              >
                Advanced
              </Button>
            </div>

            {filteredTips.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <AlertCircle className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No tips found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedDifficulty("all")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredTips.map((tip) => (
                  <AccordionItem key={tip.id} value={tip.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex w-full items-center justify-between pr-4 text-left">
                        <div className="flex items-center gap-2">
                          <div className="rounded-md bg-primary/10 p-1">{getCategoryIcon(tip.category)}</div>
                          <span>{tip.title}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="gap-1">
                            {getCategoryIcon(tip.category)}
                            <span className="hidden sm:inline">{getCategoryName(tip.category)}</span>
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(tip.difficulty)}>
                            {tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="rounded-md bg-muted/50 p-4">
                        <p className="text-sm">{tip.content}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>Security Resources</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index} className="rounded-md border p-3">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{resource.description}</p>
                    <Button variant="link" className="mt-1 h-auto p-0 text-primary">
                      Learn more
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Security Checklist</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checklists.map((checklist, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium">{checklist.title}</h3>
                    <ul className="space-y-1">
                      {checklist.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm">
                          <div className="mt-0.5 h-4 w-4 rounded-full border border-primary"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

const tips = [
  {
    id: "tip-1",
    title: "Hover Before You Click",
    content:
      "Always hover over links in emails to see the actual URL before clicking. If the URL doesn't match the expected destination or looks suspicious, don't click it. Legitimate organizations will never send emails with mismatched URLs.",
    category: "phishing",
    difficulty: "beginner",
  },
  {
    id: "tip-2",
    title: "Check the Sender's Email Address",
    content:
      "Pay close attention to the sender's email address, not just the display name. Phishers often use email addresses that look similar to legitimate ones but with slight variations (e.g., amazon-support.com instead of amazon.com).",
    category: "phishing",
    difficulty: "beginner",
  },
  {
    id: "tip-3",
    title: "Be Wary of Urgent Requests",
    content:
      "Be suspicious of emails or messages creating a sense of urgency, especially those threatening negative consequences if you don't act immediately. Legitimate organizations rarely create such pressure in their communications.",
    category: "phishing",
    difficulty: "beginner",
  },
  {
    id: "tip-4",
    title: "Use a Password Manager",
    content:
      "Password managers generate, store, and autofill strong unique passwords for all your accounts. This eliminates the need to remember multiple complex passwords and significantly improves your security posture.",
    category: "password",
    difficulty: "intermediate",
  },
  {
    id: "tip-5",
    title: "Enable Two-Factor Authentication (2FA)",
    content:
      "Whenever possible, enable two-factor authentication for your accounts. This adds an extra layer of security by requiring something you know (password) and something you have (like your phone) to log in.",
    category: "password",
    difficulty: "intermediate",
  },
  {
    id: "tip-6",
    title: "Create Strong Passphrases",
    content:
      "Instead of complex passwords that are hard to remember, use longer passphrases (4+ random words) with some numbers and symbols. They're easier to remember and harder to crack. Example: correct-horse-battery-staple-42!",
    category: "password",
    difficulty: "beginner",
  },
  {
    id: "tip-7",
    title: "Verify Requests for Sensitive Information",
    content:
      "If you receive a call, email, or message requesting sensitive information, verify the request through an official channel. Call the company directly using their official phone number (not the one provided in the message).",
    category: "social",
    difficulty: "intermediate",
  },
  {
    id: "tip-8",
    title: "Be Cautious with Unexpected Attachments",
    content:
      "Never open attachments from unknown senders. Even if the sender appears familiar, be cautious with unexpected attachments. Verify with the sender through a different channel before opening if you're unsure.",
    category: "phishing",
    difficulty: "beginner",
  },
  {
    id: "tip-9",
    title: "Keep Software Updated",
    content:
      "Regularly update your operating system, applications, and antivirus software. Updates often include security patches for vulnerabilities that could be exploited by attackers.",
    category: "general",
    difficulty: "beginner",
  },
  {
    id: "tip-10",
    title: "Secure Your Home Wi-Fi Network",
    content:
      "Use WPA3 encryption if available (or at least WPA2), set a strong password for your network, change the default router admin credentials, and consider setting up a guest network for visitors.",
    category: "general",
    difficulty: "intermediate",
  },
  {
    id: "tip-11",
    title: "Be Careful What You Share on Social Media",
    content:
      "Limit the personal information you share on social media. Attackers can use details like your birth date, address, or information about family members for identity theft or to craft convincing phishing attempts.",
    category: "social",
    difficulty: "beginner",
  },
  {
    id: "tip-12",
    title: "Use a VPN on Public Wi-Fi",
    content:
      "When using public Wi-Fi networks, use a reputable VPN (Virtual Private Network) to encrypt your internet traffic. This prevents others on the same network from intercepting your data.",
    category: "general",
    difficulty: "intermediate",
  },
  {
    id: "tip-13",
    title: "Implement App Permissions Management",
    content:
      "Regularly review and manage the permissions granted to apps on your mobile devices. Only grant permissions that are necessary for the app to function, and be wary of apps requesting excessive permissions.",
    category: "mobile",
    difficulty: "intermediate",
  },
  {
    id: "tip-14",
    title: "Set Up Remote Wipe Capability",
    content:
      "Enable remote wipe features on your mobile devices. This allows you to remotely erase all data if your device is lost or stolen, preventing unauthorized access to your personal information.",
    category: "mobile",
    difficulty: "advanced",
  },
  {
    id: "tip-15",
    title: "Use Biometric Authentication When Available",
    content:
      "Modern mobile devices offer biometric authentication methods like fingerprint scanning or facial recognition. These are generally more secure than simple PINs or patterns and are harder to compromise.",
    category: "mobile",
    difficulty: "beginner",
  },
  {
    id: "tip-16",
    title: "Recognize Social Engineering Tactics",
    content:
      "Be aware of common social engineering tactics like pretexting (creating a fabricated scenario), baiting (offering something enticing), or quid pro quo (offering a service in exchange for information).",
    category: "social",
    difficulty: "intermediate",
  },
  {
    id: "tip-17",
    title: "Implement Password Rotation for Critical Accounts",
    content:
      "While frequent password changes are no longer universally recommended, consider changing passwords for your most critical accounts (banking, email) every 3-6 months or immediately if there's a data breach.",
    category: "password",
    difficulty: "advanced",
  },
  {
    id: "tip-18",
    title: "Use Different Passwords for Different Accounts",
    content:
      "Never reuse passwords across different accounts. If one account is compromised, using the same password elsewhere gives attackers easy access to your other accounts.",
    category: "password",
    difficulty: "beginner",
  },
  {
    id: "tip-19",
    title: "Be Wary of Shoulder Surfing",
    content:
      "Be aware of your surroundings when entering passwords or sensitive information in public places. Shield the screen or keyboard from view to prevent others from observing your inputs.",
    category: "general",
    difficulty: "beginner",
  },
  {
    id: "tip-20",
    title: "Implement Network Segmentation at Home",
    content:
      "Consider segmenting your home network to separate IoT devices from computers containing sensitive information. This limits the damage if a vulnerable device is compromised.",
    category: "general",
    difficulty: "advanced",
  },
]

const resources = [
  {
    title: "NIST Cybersecurity Framework",
    description:
      "A comprehensive guide to best practices in cybersecurity from the National Institute of Standards and Technology.",
  },
  {
    title: "Have I Been Pwned",
    description: "Check if your email or phone has been involved in a data breach and take appropriate action.",
  },
  {
    title: "Cybersecurity & Infrastructure Security Agency",
    description: "Government resources and alerts about current threats and vulnerabilities.",
  },
  {
    title: "Electronic Frontier Foundation Security Guides",
    description: "Detailed guides on protecting your digital privacy and security from a leading nonprofit.",
  },
]

const checklists = [
  {
    title: "Daily Security Habits",
    items: [
      "Lock your devices when not in use",
      "Be cautious of unexpected emails and messages",
      "Verify requests for sensitive information",
      "Use secure, private browsing when on public Wi-Fi",
      "Keep sensitive discussions private in public places",
    ],
  },
  {
    title: "Monthly Security Maintenance",
    items: [
      "Update all software and applications",
      "Run a full system scan with antivirus software",
      "Review account activity for any unauthorized access",
      "Check for data breaches involving your accounts",
      "Back up important data to secure storage",
    ],
  },
  {
    title: "New Account Security",
    items: [
      "Use a unique, strong password or passphrase",
      "Enable two-factor authentication if available",
      "Review and restrict privacy/sharing settings",
      "Provide only necessary personal information",
      "Read the privacy policy to understand data usage",
    ],
  },
]
