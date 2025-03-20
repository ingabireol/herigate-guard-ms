import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-16 text-center">
      <ShieldAlert className="h-24 w-24 text-destructive mb-8" />
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        You don&apos;t have permission to access this page.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}