"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

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
              {/* Content would go here */}
            </Card>
          </TabsContent>

          <TabsContent value="example2" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Is this login page real or fake?</CardTitle>
              </CardHeader>
              {/* Content would go here */}
            </Card>
          </TabsContent>

          <TabsContent value="example3" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Is this login page real or fake?</CardTitle>
              </CardHeader>
              {/* Content would go here */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
