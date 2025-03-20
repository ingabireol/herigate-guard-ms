"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/store/auth-context'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requiredRoles?: string[]
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requiredRoles = []
}: ProtectedRouteProps) {
  const { isAuthenticated, user, loading, hasRole } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If still loading auth state, wait
    if (loading) return

    // If authentication is required but user isn't authenticated, redirect to login
    if (requireAuth && !isAuthenticated) {
      const returnUrl = encodeURIComponent(pathname)
      router.push(`/auth/login?returnUrl=${returnUrl}`)
      return
    }

    // If authentication is not required but user is authenticated, redirect to dashboard
    // Useful for login/register pages which shouldn't be accessible once logged in
    if (!requireAuth && isAuthenticated) {
      router.push('/dashboard')
      return
    }

    // Check for required roles
    if (requireAuth && isAuthenticated && requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some(role => hasRole(role))
      if (!hasRequiredRole) {
        router.push('/unauthorized')
        return
      }
    }
  }, [isAuthenticated, loading, requireAuth, router, pathname, requiredRoles, hasRole])

  // Show nothing while loading or redirecting
  if (loading || (requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  // Show unauthorized message if user doesn't have required role
  if (requireAuth && isAuthenticated && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => hasRole(role))
    if (!hasRequiredRole) {
      return <div className="flex h-screen items-center justify-center">Unauthorized</div>
    }
  }

  return <>{children}</>
}