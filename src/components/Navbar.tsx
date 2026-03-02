import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';

const Navbar: React.FC = () => {
  const { user, cart, logout } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white text-black font-sans w-full z-50 relative">
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Utility Links */}
          <div className="hidden md:flex items-center space-x-6 text-[11px] font-medium tracking-widest uppercase text-gray-500">
            <Link to="/shop?cat=match" className="hover:text-black transition-colors">Coleções</Link>
            <Link to="/blog" className="hover:text-black transition-colors">Sobre</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-black">
                ARABIAN ESSENCE
              </h1>
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-black hover:text-gray-600 transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            <Link to={user ? "/profile" : "/login"} className="text-black hover:text-gray-600 transition-colors">
              <User size={20} strokeWidth={1.5} />
            </Link>

            <Link to="/cart" className="text-black hover:text-gray-600 transition-colors relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="hidden md:block border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center space-x-8 h-12 text-[11px] font-medium uppercase tracking-wider text-gray-600">
            <Link to="/shop" className="hover:text-black flex items-center group">
              Perfumes <ChevronDown size={12} className="ml-1 group-hover:rotate-180 transition-transform" />
            </Link>
            <Link to="/shop?cat=match" className="hover:text-black">Match Of Senses</Link>
            <Link to="/shipping" className="hover:text-black">Prazos e Frete Grátis</Link>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-black">Atendimento</a>
            <Link to="/blog" className="hover:text-black">Blog</Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 text-sm font-medium uppercase tracking-wide">
              <Link to="/shop" className="block py-2 border-b border-gray-50">Perfumes</Link>
              <Link to="/shop?cat=match" className="block py-2 border-b border-gray-50">Match Of Senses</Link>
              <Link to="/shipping" className="block py-2 border-b border-gray-50">Prazos e Frete Grátis</Link>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="block py-2 border-b border-gray-50">Atendimento</a>
              <Link to="/blog" className="block py-2 border-b border-gray-50">Blog</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
