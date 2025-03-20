"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Loader2, X, Plus, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

// Mock category options for heritage items
const CATEGORIES = [
  "Art",
  "Dance",
  "Music",
  "Clothing",
  "Crafts",
  "Historical Sites",
  "Natural Sites",
  "Traditions",
  "Food",
  "Architecture",
]

// Mock heritage data - in a real app, you would fetch this from an API
const HERITAGE_ITEMS = [
  {
    id: "1",
    title: "Imigongo Art",
    category: "Art",
    location: "Eastern Province",
    description: "Imigongo is a traditional Rwandan art form characterized by geometric patterns created using cow dung. The art form originated in the Eastern Province of Rwanda and is traditionally used to decorate interior walls of homes and cultural artifacts.\n\nThe process involves creating raised relief designs using cow dung, which is then painted with natural pigments. Traditional colors include black, white, red, and occasionally blue or yellow. The geometric patterns often have symbolic meanings related to Rwandan culture and history.",
    image: "/images/placeholder.jpg",
    tags: ["Art", "Tradition", "Historical"],
    year: "Pre-colonial era",
    status: "Active practice",
    significance: "Imigongo art holds significant cultural value in Rwanda. It serves as a visual language that communicates aspects of Rwandan identity, history, and values. The patterns often tell stories or represent aspects of daily life in traditional Rwanda.",
    history: "Imigongo originated in the 18th or 19th century and is associated with Prince Kakira, the son of King Kimenyi of the historical Kingdom of Gisaka. Kakira is credited with developing this unique art form, which later spread throughout Rwanda.\n\nAfter the 1994 genocide against the Tutsi, efforts to preserve this traditional art form intensified, and cooperatives were formed to pass down the techniques to younger generations.",
    practices: "Creating Imigongo art involves several steps:\n\n1. Collecting and preparing fresh cow dung by mixing it with ash to prevent cracking\n2. Applying the mixture to create raised patterns on a surface\n3. Allowing the designs to dry completely (usually taking several days)\n4. Smoothing the surface with sandpaper or stones\n5. Painting the designs with natural pigments\n6. Adding a protective final coat",
    image_gallery: ["/images/placeholder.jpg", "/images/placeholder.jpg", "/images/placeholder.jpg"],
    related: ["2", "6"],
  },
  // Add other items as needed
]

// Form schema for heritage item
const heritageFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(1, "Location is required"),
  year: z.string().optional(),
  status: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  significance: z.string().min(10, "Cultural significance must be at least 10 characters"),
  history: z.string().min(10, "Historical context must be at least 10 characters"),
  practices: z.string().min(10, "Practices must be at least 10 characters"),
})

type HeritageFormValues = z.infer<typeof heritageFormSchema>

export default function EditHeritagePage() {
  const params = useParams()
  const { id } = params
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  
  // Get heritage item to edit if ID is provided
  const isNewItem = id === "new"
  const heritageItem = isNewItem ? null : HERITAGE_ITEMS.find(item => item.id === id)
  
  // Form default values
  const defaultValues: Partial<HeritageFormValues> = {
    title: heritageItem?.title || "",
    category: heritageItem?.category || "",
    location: heritageItem?.location || "",
    year: heritageItem?.year || "",
    status: heritageItem?.status || "",
    description: heritageItem?.description || "",
    significance: heritageItem?.significance || "",
    history: heritageItem?.history || "",
    practices: heritageItem?.practices || "",
  }
  
  // Initialize tags if editing existing item
  useState(() => {
    if (heritageItem && heritageItem.tags) {
      setTags(heritageItem.tags)
    }
  })
  
  // Initialize form
  const form = useForm<HeritageFormValues>({
    resolver: zodResolver(heritageFormSchema),
    defaultValues,
  })
  
  // Handle form submission
  const onSubmit = async (data: HeritageFormValues) => {
    setIsLoading(true)
    
    try {
      // Here you would typically make an API call to save the data
      console.log({ ...data, tags })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: isNewItem ? "Heritage item created" : "Heritage item updated",
        description: isNewItem 
          ? "The new heritage item has been created successfully." 
          : "The heritage item has been updated successfully.",
      })
      
      // Redirect to heritage items list
      router.push("/admin/heritage")
    } catch (error) {
      console.error("Error saving heritage item:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error saving the heritage item. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Handle tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }
  
  const addTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setTagInput("")
    }
  }
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {isNewItem ? "Add New Heritage Item" : "Edit Heritage Item"}
          </h1>
          <p className="text-muted-foreground">
            {isNewItem 
              ? "Create a new heritage item to add to the collection" 
              : `Editing: ${heritageItem?.title}`}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/heritage">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Heritage Items
          </Link>
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Main Information */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Main Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the heritage item title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the heritage item location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Period</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the time period or year" {...field} />
                    </FormControl>
                    <FormDescription>
                      e.g., "18th century", "Pre-colonial era", etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the current status" {...field} />
                    </FormControl>
                    <FormDescription>
                      e.g., "Active practice", "Endangered", "Revitalized", etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Tags</FormLabel>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Add tags (press Enter or comma)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    onBlur={addTag}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={addTag}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer">
                      {tag}
                      <X 
                        className="ml-1 h-3 w-3" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Add relevant tags to help categorize and search for this item
                </p>
              </div>
            </div>
          </div>
          
          {/* Description and Details */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Description and Details</h2>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a detailed description of the heritage item" 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="significance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cultural Significance</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the cultural significance of this heritage item" 
                        className="min-h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Context</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide historical context for this heritage item" 
                        className="min-h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="practices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Traditional Practices</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the practices and techniques associated with this heritage item" 
                        className="min-h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Images */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Images</h2>
            
            <div className="space-y-6">
              <div>
                <FormLabel>Main Image</FormLabel>
                <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-1">Upload Main Image</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your image here, or click to browse files
                  </p>
                  <Button type="button" variant="outline">
                    Select File
                  </Button>
                </div>
              </div>
              
              <div>
                <FormLabel>Gallery Images</FormLabel>
                <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-1">Upload Gallery Images</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop multiple images here, or click to browse files
                  </p>
                  <Button type="button" variant="outline">
                    Select Files
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/heritage")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                isNewItem ? "Create Heritage Item" : "Update Heritage Item"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}