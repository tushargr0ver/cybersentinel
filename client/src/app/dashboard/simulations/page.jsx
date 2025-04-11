import Link from "next/link"
import { DashboardLayout } from "../../../../components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Lock, AlertTriangle } from "lucide-react"

export default function SimulationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Simulations</h1>
          <p className="text-muted-foreground">
            Practice identifying and responding to real-world cybersecurity threats
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {simulations.map((simulation) => (
            <Card key={simulation.id} className="flex flex-col overflow-hidden">
              <div className="bg-primary/10 p-6">
                <simulation.icon className="h-10 w-10 text-primary" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{simulation.title}</CardTitle>
                  <Badge
                    variant={
                      simulation.difficulty === "Easy"
                        ? "outline"
                        : simulation.difficulty === "Medium"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {simulation.difficulty}
                  </Badge>
                </div>
                <CardDescription>{simulation.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  {simulation.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t bg-muted/40 px-6 py-4">
                <Button asChild className="w-full">
                  <Link href={simulation.href}>Start Simulation</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Coming Soon</h2>
              <p className="text-muted-foreground">
                New simulations are being developed to help you stay ahead of emerging threats
              </p>
            </div>
            <Button variant="outline" disabled>
              Get Notified
            </Button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingSimulations.map((simulation, index) => (
              <Card key={index} className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-muted-foreground">
                    <simulation.icon className="h-5 w-5" />
                    {simulation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{simulation.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const simulations = [
  {
    id: 1,
    title: "Phishing Detection",
    description: "Learn to identify and respond to phishing attempts in emails and SMS messages",
    difficulty: "Medium",
    icon: Mail,
    features: ["Realistic email scenarios", "SMS phishing examples", "Real-time feedback", "Detailed explanations"],
    href: "/dashboard/simulations/phishing",
  },
  {
    id: 2,
    title: "Social Engineering",
    description: "Practice defending against social engineering tactics through interactive chat scenarios",
    difficulty: "Hard",
    icon: MessageSquare,
    features: ["AI-powered conversation", "Multiple attack vectors", "Personalized feedback", "Difficulty progression"],
    href: "/dashboard/simulations/chatbot",
  },
  {
    id: 3,
    title: "Password Strength",
    description: "Test and improve your password creation skills with real-time analysis",
    difficulty: "Easy",
    icon: Lock,
    features: [
      "Strength meter",
      "Common vulnerability detection",
      "Improvement suggestions",
      "Best practice guidelines",
    ],
    href: "/dashboard/simulations/password",
  },
  {
    id: 4,
    title: "Fake Login Detection",
    description: "Learn to spot fraudulent login pages designed to steal your credentials",
    difficulty: "Medium",
    icon: AlertTriangle,
    features: [
      "Visual comparison exercises",
      "URL analysis training",
      "Security indicator awareness",
      "Browser security features",
    ],
    href: "/dashboard/simulations/fake-login",
  },
]

const upcomingSimulations = [
  {
    title: "Ransomware Response",
    description: "Learn how to identify and respond to ransomware threats",
    icon: AlertTriangle,
  },
  {
    title: "Wi-Fi Security",
    description: "Practice securing wireless networks and identifying rogue access points",
    icon: Lock,
  },
  {
    title: "Mobile Device Security",
    description: "Learn best practices for securing smartphones and tablets",
    icon: Lock,
  },
]
