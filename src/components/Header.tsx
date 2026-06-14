import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ViewType } from '../types';
import CNCLogo from './CNCLogo';

interface HeaderProps {
  activeTab: ViewType;
  setActiveTab: (tab: ViewType) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact us' },
  ] as const;

  const navigate = (tabId: ViewType) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="site-header"
      className={`relative z-50 flex items-center justify-between px-6 md:px-16 transition-all duration-500 rounded-t-4xl h-24 md:h-28 ${
        isScrolled
          ? 'bg-nature-black/90 backdrop-blur-md shadow-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      {/* Brand Logo */}
      <div 
        className="flex-shrink-0 h-20 md:h-24 w-auto cursor-pointer py-1"
        onClick={() => navigate('home')}
      >
        <CNCLogo className="h-full w-auto transition-transform hover:scale-105" />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-10 text-sm font-medium">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`relative py-2 transition-colors duration-300 font-semibold focus:outline-none cursor-pointer ${
                isActive
                  ? 'text-brand-yellow font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile Hamburger Trigger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-eco-green transition-colors focus:outline-none p-1 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-0 right-0 bg-nature-black/95 backdrop-blur-lg border-b border-[#52b788]/20 flex flex-col px-8 py-6 space-y-4 md:hidden shadow-2xl z-40 rounded-b-3xl"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`text-left py-2 font-medium transition-all ${
                    isActive
                      ? 'text-brand-yellow font-bold pl-2 border-l-2 border-brand-yellow'
                      : 'text-gray-300 hover:text-white hover:pl-2'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
