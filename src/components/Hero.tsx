import { useState } from 'react';
import { ArrowRight, X, Calendar, Sprout, Users, Sparkles, Award, Leaf, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType } from '../types';
import { useToast } from './ToastContext';

interface HeroProps {
  setActiveTab: (tab: ViewType) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const { toast } = useToast();
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  const handleNewsOpen = () => {
    setIsNewsOpen(true);
    toast('Loaded 4 active CNC Environmental bulletins.', 'eco');
  };

  const handleNewsClose = () => {
    setIsNewsOpen(false);
  };

  const newsArticles = [
    {
      id: 1,
      tag: 'Reforestation Drive',
      title: 'Coastal Mangrove Restoration in Jaffna Peninsula Launch',
      date: 'June 12, 2026',
      desc: 'CNC’s New Forest Initiative deployed over 1,200 native mangrove saplings in the northern Jaffna coastline. This helps secure vital blue carbon sinks and protects local fisherman habitats.',
      icon: Sprout,
      color: '#52b788',
    },
    {
      id: 2,
      tag: 'Youth Movement',
      title: '15 High School Chapters Added to CNC Network',
      date: 'June 05, 2026',
      desc: 'Student environmental councils across Colombo and Galle districts joined the CNC Alliance this month, initiating youth-led neighborhood carbon mapping audits and local composting drives.',
      icon: Users,
      color: '#ffd700',
    },
    {
      id: 3,
      tag: 'Sustainable Tech',
      title: 'Bilingual Household Carbon Audit Dashboard Goes Live',
      date: 'May 28, 2026',
      desc: 'Empowering local families with native language tracking. Our new digital carbon assessment panel supports Sinhala and English, allowing households to monitor emission nodes in real-time.',
      icon: Sparkles,
      color: '#fb923c',
    },
    {
      id: 4,
      tag: 'National Award',
      title: 'Awarded Regional Conservation Champion Stamp',
      date: 'May 15, 2026',
      desc: 'The Sri Lanka Green Development Panel officially recognized CNC Limited’s practitioner-led community offset framework as a benchmark for regional climate action models.',
      icon: Award,
      color: '#c9a84c',
    },
  ];

  return (
    <section className="relative px-4" data-purpose="hero-banner">
      <div className="relative w-full h-auto aspect-[16/10] sm:aspect-auto sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-[2rem] shadow-2xl border border-white/5">
        {/* Main Hero Cottage Image */}
        <img
          alt="Modern dark-toned architecture in a forest setting"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-101 hover:scale-[1.04] saturate-120 brightness-110"
          referrerPolicy="no-referrer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJEcVpIycvkJ9oNjxhz1wub7D3TLbTO8XnZXJYqDFqZ3OUZvRhH6FTpycT3A3gQzSHr9sQo9GGP7hjN3EuMcn79ZTEnBNoTbXA3XyyPj63jO6IyPydPF1W2B0Q-_QyoqrfkwiGfiMdZ_SsXDKKmEprWx4TSaQ_23AGWAITDh1ypWiSeHgiuWRSbbKCSTmdje8YHqNMLaA79nJ4NCXFV-WPJRDa74VOy_s2gKWpBn89FwUAdihoyeySZXzVD46MkQtmQkbxwjTaww85b88"
        />
        
        {/* Empty Overlay container */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-32 max-w-4xl" />

        {/* Floating Animated Leaf-Shaped News Trigger */}
        <motion.div
          className="absolute bottom-6 right-6 hidden sm:block z-20"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          {/* Soft breathing ring pulse underlay */}
          <motion.div
            className="absolute inset-0 bg-yellow-400/20 rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] -z-10"
            animate={{
              scale: [1, 1.07, 1],
              opacity: [0.75, 0, 0.75],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: 'easeInOut',
            }}
          />
          
          <motion.button
            onClick={handleNewsOpen}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="py-4 px-10 bg-gradient-to-br from-[#ffd700] via-[#ffe54d] to-[#e6c200] hover:from-eco-green hover:to-eco-hover text-black hover:text-white font-extrabold text-[13px] uppercase tracking-wider relative flex items-center justify-center shadow-[0_10px_25px_rgba(253,215,0,0.3)] hover:shadow-[0_12px_30px_rgba(82,183,136,0.35)] transition-all duration-300 cursor-pointer select-none rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] border border-white/20 overflow-hidden group will-change-transform"
          >
            {/* Custom leaf wind ripple overlay effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <Leaf className="h-4.5 w-4.5 mr-2.5 text-emerald-800 group-hover:text-emerald-100 transition-colors duration-300 animate-pulse flex-shrink-0" />
            <span className="px-1 font-manrope font-extrabold tracking-widest">CNC News</span>
            <Newspaper className="h-4.5 w-4.5 ml-2.5 text-emerald-900 group-hover:text-white transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 flex-shrink-0" />
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile News Trigger - 10% larger, animated leaf-shaped, with soft pulsing organic aura */}
      <div className="block sm:hidden mt-5 text-center px-4">
        <div className="relative inline-block">
          {/* Mobile breathing ring pulse underlay */}
          <motion.div
            className="absolute inset-0 bg-yellow-400/25 rounded-tl-[1.75rem] rounded-br-[1.75rem] rounded-tr-[0.35rem] rounded-bl-[0.35rem] -z-10"
            animate={{
              scale: [1, 1.07, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: 'easeInOut',
            }}
          />
          <motion.button
            onClick={handleNewsOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="mx-auto py-3.5 px-8 bg-gradient-to-br from-[#ffd700] to-[#e6c200] hover:from-eco-green hover:to-eco-hover text-black hover:text-white font-extrabold text-[12px] uppercase tracking-widest flex items-center justify-center shadow-[0_8px_20px_rgba(253,215,0,0.25)] hover:shadow-[0_10px_25px_rgba(82,183,136,0.35)] transition-all duration-300 rounded-tl-[1.75rem] rounded-br-[1.75rem] rounded-tr-[0.35rem] rounded-bl-[0.35rem] border border-white/10 group cursor-pointer"
          >
            <Leaf className="h-4 w-4 mr-2 text-emerald-800 group-hover:text-white transition-colors duration-300" />
            <span className="font-manrope">CNC News</span>
            <Newspaper className="h-4 w-4 ml-2 text-emerald-900 group-hover:text-white transition-all" />
          </motion.button>
        </div>
      </div>

      {/* Interactive News Feed Modal - Fully responsive overlay */}
      <AnimatePresence>
        {isNewsOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Modal Backdrop with organic blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleNewsClose}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', duration: 0.45 }}
              className="relative w-full max-w-2xl bg-[#0f1511] border border-[#213529]/80 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10"
            >
              {/* Decorative top green glow line */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-eco-green via-brand-yellow to-eco-green" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#213529]/50 bg-[#111a14]/60">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-eco-green/10 rounded-lg text-eco-green">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-manrope font-black text-white text-lg tracking-tight uppercase">
                      CNC Community News
                    </h3>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider font-mono">
                      Latest announcements & environmental updates
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleNewsClose}
                  className="p-1.5 rounded-full bg-[#1c2a22] text-gray-400 hover:text-white hover:bg-red-500/20 transition-all cursor-pointer"
                  aria-label="Close News Modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Feed Content body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                {newsArticles.map((article) => {
                  const IconComponent = article.icon;
                  return (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: article.id * 0.1 }}
                      className="group p-5 bg-carbon-surface/30 hover:bg-carbon-surface/60 rounded-2xl border border-carbon-border hover:border-eco-green/35 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Interactive edge badge accent */}
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1 transition-all group-hover:w-1.5"
                        style={{ backgroundColor: article.color }}
                      />

                      <div className="flex items-start gap-4">
                        {/* Feed Icon Frame */}
                        <div 
                          className="p-2.5 rounded-xl flex-shrink-0 transition-transform group-hover:scale-105"
                          style={{ backgroundColor: `${article.color}20`, color: article.color }}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>

                        {/* Text values */}
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span 
                              className="text-[10px] font-bold uppercase tracking-widest font-mono"
                              style={{ color: article.color }}
                            >
                              {article.tag}
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-500 text-[11px] font-hanken">
                              <Calendar className="h-3.5 w-3.5" />
                              {article.date}
                            </span>
                          </div>
                          
                          <h4 className="text-white text-base font-bold font-manrope tracking-tight leading-snug group-hover:text-eco-green transition-colors">
                            {article.title}
                          </h4>
                          
                          <p className="text-gray-300 text-xs leading-relaxed font-hanken">
                            {article.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[#213529]/40 bg-[#111a14]/40 flex justify-end">
                <button
                  onClick={() => {
                    handleNewsClose();
                    toast('CNC Environmental bulletins cleared from view.', 'info');
                  }}
                  className="py-2.5 px-6 bg-eco-green/10 hover:bg-eco-green/20 text-eco-green font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  Clear Feed
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
