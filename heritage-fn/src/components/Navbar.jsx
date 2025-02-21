import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaUserCircle, FaSearch } from 'react-icons/fa'
import { RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion'
import Language from './Language';
const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <div className="flex fixed top-0 left-0 w-full z-20 bg-white shadow-md">
        <div className="p-4 flex justify-between items-center w-full">
          {/* Logo Section */}
          <div className="w-10 aspect-square bg-yellow-200 rounded-full flex items-center justify-center">
            logo
          </div>

          {/* Desktop Navigation Links */}
          <div className="md:flex justify-between gap-x-5 items-center hidden">
            <NavLink to="/about" className="text-xl text-slate-800">About</NavLink>
            <NavLink to="/contact" className="text-xl text-slate-800">Contact</NavLink>
            <NavLink to="/vision" className="text-xl text-slate-800">Vision</NavLink>
          </div>

          {/* Icons Section */}
          <div className="flex justify-between gap-x-5 items-center">
            <FaSearch />
            <NavLink to="/login">
              <FaUserCircle className="text-xl" />
            </NavLink>
          </div>          

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-x-2">
            <Language text={'EN'}/>
            <span className="cursor-pointer text-2xl" onClick={() => setDrawerVisible(true)}>
              <RxHamburgerMenu />
            </span>            
          </div>
        </div>
      </div>

      {/* Add padding so content doesn't get overlapped */}
      <div className="h-16 md:h-20"></div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {drawerVisible && (
          <>
            {/* Overlay to click outside and close the menu */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerVisible(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              className="fixed right-0 top-0 w-[300px] h-full bg-black text-white flex flex-col z-20 shadow-lg"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }}
              exit={{ x: 100, opacity: 0, transition: { ease: "circInOut", duration: 0.2 } }}
            >
              {/* Close Button */}
              <div className="flex text-xl justify-center py-4 items-center">
                <span className="cursor-pointer" onClick={() => setDrawerVisible(false)}>
                  Close
                </span>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col items-center justify-center gap-4">
                <NavLink to="/" className="text-xl cursor-pointer" onClick={() => setDrawerVisible(false)}>Home</NavLink>
                <NavLink to="/about" className="text-xl cursor-pointer" onClick={() => setDrawerVisible(false)}>About</NavLink>
                <NavLink to="/contact" className="text-xl cursor-pointer" onClick={() => setDrawerVisible(false)}>Contact</NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
