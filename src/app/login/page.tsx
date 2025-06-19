import { LoginForm } from "@/components/login-form"
import { getUserId } from "@/lib/actions"
import { redirect } from "next/navigation"

import Link from "next/link"

export default async function LoginPage() {
  // Check if user is already logged in
  // If so, redirect to dashboard or home page

  const userId = await getUserId()

  if (userId !== undefined) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Allow user to go to home page */}
        <Link href="/" className="flex items-center gap-2 self-center font-medium hover:underline">
          BookTrack
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
