"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/store/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Heritage", href: "/heritage" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]
  
  // Add dashboard link if user is authenticated
  const authenticatedNavItems = isAuthenticated 
    ? [...navItems, { name: "Dashboard", href: "/dashboard" }]
    : navItems

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          {/* Replace with actual logo */}
          <div className="h-8 w-8 rounded-full bg-heritage-blue"></div>
          <span className="hidden font-playfair text-xl font-bold md:inline-block">
            Rwanda Heritage Guard
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {authenticatedNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-heritage-blue ${
                pathname === item.href ? "text-heritage-blue" : "text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-8 w-8 rounded-full"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-gray text-white">
                      {user?.firstName?.[0] || user?.username?.[0] || 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 bg-background border-t">
          <nav className="flex flex-col gap-4">
            {authenticatedNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-heritage-blue ${
                  pathname === item.href ? "text-heritage-blue" : "text-foreground"
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex flex-col gap-2 pt-4 border-t">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-gray text-white">
                    {user?.firstName?.[0] || user?.username?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="text-sm font-medium transition-colors hover:text-heritage-blue"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="text-sm font-medium transition-colors hover:text-heritage-blue"
                  onClick={closeMenu}
                >
                  Settings
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/login" onClick={closeMenu}>Log in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/register" onClick={closeMenu}>Sign Up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header