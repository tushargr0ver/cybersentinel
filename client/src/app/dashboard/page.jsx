"use client";

import { DashboardLayout } from "../../../components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Award, BarChart3, Brain, Mail, MessageSquare, Shield } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col bg-[#0D1117] text-white min-h-screen">
        {/* Heading Section */}
        <div className="py-8 px-4 border-b border-gray-700">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-lg text-gray-400">Welcome back, Here's your security training overview.</p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-8 px-4">
          {overviewCards.map((card, index) => (
            <Card key={index} className="rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[#161B22]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-white">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{card.value}</div>
                <Progress value={card.progress} className="mt-2 bg-green-500" />
                <p className="mt-2 text-xs text-white">{card.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-8 px-4">
          <Card className="md:col-span-2 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[#161B22]">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-white">Your latest training activities and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-3 hover:bg-green-500/10 transition-all bg-[#1A202C]">
                    <div className="rounded-md bg-green-500/10 p-2">
                      <activity.icon className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white">{activity.title}</h4>
                      <p className="text-xs text-white">{activity.description}</p>
                    </div>
                    <div className="text-xs text-white">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[#161B22]">
            <CardHeader>
              <CardTitle className="text-white">Your Achievements</CardTitle>
              <CardDescription className="text-white">Badges and rewards earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/10 p-2">
                      <Award className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{achievement.title}</h4>
                      <p className="text-xs text-white">{achievement.description}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="mt-2 w-full text-green-400 hover:text-white hover:bg-green-500">
                  View All Achievements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Training */}
        <div className="py-8 px-4">
          <h2 className="text-2xl font-semibold text-white mb-4">Recommended Training</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedTraining.map((training, index) => (
              <Card key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[#161B22]">
                <div className="bg-green-500/10 p-6">
                  <training.icon className="h-8 w-8 text-green-400" />
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{training.title}</CardTitle>
                  <CardDescription className="text-gray-400">{training.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${training.difficulty === "Easy" ? "bg-green-500" : training.difficulty === "Medium" ? "bg-yellow-500" : "bg-red-500"}`} />
                      <span className="text-xs text-gray-400">{training.difficulty}</span>
                    </div>
                    <Button variant="outline" size="sm" className="text-green-400 hover:bg-green-500 hover:text-white">
                      Start Training
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const overviewCards = [
  {
    title: "Completed Courses",
    value: "15",
    progress: 75,
    change: "+3 this month",
    icon: BarChart3,
  },
  {
    title: "Total Hours",
    value: "120",
    progress: 60,
    change: "-5 hours this week",
    icon: Brain,
  },
  {
    title: "Messages",
    value: "8",
    progress: 50,
    change: "+2 new messages",
    icon: Mail,
  },
];

const recentActivities = [
  {
    title: "Completed Security Level 1",
    description: "You completed the introductory level on security practices.",
    time: "2 hours ago",
    icon: Shield,
  },
  {
    title: "Read Article: 'Data Privacy Best Practices'",
    description: "You read an article about the best data privacy practices.",
    time: "1 day ago",
    icon: MessageSquare,
  },
];

const achievements = [
  {
    title: "Security Expert",
    description: "Earned after completing all Level 1 courses.",
  },
  {
    title: "Advanced Learner",
    description: "Earned after completing 50 hours of training.",
  },
];

const recommendedTraining = [
  {
    title: "Introduction to Cybersecurity",
    description: "A beginner's guide to understanding cybersecurity fundamentals.",
    difficulty: "Easy",
    icon: Award,
  },
  {
    title: "Data Protection and Privacy",
    description: "Learn best practices for data protection and privacy in the digital age.",
    difficulty: "Medium",
    icon: BarChart3,
  },
  {
    title: "Advanced Threat Detection",
    description: "Dive deeper into advanced techniques for detecting and responding to cyber threats.",
    difficulty: "Hard",
    icon: Brain,
  },
];