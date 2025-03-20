import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          poster="/images/rwesero_museum.jpg" // Fallback image while video loads
        >
          <source 
            src="https://www.youtube.com/watch?v=8AgAC03CCNI" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-deep-navy opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Preserving Rwanda's Rich Cultural Heritage
          </h1>
          <p className="text-lg md:text-xl mb-8 text-light-stone">
            Discover, explore, and help preserve the cultural treasures that make Rwanda unique
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/heritage">Explore Heritage</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
      {/* Featured Section */}
      <section className="py-16 bg-light-stone">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Heritage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-slate-gray"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Traditional Art</h3>
                <p className="text-slate-gray mb-4">
                  Explore the vibrant artistic traditions that have been passed down through generations.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/heritage/art">Learn more</Link>
                </Button>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-slate-gray"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Cultural Practices</h3>
                <p className="text-slate-gray mb-4">
                  Discover the ceremonies and practices that form the heart of Rwandan culture.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/heritage/practices">Learn more</Link>
                </Button>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-slate-gray"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Historical Sites</h3>
                <p className="text-slate-gray mb-4">
                  Visit the landmarks that tell the story of Rwanda's rich and complex history.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/heritage/sites">Learn more</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-slate-gray mb-6">
                The Rwanda Heritage Guard is dedicated to preserving and promoting Rwanda's cultural heritage for future generations. We work to document, digitize, and share the rich traditions, art, music, and history of Rwanda.
              </p>
              <p className="text-lg text-slate-gray mb-6">
                Through collaboration with communities, cultural institutions, and government entities, we strive to create a comprehensive digital archive of Rwanda's heritage that is accessible to all.
              </p>
              <Button asChild>
                <Link href="/about">About Our Work</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden bg-slate-gray h-80"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-heritage-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Heritage Movement</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Be part of a community dedicated to preserving Rwanda's cultural identity. 
            Contribute your knowledge, stories, and support to this important mission.
          </p>
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-heritage-blue" size="lg" asChild>
            <Link href="/auth/register">Sign Up Now</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-light-stone">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-gray mr-4"></div>
                <div>
                  <h4 className="font-semibold">Jean Mugabo</h4>
                  <p className="text-sm text-slate-gray">Historian</p>
                </div>
              </div>
              <p className="text-slate-gray">
                "This platform has been instrumental in preserving stories that might otherwise be lost. The work being done here is vital for future generations of Rwandans."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-gray mr-4"></div>
                <div>
                  <h4 className="font-semibold">Marie Uwase</h4>
                  <p className="text-sm text-slate-gray">Cultural Practitioner</p>
                </div>
              </div>
              <p className="text-slate-gray">
                "I've been able to share my knowledge of traditional practices with a wider audience thanks to the Rwanda Heritage Guard. Their documentation work is unparalleled."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-gray mr-4"></div>
                <div>
                  <h4 className="font-semibold">David Habimana</h4>
                  <p className="text-sm text-slate-gray">Student</p>
                </div>
              </div>
              <p className="text-slate-gray">
                "As a student passionate about my heritage, this platform has been an incredible resource. I've learned so much about our traditions that I never knew before."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg text-slate-gray mb-8">
            Subscribe to our newsletter to receive updates on our latest preserved heritage items,
            events, and opportunities to get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
            />
            <Button className="w-full sm:w-auto">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}