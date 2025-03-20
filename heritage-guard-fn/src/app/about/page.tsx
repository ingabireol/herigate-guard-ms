// import React from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import img1 from '../assets/rwesero-museum_1.jpg'; // Example image for hero section
// import img2 from '../assets/pot-1_2.jpg'; // Example image for team section
// import img3 from '../assets/pot-2_1.jpg'; // Example image for partners section

// // Define interfaces for type safety
// interface SocialLinks {
//   twitter: string;
//   linkedin: string;
// }

// interface TeamMember {
//   id: number;
//   name: string;
//   role: string;
//   bio: string;
//   photo: string;
//   social: SocialLinks;
// }

// interface Partner {
//   id: number;
//   logo: string;
//   name: string;
// }

// const About: React.FC = () => {
//   const teamMembers: TeamMember[] = [
//     {
//       id: 1,
//       name: 'Alice Uwase',
//       role: 'Founder & CEO',
//       bio: 'Passionate about preserving Rwanda\'s cultural heritage, Alice leads the team with a vision for global impact.',
//       photo: img2,
//       social: {
//         twitter: '#',
//         linkedin: '#'
//       }
//     },
//     {
//       id: 2,
//       name: 'Jean de Dieu',
//       role: 'Lead Developer',
//       bio: 'A tech enthusiast with a love for history, Jean ensures the platform is innovative and user-friendly.',
//       photo: img3,
//       social: {
//         twitter: '#',
//         linkedin: '#'
//       }
//     },
//     {
//       id: 3,
//       name: 'Grace Mukamana',
//       role: 'Community Manager',
//       bio: 'Grace connects with communities to ensure their voices are heard and their stories are preserved.',
//       photo: img2,
//       social: {
//         twitter: '#',
//         linkedin: '#'
//       }
//     }
//   ];

//   const partners: Partner[] = [
//     { id: 1, logo: img1, name: 'Rwanda Cultural Heritage Board' },
//     { id: 2, logo: img2, name: 'UNESCO Rwanda' },
//     { id: 3, logo: img3, name: 'Ministry of Culture' }
//   ];

//   return (
//     <main className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative h-96 md:h-screen md:max-h-[600px] bg-deep-navy">
//         <div className="relative h-full w-full">
//           <Image 
//             src={img1} 
//             alt="Heritage Site" 
//             fill
//             priority
//             sizes="100vw"
//             className="object-cover opacity-70"
//           />
//         </div>
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
//           <motion.h1 
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="text-light-stone mb-4"
//           >
//             About Heritage Guard
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.2 }}
//             className="text-lg md:text-xl text-light-stone mb-8 max-w-3xl"
//           >
//             Preserving Rwanda's Cultural Heritage for Future Generations
//           </motion.p>
//         </div>
//       </section>

//       {/* Mission & Vision Section */}
//       <section className="py-16">
//         <div className="container">
//           <h2 className="text-deep-navy text-center mb-12">
//             Our Mission & Vision
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <motion.div 
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="bg-light-stone p-6 rounded-lg shadow-md"
//             >
//               <h3 className="text-deep-navy mb-4">Mission</h3>
//               <p className="text-deep-navy/80">
//                 To digitally preserve and promote Rwanda's cultural heritage for education, research, and community engagement.
//               </p>
//             </motion.div>
//             <motion.div 
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="bg-light-stone p-6 rounded-lg shadow-md"
//             >
//               <h3 className="text-deep-navy mb-4">Vision</h3>
//               <p className="text-deep-navy/80">
//                 To create a global community dedicated to the conservation of cultural heritage.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section className="py-16 bg-light-stone">
//         <div className="container">
//           <h2 className="text-deep-navy text-center mb-12">
//             Our Story
//           </h2>
//           <motion.div 
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-deep-navy/80 space-y-6"
//           >
//             <p>
//               Heritage Guard was founded in 2023 with the goal of preserving Rwanda's rich cultural heritage for future generations. Our journey began with a small team of passionate individuals dedicated to documenting and sharing the stories of Rwanda's heritage sites.
//             </p>
//             <p>
//               Over the years, we've achieved significant milestones, including the digitization of over 100 heritage sites and the creation of a vibrant community platform. Our future plans include expanding our reach to other African countries and launching new educational initiatives.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-16">
//         <div className="container">
//           <h2 className="text-deep-navy text-center mb-12">
//             Meet the Team
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {teamMembers.map((member) => (
//               <motion.div 
//                 key={member.id} 
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: member.id * 0.1 }}
//                 className="bg-light-stone p-6 rounded-lg shadow-md text-center"
//               >
//                 <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
//                   <Image 
//                     src={member.photo} 
//                     alt={member.name}
//                     fill
//                     sizes="(max-width: 128px) 100vw, 128px"
//                     className="object-cover"
//                   />
//                 </div>
//                 <h4 className="text-deep-navy mb-2">{member.name}</h4>
//                 <p className="text-slate-gray text-sm mb-4">{member.role}</p>
//                 <p className="text-deep-navy/80 mb-4">{member.bio}</p>
//                 <div className="flex justify-center space-x-4">
//                   <Link href={member.social.twitter} className="text-heritage-blue hover:text-deep-navy transition-colors">
//                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
//                     </svg>
//                   </Link>
//                   <Link href={member.social.linkedin} className="text-heritage-blue hover:text-deep-navy transition-colors">
//                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                     </svg>
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Partners Section */}
//       <section className="py-16 bg-light-stone">
//         <div className="container">
//           <h2 className="text-deep-navy text-center mb-12">
//             Our Partners
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {partners.map((partner) => (
//               <motion.div 
//                 key={partner.id} 
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: partner.id * 0.1 }}
//                 className="bg-white p-6 rounded-lg shadow-md text-center"
//               >
//                 <div className="relative w-32 h-32 mx-auto mb-4">
//                   <Image 
//                     src={partner.logo} 
//                     alt={partner.name}
//                     fill
//                     sizes="(max-width: 128px) 100vw, 128px"
//                     className="object-contain"
//                   />
//                 </div>
//                 <h4 className="text-deep-navy">{partner.name}</h4>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16">
//         <div className="container text-center">
//           <h2 className="text-deep-navy mb-4">
//             Join Us in Preserving Rwanda's Heritage
//           </h2>
//           <p className="text-lg text-deep-navy/80 mb-8">
//             Be part of a global movement to protect and celebrate cultural heritage.
//           </p>
//           <button className="bg-heritage-blue hover:bg-deep-navy text-light-stone px-6 py-3 rounded-lg font-medium transition-colors">
//             Join the Community
//           </button>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default About;