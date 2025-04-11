"use client"

import { DashboardLayout } from "../../../../components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
// import { BarChart } from "@/components/ui/chart"
import { Award, BarChart3, Brain, CheckCircle2, Mail, MessageSquare, Shield } from "lucide-react"

export default function ProgressPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Progress Tracker</h1>
          <p className="text-muted-foreground">Monitor your cybersecurity training progress and performance</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Completion</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <Progress value={68} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">22 of 32 modules completed</p>
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
              <p className="mt-2 text-xs text-muted-foreground">Average score across all quizzes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Phishing Detection</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <Progress value={75} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">Accuracy in identifying phishing attempts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Social Engineering</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">60%</div>
              <Progress value={60} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">Success rate in chatbot simulations</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
                <CardDescription>Your quiz and simulation scores over the past 3 months</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <div className="h-[300px]">
                  <BarChart
                    data={performanceData}
                    index="month"
                    categories={["quizzes", "phishing", "social"]}
                    colors={["chart-1", "chart-2", "chart-3"]}
                    valueFormatter={(value) => `${value}%`}
                    yAxisWidth={40}
                  />
                </div> */}
                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[var(--color-chart-1)]"></div>
                    <span className="text-sm">Quizzes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[var(--color-chart-2)]"></div>
                    <span className="text-sm">Phishing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[var(--color-chart-3)]"></div>
                    <span className="text-sm">Social Engineering</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Strengths</CardTitle>
                  <CardDescription>Areas where you're performing well</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {strengths.map((strength, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="rounded-full bg-green-500/10 p-1">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">{strength.title}</h4>
                          <p className="text-sm text-muted-foreground">{strength.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                  <CardDescription>Focus on these areas to enhance your skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="rounded-full bg-orange-500/10 p-1">
                          <BarChart3 className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">{improvement.title}</h4>
                          <p className="text-sm text-muted-foreground">{improvement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Modules</CardTitle>
                <CardDescription>Your progress through the cybersecurity curriculum</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {modules.map((module) => (
                    <div key={module.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{module.title}</h3>
                        <Badge
                          variant={
                            module.status === "Completed"
                              ? "default"
                              : module.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {module.status}
                        </Badge>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {module.completedItems} of {module.totalItems} items completed
                        </span>
                        <span>Last activity: {module.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`border-2 ${achievement.unlocked ? "border-primary" : "border-muted opacity-70"}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{achievement.title}</CardTitle>
                      {achievement.unlocked ? (
                        <Badge className="bg-primary">Unlocked</Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-3 ${achievement.unlocked ? "bg-primary/10" : "bg-muted"}`}>
                        <Award
                          className={`h-6 w-6 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {!achievement.unlocked && (
                          <p className="mt-1 text-xs font-medium">Progress: {achievement.progress}%</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

const performanceData = [
  {
    month: "Jan",
    quizzes: 65,
    phishing: 58,
    social: 45,
  },
  {
    month: "Feb",
    quizzes: 72,
    phishing: 65,
    social: 52,
  },
  {
    month: "Mar",
    quizzes: 78,
    phishing: 70,
    social: 58,
  },
  {
    month: "Apr",
    quizzes: 82,
    phishing: 75,
    social: 60,
  },
]

const strengths = [
  {
    title: "Password Security",
    description: "You consistently create strong passwords and correctly identify password vulnerabilities.",
  },
  {
    title: "Email Phishing Detection",
    description: "You're skilled at identifying suspicious emails and recognizing phishing attempts.",
  },
  {
    title: "Security Awareness",
    description: "You demonstrate good knowledge of general cybersecurity concepts and best practices.",
  },
]

const improvements = [
  {
    title: "Social Engineering Defense",
    description: "You sometimes share too much information in the chatbot simulations.",
  },
  {
    title: "Mobile Security",
    description: "Your performance in SMS phishing detection is below average.",
  },
  {
    title: "Public Wi-Fi Safety",
    description: "You need to improve your understanding of safe practices when using public networks.",
  },
]

const modules = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals",
    status: "Completed",
    progress: 100,
    completedItems: 5,
    totalItems: 5,
    lastActivity: "2 weeks ago",
  },
  {
    id: 2,
    title: "Phishing Awareness",
    status: "Completed",
    progress: 100,
    completedItems: 4,
    totalItems: 4,
    lastActivity: "1 week ago",
  },
  {
    id: 3,
    title: "Password Security",
    status: "Completed",
    progress: 100,
    completedItems: 3,
    totalItems: 3,
    lastActivity: "3 days ago",
  },
  {
    id: 4,
    title: "Social Engineering Defense",
    status: "In Progress",
    progress: 60,
    completedItems: 3,
    totalItems: 5,
    lastActivity: "Today",
  },
  {
    id: 5,
    title: "Mobile Device Security",
    status: "In Progress",
    progress: 40,
    completedItems: 2,
    totalItems: 5,
    lastActivity: "Yesterday",
  },
  {
    id: 6,
    title: "Data Protection",
    status: "Not Started",
    progress: 0,
    completedItems: 0,
    totalItems: 4,
    lastActivity: "N/A",
  },
]

const achievements = [
  {
    id: 1,
    title: "Phishing Expert",
    description: "Correctly identify 50 phishing attempts",
    unlocked: true,
    progress: 100,
  },
  {
    id: 2,
    title: "Password Master",
    description: "Score 100% on the Password Security quiz",
    unlocked: true,
    progress: 100,
  },
  {
    id: 3,
    title: "Security Sentinel",
    description: "Complete all core training modules",
    unlocked: false,
    progress: 75,
  },
  {
    id: 4,
    title: "Social Engineering Defender",
    description: "Successfully complete 10 social engineering simulations",
    unlocked: false,
    progress: 60,
  },
  {
    id: 5,
    title: "Perfect Score",
    description: "Achieve 100% on any 3 quizzes",
    unlocked: false,
    progress: 67,
  },
  {
    id: 6,
    title: "Security Champion",
    description: "Reach the top 10 on the leaderboard",
    unlocked: true,
    progress: 100,
  },
]
