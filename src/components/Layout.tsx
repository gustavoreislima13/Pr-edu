import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'motion/react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black-900 text-gray-100">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="flex-grow pt-20"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
