"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

// Mock heritage data
const HERITAGE_ITEMS = [
  {
    id: 1,
    title: "Imigongo Art",
    category: "Art",
    location: "Eastern Province",
    description: "Geometric and decorative wall designs made from cow dung and natural dyes.",
    image: "/images/placeholder.jpg",
    tags: ["Art", "Tradition", "Historical"],
    status: "published",
    createdDate: "2023-01-15T10:30:00",
  },
  {
    id: 2,
    title: "Intore Dance",
    category: "Dance",
    location: "Nationwide",
    description: "A traditional Rwandan dance characterized by leaping movements and chants.",
    image: "/images/placeholder.jpg",
    tags: ["Dance", "Performance", "Cultural"],
    status: "published",
    createdDate: "2023-02-20T14:45:00",
  },
  {
    id: 3,
    title: "Kigali Genocide Memorial",
    category: "Historical Sites",
    location: "Kigali",
    description: "A memorial site in remembrance of the victims of the 1994 genocide.",
    image: "/images/placeholder.jpg",
    tags: ["Historical", "Memorial", "Educational"],
    status: "published",
    createdDate: "2023-03-10T09:15:00",
  },
  {
    id: 4,
    title: "Umushanana Traditional Dress",
    category: "Clothing",
    location: "Nationwide",
    description: "Traditional Rwandan formal attire worn by women at ceremonial events.",
    image: "/images/placeholder.jpg",
    tags: ["Clothing", "Tradition", "Cultural"],
    status: "draft",
    createdDate: "2023-04-05T16:20:00",
  },
  {
    id: 5,
    title: "Amashyuza Hot Springs",
    category: "Natural Sites",
    location: "Western Province",
    description: "Natural hot springs located in the western region of Rwanda.",
    image: "/images/placeholder.jpg",
    tags: ["Nature", "Tourism", "Wellness"],
    status: "published",
    createdDate: "2023-05-18T11:10:00",
  },
  {
    id: 6,
    title: "Traditional Basketry",
    category: "Crafts",
    location: "Nationwide",
    description: "Handwoven baskets (Agaseke) symbolizing peace, unity, and reconciliation.",
    image: "/images/placeholder.jpg",
    tags: ["Crafts", "Artisanal", "Cultural"],
    status: "published",
    createdDate: "2023-06-22T13:30:00",
  },
]

export default function AdminHeritageListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  
  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(HERITAGE_ITEMS.map(item => item.category))]
  
  // Filter items based on search query, category, and status
  const filteredItems = HERITAGE_ITEMS.filter(item => {
    const matchesSearch = 
      searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = 
      categoryFilter === "all" || 
      item.category === categoryFilter
    
    const matchesStatus =
      statusFilter === "all" ||
      item.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
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
          <h1 className="text-3xl font-bold">Heritage Management</h1>
          <p className="text-muted-foreground">Manage heritage items in the collection</p>
        </div>
        <Button asChild>
          <Link href="/admin/heritage/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Heritage Item
          </Link>
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search heritage items..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Heritage Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col h-full">
              <div className="aspect-video relative bg-slate-gray">
                {/* Placeholder div for image */}
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  Image Placeholder
                </div>
                <div className="absolute top-2 right-2">
                  {item.status === "published" ? (
                    <Badge variant="default" className="bg-success-green">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-background">
                      <XCircle className="mr-1 h-3 w-3" />
                      Draft
                    </Badge>
                  )}
                </div>
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
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
                        <Link href={`/heritage/${item.id}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          View Item
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/heritage/${item.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Item
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-error-red focus:text-error-red">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Item
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>{item.location}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <Badge variant="outline" className="mb-2">{item.category}</Badge>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="secondary">+{item.tags.length - 3}</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
                Added: {formatDate(item.createdDate)}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No matching items found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setCategoryFilter("all")
              setStatusFilter("all")
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
      
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-8">
        <Button variant="outline" size="sm">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { ArrowLeft, MapPin, BookOpen, Calendar, Globe, Heart, Share2 } from "lucide-react"
// import { useParams } from "next/navigation"

// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent } from "@/components/ui/card"
// import { useToast } from "@/components/ui/use-toast"

// // Mock heritage data - in a real app, you would fetch this from an API
// const HERITAGE_ITEMS = [
//   {
//     id: "1",
//     title: "Imigongo Art",
//     category: "Art",
//     location: "Eastern Province",
//     description: "Imigongo is a traditional Rwandan art form characterized by geometric patterns created using cow dung. The art form originated in the Eastern Province of Rwanda and is traditionally used to decorate interior walls of homes and cultural artifacts.\n\nThe process involves creating raised relief designs using cow dung, which is then painted with natural pigments. Traditional colors include black, white, red, and occasionally blue or yellow. The geometric patterns often have symbolic meanings related to Rwandan culture and history.",
//     image: "/images/placeholder.jpg",
//     tags: ["Art", "Tradition", "Historical"],
//     year: "Pre-colonial era",
//     status: "Active practice",
//     significance: "Imigongo art holds significant cultural value in Rwanda. It serves as a visual language that communicates aspects of Rwandan identity, history, and values. The patterns often tell stories or represent aspects of daily life in traditional Rwanda.",
//     history: "Imigongo originated in the 18th or 19th century and is associated with Prince Kakira, the son of King Kimenyi of the historical Kingdom of Gisaka. Kakira is credited with developing this unique art form, which later spread throughout Rwanda.\n\nAfter the 1994 genocide against the Tutsi, efforts to preserve this traditional art form intensified, and cooperatives were formed to pass down the techniques to younger generations.",
//     practices: "Creating Imigongo art involves several steps:\n\n1. Collecting and preparing fresh cow dung by mixing it with ash to prevent cracking\n2. Applying the mixture to create raised patterns on a surface\n3. Allowing the designs to dry completely (usually taking several days)\n4. Smoothing the surface with sandpaper or stones\n5. Painting the designs with natural pigments\n6. Adding a protective final coat",
//     image_gallery: ["/images/placeholder.jpg", "/images/placeholder.jpg", "/images/placeholder.jpg"],
//     related: ["2", "6"],
//   },
//   {
//     id: "2",
//     title: "Intore Dance",
//     category: "Dance",
//     location: "Nationwide",
//     description: "A traditional Rwandan dance characterized by leaping movements and chants.",
//     image: "/images/placeholder.jpg",
//     tags: ["Dance", "Performance", "Cultural"],
//     year: "Royal court era",
//     status: "Active practice",
//     significance: "Intore dance is an important expression of Rwandan cultural identity and history.",
//     history: "The Intore dance originated in the royal court and was performed by warriors to demonstrate their prowess and readiness for battle.",
//     practices: "The dance features high leaps, precise movements, and is accompanied by drumming and vocal chants.",
//     image_gallery: ["/images/placeholder.jpg", "/images/placeholder.jpg", "/images/placeholder.jpg"],
//     related: ["1", "8"],
//   },
// ]

// export default function HeritageDetailPage() {
//   const params = useParams()
//   const { id } = params
//   const { toast } = useToast()
//   const [isSaved, setIsSaved] = useState(false)
  
//   // Find the heritage item by ID
//   const heritageItem = HERITAGE_ITEMS.find(item => item.id === id)
  
//   // Handle saving the heritage item
//   const handleSave = () => {
//     setIsSaved(!isSaved)
//     toast({
//       title: isSaved ? "Removed from saved items" : "Added to saved items",
//       description: isSaved ? "This item has been removed from your collection" : "This item has been added to your collection",
//     })
//   }
  
//   // Handle sharing the heritage item
//   const handleShare = () => {
//     // In a real application, this would use the Web Share API or copy to clipboard
//     toast({
//       title: "Link copied",
//       description: "The link to this heritage item has been copied to your clipboard",
//     })
//   }
  
//   if (!heritageItem) {
//     return (
//       <div className="container py-16 text-center">
//         <h1 className="text-3xl font-bold mb-4">Heritage Item Not Found</h1>
//         <p className="text-muted-foreground mb-8">
//           The heritage item you're looking for doesn't exist or has been moved.
//         </p>
//         <Button asChild>
//           <Link href="/heritage">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Heritage Collection
//           </Link>
//         </Button>
//       </div>
//     )
//   }
  
//   return (
//     <div className="container py-10">
//       {/* Back button and actions */}
//       <div className="flex justify-between items-center mb-8">
//         <Button variant="outline" size="sm" asChild>
//           <Link href="/heritage">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Collection
//           </Link>
//         </Button>
        
//         <div className="flex items-center gap-2">
//           <Button 
//             variant="outline" 
//             size="sm" 
//             onClick={handleSave}
//           >
//             <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-heritage-blue text-heritage-blue" : ""}`} />
//             {isSaved ? "Saved" : "Save"}
//           </Button>
//           <Button variant="outline" size="sm" onClick={handleShare}>
//             <Share2 className="mr-2 h-4 w-4" />
//             Share
//           </Button>
//         </div>
//       </div>
      
//       {/* Main content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left column - Image and details */}
//         <div className="lg:col-span-2">
//           <div className="aspect-video bg-slate-gray rounded-lg mb-6 relative">
//             {/* Placeholder for image */}
//             <div className="absolute inset-0 flex items-center justify-center text-white">
//               Main Image Placeholder
//             </div>
//           </div>
          
//           <h1 className="text-3xl font-bold mb-2">{heritageItem.title}</h1>
          
//           <div className="flex flex-wrap gap-2 mb-4">
//             <Badge variant="outline">{heritageItem.category}</Badge>
//             {heritageItem.tags.map((tag) => (
//               <Badge key={tag} variant="secondary">{tag}</Badge>
//             ))}
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//             <div className="flex items-center text-sm text-muted-foreground">
//               <MapPin className="mr-2 h-4 w-4" />
//               <span>Location: {heritageItem.location}</span>
//             </div>
//             <div className="flex items-center text-sm text-muted-foreground">
//               <Calendar className="mr-2 h-4 w-4" />
//               <span>Period: {heritageItem.year}</span>
//             </div>
//             <div className="flex items-center text-sm text-muted-foreground">
//               <BookOpen className="mr-2 h-4 w-4" />
//               <span>Status: {heritageItem.status}</span>
//             </div>
//             <div className="flex items-center text-sm text-muted-foreground">
//               <Globe className="mr-2 h-4 w-4" />
//               <span>Category: {heritageItem.category}</span>
//             </div>
//           </div>
          
//           <Tabs defaultValue="overview" className="w-full">
//             <TabsList>
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="history">History</TabsTrigger>
//               <TabsTrigger value="practices">Practices</TabsTrigger>
//               <TabsTrigger value="gallery">Gallery</TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="overview" className="pt-4">
//               <h3 className="text-xl font-semibold mb-3">Description</h3>
//               <p className="text-muted-foreground whitespace-pre-line mb-6">
//                 {heritageItem.description}
//               </p>
              
//               <h3 className="text-xl font-semibold mb-3">Cultural Significance</h3>
//               <p className="text-muted-foreground whitespace-pre-line">
//                 {heritageItem.significance}
//               </p>
//             </TabsContent>
            
//             <TabsContent value="history" className="pt-4">
//               <h3 className="text-xl font-semibold mb-3">Historical Context</h3>
//               <p className="text-muted-foreground whitespace-pre-line">
//                 {heritageItem.history}
//               </p>
//             </TabsContent>
            
//             <TabsContent value="practices" className="pt-4">
//               <h3 className="text-xl font-semibold mb-3">Traditional Practices</h3>
//               <p className="text-muted-foreground whitespace-pre-line">
//                 {heritageItem.practices}
//               </p>
//             </TabsContent>
            
//             <TabsContent value="gallery" className="pt-4">
//               <h3 className="text-xl font-semibold mb-3">Image Gallery</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {heritageItem.image_gallery.map((image, index) => (
//                   <div key={index} className="aspect-video bg-slate-gray rounded-lg relative">
//                     {/* Placeholder for image */}
//                     <div className="absolute inset-0 flex items-center justify-center text-white">
//                       Gallery Image {index + 1}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
        
//         {/* Right column - Related items */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Related Heritage Items</h3>
          
//           <div className="space-y-4">
//             {heritageItem.related.map((relatedId) => {
//               const relatedItem = HERITAGE_ITEMS.find(item => item.id === relatedId)
//               if (!relatedItem) return null
              
//               return (
//                 <Card key={relatedId}>
//                   <CardContent className="p-0">
//                     <div className="aspect-video bg-slate-gray relative">
//                       {/* Placeholder for image */}
//                       <div className="absolute inset-0 flex items-center justify-center text-white">
//                         Image Placeholder
//                       </div>
//                     </div>
//                     <div className="p-4">
//                       <h4 className="font-semibold mb-1">{relatedItem.title}</h4>
//                       <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
//                         {relatedItem.description}
//                       </p>
//                       <Button variant="ghost" size="sm" className="w-full" asChild>
//                         <Link href={`/heritage/${relatedItem.id}`}>
//                           View Details
//                         </Link>
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )
//             })}
//           </div>
          
//           <div className="mt-8 p-4 bg-muted rounded-lg">
//             <h3 className="font-semibold mb-2">Contribute Information</h3>
//             <p className="text-sm text-muted-foreground mb-4">
//               Do you have additional information about {heritageItem.title}? Share your knowledge to help us preserve this heritage.
//             </p>
//             <Button size="sm" className="w-full">
//               Contribute Information
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

