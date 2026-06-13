import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Users, Droplet, ArrowRight, Quote, Star } from 'lucide-react';
import { ViewType } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: ViewType) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations for CNC backdrop text
  const cncTextY = Math.max(-100, 50 - (scrollY * 0.15));
  const cncTextScale = Math.min(1.1, 0.95 + (scrollY * 0.0002));

  return (
    <div className="space-y-24 pb-16">
      
      {/* SECTION 2: WHY WE EXIST SECTION */}
      <section className="px-6 md:px-16 lg:px-24 py-12" data-purpose="why-we-exist">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Content Side */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-eco-green font-bold text-sm uppercase tracking-widest block">
                Why We Exist
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope leading-tight">
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

      {/* SECTION 3: WHAT WE OFFER + CHIEF SEATTLE BOARD */}
      <section className="px-6 md:px-16 lg:px-24 py-12" data-purpose="what-we-offer">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Offerings Lists */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-eco-green font-bold text-sm uppercase tracking-widest block">
                What We Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope leading-tight">
                Our Work Enables <br />
                Real Environmental Change
              </h2>
              <p className="text-gray-400 text-base md:text-lg max-w-xl font-hanken leading-relaxed">
                We offer end-to-end environmental integration — empowering families, businesses, and communities to measure, understand, reduce, and offset carbon emissions.
              </p>
            </div>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-eco-green rounded-full flex items-center justify-center text-charcoal shadow-md">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-manrope">Carbon Footprint Reduction</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mt-1">
                    Practical, customized greenhouse gas inventories and audits that help corporate teams and household blocks find and remove daily emission nodes.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-eco-green rounded-full flex items-center justify-center text-charcoal shadow-md">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-manrope">CNC Networking Clubs</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mt-1">
                    Active student-led chapters throughout schools and universities, building cross-province climate networks and driving localized youth conservation projects.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-eco-green rounded-full flex items-center justify-center text-charcoal shadow-md">
                  <Droplet className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-manrope">Carbon Neutral Operations</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mt-1">
                    Affordable native reforestation tracks (with verified native sapling care) and clean green energy planning that leads to certified carbon-neutral stamps.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setActiveTab('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#ffd700] hover:bg-[#e6c200] text-black font-bold py-3.5 px-10 rounded-xl transition-all duration-300 transform hover:scale-103 shadow-md focus:outline-none flex items-center space-x-2 cursor-pointer"
              >
                <span>Discover core projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Chief Seattle Quote Box with visual polish */}
          <div className="lg:col-span-6 relative rounded-tl-[6rem] rounded-br-[6rem] overflow-hidden bg-carbon-surface/60 border border-carbon-border p-8 md:p-12 flex flex-col justify-between shadow-2xl min-h-[500px]">
            {/* Soft misty layout overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                alt="Misty evergreen forest backdrop for quote box"
                className="w-full h-full object-cover opacity-[0.06]"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgEYvZ7hQxFCZ3CeyIAeWuWWliIlSmIIoATQzgzGUhfF1AoKkaBiXsl1Pv7uPhP7ltOdcO7khU1XSp3WDfi3btUj8JEKMFOWRl2kZizJDyQia0Zk8X7bxBgpieDyQkS5BAtbfwZ00MkJjqOFoO4zu139KtQeI5Uujwlp5TzWT_9JXXPLCrQ7idwCb-XrsAwJxrTMGuCabBUrT-0Ar00UXBsyhUh52NMrXrwKBbelRgrLI8vziEZdO21HTaAf841ZKWpA_foaVfeju5"
              />
            </div>

            <div className="relative z-10 text-center mb-6">
              <span className="text-[#ffd700] font-bold text-xs uppercase tracking-[0.25em] block">
                Words That Guide Us
              </span>
            </div>

            <div className="relative z-10">
              <Quote className="h-10 w-10 text-eco-green opacity-45 mb-4" />
              <blockquote className="text-lg md:text-xl italic text-[#fbf9f8] leading-relaxed pl-4 border-l-2 border-eco-green">
                “We love this earth as a newborn <span className="text-eco-green font-semibold">loves its mother’s heartbeat</span>. So, if we sell you our land, love it as we have loved it. Care for it, as we have cared for it. Hold in your mind the memory of the land as it is when you receive it. <span className="text-eco-green font-semibold">Preserve the land for all children</span>, and love it, as God loves us.”
              </blockquote>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-8 border-t border-white/5">
              <div>
                <p className="font-bold text-lg text-white font-manrope">Chief Seattle</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                  Leader of Duwamish & Suquamish
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">c. 1854 speech</p>
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-carbon-border shadow-xl">
                <img
                  alt="Historical Portrait profile representation of Chief Seattle"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArGm9qZshdmEAZNdX2tXzUnyeeVkVH5r9FlxlRaZxUZ3MiFo68uGxeJG1faRbquUOrIob3TG7DfH7Oplqw6KXVSLpUGH7y93sH6BpiFHef4OAyr0jvX7DyVF54vVOCEJqFZOWw_v9ngKthA9NgxGFNuyYuFekXlitFd4LG_2EBvpfhfo5fF-ZhsS_kxUtUIK_6-ISq7oteGveSCjEnp1Q9sgMrJ3zdQE9vKWpZEQttwSvnwlX7fhxRDbs_fBSAcgfZAWe6LnIWXbAhzOs"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: ECO REGILIENCE PORTFOLIO (WITH CNC BACKDROP) */}
      <section className="relative py-16 overflow-hidden" data-purpose="latest-projects-section">
        {/* Parallax background cover texture */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-[0.09] pointer-events-none"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDcVcmefEQ21h3VTNaETGkfyOqX9Fn0nVzcIZInsudgj3tU0Zvvbm666r-07jbjYODlegHdHqWtV3986CZpvWKaRF1eLgSvDn416yAdln7cGui_RlyV0OMd4ZQJ6ttebG1ixSCCzoe4_Gm9b7q-Z5x0QragrOAo3UUCUtZhK0n6BETsqYnEBLCau8YAbfSTyXQc0ARJymJKavBwk4G54P7V9kA3cw7Hp9OejSmi_72PyjMlU5HCzRgkjGxlHI_vtasABpqryXLGoSXA")`,
            backgroundAttachment: 'fixed'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-eco-green text-sm font-semibold uppercase tracking-[0.25em] block">
              Latest Projects
            </span>
            <h2 className="text-white text-3xl md:text-5xl font-extrabold font-manrope max-w-3xl mx-auto leading-tight">
              Building Ecology Resilience & Environment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {/* Card 1: Wildlife */}
            <div className="bg-carbon-surface/80 hover:bg-carbon-surface backdrop-blur-sm rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-xl border border-carbon-border hover:border-eco-green/40 transition-all duration-300 group">
              <div className="mb-6 h-28 flex items-center justify-center">
                <img
                  alt="Wildlife conservation element icon"
                  className="h-full object-contain brightness-105 group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn-eY6FpB8L3q3-o_S_Nq0UfUv3Wp_6bV9lYjS_5-O7F_R_X_L_W_f_N_G_G_M_O_S_X_D_T_O_Q_M_F_T_C_G_X_K_X_9_Z_D_P_L_F_X_J_6_9_D_X_L_6_U_F_9_5_V_I_K_M_S_0_K_5_Q_B_B_P_N_K_S_F_L_S_S_7_E_1_U_H_I_J_F_H_W_O_H_O_W_D_M_D_J_L_B_M_1_Z_M_P_9_T_B_D_G_8_Q_J_5_P_7_J_3_P_K_3_F_D_J_Q_Y_Z-I_B_4_Q_M_N_E_T_E_Q_H_H_L_G_B_A_Q_W_S_4_L_O_M_1_J_F_Y_T_T_E_W_V_6_U_Y_Q_U_L_B_9_L_S_8_V_4_2_8_R_R_8_4_U_P_M_0-A_X_9_C_8_D_P_P-H_2_S_W_6_I_K_O_3_L_V_"
                />
              </div>
              <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">Protecting</span>
              <h3 className="text-eco-green text-3xl font-extrabold font-manrope mt-1 mb-6">Wildlife</h3>
              <button 
                onClick={() => setActiveTab('projects')}
                className="w-11 h-11 bg-eco-green hover:bg-eco-hover text-charcoal rounded-full flex items-center justify-center transition-all shadow-md group-hover:scale-110 cursor-pointer"
                aria-label="Navigate to Wildlife info"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Card 2: Environment Activities */}
            <div className="bg-carbon-surface/80 hover:bg-carbon-surface backdrop-blur-sm rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-xl border border-carbon-border hover:border-eco-green/40 transition-all duration-300 group">
              <div className="mb-6 h-28 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-eco-green/50 shadow-md">
                  <img
                    alt="Eco activities"
                    className="w-full h-full object-cover transition-all"
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgEYvZ7hQxFCZ3CeyIAeWuWWliIlSmIIoATQzgzGUhfF1AoKkaBiXsl1Pv7uPhP7ltOdcO7khU1XSp3WDfi3btUj8JEKMFOWRl2kZizJDyQia0Zk8X7bxBgpieDyQkS5BAtbfwZ00MkJjqOFoO4zu139KtQeI5Uujwlp5TzWT_9JXXPLCrQ7idwCb-XrsAwJxrTMGuCabBUrT-0Ar00UXBsyhUh52NMrXrwKBbelRgrLI8vziEZdO21HTaAf841ZKWpA_foaVfeju5"
                  />
                </div>
              </div>
              <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">Conservation</span>
              <h3 className="text-eco-green text-3xl font-extrabold font-manrope mt-1 mb-6">Activities</h3>
              <button 
                onClick={() => setActiveTab('projects')}
                className="w-11 h-11 bg-eco-green hover:bg-eco-hover text-charcoal rounded-full flex items-center justify-center transition-all shadow-md group-hover:scale-110 cursor-pointer"
                aria-label="Navigate to Eco Activities info"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Card 3: Recycling */}
            <div className="bg-carbon-surface/80 hover:bg-carbon-surface backdrop-blur-sm rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-xl border border-carbon-border hover:border-eco-green/40 transition-all duration-300 group">
              <div className="mb-6 h-28 flex items-center justify-center">
                <svg className="w-20 h-20 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 4H20M20 4H10m10 0v10m-10 6v-5h-.581m0 0a8.003 8.003 0 0115.357-2" />
                </svg>
              </div>
              <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">Zero Waste</span>
              <h3 className="text-eco-green text-3xl font-extrabold font-manrope mt-1 mb-6">Recycling</h3>
              <button 
                onClick={() => setActiveTab('projects')}
                className="w-11 h-11 bg-eco-green hover:bg-eco-hover text-charcoal rounded-full flex items-center justify-center transition-all shadow-md group-hover:scale-110 cursor-pointer"
                aria-label="Navigate to Recycling Programs"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
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
      <section className="relative px-6 py-6" data-purpose="testimonials-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-manrope leading-tight">
              Hear from Our Core Partners About Their <span className="text-eco-green italic">Journey</span> On
            </h2>
            <div className="text-7xl md:text-9xl font-black text-eco-green font-manrope tracking-tighter select-none">
              CNC
            </div>
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
  );
}
