import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Globe, 
  Users, 
  BookOpen, 
  Shield, 
  Heart, 
  BookMarked
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-deep-navy to-heritage-blue text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Rwanda Heritage Guard
            </h1>
            <p className="text-lg md:text-xl mb-6 text-light-stone">
              Preserving Rwanda's cultural legacy for future generations
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-deep-navy opacity-40"></div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-light-stone">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-slate-gray mb-6">
                The Rwanda Heritage Guard is dedicated to identifying, preserving, and promoting Rwanda's rich cultural heritage. 
                We aim to create a comprehensive digital archive that connects past traditions with present generations, ensuring 
                the longevity of Rwanda's unique cultural identity.
              </p>
              <p className="text-lg text-slate-gray">
                Through collaborative efforts with communities, cultural institutions, and government entities, we document and 
                digitize tangible and intangible heritage, making it accessible to all and safeguarding it for future generations.
              </p>
            </div>
            <div className="order-first md:order-last flex justify-center">
  <div className="w-full max-w-md h-80 bg-slate-gray rounded-lg relative overflow-hidden">
    <Image 
      src="/images/intore.jpeg"
      alt="Intore Dance"
      fill
      priority={true}
      className="object-cover"
    />
  </div>
</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-24">
            <div className="flex justify-center">
              <div className="w-full max-w-md h-80 bg-slate-gray rounded-lg relative overflow-hidden">
                {/* Replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50">
                  Vision Image Placeholder
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-slate-gray mb-6">
                We envision a future where Rwanda's cultural heritage is celebrated globally, contributing to 
                national identity and pride while fostering cultural tourism and economic development. Our vision 
                encompasses a Rwanda where traditional knowledge and practices remain vibrant and relevant in contemporary society.
              </p>
              <p className="text-lg text-slate-gray">
                The Rwanda Heritage Guard aspires to be the leading platform for cultural preservation in the region, 
                setting standards for digital archiving and community-based heritage management approaches that can be 
                replicated throughout Africa and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
            <p className="text-lg text-slate-gray">
              The principles that guide our work and define our commitment to Rwanda's cultural heritage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-heritage-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-heritage-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                  <p className="text-slate-gray">
                    We are committed to accurate representation of Rwanda's cultural heritage, 
                    ensuring all documentation and preservation efforts maintain the integrity 
                    and authenticity of cultural practices and artifacts.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-heritage-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-heritage-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community Participation</h3>
                  <p className="text-slate-gray">
                    We believe that effective heritage preservation must involve the communities 
                    from which these cultural elements originate, respecting their ownership and 
                    ensuring their active participation in our initiatives.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-heritage-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <Globe className="w-8 h-8 text-heritage-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                  <p className="text-slate-gray">
                    We strive to make Rwanda's cultural heritage accessible to all, both 
                    within Rwanda and internationally, through digital platforms, educational 
                    initiatives, and inclusive programming.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-heritage-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-heritage-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-slate-gray">
                    We are dedicated to creating educational opportunities that promote 
                    understanding and appreciation of Rwanda's rich cultural heritage, 
                    especially among younger generations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-heritage-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <BookMarked className="w-8 h-8 text-heritage-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-slate-gray">
                    We embrace innovative approaches and technologies in our preservation 
                    efforts, finding new ways to document, share, and revitalize 
                    traditional practices in contemporary contexts.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-heritage-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-heritage-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                  <p className="text-slate-gray">
                    We are committed to developing sustainable preservation practices that 
                    ensure the long-term viability of Rwanda's cultural heritage, while 
                    contributing to the economic and social development of communities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="py-16 bg-light-stone">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold mb-6">Our Work</h2>
            <p className="text-lg text-slate-gray">
              Explore the key areas of our heritage preservation efforts
            </p>
          </div>

          <Tabs defaultValue="documentation" className="w-full">
            <TabsList className="w-full flex justify-center mb-8">
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="preservation">Preservation</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="promotion">Promotion</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documentation" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Digital Documentation</h3>
                  <p className="text-slate-gray mb-6">
                    Our team collects and documents Rwanda's rich cultural heritage through interviews, recordings, 
                    photographs, and detailed cataloging. We collaborate with elders, artisans, and traditional 
                    knowledge holders across the country to ensure comprehensive documentation.
                  </p>
                  <p className="text-slate-gray mb-6">
                    Using advanced digital technologies, we create high-quality records of:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-slate-gray space-y-2">
                    <li>Traditional crafts and techniques</li>
                    <li>Oral histories and storytelling</li>
                    <li>Music, dance, and performance art</li>
                    <li>Indigenous knowledge systems</li>
                    <li>Historical sites and architecture</li>
                  </ul>
                  <Button>Learn More</Button>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-md h-80 bg-slate-gray rounded-lg relative overflow-hidden">
                    {/* Replace with actual image */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50">
                      Documentation Image
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preservation" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center order-last md:order-first">
                  <div className="w-full max-w-md h-80 bg-slate-gray rounded-lg relative overflow-hidden">
                    {/* Replace with actual image */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50">
                      Preservation Image
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Cultural Preservation</h3>
                  <p className="text-slate-gray mb-6">
                    Our preservation initiatives focus on safeguarding both tangible and intangible 
                    cultural heritage elements that are at risk of disappearing. We work to revitalize 
                    traditional practices by creating platforms where knowledge can be transferred to 
                    younger generations.
                  </p>
                  <p className="text-slate-gray mb-6">
                    Key preservation activities include:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-slate-gray space-y-2">
                    <li>Creating digital archives of endangered cultural practices</li>
                    <li>Supporting master artisans through apprenticeship programs</li>
                    <li>Documenting and preserving traditional languages and dialects</li>
                    <li>Advocating for policy measures to protect cultural heritage</li>
                    <li>Conservation of historical artifacts and sites</li>
                  </ul>
                  <Button>Explore Initiatives</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Educational Outreach</h3>
                  <p className="text-slate-gray mb-6">
                    We develop educational programs and resources that promote awareness and 
                    understanding of Rwanda's cultural heritage. Our initiatives target schools, 
                    universities, and communities to foster appreciation for traditional knowledge 
                    and practices.
                  </p>
                  <p className="text-slate-gray mb-6">
                    Our educational approach includes:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-slate-gray space-y-2">
                    <li>School programs and curriculum development</li>
                    <li>Workshops and training for teachers</li>
                    <li>Interactive digital learning resources</li>
                    <li>Community education events and cultural festivals</li>
                    <li>Research partnerships with academic institutions</li>
                  </ul>
                  <Button>View Resources</Button>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-md h-80 bg-slate-gray rounded-lg relative overflow-hidden">
                    {/* Replace with actual image */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50">
                      Education Image
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="promotion" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center order-last md:order-first">
                  <div className="w-full max-w-md h-80 bg-slate-gray rounded-lg relative overflow-hidden">
                    {/* Replace with actual image */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50">
                      Promotion Image
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Cultural Promotion</h3>
                  <p className="text-slate-gray mb-6">
                    We work to promote Rwanda's cultural heritage nationally and internationally, 
                    creating opportunities for cultural expression and exchange. Our promotion 
                    efforts help sustain cultural practices by generating interest and creating 
                    economic opportunities for communities.
                  </p>
                  <p className="text-slate-gray mb-6">
                    Cultural promotion initiatives include:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-slate-gray space-y-2">
                    <li>Digital exhibitions and virtual tours</li>
                    <li>Cultural tourism development and support</li>
                    <li>Artisan marketplaces and fair trade partnerships</li>
                    <li>International cultural exchange programs</li>
                    <li>Media and publication projects highlighting Rwandan heritage</li>
                  </ul>
                  <Button>See Our Impact</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-lg text-slate-gray">
              Meet the dedicated professionals working to preserve Rwanda's cultural heritage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full bg-slate-gray mb-4 overflow-hidden">
                {/* Replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50">
                  {/* Team Member 1 */}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Jean Mugabo</h3>
              <p className="text-heritage-blue font-medium mb-2">Executive Director</p>
              <p className="text-slate-gray">
                Cultural historian and heritage conservation specialist with over 15 years of experience.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full bg-slate-gray mb-4 overflow-hidden">
                {/* Replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50">
                  {/* Team Member 2 */}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Marie Uwase</h3>
              <p className="text-heritage-blue font-medium mb-2">Head of Research</p>
              <p className="text-slate-gray">
                PhD in Anthropology specializing in East African cultural practices and oral traditions.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full bg-slate-gray mb-4 overflow-hidden">
                {/* Replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50">
                  {/* Team Member 3 */}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">David Habimana</h3>
              <p className="text-heritage-blue font-medium mb-2">Digital Preservation Lead</p>
              <p className="text-slate-gray">
                Technology specialist with expertise in digital archiving and preservation technologies.
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full bg-slate-gray mb-4 overflow-hidden">
                {/* Replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50">
                  {/* Team Member 4 */}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Grace Niyonzima</h3>
              <p className="text-heritage-blue font-medium mb-2">Community Engagement Manager</p>
              <p className="text-slate-gray">
                Specialist in participatory heritage management and community-based conservation approaches.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/team">View Full Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-light-stone">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold mb-6">Our Partners</h2>
            <p className="text-lg text-slate-gray">
              We collaborate with organizations that share our commitment to cultural heritage preservation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Partner logos - replace with actual logos */}
            <div className="h-20 bg-white rounded-md shadow flex items-center justify-center">
              Partner Logo 1
            </div>
            <div className="h-20 bg-white rounded-md shadow flex items-center justify-center">
              Partner Logo 2
            </div>
            <div className="h-20 bg-white rounded-md shadow flex items-center justify-center">
              Partner Logo 3
            </div>
            <div className="h-20 bg-white rounded-md shadow flex items-center justify-center">
              Partner Logo 4
            </div>
            <div className="h-20 bg-white rounded-md shadow flex items-center justify-center">
              Partner Logo 5
            </div>
            <div className="h-20 bg-white rounded-md shadow flex items-center justify-center">
              Partner Logo 6
            </div>
            <div className="h-20 bg-white rounded-md shadow flex items-center justify-center">
              Partner Logo 7
            </div>
            <div className="h-20 bg-white rounded-md shadow flex items-center justify-center">
              Partner Logo 8
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-heritage-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Help us preserve Rwanda's cultural heritage for future generations.
            Get involved as a volunteer, contributor, or supporter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-heritage-blue" size="lg">
              Become a Volunteer
            </Button>
            <Button className="bg-white text-heritage-blue hover:bg-light-stone" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}