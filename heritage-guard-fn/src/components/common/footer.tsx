import Link from "next/link"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t py-8 md:py-12 bg-deep-navy text-light-stone">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo and Tag Line */}
          <div className="md:w-1/3">
            <Link href="/" className="flex items-center gap-2 mb-4">
              {/* Replace with actual logo */}
              <div className="h-8 w-8 rounded-full bg-heritage-blue"></div>
              <span className="font-playfair text-xl font-bold">
                Rwanda Heritage Guard
              </span>
            </Link>
            <p className="text-sm text-slate-gray">
              Preserving and showcasing Rwanda's cultural heritage for future generations.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-heritage-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-heritage-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/heritage" className="text-sm hover:text-heritage-blue transition-colors">
                  Heritage Collection
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-heritage-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-playfair text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm hover:text-heritage-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-heritage-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-heritage-blue transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg mb-4">Contact Us</h4>
            <address className="not-italic text-sm space-y-2 text-slate-gray">
              <p>Kigali, Rwanda</p>
              <p>
                <a href="mailto:info@rwandaheritageproject.com" className="hover:text-heritage-blue transition-colors">
                  info@rwandaheritageproject.com
                </a>
              </p>
              <p>
                <a href="tel:+250123456789" className="hover:text-heritage-blue transition-colors">
                  +250 123 456 789
                </a>
              </p>
            </address>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-slate-gray/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-gray">
            © {currentYear} Rwanda Heritage Guard. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Social Links - Replace with actual icons */}
            <a href="#" className="text-slate-gray hover:text-heritage-blue transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="text-slate-gray hover:text-heritage-blue transition-colors" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" className="text-slate-gray hover:text-heritage-blue transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer