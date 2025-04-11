import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Award, BarChart3, Brain, Mail, MessageSquare, Shield } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's your security training overview.</p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <Progress value={68} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Simulations Completed</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7/12</div>
              <Progress value={58} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">5 simulations remaining</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Performance</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <Progress value={82} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">+5% from previous quiz</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>

              <CardDescription>Your latest training activities and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Badges and rewards earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View All Achievements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Training */}
        <div>
          <h2 className="mb-4 text-xl font-semibold tracking-tight">Recommended Training</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedTraining.map((training, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="bg-primary/10 p-6">
                  <training.icon className="h-8 w-8 text-primary" />
                </div>
                <CardHeader>
                  <CardTitle>{training.title}</CardTitle>
                  <CardDescription>{training.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${training.difficulty === "Easy" ? "bg-green-500" : training.difficulty === "Medium" ? "bg-yellow-500" : "bg-red-500"}`}
                      ></div>
                      <span className="text-xs">{training.difficulty}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{training.duration}</span>
                  </div>
                  <Button asChild className="mt-4 w-full">
                    <Link href={training.href}>
                      Start Training <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const recentActivities = [
  {
    title: "Phishing Simulation Completed",
    description: "You successfully identified 8/10 phishing attempts",
    time: "2 hours ago",
    icon: Mail,
  },
  {
    title: "Cybersecurity Quiz",
    description: "Scored 85% on Password Security quiz",
    time: "Yesterday",
    icon: Brain,
  },
  {
    title: "Social Engineering Training",
    description: "Completed chatbot simulation with 70% success rate",
    time: "3 days ago",
    icon: MessageSquare,
  },
  {
    title: "Progress Milestone",
    description: "Reached 65% of total training curriculum",
    time: "1 week ago",
    icon: BarChart3,
  },
]

const achievements = [
  {
    title: "Phishing Expert",
    description: "Identified 50 phishing attempts",
  },
  {
    title: "Password Master",
    description: "Created 5 strong passwords",
  },
  {
    title: "Quiz Champion",
    description: "Scored 90%+ on 3 consecutive quizzes",
  },
]

const recommendedTraining = [
  {
    title: "Advanced Phishing Defense",
    description: "Learn to identify sophisticated phishing techniques",
    difficulty: "Medium",
    duration: "20 min",
    icon: Mail,
    href: "/dashboard/simulations/phishing",
  },
  {
    title: "Social Engineering Tactics",
    description: "Understand and counter manipulation techniques",
    difficulty: "Hard",
    duration: "30 min",
    icon: MessageSquare,
    href: "/dashboard/simulations/chatbot",
  },
  {
    title: "Password Security Quiz",
    description: "Test your knowledge of password best practices",
    difficulty: "Easy",
    duration: "15 min",
    icon: Brain,
    href: "/dashboard/quizzes",
  },
]
