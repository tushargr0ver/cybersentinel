import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Lock, Brain, Users, Award, CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CyberSentinel</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            Train. Defend. <span className="text-primary">Stay Safe.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Master cybersecurity skills through interactive simulations and real-world scenarios. Protect yourself and
            your organization from digital threats.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth">
              <Button size="lg" className="gap-2">
                Start Training <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Core Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 transition-all hover:border-primary">
                <CardContent className="flex flex-col items-start gap-4 p-6">
                  <div className="rounded-md bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">What Our Users Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="flex h-full flex-col justify-between p-6">
                  <div className="mb-4">
                    <div className="flex text-yellow-500">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <CheckCircle key={i} className="h-4 w-4" />
                        ))}
                    </div>
                    <p className="mt-4 text-muted-foreground">{testimonial.content}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">CyberSentinel</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Train. Defend. Stay Safe.</p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Simulations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Quizzes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Progress Tracking
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
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

const testimonials = [
  {
    content:
      "CyberSentinel has transformed how our team approaches security awareness. The simulations are incredibly realistic and have measurably improved our security posture.",
    name: "Sarah Johnson",
    role: "IT Director",
  },
  {
    content:
      "As someone with limited technical knowledge, I found CyberSentinel's training modules approachable and engaging. I now feel confident in identifying potential threats.",
    name: "Michael Chen",
    role: "Marketing Manager",
  },
  {
    content:
      "The interactive nature of the training makes cybersecurity education fun rather than a chore. Our entire organization has benefited from this platform.",
    name: "Alex Rodriguez",
    role: "HR Specialist",
  },
]
