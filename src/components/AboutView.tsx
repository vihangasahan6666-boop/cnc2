import { motion } from 'motion/react';
import { Sprout, Handshake, Globe, Lightbulb, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function AboutView() {
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
      className="space-y-32 pb-20"
    >
      
      {/* SECTION 1: WHO WE ARE */}
      <motion.section variants={itemVariants} className="px-6 md:px-16 lg:px-24 py-6" id="who-we-are">
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

      {/* SECTION 2: IDENTITY, MISSION AND VALUES */}
      <motion.section variants={itemVariants} className="px-6 md:px-16 lg:px-24 py-6" id="identity-vision-values">
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
          <div className="bg-[#0a0f0c]/80 backdrop-blur-md rounded-[2.5rem] pt-16 pb-12 px-8 md:px-16 border border-white/5 shadow-xl flex flex-col md:flex-row gap-12 items-stretch">
            
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
      <motion.section variants={itemVariants} className="relative px-6 md:px-16 lg:px-24 py-6 overflow-hidden" id="why-cnc">
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

      {/* SECTION 4: FOLLOW US SECTION */}
      <motion.section 
        variants={itemVariants} 
        className="px-6 md:px-16 lg:px-24 py-12 border-t border-white/5" 
        id="follow-us"
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold font-manrope text-white tracking-tight uppercase">
            Follow Us
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl font-hanken">
            Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam.
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
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#1da1f2] hover:scale-115 active:scale-95 transition-all duration-300 hover:brightness-125"
              title="Twitter"
            >
              <Twitter className="h-7 w-7" />
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
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
