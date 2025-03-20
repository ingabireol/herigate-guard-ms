"use client"

import Link from "next/link"
import { 
  Users, 
  BookOpen, 
  LineChart, 
  AlertCircle, 
  Eye, 
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/heritage/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Heritage Item
          </Link>
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success-green">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Heritage Items</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success-green">+32</span> new items added
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,246</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success-green">+41%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contributions</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success-green">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="h-5 w-5 text-success-green" />
                </div>
                <div>
                  <p className="text-sm font-medium">New heritage item approved</p>
                  <p className="text-xs text-muted-foreground">Traditional Dance of Intore</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Users className="h-5 w-5 text-heritage-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">Jean Mugabo (jean.mugabo@example.com)</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Clock className="h-5 w-5 text-alert-orange" />
                </div>
                <div>
                  <p className="text-sm font-medium">Content update pending review</p>
                  <p className="text-xs text-muted-foreground">Traditional Basketry - Updated description</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <AlertCircle className="h-5 w-5 text-error-red" />
                </div>
                <div>
                  <p className="text-sm font-medium">Content reported by user</p>
                  <p className="text-xs text-muted-foreground">King's Palace Museum - Inaccurate information</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="ml-auto" asChild>
              <Link href="/admin/activity">
                View All Activity
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" asChild>
              <Link href="/admin/users/new">
                <Users className="mr-2 h-4 w-4" />
                Add New User
              </Link>
            </Button>
            
            <Button className="w-full justify-start" asChild>
              <Link href="/admin/heritage/new">
                <BookOpen className="mr-2 h-4 w-4" />
                Add Heritage Item
              </Link>
            </Button>
            
            <Button className="w-full justify-start" asChild>
              <Link href="/admin/content/pending">
                <Clock className="mr-2 h-4 w-4" />
                Review Pending Content
              </Link>
            </Button>
            
            <Button className="w-full justify-start" asChild>
              <Link href="/admin/reports">
                <AlertCircle className="mr-2 h-4 w-4" />
                View Reports
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Recently Added Heritage Items */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recently Added Heritage Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <div className="aspect-video bg-slate-gray"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Imigongo Art {item}</CardTitle>
                  <Badge>Art</Badge>
                </div>
                <CardDescription>Added 3 days ago</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Traditional geometric art form from Eastern Province using natural pigments.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto" asChild>
                  <Link href={`/admin/heritage/${item}`}>
                    Manage Item
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}