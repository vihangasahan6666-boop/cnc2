import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Leaf, Users, Droplet, ArrowRight, ArrowLeft, Quote, Star, Image, Target, Compass, ShieldCheck, Sprout, Handshake, Globe, Lightbulb,
  Eye, MapPin, Calendar, Hash, ChevronLeft, ChevronRight, X, Camera, CheckCircle2, Sparkles, Search, Share2, Download, Info, Sliders, Copy
} from 'lucide-react';
import { useToast } from './ToastContext';

// Custom SVG stylized placeholders for Team Avatars based on the requested designs
const MalePlaceholder = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full text-gray-400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" fill="#0C140E" stroke="#1f3629" strokeWidth="2" />
    <defs>
      <clipPath id="avatar-clip-m">
        <circle cx="60" cy="60" r="52" />
      </clipPath>
    </defs>
    <g clipPath="url(#avatar-clip-m)">
      <path d="M 52,72 L 52,82 L 68,82 L 68,72 Z" fill="#2d4a3b" />
      <path d="M 40,43 C 40,25 80,25 80,43 Z" fill="#0C5E34" />
      <circle cx="60" cy="52" r="16" fill="#1e3a2b" stroke="#2d4a3b" strokeWidth="1.5" />
      <path d="M 44,42 C 43,30 55,26 62,30 C 68,30 74,32 76,40 C 73,38 70,38 67,40 C 65,37 60,37 57,40 C 55,38 48,38 44,42 Z" fill="#0C5E34" />
      <path d="M 28,95 C 28,82 40,78 60,78 C 80,78 92,82 92,95 Z" fill="#243f30" stroke="#335943" strokeWidth="1.5" />
      <path d="M 50,78 L 60,88 L 70,78 Z" fill="#0C140E" />
    </g>
  </svg>
);

const FemalePlaceholder = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full text-gray-400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" fill="#0C140E" stroke="#1f3629" strokeWidth="2" />
    <defs>
      <clipPath id="avatar-clip-f">
        <circle cx="60" cy="60" r="52" />
      </clipPath>
    </defs>
    <g clipPath="url(#avatar-clip-f)">
      <path d="M 38,48 C 34,58 36,75 44,80 C 44,80 50,44 60,44 C 70,44 76,80 76,80 C 84,75 86,58 82,48 C 80,40 78,34 60,34 C 42,34 40,40 38,48 Z" fill="#0C5E34" />
      <path d="M 53,72 L 53,82 L 67,82 L 67,72 Z" fill="#2d4a3b" />
      <circle cx="60" cy="53" r="14.5" fill="#1e3a2b" stroke="#2d4a3b" strokeWidth="1.5" />
      <path d="M 44,44 C 42,32 50,28 60,28 C 70,28 78,32 76,44 C 72,39 68,39 64,42 C 61,38 56,38 53,42 C 51,39 47,39 44,44 Z" fill="#0c5e34" />
      <path d="M 30,95 C 30,83 42,80 60,80 C 78,80 90,83 90,95 Z" fill="#243f30" stroke="#335943" strokeWidth="1.5" />
      <path d="M 48,80 C 52,86 68,86 72,80 Z" fill="#0C140E" />
    </g>
  </svg>
);
import { ViewType } from '../types';

interface TiltedCardProps {
  shadowUrl: string;
  backgroundUrl: string;
  cutoutUrl: string;
  title: string;
  description: string;
  borderClass?: string;
  onClick?: () => void;
  badge?: string;
}

function TiltedCard({
  shadowUrl,
  backgroundUrl,
  cutoutUrl,
  title,
  description,
  borderClass = "",
  onClick,
  badge = "CNC ALLIANCE"
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState({
    '--rotateX': '0deg',
    '--rotateY': '0deg'
  } as React.CSSProperties);

  // Smooth lerp states
  const stateRef = useRef({
    rotateX: 0,
    rotateY: 0,
    currentRotateX: 0,
    currentRotateY: 0
  });

  const angle = 20;

  const remap = (value: number, oldMax: number, newMax: number) => {
    const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
    return Math.min(Math.max(newValue, -newMax), newMax);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = (rect.left + rect.right) / 2;
    const centerY = (rect.top + rect.bottom) / 2;
    const posX = event.clientX - centerX;
    const posY = event.clientY - centerY;

    const x = remap(posX, rect.width / 2, angle);
    const y = remap(posY, rect.height / 2, angle);

    stateRef.current.rotateX = x;
    stateRef.current.rotateY = -y;
  };

  const handleMouseLeave = () => {
    stateRef.current.rotateX = 0;
    stateRef.current.rotateY = 0;
  };

  useEffect(() => {
    const lerp = (start: number, end: number, amount: number) => {
      return (1 - amount) * start + amount * end;
    };

    let animationId: number;
    const update = () => {
      const state = stateRef.current;
      state.currentRotateX = lerp(state.currentRotateX, state.rotateX, 0.05);
      state.currentRotateY = lerp(state.currentRotateY, state.rotateY, 0.05);

      setStyles({
        '--rotateY': `${state.currentRotateX}deg`,
        '--rotateX': `${state.currentRotateY}deg`
      } as React.CSSProperties);

      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`tilt-card flex-shrink-0 snap-center ${borderClass}`}
      style={styles}
    >
      <div 
        className="shadow-layer" 
        style={{ '--url': `url('${shadowUrl}')` } as React.CSSProperties} 
      />
      <div 
        className="image-layer background" 
        style={{ '--url': `url('${backgroundUrl}')` } as React.CSSProperties} 
      />
      <div 
        className="image-layer cutout" 
        style={{ '--url': `url('${cutoutUrl}')` } as React.CSSProperties} 
      />
      <div className="content-layer">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#ffd700] uppercase font-bold mb-2">
          {badge}
        </span>
        <h2 className="font-manrope text-2xl font-black text-white tracking-tight leading-none uppercase mb-2">
          {title}
        </h2>
        <p className="text-gray-300 font-hanken text-xs line-clamp-3 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
};

interface HomeViewProps {
  setActiveTab: (tab: ViewType) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // Parallax calculations for CNC backdrop text using highly optimized motion values (bypassing React re-renders) - adjusted to shift downward and avoid icon overlap
  const { scrollY } = useScroll();
  const cncTextY = useTransform(scrollY, [0, 2000], [130, -50]);
  const cncTextScale = useTransform(scrollY, [0, 2000], [0.95, 1.15]);

  const handleOurTeamRedirect = () => {
    setActiveTab('about');
    toast('Routing to CNC Alliance structure and board members.', 'eco');
    setTimeout(() => {
      const element = document.getElementById('our-team');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 1500, behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <div className="pb-16">

      {/* 🧭 Home Section Navigation Bar - slimmed top padding for a tighter look */}
      <section className="px-4 md:px-16 lg:px-24 pt-1 md:pt-2 pb-0 sticky top-4 z-[90]">
        <div className="relative mx-auto max-w-full group">
          <div 
            ref={navScrollRef}
            className="flex items-center gap-2.5 bg-[#111a14]/85 border border-[#213529]/80 rounded-full p-2.5 md:p-3 backdrop-blur-xl overflow-x-auto scrollbar-none snap-x snap-mandatory touch-pan-x shadow-2xl relative z-10 pr-12 md:pr-3"
          >
            {[
              { id: 'why-we-exist', label: 'Why We Exist', icon: Sprout },
              { id: 'what-we-offer', label: 'What We Offer', icon: ShieldCheck },
              { id: 'who-we-are', label: 'Who We Are', icon: Globe },
              { id: 'our-team', label: 'Our Team', icon: Users },
              { id: 'latest-projects-section', label: 'Projects', icon: Target },
              { id: 'testimonials-section', label: 'Testimonials', icon: Quote },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    const element = document.getElementById(item.id);
                    if (element) {
                       const offset = 110;
                       const bodyRect = document.body.getBoundingClientRect().top;
                       const elementRect = element.getBoundingClientRect().top;
                       const elementPosition = elementRect - bodyRect;
                       const offsetPosition = elementPosition - offset;
                       window.scrollTo({
                         top: offsetPosition,
                         behavior: 'smooth'
                       });
                    }
                  }}
                  className="flex-shrink-0 cursor-pointer px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-sm font-bold font-manrope uppercase tracking-wider transition-all duration-300 snap-start select-none flex items-center justify-center bg-transparent text-gray-300 hover:text-[#52b788] hover:bg-[#52b788]/10 border border-transparent hover:border-[#52b788]/30 group/btn"
                >
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2 text-[#52b788]/70 group-hover/btn:text-[#52b788] transition-colors" />
                  {item.label}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Scroll Indicator - Eco-Themed Gradient Fade & Animated Pulse Action */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#111a14] via-[#111a14]/90 to-transparent z-20 pointer-events-none rounded-r-full md:hidden flex justify-end items-center pr-3">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (navScrollRef.current) {
                  navScrollRef.current.scrollBy({ left: 180, behavior: 'smooth' });
                }
              }}
              className="pointer-events-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#52b788]/50 rounded-full"
              aria-label="Scroll navigation bar"
            >
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-[#52b788] drop-shadow-[0_0_8px_rgba(82,183,136,0.6)] flex items-center justify-center bg-[#0a100c] hover:bg-[#52b788]/20 transition-colors rounded-full p-1.5 border border-[#52b788]/40"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </motion.div>
            </button>
          </div>
        </div>
      </section>

      {/* Group content sections inside a styled grid with a cohesive, tighter gap underneath sub-navigation */}
      <div className="space-y-4 md:space-y-6 mt-2 md:mt-3">

        {/* SECTION 2: WHY WE EXIST SECTION - slightly reduced padding to look tighter */}
        <section className="px-6 md:px-16 lg:px-24 py-3 md:py-4" id="why-we-exist" data-purpose="why-we-exist">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Content Side */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-eco-green font-bold text-sm uppercase tracking-widest block">
                Why We Exist
              </span>
              <h2 className="text-[27px] text-left not-italic font-bold text-white font-manrope leading-tight">
                A community built for a <br className="hidden sm:inline" />
                <span className="text-eco-green italic">greener tomorrow</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed font-hanken">
              <p>
                The world is warming, and the communities that contribute least to climate change are often the ones paying the heaviest price. Carbon Neutral Community Limited (CNC) was founded on one belief — that real environmental change does not begin with governments or global summits. It begins with people. With families. With the choices made every single day at the most local level of society.
              </p>
              <p>
                CNC exists to empower those people. We are a practitioner-led, community-driven environmental organization built by communities, for communities — empowering families, businesses, and social groups across Sri Lanka to measure, reduce, and offset their carbon footprint through collaborative action, accessible tools, and nature-based solutions.
              </p>
            </div>
          </div>

          {/* Staggered Image Gallery Side */}
          <div className="lg:col-span-5 flex gap-4 h-[400px] md:h-[500px]">
            {/* Left Gallery Image with clean curved corners */}
            <div className="flex-1 overflow-hidden rounded-tl-[6rem] rounded-br-[2rem] border border-[#1c2a22] shadow-2xl group">
              <img
                alt="Path through autumn trees representing reforestation journey"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7GMZg_RIBuuxd29NlraKlNYGVW17ryhDuo9giJf55n_9g9xW7DC0RvkeaB1qM83qutjEKAVTqcCWI2L7T9LBn0Rm9YhQBoIpk9tkCKIJUm491FHgGKD67pERvjGnq0VOdXAzeIQLaZ6MoO1eSiFtD4ijHCB8EBVhVuPYrCITAthKoujXDtbk0-ayjq0zq2p4rlM3qp0lj8mCn_6EVvYsyjfFsLEh5TnMM3mwlFvvu3F0rygAS5ROcENY9YfWo4WMsylNkeFqz3z8z2NI"
              />
            </div>
            {/* Right Gallery Image with offset margin top and dark filter */}
            <div className="flex-1 overflow-hidden rounded-bl-[2rem] rounded-br-[6rem] border border-[#1c2a22] shadow-2xl mt-12 group">
              <img
                alt="Tunnel of lush canopy trees representing nature conservation"
                className="w-full h-full object-cover duration-700 transition-transform group-hover:scale-110"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUM7YAq-lsIEiF-6EvWC87gMsk2J6xi59UyKy_xTf96JVHDLAsHc4_hVZzgqmFAuFIOP4V9OyN6GLgAZHfv3K5vCQsKEi3z1_Lw16puZsOHSUpEdCN4EbAzoT3BlPz6h2hafjsC9XyKHTBzL4C6sl410Tr8XCbzCHsGTMGyh73SRb8Tp8Ztl2hKo8aCZ8zTJq_kLIMXBaqBxxYcwcBFoKKeEjzzHnP3esYuUwGur3xjwkahRzSpFdVRdzTVeb4ngK8PPqNxmSdTJFojOo"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: WHAT WE OFFER */}
      <section className="px-6 md:px-16 lg:px-24 py-3 md:py-4" id="what-we-offer" data-purpose="what-we-offer">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-eco-green font-bold text-sm uppercase tracking-widest block">
                What We Offer
              </span>
              <h2 className="font-bold text-white font-manrope leading-tight" style={{ fontSize: '24px' }}>
                Our Work Enables Real <br />
                Environmental Change
              </h2>
            </div>
            
            <div className="max-w-md">
              <p className="text-gray-400 text-base font-hanken leading-relaxed">
                We offer end-to-end environmental integration — empowering families, businesses, and communities to measure, understand, reduce, and offset carbon emissions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-carbon-surface/40 hover:bg-carbon-surface/80 backdrop-blur-sm rounded-[2rem] p-8 border border-carbon-border hover:border-eco-green/40 duration-300 transition-all group">
              <div className="flex-shrink-0 w-12 h-12 bg-eco-green rounded-full flex items-center justify-center text-charcoal shadow-md mb-6 transform group-hover:scale-110 transition-transform">
                <Leaf className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white font-manrope">Carbon Footprint Reduction</h3>
              <p className="text-gray-400 text-sm leading-relaxed mt-3">
                Practical, customized greenhouse gas inventories and audits that help corporate teams and household blocks find and remove daily emission nodes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-carbon-surface/40 hover:bg-carbon-surface/80 backdrop-blur-sm rounded-[2rem] p-8 border border-carbon-border hover:border-eco-green/40 duration-300 transition-all group">
              <div className="flex-shrink-0 w-12 h-12 bg-eco-green rounded-full flex items-center justify-center text-charcoal shadow-md mb-6 transform group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white font-manrope">CNC Networking Clubs</h3>
              <p className="text-gray-400 text-sm leading-relaxed mt-3">
                Active student-led chapters throughout schools and universities, building cross-province climate networks and driving localized youth conservation projects.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-carbon-surface/40 hover:bg-carbon-surface/80 backdrop-blur-sm rounded-[2rem] p-8 border border-carbon-border hover:border-eco-green/40 duration-300 transition-all group">
              <div className="flex-shrink-0 w-12 h-12 bg-eco-green rounded-full flex items-center justify-center text-charcoal shadow-md mb-6 transform group-hover:scale-110 transition-transform">
                <Droplet className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white font-manrope">Carbon Neutral Operations</h3>
              <p className="text-gray-400 text-sm leading-relaxed mt-3">
                Affordable native reforestation tracks (with verified native sapling care) and clean green energy planning that leads to certified carbon-neutral stamps.
              </p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => {
                setActiveTab('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex bg-[#ffd700] hover:bg-[#e6c200] text-black font-bold py-3.5 px-10 rounded-xl transition-all duration-300 transform hover:scale-103 shadow-md focus:outline-none items-center space-x-2 cursor-pointer"
            >
              <span>Discover core projects</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION: WHO WE ARE (Pasted from AboutView) */}
      <motion.section 
        variants={itemVariants} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-16 lg:px-24 py-3 md:py-4" 
        id="who-we-are"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Portrait Image on LHS */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-tl-[10rem] rounded-bl-[2rem] rounded-br-[10rem] h-[400px] md:h-[500px] lg:h-[600px] border border-carbon-border/50 shadow-2xl group">
              <img
                alt="Environmental governance team collaborating in workshop"
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBauDqEgn9AUfqjBqODgW5GoHRestHGSpkKJnGxYWtTWJHNpMrZ5uk7qMnNrbn4NzpknxLdYetUFeI9jatgavUA88X_qgJIol9cFkcoeadaM0YwEzGmACInbYCpvegi3DbLrwPfNJl_zIJbJqGDzFg6FEtH4L1m0aWxD2LF5CYdugkdGUVYrofDhuG5T6FvedTXLJqcssUE5t4sgReA-YQ3zqF0NnRPsA_xHTZ5eAF5DRWzHJfIxFmK-zDZbnrqESW99JwiExdFIAgwiSg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nature-black/80 to-transparent pointer-events-none opacity-50"></div>
            </div>
          </div>

          {/* Core descriptive text RHS */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <span className="text-eco-green font-bold text-sm uppercase tracking-widest">
              Organizational Alliance
            </span>
            <h2 className="text-4xl font-extrabold font-manrope text-white uppercase tracking-tight">
              Who We Are
            </h2>
            
            <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed font-hanken">
              <p>
                CNC is an alliance of leading family offices and local communities working collaboratively to achieve verified carbon neutrality in Sri Lanka within the next 10-20 years, demonstrating innovative solutions and policy approaches to inspire other blocks to reach carbon neutrality as quickly as possible.
              </p>
              <p>
                CNC member families are globally influential, have demonstrated deep carbon reductions, are vocal climate leaders, and act as pioneering risk-takers in green infrastructure.
              </p>
              <p>
                What sets CNC apart from standard carbon agencies of our kind is our operational philosophy: we are the only member-driven, practitioner-led organization created by local families, for local families.
              </p>
              <p>
                CNC's core community representatives are the Sustainability and/or Climate Directors in their respective blocks. The membership directly sets the strategic direction and work priorities for the Alliance, while the CNC executive team remains lean and agile in implementing the agenda, responding to member needs, and pivoting to lead on emerging regulatory and environmental challenges.
              </p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* SECTION: IDENTITY, MISSION AND VALUES (Pasted from AboutView) */}
      <motion.section 
        variants={itemVariants} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-16 lg:px-24 py-3 md:py-4" 
        id="identity-vision-values"
      >
        <div className="max-w-6xl mx-auto w-full space-y-12">
          
          <div className="text-center">
            <span className="text-eco-green font-bold text-sm uppercase tracking-[0.2em] block mb-2">Our Pillars</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-manrope text-white">
              Identity, Mission & Values
            </h2>
          </div>

          {/* Yellow pill cards styled together - floating overlap look */}
          <div className="rounded-[2.5rem] p-8 md:p-12 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-8 bg-[#ffd700] border border-yellow-400/20 relative z-20">
            {/* Value 1: Freshness */}
            <div className="flex flex-col items-center text-center space-y-3 p-4 group">
              <div className="p-3 bg-black/10 rounded-full group-hover:scale-110 transition-transform">
                <Sprout className="text-black h-8 w-8" />
              </div>
              <span className="text-black font-extrabold text-xs uppercase tracking-widest font-manrope">
                Freshness
              </span>
              <p className="text-black/70 text-[11px] leading-relaxed max-w-[130px] font-medium">
                Pristine native species selection.
              </p>
            </div>

            {/* Value 2: Trust */}
            <div className="flex flex-col items-center text-center space-y-3 p-4 group">
              <div className="p-3 bg-black/10 rounded-full group-hover:scale-110 transition-transform">
                <Handshake className="text-black h-8 w-8" />
              </div>
              <span className="text-black font-extrabold text-xs uppercase tracking-widest font-manrope">
                Trust & Transparency
              </span>
              <p className="text-black/70 text-[11px] leading-relaxed max-w-[130px] font-medium">
                Active geolocated forestry records.
              </p>
            </div>

            {/* Value 3: Sustainability */}
            <div className="flex flex-col items-center text-center space-y-3 p-4 group">
              <div className="p-3 bg-black/10 rounded-full group-hover:scale-110 transition-transform">
                <Globe className="text-black h-8 w-8" />
              </div>
              <span className="text-black font-extrabold text-xs uppercase tracking-widest font-manrope">
                Sustainability
              </span>
              <p className="text-black/70 text-[11px] leading-relaxed max-w-[130px] font-medium">
                Sustained ecosystem balance.
              </p>
            </div>

            {/* Value 4: Innovation */}
            <div className="flex flex-col items-center text-center space-y-3 p-4 group">
              <div className="p-3 bg-black/10 rounded-full group-hover:scale-110 transition-transform">
                <Lightbulb className="text-black h-8 w-8" />
              </div>
              <span className="text-black font-extrabold text-xs uppercase tracking-widest font-manrope">
                Innovation
              </span>
              <p className="text-black/70 text-[11px] leading-relaxed max-w-[130px] font-medium">
                Pioneering carbon reduction audits.
              </p>
            </div>
          </div>

          {/* Bilingual Mission Statement Box */}
          <div className="bg-[#0a0f0c]/80 backdrop-blur-md rounded-[2.5rem] pt-8 pb-8 px-6 md:px-10 border border-white/5 shadow-xl flex flex-col md:flex-row gap-12 items-stretch">
            
            {/* Sinhala text column */}
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <span className="text-eco-green/70 font-semibold text-xs tracking-widest block font-manrope uppercase">තිරසාර දැක්ම</span>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed italic font-hanken">
                "සහයෝගී ක්‍රියාමාර්ග, ප්‍රවේශ විය හැකි මෙවලම් සහ ස්වභාවධර්මය පදනම් කරගත් විසඳුම් හරහා ලොව පුරා සිටින දේශීය ප්‍රජාවන්ගේ පුද්ගලයන්, ව්‍යාපාර හා ප්‍රජාවන් සවිබල ගන්වමින් කාබන් විමෝචනය අවම කිරීම, ස්වභාවික සම්පත් සංරක්ෂණය කිරීම සහ තිරසාර ක්‍රියාමාර්ග ප්‍රවර්ධනය කිරීම මඟින් අනාගත පරම්පරාවන් සඳහා සත්‍යාපනය කළ හැකි ශුද්ධ-ශුන්‍ය විමෝචනය සාක්ෂාත් කර ගැනීම සහ සමාජ සමානාත්මතාවය සහ ඔරොත්තු දීමේ හැකියා ලෝකයක් ගොඩනැගීම."
              </p>
            </div>

            {/* Middle Divider */}
            <div className="hidden md:block w-px bg-white/10 self-stretch my-2"></div>

            {/* English text column */}
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <span className="text-eco-green/70 font-semibold text-xs tracking-widest block font-manrope uppercase">Global Mission</span>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-hanken">
                "CNC's mission is to empower local communities worldwide to measure, reduce, and offset their carbon footprint through collaborative action, accessible tools, and nature-based solutions, achieving verifiable net-zero emissions while enhancing social equity and resilience."
              </p>
            </div>

          </div>

        </div>
      </motion.section>

      {/* SECTION: WHY CNC (Pasted from AboutView) */}
      <motion.section 
        variants={itemVariants} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative px-6 md:px-16 lg:px-24 py-3 md:py-4 overflow-hidden" 
        id="why-cnc"
      >
        {/* Soft background watermark */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-5 mix-blend-screen"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC32ChnzYM7V101OThoKOP1tzQ6hBv85gcXI4g8Du31p-tC9V4XSMJ76AN-m9hJPwbsEYwCuxnkvoG1d3faS7hwWyKmfsw-O0s4KZJpa7a9FRZWviHYj-w8KrB7YiWz3oThYTYTkmFaUxVJHxOTVgW77vvjaNB-wUoNq6kC0gr8TasfnLaKmvNK_OkshYbwLTugTUniJPjPpi0QfRBJypExBE6zwXzuoQXUMvRo9b-_uToi2VGbsf-Vb4zvsIi4-IHI5jwtmgIjGpuK")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right center'
          }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Office Image LHS */}
          <div className="lg:col-span-5 h-[400px] md:h-[500px] lg:h-[550px]">
            <img
              alt="Sustainable corporate office interior representing CNC standard guidelines"
              className="w-full h-full object-cover rounded-tl-[8rem] rounded-bl-[2rem] border border-carbon-border/50 transition-all duration-700 shadow-2xl"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpHYCkNgwrxfGKPF8pnlJXngEs8cdSyLrgkemlRhNv9u3a1eQgfRlSJqmw5CTvRrjz15zcLL4OTSH38BBsFnkKfgjTgZ1CUQEXS_-ADoLN2XVm7jGrnwGKOkCT9ubP7bdOZAqDRdHakC4iAni4Do3psJrmkxjon5rk63HWqulRbJhV5uuiF49rAxUeiSt_UjTk0p5rAdDGLi7aOcAYV3Qh7zOhdywbJapiiRWh9ew4YsPP4-6EyvnOk0L_mW7whydd7iiCoqk4UT5x"
            />
          </div>

          {/* Text list RHS */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <span className="text-eco-green font-bold text-sm uppercase tracking-widest">
              Core Benefits
            </span>
            <h2 className="text-4xl font-extrabold font-manrope text-white uppercase tracking-tight">
              Why CNC
            </h2>
            
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-hanken">
              <p>
                Families and corporate houses seek the CNC ecosystem because of the unique collaborative value created in pooling deep environmental intelligence and botanical expertise to drive transformative climate action.
              </p>
              <p>
                Contrary to remote advisory groups, CNC members advance and troubleshoot policy implementation collectively. They share site-level nursery learnings, forge local support networks, innovate tree survival programs together, and build new organizational capacity.
              </p>
              <p>
                The Carbon Neutral Community Alliance amplifies the successes from this collective approach, sharing widely with family offices, estate stakeholders, and Sri Lankan school zones — ensuring that broad communities of leaders are engaged in carbon balance.
              </p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* SECTION: OUR TEAM (Redesigned matching science & compliance board grid) */}
      <motion.section 
        variants={itemVariants} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-16 lg:px-24 py-6 md:py-8 bg-carbon-dark/20 border-t border-white/5 relative"
        id="our-team"
      >
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Centered, high-contrast header matching the screenshot reference */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <span className="text-eco-green font-bold text-sm uppercase tracking-[0.25em] block">
              OUR TEAM
            </span>
            <h2 className="text-white text-3xl md:text-5xl font-extrabold font-manrope tracking-tight leading-tight">
              At the forefront of <span className="text-eco-green">community carbon neutrality</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              To ensure our botanical practices are both highly impactful and standard-compliant, our team manages services and audits in close collaboration with Local Communities.
            </p>
          </div>

          {/* Profile Card Grid (Adapted to CNC theme, echoing layout from screenshot) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {([
              { 
                name: 'Rohan Kodagoda', 
                role: 'Chief Operation Officer', 
                isFemale: false,
                desc: 'Co-leads strategic development, operations, and policy alignment across Sri Lanka\'s community clusters.'
              },
              { 
                name: 'Mahesh Gunawardhana', 
                role: 'Operations Manager', 
                isFemale: false,
                desc: 'Manages field operations, coordinate nurseries, and native forestry survival auditing.'
              },
              { 
                name: 'Duwidu Padiwita', 
                role: 'Operation Executive', 
                isFemale: false,
                desc: 'Directs logistical execution, nursery mobilization, and regional volunteer support networks.'
              },
              { 
                name: 'Rajeendra Rajapaksha', 
                role: 'International Affairs Coordinator', 
                isFemale: false,
                desc: 'Coordinates global climate compliance, green funding networks, and international partnerships.'
              },
              { 
                name: 'Gimsara Upasenage', 
                role: 'Project Development Executive', 
                isFemale: false,
                desc: 'Drives local community chapters, native species selection, and environmental compliance audits.'
              },
              { 
                name: 'Chamidu Kaluvila', 
                role: 'Project Development Executive', 
                isFemale: false,
                desc: 'Facilitates university networking chapters, youth activation, and school forestation tracks.'
              },
              { 
                name: 'Chamika Dahanayakage', 
                role: 'Project Development Executive', 
                isFemale: false,
                desc: 'Coordinates carbon-audits, database registration, and corporate green stamp processing.'
              },
              { 
                name: 'Savishka Arambegedara', 
                role: 'Project Development Executive', 
                isFemale: false,
                desc: 'Leads field operations tracking, site mapping, and localized community partnership plans.'
              },
              { 
                name: 'Vihanga Karunarathna', 
                role: 'Marketing Executive', 
                isFemale: false,
                desc: 'Spearheads digital green awareness campaigns, brand messaging, and climate action panels.'
              },
              { 
                name: 'Udula Karandugoda', 
                role: 'Marketing Executive', 
                isFemale: false,
                desc: 'Curates interactive visual reporting, community engagement posts, and public outreach.'
              },
              { 
                name: 'Dishani Siriwardhana', 
                role: 'HR Executive', 
                isFemale: true,
                desc: 'Oversees administrative operations, alliance recruitment, training, and volunteer safety.'
              }
            ] as { name: string; role: string; isFemale: boolean; desc: string; imageSrc?: string }[]).map((member, idx) => (
              <div 
                key={idx}
                className="bg-carbon-surface/40 hover:bg-carbon-surface/85 backdrop-blur-sm rounded-2xl p-4 border border-carbon-border hover:border-eco-green/45 transition-all duration-300 group flex gap-4 items-center text-left shadow-lg relative overflow-hidden"
              >
                {/* Visual hover top beam */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-eco-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Compact Rounded Avatar */}
                <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 relative overflow-hidden rounded-xl bg-carbon-dark/80 border border-white/5 flex items-center justify-center">
                  {member.imageSrc ? (
                    <img 
                      src={member.imageSrc} 
                      alt={member.name} 
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : member.isFemale ? (
                    <div className="w-full h-full scale-110">
                      <FemalePlaceholder />
                    </div>
                  ) : (
                    <div className="w-full h-full scale-110">
                      <MalePlaceholder />
                    </div>
                  )}
                </div>
                
                {/* Name & Role only */}
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <h3 className="text-white text-sm md:text-base font-bold font-manrope tracking-tight leading-snug group-hover:text-eco-green transition-colors truncate">
                    {member.name}
                  </h3>
                  <p className="text-[#ffd700] text-[10px] md:text-xs font-semibold uppercase tracking-wider font-hanken mt-0.5">
                    {member.role}
                  </p>
                  
                  {/* Branding Badge */}
                  <div className="flex items-center gap-1 text-[8px] text-gray-500 mt-1 group-hover:text-eco-green/70 transition-colors uppercase tracking-widest font-mono">
                    <span>CNC ALLIANCE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: ECO REGILIENCE PORTFOLIO (WITH CNC BACKDROP) */}
      <section className="relative py-4 md:py-6 overflow-hidden" id="latest-projects-section" data-purpose="latest-projects-section">
        {/* Parallax background cover texture */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-[0.09] pointer-events-none"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDcVcmefEQ21h3VTNaETGkfyOqX9Fn0nVzcIZInsudgj3tU0Zvvbm666r-07jbjYODlegHdHqWtV3986CZpvWKaRF1eLgSvDn416yAdln7cGui_RlyV0OMd4ZQJ6ttebG1ixSCCzoe4_Gm9b7q-Z5x0QragrOAo3UUCUtZhK0n6BETsqYnEBLCau8YAbfSTyXQc0ARJymJKavBwk4G54P7V9kA3cw7Hp9OejSmi_72PyjMlU5HCzRgkjGxlHI_vtasABpqryXLGoSXA")`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center bottom 10%'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 space-y-2">
            <span className="text-eco-green text-sm font-semibold uppercase tracking-[0.25em] block">
              Latest Projects
            </span>
            <h2 className="text-white text-3xl md:text-5xl font-extrabold font-manrope max-w-3xl mx-auto leading-tight">
              Building Ecology Resilience & Environment
            </h2>
          </div>

          {/* HORIZONTAL ACTION NAVIGATION BAR - FULLY OPTIMIZED FOR ALL SCREEN SIZES */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mb-8 max-w-5xl mx-auto">
            {/* Button 1: CNC Mission - Our Team */}
            <motion.button
              initial={{ y: 0, borderColor: 'rgba(33, 53, 41, 1)', backgroundColor: 'rgba(17, 26, 20, 0.6)' }}
              whileHover={{ y: -4, borderColor: 'rgba(82, 183, 136, 0.5)', backgroundColor: 'rgba(21, 35, 26, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOurTeamRedirect}
              className="flex flex-col items-center justify-center text-center p-3 sm:p-5 lg:p-8 bg-[#111a14]/60 border border-[#213529] rounded-2xl sm:rounded-3xl transition-all duration-300 group cursor-pointer shadow-lg active:shadow-md h-full min-h-[96px] md:min-h-[160px] space-y-1 sm:space-y-3 relative overflow-hidden"
              aria-label="Navigate to CNC Mission and Our Team section"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-[#1b2b20]/80 text-[#52b788] group-hover:bg-[#52b788] group-hover:text-[#0f1511] flex items-center justify-center transition-all duration-300 shadow-inner">
                <Users className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[8px] sm:text-[10px] lg:text-xs font-mono uppercase tracking-widest text-[#ffd700] block group-hover:text-white transition-colors">
                  CNC Mission
                </span>
                <span className="text-white text-xs sm:text-base lg:text-xl font-extrabold font-manrope uppercase tracking-tight leading-none group-hover:text-[#52b788] transition-colors block">
                  Our Team
                </span>
              </div>
            </motion.button>

            {/* Button 2: Conservation - Activities */}
            <motion.button
              initial={{ y: 0, borderColor: 'rgba(33, 53, 41, 1)', backgroundColor: 'rgba(17, 26, 20, 0.6)' }}
              whileHover={{ y: -4, borderColor: 'rgba(82, 183, 136, 0.5)', backgroundColor: 'rgba(21, 35, 26, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab('projects');
                toast('Showing active carbon mitigation milestones.', 'eco');
              }}
              className="flex flex-col items-center justify-center text-center p-3 sm:p-5 lg:p-8 bg-[#111a14]/60 border border-[#213529] rounded-2xl sm:rounded-3xl transition-all duration-300 group cursor-pointer shadow-lg active:shadow-md h-full min-h-[96px] md:min-h-[160px] space-y-1 sm:space-y-3 relative overflow-hidden"
              aria-label="Navigate to Conservation Activities section"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-[#1b2b20]/80 text-[#52b788] group-hover:bg-[#52b788] group-hover:text-[#0f1511] flex items-center justify-center transition-all duration-300 shadow-inner">
                <Sprout className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[8px] sm:text-[10px] lg:text-xs font-mono uppercase tracking-widest text-[#ffd700] block group-hover:text-white transition-colors">
                  Conservation
                </span>
                <span className="text-white text-xs sm:text-base lg:text-xl font-extrabold font-manrope uppercase tracking-tight leading-none group-hover:text-[#52b788] transition-colors block">
                  Activities
                </span>
              </div>
            </motion.button>

            {/* Button 3: Visuals - Gallery */}
            <motion.button
              initial={{ y: 0, borderColor: 'rgba(33, 53, 41, 1)', backgroundColor: 'rgba(17, 26, 20, 0.6)' }}
              whileHover={{ y: -4, borderColor: 'rgba(82, 183, 136, 0.5)', backgroundColor: 'rgba(21, 35, 26, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab('gallery');
                toast('Opening decentralized photo verification logs.', 'eco');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col items-center justify-center text-center p-3 sm:p-5 lg:p-8 bg-[#111a14]/60 border border-[#213529] rounded-2xl sm:rounded-3xl transition-all duration-300 group cursor-pointer shadow-lg active:shadow-md h-full min-h-[96px] md:min-h-[160px] space-y-1 sm:space-y-3 relative overflow-hidden"
              aria-label="Navigate to Visuals Gallery section"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-[#1b2b20]/80 text-[#52b788] group-hover:bg-[#52b788] group-hover:text-[#0f1511] flex items-center justify-center transition-all duration-300 shadow-inner">
                <Image className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[8px] sm:text-[10px] lg:text-xs font-mono uppercase tracking-widest text-[#ffd700] block group-hover:text-white transition-colors">
                  Visuals
                </span>
                <span className="text-white text-xs sm:text-base lg:text-xl font-extrabold font-manrope uppercase tracking-tight leading-none group-hover:text-[#52b788] transition-colors block">
                  Gallery
                </span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* LARGE STYLISH NATURE REVEAL WORDS */}
        <div className="hidden sm:block text-center mt-12 mb-[-64px] select-none pointer-events-none relative z-0">
          <motion.span
            style={{
              y: cncTextY,
              scale: cncTextScale,
            }}
            className="text-white/5 font-black text-[12rem] lg:text-[18rem] tracking-tighter uppercase font-manrope leading-none inline-block w-full text-center"
          >
            CNC
          </motion.span>
        </div>
      </section>

      {/* SECTION 5: CLIENT TESTIMONIALS */}
      <section className="relative px-6 py-4" id="testimonials-section" data-purpose="testimonials-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-manrope leading-tight text-center">
              Hear from Our Core Partners About Their <span className="text-eco-green italic">Journey</span> On <span className="text-eco-green font-black">CNC</span>
            </h2>
            <div>
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block py-4 px-12 rounded-full font-bold shadow-lg transition-all border border-[#26352c] text-black bg-[#ffd700] hover:bg-[#e6c200] cursor-pointer hover:shadow-yellow-500/20"
              >
                Learn About Our Members
              </button>
            </div>
          </div>

          <div className="lg:col-span-1 border-l border-white/5 hidden lg:block self-stretch h-36 my-auto"></div>

          <div className="lg:col-span-6 bg-carbon-surface/60 backdrop-blur-md p-8 md:p-12 rounded-4xl border border-carbon-border shadow-2xl space-y-8 flex flex-col justify-between hover:border-eco-green/25 transition-all">
            <div className="flex text-brand-yellow space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            <p className="text-gray-300 text-base md:text-lg italic leading-relaxed font-hanken">
              "Working alongside CNC Limited has transformed how our corporate offices and estate lands represent climate accountability. From initial carbon audit paths to final native forest planting schemes, their practitioners guide you directly through measurable environmental integration."
            </p>

            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex items-center space-x-4">
                <img
                  alt="Alex Moony core representative"
                  className="w-14 h-14 rounded-full object-cover border-2 border-eco-green shadow-inner"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArGm9qZshdmEAZNdX2tXzUnyeeVkVH5r9FlxlRaZxUZ3MiFo68uGxeJG1faRbquUOrIob3TG7DfH7Oplqw6KXVSLpUGH7y93sH6BpiFHef4OAyr0jvX7DyVF54vVOCEJqFZOWw_v9ngKthA9NgxGFNuyYuFekXlitFd4LG_2EBvpfhfo5fF-ZhsS_kxUtUIK_6-ISq7oteGveSCjEnp1Q9sgMrJ3zdQE9vKWpZEQttwSvnwlX7fhxRDbs_fBSAcgfZAWe6LnIWXbAhzOs"
                />
                <div>
                  <p className="font-bold text-white font-manrope text-base">Alex Moony</p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Climate Directorate Officer</p>
                </div>
              </div>
              
              <Quote className="h-10 w-10 text-eco-green opacity-15" />
            </div>
          </div>

        </div>
      </section>

      </div>
    </div>
  );
}
