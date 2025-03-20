"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  CheckCircle,
  Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// Form schema for contact form validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  inquiryType: z.string({
    required_error: "Please select an inquiry type.",
  }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      inquiryType: "",
    },
  })

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSuccess(true)
      
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      })
      
      // Reset form after successful submission
      form.reset()
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-deep-navy to-heritage-blue text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl mb-6 text-light-stone">
              Get in touch with the Rwanda Heritage Guard team
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-deep-navy opacity-40"></div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-light-stone">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Card 1 - Address */}
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-heritage-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-heritage-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                  <p className="text-slate-gray">
                    Rwanda Heritage Guard<br />
                    KK 15 Avenue<br />
                    Kigali Heights, 4th Floor<br />
                    Kigali, Rwanda
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card 2 - Email */}
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-heritage-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-heritage-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-slate-gray mb-2">For general inquiries:</p>
                  <p className="text-heritage-blue hover:underline">
                    <a href="mailto:info@rwandaheritageproject.com">
                      info@rwandaheritageproject.com
                    </a>
                  </p>
                  <p className="text-slate-gray mt-2 mb-2">For support:</p>
                  <p className="text-heritage-blue hover:underline">
                    <a href="mailto:support@rwandaheritageproject.com">
                      support@rwandaheritageproject.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card 3 - Phone */}
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-heritage-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-heritage-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-slate-gray mb-2">Main Office:</p>
                  <p className="text-heritage-blue hover:underline">
                    <a href="tel:+250789123456">+250 789 123 456</a>
                  </p>
                  <p className="text-slate-gray mt-2 mb-2">Support Line:</p>
                  <p className="text-heritage-blue hover:underline">
                    <a href="tel:+250789123457">+250 789 123 457</a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card 4 - Hours */}
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-heritage-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-heritage-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
                  <p className="text-slate-gray">
                    Monday - Friday<br />
                    8:00 AM - 5:00 PM<br /><br />
                    Saturday<br />
                    9:00 AM - 1:00 PM<br /><br />
                    Sunday<br />
                    Closed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map and Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Area */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Find Us</h2>
              <div className="h-96 bg-slate-gray rounded-lg mb-6 relative overflow-hidden">
                {/* Replace this div with an actual map component like Google Maps or Mapbox */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-70">
                  Interactive Map will appear here
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Connect With Us</h3>
                <p className="text-slate-gray">
                  Follow us on social media for the latest updates on our heritage preservation efforts.
                </p>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-heritage-blue bg-opacity-10 rounded-full text-heritage-blue hover:bg-opacity-20 transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-heritage-blue bg-opacity-10 rounded-full text-heritage-blue hover:bg-opacity-20 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-heritage-blue bg-opacity-10 rounded-full text-heritage-blue hover:bg-opacity-20 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-heritage-blue bg-opacity-10 rounded-full text-heritage-blue hover:bg-opacity-20 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {isSuccess ? (
                <Card className="bg-success-green bg-opacity-10 border-success-green border">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center py-8">
                      <CheckCircle className="w-16 h-16 text-success-green mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                      <p className="text-slate-gray mb-6">
                        Thank you for contacting us. We'll respond to your inquiry as soon as possible.
                      </p>
                      <Button onClick={() => setIsSuccess(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inquiry Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select inquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                              <SelectItem value="volunteer">Volunteer Information</SelectItem>
                              <SelectItem value="donation">Make a Donation</SelectItem>
                              <SelectItem value="research">Research Collaboration</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject of your message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please include all relevant details in your message" 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-light-stone">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-gray">
              Find answers to common questions about Rwanda Heritage Guard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* FAQ Item 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How can I volunteer with Rwanda Heritage Guard?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-gray">
                  We welcome volunteers with various skills and interests. To join our volunteer program, 
                  please complete our volunteer application form on the website or contact our Community 
                  Engagement team at volunteers@rwandaheritageproject.com.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are donations to Rwanda Heritage Guard tax-deductible?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-gray">
                  Yes, Rwanda Heritage Guard is a registered non-profit organization, and donations are 
                  tax-deductible as allowed by law. We provide tax receipts for all donations received.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How can I contribute heritage information to your database?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-gray">
                  You can contribute by creating an account on our platform and submitting information 
                  through our "Contribute" form. Our research team will review and verify the information 
                  before adding it to our database.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 4 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Does Rwanda Heritage Guard offer educational programs for schools?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-gray">
                  Yes, we offer educational programs and resources for schools at all levels. These include 
                  workshop sessions, curriculum materials, and interactive activities. Contact our Education 
                  team to learn more.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 5 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How can organizations partner with Rwanda Heritage Guard?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-gray">
                  We partner with organizations that share our mission of heritage preservation. If you're 
                  interested in exploring partnership opportunities, please contact our Partnerships team 
                  with details about your organization and proposed collaboration.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 6 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I access the digital archives for research purposes?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-gray">
                  Yes, our digital archives are available for research and educational purposes. 
                  Researchers can request access by completing our research request form and agreeing 
                  to our terms of use for archival materials.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-gray mb-4">
              Can't find the answer you're looking for?
            </p>
            <Button asChild>
              <a href="#contact-form">Contact Our Support Team</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-heritage-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates on our heritage preservation efforts, 
            events, and educational resources.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white text-deep-navy md:min-w-[300px]"
            />
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-heritage-blue whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}