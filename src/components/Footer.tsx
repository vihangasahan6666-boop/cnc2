import { ViewType } from '../types';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import CNCLogo from './CNCLogo';

interface FooterProps {
  setActiveTab: (tab: ViewType) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const handleNavigate = (tab: ViewType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f0c]/95 border-t border-[#52b788]/20 pt-16 pb-8 px-6 md:px-16 lg:px-24 font-manrope text-[#a0b0a8] relative z-10 rounded-b-4xl">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#52b788_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative z-10">
        
        {/* Column 1: Brand details */}
        <div className="flex flex-col space-y-6">
          <div className="h-28 md:h-32 w-auto flex items-center">
            <CNCLogo className="h-full w-auto" />
          </div>
          <div className="space-y-4">
            <p className="text-brand-yellow italic font-semibold text-lg">
              "Let us save the life of the earth."
            </p>
            <p className="text-sm leading-relaxed max-w-sm text-gray-400">
              Empowering communities across Sri Lanka to measure, reduce, and offset their carbon footprint through collaborative action and nature-based solutions.
            </p>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col space-y-6 md:pl-12">
          <h4 className="text-eco-green font-bold uppercase tracking-widest text-sm">
            Quick Links
          </h4>
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavigate('home')}
              className="text-left text-[#a0b0a8] hover:text-white hover:pl-3 hover:border-l-2 hover:border-eco-green transition-all duration-300 focus:outline-none cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate('projects')}
              className="text-left text-[#a0b0a8] hover:text-white hover:pl-3 hover:border-l-2 hover:border-eco-green transition-all duration-300 focus:outline-none cursor-pointer"
            >
              Projects & Initiatives
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className="text-left text-[#a0b0a8] hover:text-white hover:pl-3 hover:border-l-2 hover:border-eco-green transition-all duration-300 focus:outline-none cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigate('gallery')}
              className="text-left text-[#a0b0a8] hover:text-white hover:pl-3 hover:border-l-2 hover:border-eco-green transition-all duration-300 focus:outline-none cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavigate('contact')}
              className="text-left text-[#a0b0a8] hover:text-white hover:pl-3 hover:border-l-2 hover:border-eco-green transition-all duration-300 focus:outline-none cursor-pointer"
            >
              Contact Us
            </button>
          </nav>
        </div>

        {/* Column 3: Get In Touch */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-eco-green font-bold uppercase tracking-widest text-sm">
            Get In Touch
          </h4>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-start space-x-3 group">
              <MapPin className="text-eco-green h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="leading-relaxed">No:265, Serpentine Road, Borella, Colombo 08, Sri Lanka.</span>
            </div>
            
            <div className="flex items-center space-x-3 group text-gray-300 hover:text-white transition-colors">
              <Mail className="text-eco-green h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <a href="mailto:Carbonneutralcommunity@gmail.com">Carbonneutralcommunity@gmail.com</a>
            </div>
            
            <div className="flex items-center space-x-3 group text-gray-300 hover:text-white transition-colors">
              <Phone className="text-eco-green h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <a href="tel:0716205405">0716205405</a>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <a
              href="#"
              className="p-2 rounded-full bg-nature-black hover:bg-eco-green/10 text-gray-400 hover:text-eco-green transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              aria-label="Facebook link"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/carbonneutralcommunity"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-nature-black hover:bg-eco-green/10 text-gray-400 hover:text-eco-green transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              aria-label="Instagram link"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-nature-black hover:bg-eco-green/10 text-gray-400 hover:text-eco-green transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              aria-label="YouTube link"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/cnc__community"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-nature-black hover:bg-eco-green/10 text-gray-400 hover:text-eco-green transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              aria-label="Twitter X link"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1c2a22] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs relative z-10">
        <div className="flex items-center gap-4">
          <div className="h-14 flex items-center">
            <CNCLogo showText={false} className="h-full w-auto" />
          </div>
          <p>© {currentYear} Carbon Neutral Community Limited. All Rights Reserved.</p>
        </div>

        <div className="flex space-x-6 text-gray-500 text-xs">
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
