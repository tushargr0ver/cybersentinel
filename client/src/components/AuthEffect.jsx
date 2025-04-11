"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { account } from "@/lib/appwrite"

export default function AuthEffect() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const isOAuthRedirect = searchParams.get("success")

    if (typeof window !== "undefined" && isOAuthRedirect !== null) {
      account
        .get()
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user))
          router.push("/dashboard")
        })
        .catch(() => {
          router.push("/login")
        })
    }
  }, [searchParams, router])

  return null
}
