import { motion } from 'motion/react';
import { Home, Briefcase, GraduationCap, School, TreeDeciduous, HeartHandshake } from 'lucide-react';

export default function ProjectsView() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-32 pb-20"
    >
      
      {/* SECTION 1: REDUCING CARBON FOOTPRINT */}
      <motion.section variants={itemVariants} className="px-6 md:px-16 lg:px-24 py-6" id="footprint-reduction">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text content side (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[#fb923c] font-bold text-sm uppercase tracking-[0.2em] block">
                Sustainable Mitigation
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-white leading-tight uppercase">
                Reducing <span className="text-brand-orange">Carbon Footprint</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300 font-hanken leading-relaxed">
                Carbon neutrality must be built from the ground up — starting with the most fundamental unit of society: the family, and extending outward to the businesses that shape our economy. CNC empowers both to measure, reduce, and offset their carbon footprint.
              </p>
            </div>

            <div className="space-y-8">
              {/* Family Division */}
              <div className="p-6 rounded-2xl bg-carbon-surface/40 border border-carbon-border/50 hover:border-eco-green/20 transition-all space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-eco-green/15 text-eco-green rounded-lg">
                    <Home className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-eco-green font-manrope">I. Family Division</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-hanken">
                  CNC works directly with households to help them understand and reduce their everyday carbon emissions — from energy use and transportation to food choices and waste. Our trained advisors conduct home carbon audits and provide customized, affordable action plans. Families receive ongoing support through our community network, workshops, and digital tools — making greener living practical for every Sri Lankan household.
                </p>
              </div>

              {/* Corporate Division */}
              <div className="p-6 rounded-2xl bg-carbon-surface/40 border border-carbon-border/50 hover:border-eco-green/20 transition-all space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-eco-green/15 text-eco-green rounded-lg">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-eco-green font-manrope">II. Corporate Division</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-hanken">
                  CNC partners with businesses across manufacturing, hospitality, retail, and services to design structured, science-based carbon reduction strategies. We begin with a comprehensive carbon audit covering operations, supply chains, and energy usage, then develop a customized Carbon Reduction Roadmap including energy efficiency, green procurement, and verified offset partnerships. Organizations that complete the program receive a CNC Carbon Offset Certificate — a credible mark of their commitment to a carbon-neutral future.
                </p>
              </div>
            </div>
          </div>

          {/* Masked image side (5 cols on desktop) */}
          <div className="lg:col-span-5 h-[500px] md:h-[600px] lg:h-[650px] w-full overflow-hidden rounded-tl-[10rem] rounded-br-[10rem] border border-carbon-border/60 shadow-2xl relative group">
            <img
              alt="Reforestation and tree planting representing corporate carbon offset"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVtqJcEip5f_coNOPjm4lAO6H0wVYPQt_8JA6OlZqBZTHfW_G2YnYKzGMTUWhJ25JqpLZdlNX5AqARORuiVvxEHYxpI8QPjIdSS0-6ZUd8tD97oCwAzZaD6ASnZntWmcaMNVAFYH_60eeHd_kwcMnSv8HX-0GoiT_o0ZRdHTLiX424kVLZ52k0sXv-EQNsQxMgtYDtfDXP1dGThVHlu2VqJjsSHKANWmcS4iYltnmkXdrU-EkcjYxJ2tusY2GRhhlvRTThCBxo0RHSYgc"
            />
            {/* Visual ambient green lens vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-nature-black/70 to-transparent opacity-80 pointer-events-none"></div>
          </div>

        </div>
      </motion.section>

      {/* SECTION 2: CNC NETWORKING CLUBS */}
      <motion.section variants={itemVariants} className="px-6 md:px-16 lg:px-24 py-6" id="networking-clubs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Masked image side on LHS for alternate rhythm */}
          <div className="lg:col-span-5 h-[500px] md:h-[600px] lg:h-[650px] w-full overflow-hidden rounded-tr-[10rem] rounded-bl-[10rem] border border-carbon-border/60 shadow-2xl relative group order-2 lg:order-1">
            <img
              alt="Youth students planting a sustainable organic garden in school"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-unkLzxjIcJBb0yqG5EqdbSQlDJ8xxqdZ8r5V5N61D0OYJA-50hfTAhFPj1fOax-V7qKWWJ947Acz7xq1wRiqGhc2fW-e2JaM2D8Mf2qNWkX2D4DViwvu1Oa9mg25IHljQX-3D1-T4mnvPnhYX2wzOJWWwvKPz4WSgBifzpo5u6gVphwwNBpVHcZZjzZ2S1QpHCpVxYbFEWLmBxkzVz7xEoBdNL2-MSCRNjAMnK0WGnCuV1k-K-oaDqhriy8K1-0R7pXFGLMMZWF7aK8"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nature-black/70 to-transparent opacity-80 pointer-events-none"></div>
          </div>

          {/* Text content side on RHS */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="text-[#fb923c] font-bold text-sm uppercase tracking-[0.2em] block">
                Educated Mobilization
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-white leading-tight uppercase">
                CNC <span class="text-brand-orange">Networking Clubs</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300 font-hanken leading-relaxed">
                The most powerful force for environmental change is a connected, informed, and motivated community. CNC Networking Clubs are grassroots environmental chapters established within educational campuses and social blocks — united around climate restoration.
              </p>
            </div>

            <div className="space-y-8">
              {/* School Clubs */}
              <div className="p-6 rounded-2xl bg-carbon-surface/40 border border-carbon-border/50 hover:border-eco-green/20 transition-all space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-eco-green/15 text-eco-green rounded-lg">
                    <School className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-eco-green font-manrope">I. School CNC Networking Clubs</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-hanken">
                  CNC School Clubs are student-led bodies supported by trained CNC facilitators and age-appropriate educational resources. Members conduct tree planting campaigns, recycling programs, energy audits, and inter-school environmental competitions. We also offer teacher training sessions to help educators integrate climate change and sustainability into everyday lessons — ensuring the message reaches every classroom.
                </p>
              </div>

              {/* University Clubs */}
              <div className="p-6 rounded-2xl bg-carbon-surface/40 border border-carbon-border/50 hover:border-eco-green/20 transition-all space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-eco-green/15 text-eco-green rounded-lg">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-eco-green font-manrope">II. University CNC Networking Clubs</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-hanken">
                  CNC University Clubs connect students from Colombo, Peradeniya, Kelaniya, Moratuwa, and Jaffna into a single powerful network. Members collaborate on real-world carbon reduction research, organize inter-university climate seminars, and participate in an annual national sustainability summit. Universities also serve as living labs — on-campus spaces where carbon reduction strategies are tested, measured, and shared with the wider CNC community.
                </p>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* SECTION 3: CARBON NEUTRAL ACHIEVING OPERATIONS */}
      <motion.section variants={itemVariants} className="px-6 md:px-16 lg:px-24 py-6" id="achieving-operations">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Content side (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[#fb923c] font-bold text-sm uppercase tracking-[0.2em] block">
                Verifiable Restoration
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-white leading-tight uppercase">
                Carbon Neutral <span className="text-brand-orange">Achieving Operations</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300 font-hanken leading-relaxed">
                Reducing emissions alone is not enough. Achieving verifiable net-zero requires restoring what has been lost and fundamentally redesigning how communities interact with the natural world — while enhancing social equity and resilience for all.
              </p>
            </div>

            <div className="space-y-8">
              {/* New Forest Initiative details */}
              <div className="p-6 rounded-2xl bg-carbon-surface/40 border border-[#26352c] shadow-md space-y-4 h-full">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-eco-green/15 text-eco-green rounded-lg">
                    <TreeDeciduous className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-eco-green font-manrope">New Forest Initiative</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-hanken">
                  CNC's New Forest Initiative is a long-term reforestation program restoring degraded lands across Sri Lanka through community-driven tree planting. We work with local communities, government bodies, and corporate partners to source native species, manage planted forests, and track every tree through transparent reporting — delivering verifiable carbon offset data and measurable environmental impact. Our field officers use custom trackers to report the height, health, and location coordinates of our planted saplings directly to client dashboards.
                </p>
              </div>
            </div>
          </div>

          {/* Stacked Images Side (5 cols on desktop) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-[400px] md:h-[500px]">
            {/* Image 1: Tree Planting */}
            <div className="h-full w-full overflow-hidden rounded-tl-4xl rounded-bl-xl border border-carbon-border/50 shadow-xl relative group">
              <img
                alt="Native tree planting restoration"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYOecqZrMi_0TKG3I7bXESeW6rtib2lVW4Le5E1EekMz5Dc6pksC8pCTo7hFaEFHnRYrh9KkQP6X5r1K9fkGVa_5sVUN1GDW68Q8nCG1Hqsii8-4pP7EkfYVg1FIfn4JjJEZjPNxOXumtWVqMNpQDrevP5IcwHspEiSX6775iNulfDifVQm49LWDnWPXu5Qk5aCqcdErKsyVCbiM52dMJ3J9-k4ujHXlNwzyrCGfdyO1UVYSKpaq-HXRNzQQVq2PIiTT4gTc1e6Xj-5SQ"
              />
            </div>
            
            {/* Image 2: Community Nursery Garden, offset vertically */}
            <div className="h-full w-full overflow-hidden rounded-br-4xl rounded-tr-xl border border-carbon-border/50 shadow-xl relative mt-12 group">
              <img
                alt="Community vegetation nursery garden"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSQWdEKC1_1By1f9xvhtoi1vUHAyNThiTCl8x0oCoFfbsOfVlp1nr7a-xBN6-O4Fv8IwIzWyBmSOdLFHZwiNfbZxLjtP5MLOy5hB6SKhBKz1YD6QTrUI6k_EPvbqKCEPIea40zBG1wxhcBpknoYbL8ZG2-51Chks7nWTHl7DTxw0_jJDMKoaekmFGqpT7GBHotHnjmT6QHk-h8bz3qfGkMNaRVUDpLiLyGO-PlT2bTByTQvo4XpRu-vz_oHqGdp_PcutDhJF9_r8qzUNw"
              />
            </div>
          </div>

        </div>
      </motion.section>

    </motion.div>
  );
}
