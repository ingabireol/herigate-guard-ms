"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  BarChart4, 
  Settings,
  FileText,
  ChevronRight
} from "lucide-react"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Define the navigation items for the admin sidebar
const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Heritage Items",
    href: "/admin/heritage",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart4 className="h-5 w-5" />,
  },
  {
    title: "Content Management",
    href: "/admin/content",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  return (
    <ProtectedRoute requiredRoles={["ROLE_ADMIN"]}>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 bg-card border-r">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-1">Admin Panel</h2>
            <p className="text-sm text-muted-foreground mb-6">Manage Rwanda Heritage Guard</p>
            
            <nav className="space-y-1">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start ${isActive ? "font-medium" : ""}`}
                    asChild
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                      {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                    </Link>
                  </Button>
                )
              })}
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden p-6 md:p-8 bg-background">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}