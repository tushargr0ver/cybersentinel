"use client"

import { useState } from "react"
import { DashboardLayout } from "../../../../components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Award, Crown, Medal, Search, Trophy, Brain, Shield } from "lucide-react"

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeframe, setTimeframe] = useState("monthly")

  const filteredUsers = leaderboardData[timeframe].filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other users in cybersecurity training</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="monthly" className="w-full sm:w-auto" onValueChange={(value) => setTimeframe(value)}>
            <TabsList className="grid w-full grid-cols-3 sm:w-[400px]">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="allTime">All Time</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Users with the highest security training scores</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Trophy className="h-3.5 w-3.5" />
                  {timeframe === "weekly" ? "This Week" : timeframe === "monthly" ? "This Month" : "All Time"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Top 3 Users */}
              <div className="grid gap-4 md:grid-cols-3">
                {filteredUsers.slice(0, 3).map((user, index) => (
                  <Card
                    key={user.id}
                    className={`border-2 ${user.isCurrentUser ? "border-primary" : "border-transparent"}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatar || `/placeholder.svg?height=80&width=80`} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-3 left-1/2  -translate-x-1/2">
                            {index === 0 ? (
                              <div className="rounded-full bg-yellow-500 p-1">
                                <Crown className="h-5 w-5 text-white" />
                              </div>
                            ) : index === 1 ? (
                              <div className="rounded-full bg-gray-400 p-1">
                                <Medal className="h-5 w-5 text-white" />
                              </div>
                            ) : (
                              <div className="rounded-full bg-amber-700 p-1">
                                <Award className="h-5 w-5 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="mt-4 font-semibold">
                          {user.name}
                          {user.isCurrentUser && <span className="ml-2 text-xs text-primary">(You)</span>}
                        </h3>
                        <p className="text-sm text-muted-foreground">{user.department}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="secondary">{user.score} pts</Badge>
                          <Badge variant="outline" className="gap-1">
                            <Trophy className="h-3 w-3" />
                            {user.badges}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Leaderboard Table */}
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                  <div className="col-span-1 text-center">Rank</div>
                  <div className="col-span-7 sm:col-span-5">User</div>
                  <div className="col-span-4 sm:col-span-2 text-center">Score</div>
                  <div className="hidden sm:col-span-2 sm:block text-center">Badges</div>
                  <div className="hidden sm:col-span-2 sm:block">Department</div>
                </div>
                <div className="divide-y">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`grid grid-cols-12 gap-2 p-4 ${user.isCurrentUser ? "bg-primary/5" : ""}`}
                    >
                      <div className="col-span-1 flex items-center justify-center">
                        {user.rank <= 3 ? (
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              user.rank === 1 ? "bg-yellow-500" : user.rank === 2 ? "bg-gray-400" : "bg-amber-700"
                            } text-white text-xs font-bold`}
                          >
                            {user.rank}
                          </div>
                        ) : (
                          <span className="text-sm font-medium">{user.rank}</span>
                        )}
                      </div>
                      <div className="col-span-7 sm:col-span-5 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || `/placeholder.svg?height=32&width=32`} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {user.name}
                            {user.isCurrentUser && <span className="ml-2 text-xs text-primary">(You)</span>}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2 flex items-center justify-center">
                        <Badge variant={user.isCurrentUser ? "default" : "secondary"}>{user.score} pts</Badge>
                      </div>
                      <div className="hidden sm:col-span-2 sm:flex items-center justify-center">
                        <Badge variant="outline" className="gap-1">
                          <Trophy className="h-3 w-3" />
                          {user.badges}
                        </Badge>
                      </div>
                      <div className="hidden sm:col-span-2 sm:flex items-center text-sm text-muted-foreground">
                        {user.department}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How Scores Are Calculated</CardTitle>
            <CardDescription>Understanding the leaderboard ranking system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-md bg-primary/10 p-2">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Quiz Performance</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Each quiz awards points based on your score. Perfect scores earn bonus points. Quizzes contribute 40%
                  to your total score.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-md bg-primary/10 p-2">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Simulation Success</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Points are awarded for successfully completing phishing and social engineering simulations. These
                  contribute 40% to your total score.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-md bg-primary/10 p-2">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Badges & Achievements</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Earning badges for completing challenges and milestones contributes the remaining 20% to your total
                  score.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

const generateLeaderboardData = (count, timeframe) => {
  const users = []

  // Multiplier to adjust scores based on timeframe
  const multiplier = timeframe === "weekly" ? 0.3 : timeframe === "monthly" ? 0.6 : 1

  for (let i = 0; i < count; i++) {
    const isCurrentUser = i === 3 // Make the 4th user the current user

    users.push({
      id: i + 1,
      name: isCurrentUser ? "John Doe" : `User ${i + 1}`,
      score: Math.round((1000 - i * 25) * multiplier),
      rank: i + 1,
      department: ["IT", "Marketing", "Sales", "HR", "Finance"][i % 5],
      badges: Math.max(1, Math.round((10 - i * 0.5) * multiplier)),
      isCurrentUser,
    })
  }

  return users
}

const leaderboardData = {
  weekly: generateLeaderboardData(20, "weekly"),
  monthly: generateLeaderboardData(20, "monthly"),
  allTime: generateLeaderboardData(20, "allTime"),
}
