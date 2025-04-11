"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shield, Github } from "lucide-react"
import { account } from "@/lib/appwrite"

export default function AuthPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // 👇 Check if redirected back from GitHub login
    const isOAuthRedirect = searchParams.get("success")

    if (typeof window !== "undefined" && isOAuthRedirect !== null) {
      setLoading(true)
      account
        .get()
        .then((user) => {
          // 👇 Save user info in localStorage
          localStorage.setItem("user", JSON.stringify(user))
          router.push("/dashboard")
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err)
          router.push("/login")
        })
        .finally(() => setLoading(false))
    }
  }, [searchParams, router])

  const loginWithGitHub = () => {
    setLoading(true)
    account.createOAuth2Session(
      "github",
      `${window.location.origin}/dashboard`, // 👈 so we know it's a redirect
      `${window.location.origin}/login?error=1`
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">CyberSentinel</span>
      </Link>

      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={loginWithGitHub}
              disabled={loading}
            >
              <Github className="h-5 w-5" />
              {loading ? "Redirecting..." : "Continue with GitHub"}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Button className="w-full" disabled>
              Email Sign In (Coming Soon)
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
