import Link from "next/link";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Lock, AlertTriangle } from "lucide-react";

const simulations = [
  {
    id: 1,
    title: "Phishing Detection",
    description: "Learn to identify and respond to phishing attempts in emails and SMS messages.",
    difficulty: "Medium",
    icon: Mail,
    features: ["Realistic email scenarios", "SMS phishing examples", "Real-time feedback", "Detailed explanations"],
    href: "/dashboard/simulations/phishing",
  },
  {
    id: 2,
    title: "Social Engineering",
    description: "Practice defending against social engineering tactics through interactive chat scenarios.",
    difficulty: "Hard",
    icon: MessageSquare,
    features: ["AI-powered conversation", "Multiple attack vectors", "Personalized feedback", "Difficulty progression"],
    href: "/dashboard/simulations/chatbot",
  },
  {
    id: 3,
    title: "Password Strength",
    description: "Test and improve your password creation skills with real-time analysis.",
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
    description: "Learn to spot fraudulent login pages designed to steal your credentials.",
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
];

const upcomingSimulations = [
  {
    title: "Ransomware Response",
    description: "Learn how to identify and respond to ransomware threats.",
    icon: AlertTriangle,
  },
  {
    title: "Wi-Fi Security",
    description: "Practice securing wireless networks and identifying rogue access points.",
    icon: Lock,
  },
  {
    title: "Mobile Device Security",
    description: "Learn how to protect your mobile devices from cybersecurity threats.",
    icon: Lock,
  },
];

export default function SimulationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12 bg-[#0A0C0F] text-white p-6">
        {/* Section Title */}
        <div >
          <h1 className="text-4xl font-extrabold text-white">Simulations</h1>
          <p className="text-lg text-gray-400">
            Practice identifying and responding to real-world cybersecurity threats.
          </p>
        </div>

        {/* Simulations Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {simulations.map((simulation) => (
            <Card key={simulation.id} className="flex flex-col overflow-hidden border border-white shadow-lg transition-transform transform hover:scale-105 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/10">
              {/* Icon Section */}
              <div className="bg-green-500/10 p-6 flex justify-center">
                <simulation.icon className="h-12 w-12 text-green-400" />
              </div>

              {/* Card Header */}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-white">{simulation.title}</CardTitle>
                  <Badge
                    variant={
                      simulation.difficulty === "Easy"
                        ? "outline"
                        : simulation.difficulty === "Medium"
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-sm text-white"
                  >
                    {simulation.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-gray-400">{simulation.description}</CardDescription>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-2 text-sm text-gray-300">
                  {simulation.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Card Footer */}
              <CardFooter className="border-t bg-gray-800/40 px-6 py-4">
                <Button asChild className="w-full bg-green-500 hover:bg-green-400 text-black">
                  <Link href={simulation.href} className="text-white hover:text-black transition-colors">
                    Start Simulation
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="rounded-lg border border-white bg-gray-800 p-8 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-green-500">Coming Soon</h2>
              <p className="text-gray-400 text-sm">
                New simulations are being developed to help you stay ahead of emerging threats.
              </p>
            </div>
            <Button variant="outline" disabled className="text-gray-400">
              Get Notified
            </Button>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingSimulations.map((simulation, index) => (
              <Card key={index} className="bg-gray-800/50 border border-white hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-300">
                    <simulation.icon className="h-5 w-5 text-green-400" />
                    {simulation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">{simulation.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}