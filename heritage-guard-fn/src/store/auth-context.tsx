"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

type User = {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  roles: string[]
}

type AuthContextType = {
  user: User | null
  token: string | null
  loading: boolean
  login: (usernameOrEmail: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  hasRole: (role: string) => boolean
  refreshToken: () => Promise<void>
}

type RegisterData = {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}

type AuthResponse = {
  token: string
  refreshToken: string
  id: number
  username: string
  email: string
  roles: string[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Initialize auth state from localStorage on client side
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  // Login function
  const login = async (usernameOrEmail: string, password: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernameOrEmail,
          password,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to login')
      }

      const data: AuthResponse = await response.json()

      // Store auth data
      localStorage.setItem('token', data.token)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        username: data.username,
        email: data.email,
        roles: data.roles,
      }))

      setToken(data.token)
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
        roles: data.roles,
      })

      toast({
        title: "Login successful",
        description: `Welcome back, ${data.username}!`,
      })

      // Redirect to dashboard or home
      router.push('/dashboard')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
      })
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (userData: RegisterData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to register')
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created. Please login to continue.",
      })

      // Redirect to login page
      router.push('/auth/login')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
      })
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    // Clear local storage
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')

    // Reset state
    setToken(null)
    setUser(null)

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    // Redirect to home
    router.push('/')
  }

  // Check if user has a specific role
  const hasRole = (role: string) => {
    if (!user) return false
    return user.roles.includes(role)
  }

  // Refresh token function
  const refreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken')
      if (!storedRefreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: storedRefreshToken,
        }),
      })

      if (!response.ok) {
        // If refresh token is invalid, logout the user
        logout()
        throw new Error('Failed to refresh token')
      }

      const data: AuthResponse = await response.json()

      // Update tokens and user data
      localStorage.setItem('token', data.token)
      localStorage.setItem('refreshToken', data.refreshToken)
      
      setToken(data.token)
      
      // Optionally update user data if it changed
      if (user && (
        user.username !== data.username ||
        user.email !== data.email ||
        JSON.stringify(user.roles) !== JSON.stringify(data.roles)
      )) {
        const updatedUser = {
          id: data.id,
          username: data.username,
          email: data.email,
          roles: data.roles,
        }
        
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
      }
      
    } catch (error) {
      console.error('Token refresh failed:', error)
      // For security reasons, log the user out if token refresh fails
      if (token) logout()
    }
  }

  const isAuthenticated = !!token && !!user

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated,
      hasRole,
      refreshToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}