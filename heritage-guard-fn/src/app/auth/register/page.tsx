"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/store/auth-context"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must be less than 50 characters"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .max(100, "Email must be less than 100 characters"),
    firstName: z
      .string()
      .max(50, "First name must be less than 50 characters")
      .optional(),
    lastName: z
      .string()
      .max(50, "Last name must be less than 50 characters")
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(120, "Password must be less than 120 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true)
    try {
      // Remove confirmPassword field before sending to API
      const { confirmPassword, ...registerData } = values
      await register(registerData)
      // Redirect will be handled in the auth context
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-full items-center justify-center py-16">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[520px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up to start preserving Rwanda's cultural heritage
          </p>
        </div>

        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Create a password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Google
          </Button>
        </div>

        <div className="px-8 text-center text-sm text-muted-foreground">
          By clicking create account, you agree to our{" "}
          <Link
            href="/terms"
            className="underline hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </div>

        <div className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="underline hover:text-primary"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}