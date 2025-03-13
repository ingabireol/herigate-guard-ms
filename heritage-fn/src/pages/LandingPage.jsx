import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import img1 from '../assets/rwesero-museum_1.jpg';
import img2 from '../assets/pot-1_2.jpg';
import img3 from '../assets/pot-2_1.jpg';
import { NavLink } from 'react-router-dom';

const HeritageGuardLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const languages = ['English', 'Kinyarwanda', 'French'];

  const featuredSites = [
    {
      id: 1,
      name: 'Kings Palace Museum',
      description: 'Traditional royal residence showcasing Rwanda monarchical history.',
      image: img1
    },
    {
      id: 2,
      name: 'Ethnographic Museum',
      description: 'Rwanda\'s rich cultural heritage displayed through artifacts and exhibitions.',
      image: img2
    },
    {
      id: 3,
      name: 'Nyanza Genocide Memorial',
      description: 'A solemn tribute to Rwanda\'s history, dedicated to victims and survivors.',
      image: img3
    }
  ];

  const features = [
    {
      title: "Interactive Map",
      description: "Discover and explore heritage sites throughout Rwanda with our user-friendly map.",
      icon: (
        <svg className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: "Digital Preservation",
      description: "Tools and resources to document and preserve cultural heritage for future generations.",
      icon: (
        <svg className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      title: "Community Engagement",
      description: "Share stories, photos, and connect with others passionate about Rwanda's heritage.",
      icon: (
        <svg className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Education Modules",
      description: "Interactive learning resources about Rwanda's cultural heritage, history, and preservation.",
      icon: (
        <svg className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  const educationModules = [
    {
      title: "Traditional Rwandan Architecture",
      description: "Learn about the unique architectural styles of historical Rwandan buildings.",
      image: img2
    },
    {
      title: "Cultural Significance of Imigongo Art",
      description: "Discover the history and techniques behind Rwanda's distinctive geometric art form.",
      image: img3
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-sky-600">Heritage Guard</div>
              
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <NavLink to="/sites" className="text-gray-700 hover:text-sky-600">Heritage Sites</NavLink>
                  <NavLink to="/education" className="text-gray-700 hover:text-sky-600">Education</NavLink>
                  <NavLink to="/community" className="text-gray-700 hover:text-sky-600">Community Forum</NavLink>
                  <NavLink to="/about" className="text-gray-700 hover:text-sky-600">About Us</NavLink>
                  <NavLink to="/contact" className="text-gray-700 hover:text-sky-600">Contact</NavLink>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center text-gray-700 hover:text-sky-600"
                >
                  {language}
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-sky-50"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md">
                Login / Sign Up
              </button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink to="/sites" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50">Heritage Sites</NavLink>
              <NavLink to="/education" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50">Education</NavLink>
              <NavLink to="/community" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50">Community Forum</NavLink>
              <NavLink to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50">About Us</NavLink>
              <NavLink to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-sky-50">Contact</NavLink>
            </div>
            <div className="px-5 pt-4 pb-3 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Language:</span>
                  <div className="relative">
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <button className="w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md">
                    Login / Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <div className="relative pt-16 pb-8">
        <div className="w-full h-96 md:h-screen md:max-h-[600px] bg-gray-900 relative overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-cover opacity-70"
          >
            <source src="/assets/heritage-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Preserving Rwanda's Heritage for Future Generations
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-3xl">
              Explore, Learn, and Contribute to the Conservation of Cultural Treasures
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md font-medium">
                Explore Heritage Sites
              </button>
              <button className="bg-white hover:bg-gray-100 text-sky-600 px-6 py-3 rounded-md font-medium">
                Join the Community
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          {/* Add Map Preview */}
          <div className="mt-12">
            <MapContainer center={[-1.9403, 29.8739]} zoom={7} className="h-64 rounded-lg">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[-1.9403, 29.8739]}>
                <Popup>
                  Rwanda
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      
      {/* Heritage Sites Showcase */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Heritage Sites
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the rich cultural heritage of Rwanda through our carefully curated collection of important historical sites.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSites.map((site) => (
              <motion.div 
                key={site.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img 
                  src={site.image} 
                  alt={site.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{site.name}</h3>
                  <p className="text-gray-600 mb-4">{site.description}</p>
                  <button className="text-sky-600 hover:text-sky-800 font-medium">
                    Learn More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md font-medium">
              View All Heritage Sites
            </button>
          </div>
        </div>
      </div>
      
      {/* Community Engagement */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Join the Conversation
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Be part of a growing community dedicated to preserving and celebrating Rwanda's cultural heritage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <img 
                  src="/api/placeholder/100/100" 
                  alt="User" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Mutoni Grace</h4>
                  <p className="text-gray-500 text-sm">Community Member</p>
                  <p className="mt-2 text-gray-600">
                    "I was amazed to discover the rich history behind the traditional techniques used in creating Imigongo art. Thank you for preserving this knowledge!"
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <img 
                  src="/api/placeholder/100/100" 
                  alt="User" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Jean-Paul Uwimana</h4>
                  <p className="text-gray-500 text-sm">Cultural Expert</p>
                  <p className="mt-2 text-gray-600">
                    "The documentation project has helped us preserve traditional songs that were at risk of being forgotten. Future generations will now have access to this important cultural legacy."
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md font-medium">
              Share Your Story
            </button>
          </div>
        </div>
      </div>
      
      {/* Education Module Teaser */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Learn About Rwanda's Heritage
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Expand your knowledge through our interactive educational resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationModules.map((module, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img 
                  src={module.image} 
                  alt={module.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md">
                    Start Learning
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button className="border border-sky-500 text-sky-500 hover:bg-sky-50 px-6 py-3 rounded-md font-medium">
              View All Modules
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Heritage Guard</h3>
              <p className="text-gray-300">
                Preserving Rwanda's rich cultural heritage through digital documentation, community engagement, and education.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-4">
                Stay updated on heritage conservation efforts.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 text-gray-900 rounded-l-md w-full focus:outline-none"
                />
                <button 
                  onClick={handleSubscribe}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-r-md"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-green-500">Thank you for subscribing!</p>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2023 Heritage Guard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeritageGuardLanding;