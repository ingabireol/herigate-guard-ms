"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useAuth } from "@/store/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(50, {
      message: "Username must not be longer than 50 characters.",
    }),
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email("Please enter a valid email address"),
  firstName: z
    .string()
    .max(50, {
      message: "First name must not be longer than 50 characters.",
    })
    .optional(),
  lastName: z
    .string()
    .max(50, {
      message: "Last name must not be longer than 50 characters.",
    })
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Please enter your current password" }),
    newPassword: z.string().min(6, {
      message: "New password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(1, { message: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type PasswordFormValues = z.infer<typeof passwordFormSchema>

export default function ProfilePage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
  })

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onProfileSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    // Here you would typically make an API call to update the user profile
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
      setIsLoading(false)
    }, 1000)
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    setIsLoading(true)

    // Here you would typically make an API call to update the user's password
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
      passwordForm.reset()
      setIsLoading(false)
    }, 1000)
  }

  return (
    <ProtectedRoute>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
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
                        control={profileForm.control}
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
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Your username is how other members will identify you on the platform.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll send notifications to this email address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to maintain security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-8">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your current password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your new password" {...field} />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 6 characters long
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm your new password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}