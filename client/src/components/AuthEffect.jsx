"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { account } from "@/lib/appwrite"

export default function AuthEffect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const isOAuthRedirect = searchParams.get("success")

    if (typeof window !== "undefined" && isOAuthRedirect !== null) {
      account
        .get()
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user))
          router.push("/dashboard")
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err)
          router.push("/login")
        })
    }
  }, [searchParams, router])

  return null
}
