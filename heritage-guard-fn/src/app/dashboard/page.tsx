"use client"

import { useAuth } from "@/store/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart, 
  Clock, 
  Map, 
  BookOpen, 
  Heart, 
  User,
  Settings,
  FileText,
  Users,
  Bookmark
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  
  return (
    <ProtectedRoute>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user?.firstName || user?.username}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Heritage Items Viewed</CardTitle>
              <CardDescription>Your recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="text-success-green">+2</span> from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Saved Items</CardTitle>
              <CardDescription>Items in your collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-sm text-muted-foreground mt-2">
                Across 3 categories
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Contributions</CardTitle>
              <CardDescription>Comments and notes added</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-sm text-muted-foreground mt-2">
                Thank you for your insights!
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions with heritage items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-background">
                  <div className="h-10 w-10 rounded bg-slate-gray flex items-center justify-center text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Viewed Traditional Art Collection</h3>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-lg bg-background">
                  <div className="h-10 w-10 rounded bg-slate-gray flex items-center justify-center text-white">
                    <Bookmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Saved "Imigongo Art" to your collection</h3>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-lg bg-background">
                  <div className="h-10 w-10 rounded bg-slate-gray flex items-center justify-center text-white">
                    <Map className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Explored Kigali Genocide Memorial</h3>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Access common features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1" asChild>
                  <Link href="/heritage">
                    <BookOpen className="mb-1 h-5 w-5" />
                    <span className="text-xs">Explore Heritage</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1" asChild>
                  <Link href="/dashboard/saved">
                    <Heart className="mb-1 h-5 w-5" />
                    <span className="text-xs">Saved Items</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1" asChild>
                  <Link href="/profile">
                    <User className="mb-1 h-5 w-5" />
                    <span className="text-xs">My Profile</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1" asChild>
                  <Link href="/settings">
                    <Settings className="mb-1 h-5 w-5" />
                    <span className="text-xs">Settings</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin Quick Access - Only show for admin users */}
        {user?.roles.includes("ROLE_ADMIN") && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Admin Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button variant="outline" className="h-24 flex items-center justify-start gap-4 p-6" asChild>
                <Link href="/admin/users">
                  <Users className="h-6 w-6" />
                  <div className="text-left">
                    <h3 className="font-medium">User Management</h3>
                    <p className="text-xs text-muted-foreground">Manage system users</p>
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-24 flex items-center justify-start gap-4 p-6" asChild>
                <Link href="/admin/heritage">
                  <FileText className="h-6 w-6" />
                  <div className="text-left">
                    <h3 className="font-medium">Heritage Management</h3>
                    <p className="text-xs text-muted-foreground">Edit and create content</p>
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-24 flex items-center justify-start gap-4 p-6" asChild>
                <Link href="/admin/analytics">
                  <BarChart className="h-6 w-6" />
                  <div className="text-left">
                    <h3 className="font-medium">Analytics</h3>
                    <p className="text-xs text-muted-foreground">View system statistics</p>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}