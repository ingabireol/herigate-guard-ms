"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Plus, 
  Search, 
  Users, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock user data
const USERS = [
  {
    id: 1,
    username: "admin",
    email: "admin@heritage.com",
    firstName: "System",
    lastName: "Administrator",
    active: true,
    roles: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER"],
    createdDate: "2023-01-15T10:30:00",
  },
  {
    id: 2,
    username: "jmugabo",
    email: "jean.mugabo@example.com",
    firstName: "Jean",
    lastName: "Mugabo",
    active: true,
    roles: ["ROLE_MANAGER", "ROLE_USER"],
    createdDate: "2023-02-20T14:45:00",
  },
  {
    id: 3,
    username: "muwase",
    email: "marie.uwase@example.com",
    firstName: "Marie",
    lastName: "Uwase",
    active: true,
    roles: ["ROLE_USER"],
    createdDate: "2023-03-10T09:15:00",
  },
  {
    id: 4,
    username: "dhabimana",
    email: "david.habimana@example.com",
    firstName: "David",
    lastName: "Habimana",
    active: false,
    roles: ["ROLE_USER"],
    createdDate: "2023-04-05T16:20:00",
  },
  {
    id: 5,
    username: "kniyonzima",
    email: "kevin.niyonzima@example.com",
    firstName: "Kevin",
    lastName: "Niyonzima",
    active: true,
    roles: ["ROLE_USER"],
    createdDate: "2023-05-18T11:10:00",
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  
  // Filter users based on search query, status, and role
  const filteredUsers = USERS.filter(user => {
    const matchesSearch = 
      searchQuery === "" || 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "active" && user.active) ||
      (statusFilter === "inactive" && !user.active)
    
    const matchesRole =
      roleFilter === "all" ||
      user.roles.includes(roleFilter)
    
    return matchesSearch && matchesStatus && matchesRole
  })
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their access rights</p>
        </div>
        <Button asChild>
          <Link href="/admin/users/new">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, username or email..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={roleFilter}
          onValueChange={setRoleFilter}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="ROLE_ADMIN">Admin</SelectItem>
            <SelectItem value="ROLE_MANAGER">Manager</SelectItem>
            <SelectItem value="ROLE_USER">User</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* User Table */}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.active ? (
                    <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-error-red/10 text-error-red border-error-red/20">
                      <XCircle className="mr-1 h-3 w-3" />
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role) => {
                      let badgeVariant: "default" | "secondary" | "outline" = "outline"
                      
                      if (role === "ROLE_ADMIN") {
                        badgeVariant = "default"
                      } else if (role === "ROLE_MANAGER") {
                        badgeVariant = "secondary"
                      }
                      
                      return (
                        <Badge key={role} variant={badgeVariant} className="whitespace-nowrap">
                          {role.replace('ROLE_', '')}
                        </Badge>
                      )
                    })}
                  </div>
                </TableCell>
                <TableCell>{formatDate(user.createdDate)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}`}>
                          <Users className="mr-2 h-4 w-4" />
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-error-red focus:text-error-red">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No users found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}