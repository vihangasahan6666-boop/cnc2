import { useState } from 'react';
import { ArrowRight, X, Calendar, Sprout, Users, Sparkles, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType } from '../types';

interface HeroProps {
  setActiveTab: (tab: ViewType) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  const handleNewsOpen = () => {
    setIsNewsOpen(true);
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

        {/* Golden Badge Cutout inside the hero bottom right - compact version (25% smaller) */}
        <div 
          className="absolute bottom-0 right-0 p-4 rounded-tl-4xl rounded-br-[2rem] hidden sm:block" 
          style={{ backgroundColor: 'rgba(15, 21, 17, 1)' }}
        >
          <button
            onClick={handleNewsOpen}
            className="py-3.5 px-10 bg-[#ffd700] hover:bg-[#e6c200] active:scale-98 transition-all rounded-full flex items-center justify-center shadow-lg font-bold text-black text-xs uppercase tracking-wider group cursor-pointer"
          >
            <span className="px-3">CNC News</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Mobile Consultation CTA Banner below Hero on small screens - compact version (25% smaller) */}
      <div className="block sm:hidden mt-4 text-center">
        <button
          onClick={handleNewsOpen}
          className="mx-auto py-3 px-8 bg-[#ffd700] hover:bg-[#e6c200] transition-all rounded-xl flex items-center justify-center shadow-md font-bold text-black text-xs uppercase tracking-wider cursor-pointer"
        >
          <span>CNC News</span>
          <ArrowRight className="h-3.5 w-3.5 ml-2" />
        </button>
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
                  onClick={handleNewsClose}
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
