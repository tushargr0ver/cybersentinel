"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Shield,
  Lock,
  Brain,
  Users,
  Award,
  CheckCircle
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0D1117] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0D1117] shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-400" />
            <span className="text-xl font-bold tracking-wider text-white">
              CyberSentinel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" className="text-white w-28 hover:text-green-400">
                Login
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-green-500 text-black hover:bg-green-400">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0D1117] to-[#161B22] py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            Train. Defend. <span className="text-green-400">Stay Safe.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl"
          >
            Master cybersecurity skills through interactive simulations and real-world scenarios.
            Protect yourself and your organization from digital threats.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/auth">
              <Button size="lg" className="gap-2 w-48 h-12 bg-green-500 text-black hover:bg-green-400 transition-all">
                Start Training <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 w-48 h-12 text-green-500 hover:border-green-400 hover:text-green-400 transition-all"
              >
                Explore Features
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#0D1117]">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl text-white">
            Core Features
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border border-gray-700 transition-all hover:border-green-400 hover:shadow-lg hover:shadow-green-500/10 bg-[#161B22]">
                  <CardContent className="flex flex-col items-start gap-4 p-6">
                    <div className="rounded-md bg-green-500/10 p-3">
                      <feature.icon className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 bg-[#0D1117]">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4 text-white">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">CyberSentinel</span>
              </div>
              <p className="mt-4 text-sm text-gray-400">Train. Defend. Stay Safe.</p>
            </div>
            {footerLinks.map(({ title, links }) => (
              <div key={title}>
                <h3 className="mb-4 text-sm font-semibold text-gray-300">{title}</h3>
                <ul className="space-y-2 text-sm">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-gray-400 hover:text-green-400">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CyberSentinel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Phishing Simulations",
    description: "Practice identifying and responding to phishing attempts through realistic email and SMS scenarios.",
    icon: Shield,
  },
  {
    title: "Social Engineering Defense",
    description: "Learn to recognize and counter social engineering tactics with our interactive chatbot simulations.",
    icon: Users,
  },
  {
    title: "Password Security",
    description: "Test and strengthen your password practices with our advanced strength analyzer and tips.",
    icon: Lock,
  },
  {
    title: "Interactive Quizzes",
    description: "Reinforce your knowledge with dynamic quizzes covering all aspects of cybersecurity.",
    icon: Brain,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed analytics and performance metrics.",
    icon: Award,
  },
  {
    title: "Best Practices",
    description: "Access a comprehensive library of cybersecurity tips and best practices.",
    icon: CheckCircle,
  },
]

const footerLinks = [
  {
    title: "Platform",
    links: ["Features", "Simulations", "Quizzes", "Progress Tracking"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
  },
]