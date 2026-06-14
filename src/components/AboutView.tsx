import { useRef } from 'react';
import { motion } from 'motion/react';
import { Sprout, Handshake, Globe, Lightbulb, Facebook, Twitter, Instagram, Linkedin, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

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

export default function AboutView() {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 md:space-y-20 pb-12 md:pb-20"
    >
      
      {/* SECTION 1: WHO WE ARE */}
      <motion.section variants={itemVariants} className="px-6 md:px-16 lg:px-24 py-3 md:py-6" id="who-we-are">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Portrait Image on LHS */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-tl-[10rem] rounded-bl-[2rem] rounded-br-[10rem] h-[260px] sm:h-[380px] md:h-[500px] lg:h-[600px] border border-carbon-border/50 shadow-2xl group">
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

        {/* Chief Seattle Quote Box with visual polish */}
        <div className="mt-8 md:mt-16 max-w-4xl mx-auto relative rounded-tl-[4rem] md:rounded-tl-[6rem] rounded-br-[4rem] md:rounded-br-[6rem] overflow-hidden bg-carbon-surface/60 border border-carbon-border p-6 md:p-12 flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-stretch shadow-2xl min-h-0 md:min-h-[350px]">
          {/* Soft misty layout overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              alt="Misty evergreen forest backdrop for quote box"
              className="w-full h-full object-cover opacity-[0.06]"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgEYvZ7hQxFCZ3CeyIAeWuWWliIlSmIIoATQzgzGUhfF1AoKkaBiXsl1Pv7uPhP7ltOdcO7khU1XSp3WDfi3btUj8JEKMFOWRl2kZizJDyQia0Zk8X7bxBgpieDyQkS5BAtbfwZ00MkJjqOFoO4zu139KtQeI5Uujwlp5TzWT_9JXXPLCrQ7idwCb-XrsAwJxrTMGuCabBUrT-0Ar00UXBsyhUh52NMrXrwKBbelRgrLI8vziEZdO21HTaAf841ZKWpA_foaVfeju5"
            />
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-between space-y-6">
            <div>
              <Quote className="h-10 w-10 text-eco-green opacity-45 mb-4" />
              <blockquote className="text-lg md:text-xl italic text-[#fbf9f8] leading-relaxed pl-4 border-l-2 border-eco-green">
                “We love this earth as a newborn <span className="text-eco-green font-semibold">loves its mother’s heartbeat</span>. So, if we sell you our land, love it as we have loved it. Care for it, as we have cared for it. Hold in your mind the memory of the land as it is when you receive it. <span className="text-eco-green font-semibold">Preserve the land for all children</span>, and love it, as God loves us.”
              </blockquote>
            </div>

            <div className="pt-4">
              <span className="text-[#ffd700] font-bold text-xs uppercase tracking-[0.25em] block">
                Words That Guide Us
              </span>
            </div>
          </div>

          <div className="hidden md:block w-px bg-white/10 self-stretch my-2 relative z-10"></div>

          <div className="relative z-10 flex flex-col justify-center items-center md:items-end text-center md:text-right space-y-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-carbon-border shadow-xl">
              <img
                alt="Historical Portrait profile representation of Chief Seattle"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuArGm9qZshdmEAZNdX2tXzUnyeeVkVH5r9FlxlRaZxUZ3MiFo68uGxeJG1faRbquUOrIob3TG7DfH7Oplqw6KXVSLpUGH7y93sH6BpiFHef4OAyr0jvX7DyVF54vVOCEJqFZOWw_v9ngKthA9NgxGFNuyYuFekXlitFd4LG_2EBvpfhfo5fF-ZhsS_kxUtUIK_6-ISq7oteGveSCjEnp1Q9sgMrJ3zdQE9vKWpZEQttwSvnwlX7fhxRDbs_fBSAcgfZAWe6LnIWXbAhzOs"
              />
            </div>
            <div>
              <p className="font-bold text-lg text-white font-manrope">Chief Seattle</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                Leader of Duwamish & Suquamish
              </p>
              <p className="text-[10px] text-gray-600 mt-0.5">c. 1854 speech</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2: IDENTITY, MISSION AND VALUES */}
      <motion.section variants={itemVariants} className="px-6 md:px-16 lg:px-24 py-3 md:py-6" id="identity-vision-values">
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
          <div className="bg-[#0a0f0c]/80 backdrop-blur-md rounded-[2.5rem] py-8 md:pt-16 md:pb-12 px-6 md:px-16 border border-white/5 shadow-xl flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
            
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

      {/* SECTION 3: WHY CNC */}
      <motion.section variants={itemVariants} className="relative px-6 md:px-16 lg:px-24 py-3 md:py-6 overflow-hidden" id="why-cnc">
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
          <div className="lg:col-span-5 h-[260px] sm:h-[380px] md:h-[500px] lg:h-[550px]">
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
        className="px-6 md:px-16 lg:px-24 py-4 md:py-12 bg-carbon-dark/20 border-t border-white/5 relative"
        id="our-team"
      >
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          
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

      {/* SECTION 4: FOLLOW US SECTION */}
      <motion.section 
        variants={itemVariants} 
        className="px-6 md:px-16 lg:px-24 py-4 md:py-10 border-t border-white/5" 
        id="follow-us"
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold font-manrope text-white tracking-tight uppercase">
            Follow Us
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl font-hanken">
            Stay updated with our latest reforestation drives, local youth campus workshops, and community carbon reduction initiatives across Sri Lanka by following us on our channels.
          </p>
          
          {/* Social logos aligned, color-shaded matching their exact brands */}
          <div className="flex items-center justify-center space-y-0 space-x-8 pt-4">
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#1877f2] hover:scale-115 active:scale-95 transition-all duration-300 hover:brightness-125"
              title="Facebook"
            >
              <Facebook className="h-7 w-7" />
            </a>

            {/* Twitter */}
            <a 
              href="https://x.com/cnc__community" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#1da1f2] hover:scale-115 active:scale-95 transition-all duration-300 hover:brightness-125"
              title="Twitter"
            >
              <Twitter className="h-7 w-7" />
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/carbonneutralcommunity" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#e1306c] hover:scale-115 active:scale-95 transition-all duration-300 hover:brightness-125"
              title="Instagram"
            >
              <Instagram className="h-7 w-7" />
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#0077b5] hover:scale-115 active:scale-95 transition-all duration-300 hover:brightness-125"
              title="LinkedIn"
            >
              <Linkedin className="h-7 w-7" />
            </a>

            {/* Google Plus */}
            <a 
              href="https://plus.google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#db4437] hover:scale-115 active:scale-95 transition-all duration-300 hover:brightness-125 flex items-center justify-center font-bold font-manrope text-2xl tracking-tighter"
              title="Google Plus"
            >
              <span className="leading-none flex items-center">G<span className="text-xl font-light ml-0.5">+</span></span>
            </a>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
}
