import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import WebGLBackground from './components/WebGLBackground';
import HomeView from './components/HomeView';
import ProjectsView from './components/ProjectsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import { ViewType } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'projects':
        return <ProjectsView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="relative min-h-screen text-[#dbdad9] font-sans antialiased overflow-x-hidden p-3 sm:p-4 md:p-8">
      {/* 1. WebGL Organic Shader Background */}
      <WebGLBackground />

      {/* 2. Main Container Frame */}
      <div className="max-w-7xl mx-auto rounded-[2.5rem] shadow-2xl bg-carbon-dark/65 backdrop-blur-md border border-carbon-border/50 overflow-hidden flex flex-col justify-between min-h-[90vh]">
        
        {/* Header - Unified navigation */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Global Hero Section Banner with no text on any page */}
        <Hero setActiveTab={setActiveTab} />

        {/* Dynamic Inner Tab View with Fade-In Motion */}
        <main className="flex-grow pt-8 md:pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer - Social ties and quick-route nodes */}
        <Footer setActiveTab={setActiveTab} />

      </div>
    </div>
  );
}
