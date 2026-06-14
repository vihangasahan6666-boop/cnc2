import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, X, MapPin, Calendar, Copy, ChevronLeft, ChevronRight, CheckCircle2, Info, Sliders, Eye
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'REFORESTATION' | 'YOUTH CLUBS' | 'CARBON AUDITS' | 'COMMUNITY';
  description: string;
  image: string;
  images?: string[];
  location: string;
  date: string;
  saplingsCount?: number;
  survivalRate?: string;
  auditHash?: string;
  teamSize?: number;
  fullStory?: string;
}

const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Afforestation Drive - Borella Area',
    category: 'REFORESTATION',
    description: 'Planting native trees to establish resilient micro-forest zones.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7GMZg_RIBuuxd29NlraKlNYGVW17ryhDuo9giJf55n_9g9xW7DC0RvkeaB1qM83qutjEKAVTqcCWI2L7T9LBn0Rm9YhQBoIpk9tkCKIJUm491FHgGKD67pERvjGnq0VOdXAzeIQLaZ6MoO1eSiFtD4ijHCB8EBVhVuPYrCITAthKoujXDtbk0-ayjq0zq2p4rlM3qp0lj8mCn_6EVvYsyjfFsLEh5TnMM3mwlFvvu3F0rygAS5ROcENY9YfWo4WMsylNkeFqz3z8z2NI',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7GMZg_RIBuuxd29NlraKlNYGVW17ryhDuo9giJf55n_9g9xW7DC0RvkeaB1qM83qutjEKAVTqcCWI2L7T9LBn0Rm9YhQBoIpk9tkCKIJUm491FHgGKD67pERvjGnq0VOdXAzeIQLaZ6MoO1eSiFtD4ijHCB8EBVhVuPYrCITAthKoujXDtbk0-ayjq0zq2p4rlM3qp0lj8mCn_6EVvYsyjfFsLEh5TnMM3mwlFvvu3F0rygAS5ROcENY9YfWo4WMsylNkeFqz3z8z2NI',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVtqJcEip5f_coNOPjm4lAO6H0wVYPQt_8JA6OlZqBZTHfW_G2YnYKzGMTUWhJ25JqpLZdlNX5AqARORuiVvxEHYxpI8QPjIdSS0-6ZUd8tD97oCwAzZaD6ASnZntWmcaMNVAFYH_60eeHd_kwcMnSv8HX-0GoiT_o0ZRdHTLiX424kVLZ52k0sXv-EQNsQxMgtYDtfDXP1dGThVHlu2VqJjsSHKANWmcS4iYltnmkXdrU-EkcjYxJ2tusY2GRhhlvRTThCBxo0RHSYgc',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcVcmefEQ21h3VTNaETGkfyOqX9Fn0nVzcIZInsudgj3tU0Zvvbm666r-07jbjYODlegHdHqWtV3986CZpvWKaRF1eLgSvDn416yAdln7cGui_RlyV0OMd4ZQJ6ttebG1ixSCCzoe4_Gm9b7q-Z5x0QragrOAo3UUCUtZhK0n6BETsqYnEBLCau8YAbfSTyXQc0ARJymJKavBwk4G54P7V9kA3cw7Hp9OejSmi_72PyjMlU5HCzRgkjGxlHI_vtasABpqryXLGoSXA'
    ],
    location: 'Borella, Colombo 08, Sri Lanka',
    date: 'March 14, 2026',
    saplingsCount: 250,
    survivalRate: '98.4%',
    auditHash: 'CNC-REF-BOR-001',
    teamSize: 18,
    fullStory: 'An intensive urban afforestation program in the heart of Colombo 08. Our practitioners collaborated with student volunteers to plant 250 native saplings, establishing a resilient canopy designed to lower the local microclimatic thermal footprint.'
  },
  {
    id: '2',
    title: 'CNC Networking Club Launch',
    category: 'YOUTH CLUBS',
    description: 'Mobilizing the youth for action and climate education across local zones.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-unkLzxjIcJBb0yqG5EqdbSQlDJ8xxqdZ8r5V5N61D0OYJA-50hfTAhFPj1fOax-V7qKWWJ947Acz7xq1wRiqGhc2fW-e2JaM2D8Mf2qNWkX2D4DViwvu1Oa9mg25IHljQX-3D1-T4mnvPnhYX2wzOJWWwvKPz4WSgBifzpo5u6gVphwwNBpVHcZZjzZ2S1QpHCpVxYbFEWLmBxkzVz7xEoBdNL2-MSCRNjAMnK0WGnCuV1k-K-oaDqhriy8K1-0R7pXFGLMMZWF7aK8',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-unkLzxjIcJBb0yqG5EqdbSQlDJ8xxqdZ8r5V5N61D0OYJA-50hfTAhFPj1fOax-V7qKWWJ947Acz7xq1wRiqGhc2fW-e2JaM2D8Mf2qNWkX2D4DViwvu1Oa9mg25IHljQX-3D1-T4mnvPnhYX2wzOJWWwvKPz4WSgBifzpo5u6gVphwwNBpVHcZZjzZ2S1QpHCpVxYbFEWLmBxkzVz7xEoBdNL2-MSCRNjAMnK0WGnCuV1k-K-oaDqhriy8K1-0R7pXFGLMMZWF7aK8',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7GMZg_RIBuuxd29NlraKlNYGVW17ryhDuo9giJf55n_9g9xW7DC0RvkeaB1qM83qutjEKAVTqcCWI2L7T9LBn0Rm9YhQBoIpk9tkCKIJUm491FHgGKD67pERvjGnq0VOdXAzeIQLaZ6MoO1eSiFtD4ijHCB8EBVhVuPYrCITAthKoujXDtbk0-ayjq0zq2p4rlM3qp0lj8mCn_6EVvYsyjfFsLEh5TnMM3mwlFvvu3F0rygAS5ROcENY9YfWo4WMsylNkeFqz3z8z2NI',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgEYvZ7hQxFCZ3CeyIAeWuWWliIlSmIIoATQzgzGUhfF1AoKkaBiXsl1Pv7uPhP7ltOdcO7khU1XSp3WDfi3btUj8JEKMFOWRl2kZizJDyQia0Zk8X7bxBgpieDyQkS5BAtbfwZ00MkJjqOFoO4zu139KtQeI5Uujwlp5TzWT_9JXXPLCrQ7idwCb-XrsAwJxrTMGuCabBUrT-0Ar00UXBsyhUh52NMrXrwKBbelRgrLI8vziEZdO21HTaAf841ZKWpA_foaVfeju5'
    ],
    location: 'Peradeniya University Campus, Kandy',
    date: 'April 22, 2026',
    saplingsCount: 120,
    survivalRate: '96.2%',
    auditHash: 'CNC-YTH-PER-409',
    teamSize: 45,
    fullStory: 'The official regional gathering and activation for the Peradeniya Chapter. Forty-five young climate representatives met to coordinate local native nurseries and organize student-led home energy conservation workshops across Kandy.'
  },
  {
    id: '3',
    title: 'Household Carbon Audit Workshop',
    category: 'CARBON AUDITS',
    description: 'Hands-on guidance for family members in tracking and lowering household emissions.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgEYvZ7hQxFCZ3CeyIAeWuWWliIlSmIIoATQzgzGUhfF1AoKkaBiXsl1Pv7uPhP7ltOdcO7khU1XSp3WDfi3btUj8JEKMFOWRl2kZizJDyQia0Zk8X7bxBgpieDyQkS5BAtbfwZ00MkJjqOFoO4zu139KtQeI5Uujwlp5TzWT_9JXXPLCrQ7idwCb-XrsAwJxrTMGuCabBUrT-0Ar00UXBsyhUh52NMrXrwKBbelRgrLI8vziEZdO21HTaAf841ZKWpA_foaVfeju5',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgEYvZ7hQxFCZ3CeyIAeWuWWliIlSmIIoATQzgzGUhfF1AoKkaBiXsl1Pv7uPhP7ltOdcO7khU1XSp3WDfi3btUj8JEKMFOWRl2kZizJDyQia0Zk8X7bxBgpieDyQkS5BAtbfwZ00MkJjqOFoO4zu139KtQeI5Uujwlp5TzWT_9JXXPLCrQ7idwCb-XrsAwJxrTMGuCabBUrT-0Ar00UXBsyhUh52NMrXrwKBbelRgrLI8vziEZdO21HTaAf841ZKWpA_foaVfeju5',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVtqJcEip5f_coNOPjm4lAO6H0wVYPQt_8JA6OlZqBZTHfW_G2YnYKzGMTUWhJ25JqpLZdlNX5AqARORuiVvxEHYxpI8QPjIdSS0-6ZUd8tD97oCwAzZaD6ASnZntWmcaMNVAFYH_60eeHd_kwcMnSv8HX-0GoiT_o0ZRdHTLiX424kVLZ52k0sXv-EQNsQxMgtYDtfDXP1dGThVHlu2VqJjsSHKANWmcS4iYltnmkXdrU-EkcjYxJ2tusY2GRhhlvRTThCBxo0RHSYgc',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcVcmefEQ21h3VTNaETGkfyOqX9Fn0nVzcIZInsudgj3tU0Zvvbm666r-07jbjYODlegHdHqWtV3986CZpvWKaRF1eLgSvDn416yAdln7cGui_RlyV0OMd4ZQJ6ttebG1ixSCCzoe4_Gm9b7q-Z5x0QragrOAo3UUCUtZhK0n6BETsqYnEBLCau8YAbfSTyXQc0ARJymJKavBwk4G54P7V9kA3cw7Hp9OejSmi_72PyjMlU5HCzRgkjGxlHI_vtasABpqryXLGoSXA'
    ],
    location: 'Serpentine Road Community Center, Borella',
    date: 'May 05, 2026',
    saplingsCount: undefined,
    survivalRate: undefined,
    auditHash: 'CNC-AUD-HSE-902',
    teamSize: 12,
    fullStory: 'Empowering families to audit their own lifestyle parameters, including power consumption and packaging waste. Our practitioners provided localized metric cards, letting household blocks directly coordinate community carbon savings together.'
  },
  {
    id: '4',
    title: 'Colombo Botanical Care Area',
    category: 'REFORESTATION',
    description: 'Nurturing delicate saplings under sheltered structures before wilderness plant-out.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVtqJcEip5f_coNOPjm4lAO6H0wVYPQt_8JA6OlZqBZTHfW_G2YnYKzGMTUWhJ25JqpLZdlNX5AqARORuiVvxEHYxpI8QPjIdSS0-6ZUd8tD97oCwAzZaD6ASnZntWmcaMNVAFYH_60eeHd_kwcMnSv8HX-0GoiT_o0ZRdHTLiX424kVLZ52k0sXv-EQNsQxMgtYDtfDXP1dGThVHlu2VqJjsSHKANWmcS4iYltnmkXdrU-EkcjYxJ2tusY2GRhhlvRTThCBxo0RHSYgc',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVtqJcEip5f_coNOPjm4lAO6H0wVYPQt_8JA6OlZqBZTHfW_G2YnYKzGMTUWhJ25JqpLZdlNX5AqARORuiVvxEHYxpI8QPjIdSS0-6ZUd8tD97oCwAzZaD6ASnZntWmcaMNVAFYH_60eeHd_kwcMnSv8HX-0GoiT_o0ZRdHTLiX424kVLZ52k0sXv-EQNsQxMgtYDtfDXP1dGThVHlu2VqJjsSHKANWmcS4iYltnmkXdrU-EkcjYxJ2tusY2GRhhlvRTThCBxo0RHSYgc',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcVcmefEQ21h3VTNaETGkfyOqX9Fn0nVzcIZInsudgj3tU0Zvvbm666r-07jbjYODlegHdHqWtV3986CZpvWKaRF1eLgSvDn416yAdln7cGui_RlyV0OMd4ZQJ6ttebG1ixSCCzoe4_Gm9b7q-Z5x0QragrOAo3UUCUtZhK0n6BETsqYnEBLCau8YAbfSTyXQc0ARJymJKavBwk4G54P7V9kA3cw7Hp9OejSmi_72PyjMlU5HCzRgkjGxlHI_vtasABpqryXLGoSXA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpHYCkNgwrxfGKPF8pnlJXngEs8cdSyLrgkemlRhNv9u3a1eQgfRlSJqmw5CTvRrjz15zcLL4OTSH38BBsFnkKfgjTgZ1CUQEXS_-ADoLN2XVm7jGrnwGKOkCT9ubP7bdOZAqDRdHakC4iAni4Do3psJrmkxjon5rk63HWqulRbJhV5uuiF49rAxUeiSt_UjTk0p5rAdDGLi7aOcAYV3Qh7zOhdywbJapiiRWh9ew4YsPP4-6EyvnOk0L_mW7whydd7iiCoqk4UT5x'
    ],
    location: 'Colombo Botanical Gardens, Colombo 07',
    date: 'May 18, 2026',
    saplingsCount: 1500,
    survivalRate: '99.1%',
    auditHash: 'CNC-REF-CBN-012',
    teamSize: 22,
    fullStory: 'Our primary vegetative nursery base. Here, native endemic species are nurtured through highly calibrated soil and watering treatments. This guarantees an outstanding survival rate before saplings are transferred to dry-zone reforestations.'
  },
  {
    id: '5',
    title: 'Community Sapling Nurseries',
    category: 'COMMUNITY',
    description: 'Empowering rural families with nursery tools and income possibilities via sapling care.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcVcmefEQ21h3VTNaETGkfyOqX9Fn0nVzcIZInsudgj3tU0Zvvbm666r-07jbjYODlegHdHqWtV3986CZpvWKaRF1eLgSvDn416yAdln7cGui_RlyV0OMd4ZQJ6ttebG1ixSCCzoe4_Gm9b7q-Z5x0QragrOAo3UUCUtZhK0n6BETsqYnEBLCau8YAbfSTyXQc0ARJymJKavBwk4G54P7V9kA3cw7Hp9OejSmi_72PyjMlU5HCzRgkjGxlHI_vtasABpqryXLGoSXA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcVcmefEQ21h3VTNaETGkfyOqX9Fn0nVzcIZInsudgj3tU0Zvvbm666r-07jbjYODlegHdHqWtV3986CZpvWKaRF1eLgSvDn416yAdln7cGui_RlyV0OMd4ZQJ6ttebG1ixSCCzoe4_Gm9b7q-Z5x0QragrOAo3UUCUtZhK0n6BETsqYnEBLCau8YAbfSTyXQc0ARJymJKavBwk4G54P7V9kA3cw7Hp9OejSmi_72PyjMlU5HCzRgkjGxlHI_vtasABpqryXLGoSXA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpHYCkNgwrxfGKPF8pnlJXngEs8cdSyLrgkemlRhNv9u3a1eQgfRlSJqmw5CTvRrjz15zcLL4OTSH38BBsFnkKfgjTgZ1CUQEXS_-ADoLN2XVm7jGrnwGKOkCT9ubP7bdOZAqDRdHakC4iAni4Do3psJrmkxjon5rk63HWqulRbJhV5uuiF49rAxUeiSt_UjTk0p5rAdDGLi7aOcAYV3Qh7zOhdywbJapiiRWh9ew4YsPP4-6EyvnOk0L_mW7whydd7iiCoqk4UT5x',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-unkLzxjIcJBb0yqG5EqdbSQlDJ8xxqdZ8r5V5N61D0OYJA-50hfTAhFPj1fOax-V7qKWWJ947Acz7xq1wRiqGhc2fW-e2JaM2D8Mf2qNWkX2D4DViwvu1Oa9mg25IHljQX-3D1-T4mnvPnhYX2wzOJWWwvKPz4WSgBifzpo5u6gVphwwNBpVHcZZjzZ2S1QpHCpVxYbFEWLmBxkzVz7xEoBdNL2-MSCRNjAMnK0WGnCuV1k-K-oaDqhriy8K1-0R7pXFGLMMZWF7aK8'
    ],
    location: 'Gampaha District, Western Province, Sri Lanka',
    date: 'June 01, 2026',
    saplingsCount: 1200,
    survivalRate: '97.8%',
    auditHash: 'CNC-COM-GAM-801',
    teamSize: 34,
    fullStory: 'An empowerment commitment designed to supply decentralized backyard nurseries to rural families. By providing comprehensive planting kits, premium compost structures, and native seeds, families generate high-health saplings and receive secondary carbon-credit share incentives.'
  },
  {
    id: '6',
    title: 'Commercial Greenhouse Gas Audit',
    category: 'CARBON AUDITS',
    description: 'Guiding enterprise teams through detailed carbon mapping and roadmap planning.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpHYCkNgwrxfGKPF8pnlJXngEs8cdSyLrgkemlRhNv9u3a1eQgfRlSJqmw5CTvRrjz15zcLL4OTSH38BBsFnkKfgjTgZ1CUQEXS_-ADoLN2XVm7jGrnwGKOkCT9ubP7bdOZAqDRdHakC4iAni4Do3psJrmkxjon5rk63HWqulRbJhV5uuiF49rAxUeiSt_UjTk0p5rAdDGLi7aOcAYV3Qh7zOhdywbJapiiRWh9ew4YsPP4-6EyvnOk0L_mW7whydd7iiCoqk4UT5x',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpHYCkNgwrxfGKPF8pnlJXngEs8cdSyLrgkemlRhNv9u3a1eQgfRlSJqmw5CTvRrjz15zcLL4OTSH38BBsFnkKfgjTgZ1CUQEXS_-ADoLN2XVm7jGrnwGKOkCT9ubP7bdOZAqDRdHakC4iAni4Do3psJrmkxjon5rk63HWqulRbJhV5uuiF49rAxUeiSt_UjTk0p5rAdDGLi7aOcAYV3Qh7zOhdywbJapiiRWh9ew4YsPP4-6EyvnOk0L_mW7whydd7iiCoqk4UT5x',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgEYvZ7hQxFCZ3CeyIAeWuWWliIlSmIIoATQzgzGUhfF1AoKkaBiXsl1Pv7uPhP7ltOdcO7khU1XSp3WDfi3btUj8JEKMFOWRl2kZizJDyQia0Zk8X7bxBgpieDyQkS5BAtbfwZ00MkJjqOFoO4zu139KtQeI5Uujwlp5TzWT_9JXXPLCrQ7idwCb-XrsAwJxrTMGuCabBUrT-0Ar00UXBsyhUh52NMrXrwKBbelRgrLI8vziEZdO21HTaAf841ZKWpA_foaVfeju5',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7GMZg_RIBuuxd29NlraKlNYGVW17ryhDuo9giJf55n_9g9xW7DC0RvkeaB1qM83qutjEKAVTqcCWI2L7T9LBn0Rm9YhQBoIpk9tkCKIJUm491FHgGKD67pERvjGnq0VOdXAzeIQLaZ6MoO1eSiFtD4ijHCB8EBVhVuPYrCITAthKoujXDtbk0-ayjq0zq2p4rlM3qp0lj8mCn_6EVvYsyjfFsLEh5TnMM3mwlFvvu3F0rygAS5ROcENY9YfWo4WMsylNkeFqz3z8z2NI'
    ],
    location: 'Eco-tech Solutions HQ, Colombo 03',
    date: 'June 10, 2026',
    saplingsCount: undefined,
    survivalRate: undefined,
    auditHash: 'CNC-AUD-COR-732',
    teamSize: 8,
    fullStory: 'Comprehensive operational auditing for industrial stakeholders. Our consulting practitioners mapped full Scope 1, 2, and 3 emissions paths to construct an authentic, standard-compliant corporate mitigation roadmap.'
  }
];

const categories = ['ALL', 'REFORESTATION', 'YOUTH CLUBS', 'CARBON AUDITS', 'COMMUNITY'] as const;

interface CardProps {
  item: GalleryItem;
  onClick: () => void;
}

function GalleryCard({ item, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      className="relative flex flex-col h-full bg-[#111a14]/65 hover:bg-[#15231b]/80 border border-[#213529] hover:border-[#52b788]/35 rounded-[2.5rem] p-4.5 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer select-none group"
      id={`gallery-card-${item.id}`}
    >
      {/* Frame for image */}
      <div className="relative overflow-hidden rounded-[1.75rem] aspect-[4/3] bg-nature-black/40 border border-[#1f2e24] shadow-inner select-none group/image">
        <motion.img
          src={item.image}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          variants={{
            initial: { scale: 1, filter: "blur(0px)" },
            hover: { scale: 1.05, filter: "blur(2px)" },
            tap: { scale: 1.02, filter: "blur(1px)" }
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Animated backdrop gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[#0e1a14]/95 via-[#0e1a14]/30 to-transparent z-10"
          variants={{
            initial: { opacity: 0.8 },
            hover: { opacity: 0.95 },
            tap: { opacity: 0.9 }
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Category Pill Tag floating top-left */}
        <span className="absolute top-4 left-4 inline-block bg-[#0f1511]/85 backdrop-blur-md text-[#52b788] text-[8.5px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/5 z-20">
          {item.category}
        </span>

        {/* View photo overlay centered */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          variants={{
            initial: { opacity: 0, scale: 0.8, y: 15 },
            hover: { opacity: 1, scale: 1, y: -10 },
            tap: { opacity: 1, scale: 0.9, y: -5 }
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="w-12 h-12 bg-[#52b788] text-[#0f1511] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(82,183,136,0.5)]">
            <Eye className="w-5 h-5 stroke-[2.5]" />
          </div>
        </motion.div>

        {/* Hover/Touch description overlay on the image */}
        <motion.div 
          className="absolute inset-x-0 bottom-0 p-5 pt-12 bg-gradient-to-t from-black/95 via-black/85 to-transparent z-20 flex flex-col justify-end"
          variants={{
            initial: { opacity: 0, y: 30 },
            hover: { opacity: 1, y: 0 },
            tap: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
           <p className="text-[#a4b4ab] text-xs leading-relaxed font-hanken line-clamp-3">
             {item.description}
           </p>
        </motion.div>
      </div>

      {/* Narrative Card contents */}
      <div className="flex-grow flex flex-col justify-between mt-5 space-y-4">
        <div className="space-y-2.5">
          <h4 className="text-white text-base md:text-lg font-bold font-manrope tracking-tight group-hover:text-[#52b788] transition-colors duration-300 uppercase leading-snug">
            {item.title}
          </h4>
        </div>

        {/* Audit footer stamps */}
        <div className="flex items-center justify-between pt-4 border-t border-[#213529]/40 text-[9.5px] font-mono text-gray-500 font-semibold uppercase tracking-wider font-bold">
          <div className="flex items-center space-x-1 text-[#52b788]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#52b788] animate-pulse" />
            <span>CNC VERIFIED</span>
          </div>
          <div className="flex items-center space-x-1 group-hover:text-white transition-colors">
            <span>PHOTO LOG</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [panCoords, setPanCoords] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const isDraggingRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // Filter and search logic
  const filteredData = galleryData.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeItem = lightboxIndex !== null ? filteredData[lightboxIndex] : null;
  const activeItemImages = activeItem?.images || (activeItem ? [activeItem.image] : []);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Cleanup body scroll when Lightbox is open and reset photo index
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.classList.add('overflow-hidden');
      setActivePhotoIndex(0); // Reset to first photo whenever a new project is opened
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [lightboxIndex]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    setZoomLevel(1);
    setPanCoords({ x: 0, y: 0 });
    
    // If multiple photos, navigate within project first
    if (activeItemImages.length > 1) {
      if (activePhotoIndex > 0) {
        setActivePhotoIndex(prev => prev - 1);
        return;
      }
    }
    
    // Otherwise move to previous project
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredData.length - 1));
    setActivePhotoIndex(0); // Reset for new project (though effect also does this)
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    setZoomLevel(1);
    setPanCoords({ x: 0, y: 0 });
    
    // If multiple photos, navigate within project first
    if (activeItemImages.length > 1) {
      if (activePhotoIndex < activeItemImages.length - 1) {
        setActivePhotoIndex(prev => prev + 1);
        return;
      }
    }
    
    // Otherwise move to next project
    setLightboxIndex((prev) => (prev !== null && prev < filteredData.length - 1 ? prev + 1 : 0));
    setActivePhotoIndex(0);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setZoomLevel(1);
        setPanCoords({ x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredData]);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  const handlePanStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return;
    setIsPanning(true);
    isDraggingRef.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    panStartRef.current = { x: clientX - panCoords.x, y: clientY - panCoords.y };
  };

  const handlePanMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || zoomLevel <= 1) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const maxPanX = (zoomLevel - 1) * 200;
    const maxPanY = (zoomLevel - 1) * 200;
    
    let newX = clientX - panStartRef.current.x;
    let newY = clientY - panStartRef.current.y;
    
    newX = Math.max(-maxPanX, Math.min(maxPanX, newX));
    newY = Math.max(-maxPanY, Math.min(maxPanY, newY));
    
    setPanCoords({ x: newX, y: newY });
  };

  const handlePanEnd = () => {
    isDraggingRef.current = false;
    setIsPanning(false);
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 pt-6 space-y-12 scroll-mt-28">
      
      {/* Title Header with Elegant Animation */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight font-manrope text-white uppercase"
        >
          CNC PROJECT <span className="text-[#52b788]">GALLERY</span>
        </motion.h2>
        <p className="text-[#a4b4ab] text-sm md:text-base leading-relaxed font-hanken">
          Glimpses of nature conservation, Carbon Neutrality audits, and youth networking programs conducted across Sri Lanka.
        </p>
      </div>

      {/* Filtering Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-[#111a14]/60 border border-[#213529] rounded-[2rem] p-[1.125rem] md:p-5 backdrop-blur-md">
        
        {/* Category Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory touch-pan-x">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <motion.button
                key={category}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  setSelectedCategory(category);
                  setZoomLevel(1);
                }}
                className={`flex-shrink-0 cursor-pointer px-5 py-3 rounded-full text-xs font-bold font-manrope uppercase tracking-wider transition-all duration-300 snap-start select-none min-h-[44px] flex items-center justify-center ${
                  isActive
                    ? 'bg-[#52b788] text-[#0f1511] shadow-lg shadow-[#52b788]/20 font-extrabold'
                    : 'bg-transparent text-gray-400 hover:text-white border border-[#213529] hover:border-gray-700'
                }`}
              >
                {category}
              </motion.button>
            );
          })}
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-72 flex-shrink-0">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center pointer-events-none">
            <Search className="w-4.5 h-4.5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search projects or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0f0c]/60 text-white rounded-full pl-11 pr-11 py-3 text-base md:text-sm border border-[#213529] focus:outline-none focus:border-[#52b788]/60 transition-colors placeholder-gray-500 font-hanken min-h-[44px]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid containing Gallery cards */}
      {filteredData.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pb-16"
        >
          <AnimatePresence>
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GalleryCard 
                item={item} 
                onClick={() => setLightboxIndex(index)} 
              />
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-carbon-surface/25 border border-carbon-border/50 rounded-4xl space-y-3"
        >
          <Info className="h-10 w-10 text-gray-600 mx-auto" />
          <p className="text-gray-400 font-medium font-manrope">No activities match your query.</p>
          <button 
            onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
            className="text-xs bg-[#52b788]/10 hover:bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/30 hover:border-[#52b788]/40 px-4 py-2 rounded-full cursor-pointer transition-all"
          >
            Reset active filters
          </button>
        </motion.div>
      )}

      {/* Interactive Full-Screen Lightbox Portal */}
      <AnimatePresence>
        {lightboxIndex !== null && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#070c08]/98 backdrop-blur-md overflow-y-auto text-white"
            onClick={() => {
              setLightboxIndex(null);
              setZoomLevel(1);
              setPanCoords({ x: 0, y: 0 });
            }}
          >
            {/* Top gradient strip */}
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-emerald-500 via-[#52b788] to-emerald-700 z-[102]" />

            <div 
              className="min-h-screen w-full flex flex-col lg:flex-row items-stretch gap-0 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dismiss X Button - Floating (Massive z-index to stay visible) */}
              <button 
                onClick={() => {
                  setLightboxIndex(null);
                  setZoomLevel(1);
                  setPanCoords({ x: 0, y: 0 });
                }}
                className="fixed top-4 right-4 md:top-6 md:right-8 z-[150] bg-[#0c140f] border-2 border-[#52b788]/40 hover:border-[#52b788] text-white p-2.5 md:p-3 rounded-full cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.8)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="Close details view"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Zoom Switch */}
              <div className="absolute top-4 left-4 z-[110] flex items-center gap-2">
                <button 
                  onClick={() => setZoomLevel(prev => prev === 1 ? 2.5 : 1)}
                  className="bg-[#0c140f]/50 backdrop-blur-md hover:bg-[#1a2c20] border border-[#213529] text-gray-300 hover:text-white px-4 py-2.5 rounded-full cursor-pointer shadow-lg transition-all text-[10px] md:text-sm font-bold font-mono uppercase tracking-[0.1em]"
                >
                  {zoomLevel === 1 ? 'Zoom 2x' : 'Reset Zoom'}
                </button>
              </div>

              {/* Photo Viewer Panel */}
              <div className="w-full lg:w-3/5 xl:w-[65%] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative h-[45vh] sm:h-[50vh] lg:h-screen lg:sticky lg:top-0 bg-[#000]/60 border-b lg:border-b-0 lg:border-r border-[#213529]/40">
                
                {/* Left Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[105] bg-[#0c140f]/90 hover:bg-[#1a2c20] border border-[#213529] text-white p-3 md:p-4 rounded-full cursor-pointer transition-all shadow-xl hover:scale-110 flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[105] bg-[#0c140f]/90 hover:bg-[#1a2c20] border border-[#213529] text-white p-3 md:p-4 rounded-full cursor-pointer transition-all shadow-xl hover:scale-110 flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
                </button>

                {/* Frame wrapper for dragging inside image */}
                <div 
                  className={`relative w-full h-full flex items-center justify-center rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] ${
                    zoomLevel > 1 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : ''
                  }`}
                  onMouseDown={handlePanStart}
                  onMouseMove={handlePanMove}
                  onMouseUp={handlePanEnd}
                  onMouseLeave={handlePanEnd}
                  onTouchStart={handlePanStart}
                  onTouchMove={handlePanMove}
                  onTouchEnd={handlePanEnd}
                >
                  <motion.img
                    src={activeItemImages[activePhotoIndex]}
                    alt={activeItem.title}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full h-auto w-auto object-contain select-none pointer-events-none rounded-xl md:rounded-2xl"
                    animate={{
                      scale: zoomLevel,
                      x: panCoords.x,
                      y: panCoords.y
                    }}
                    transition={isPanning ? { type: 'tween', duration: 0.1 } : { type: 'spring', stiffness: 120, damping: 18 }}
                  />
                </div>

                {/* Thumbnails strip for multiple photos */}
                {activeItemImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto mt-3 md:mt-5 pb-1 max-w-full px-4 scrollbar-none snap-x z-20">
                    {activeItemImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => { setActivePhotoIndex(i); setZoomLevel(1); setPanCoords({x:0, y:0}); }}
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl shrink-0 overflow-hidden border-2 transition-all cursor-pointer snap-start ${
                          activePhotoIndex === i ? 'border-[#52b788] scale-105 opacity-100 shadow-md shadow-[#52b788]/20' : 'border-white/10 opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${i+1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Instruction label overlay */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none text-center hidden md:block">
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-500 font-semibold bg-black/40 px-4 py-2 rounded-full border border-white/5">
                    Drag when Zoomed to pan around
                  </span>
                </div>
              </div>

              {/* Specs & Information Sheets Side Sheet */}
              <div className="w-full lg:w-2/5 xl:w-[35%] bg-gradient-to-b from-[#0c130f] via-[#090e0b] to-[#040605] p-6 sm:p-8 md:p-12 flex flex-col justify-between relative z-10 lg:h-screen lg:overflow-y-auto">
                <div className="space-y-8">
                  
                  {/* Category designations bar */}
                  <div className="flex items-center justify-between border-b border-[#213529]/50 pb-5">
                    <span className="inline-block bg-[#52b788]/10 text-[#52b788] text-[10px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border border-[#52b788]/20">
                      {activeItem.category}
                    </span>
                    <span className="text-gray-500 text-xs font-mono font-bold tracking-wider uppercase">
                      REGISTRY ID: {activeItem.id}
                    </span>
                  </div>

                  {/* Title and descriptions references */}
                  <div className="space-y-4">
                    <h3 className="text-white text-2xl md:text-3xl font-extrabold font-manrope tracking-tight leading-tight uppercase">
                      {activeItem.title}
                    </h3>
                    <p className="text-[#a4b4ab] text-sm leading-relaxed font-hanken">
                      {activeItem.description}
                    </p>
                  </div>

                  {/* Precise Geolocated chrono records cards */}
                  <div className="space-y-4 bg-[#111a14]/60 border border-[#213529]/60 p-5 rounded-3xl">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#1b2b20] flex items-center justify-center text-[#52b788] flex-shrink-0">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-[#52b788] font-bold">GEOLOCATION REFERENCE</p>
                        <p className="text-white text-xs font-semibold leading-relaxed truncate max-w-[240px]">{activeItem.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 mt-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#1b2b20] flex items-center justify-center text-[#52b788] flex-shrink-0">
                        <Calendar className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-[#52b788] font-bold">DATE OF INITIATIVE</p>
                        <p className="text-white text-xs font-semibold leading-relaxed">{activeItem.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Full Story Block */}
                  {activeItem.fullStory && (
                    <div className="space-y-3 pt-2">
                      <h5 className="text-white text-xs font-extrabold uppercase tracking-widest font-manrope flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700]" />
                        <span>Initiative Narrative</span>
                      </h5>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-hanken">
                        {activeItem.fullStory}
                      </p>
                    </div>
                  )}

                  {/* Blockchain hashes integrity validation cards */}
                  {activeItem.auditHash && (
                    <div className="mt-8 pt-6 border-t border-[#213529]/40 space-y-4">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 font-bold block">
                        Decentralized Registry Integrity Audit
                      </span>

                      <div className="bg-[#0b100d] border border-[#213529] rounded-2xl p-4.5 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                            COMPLIANCE CRYPTO HASH
                          </span>
                          <span className="text-xs font-mono text-[#52b788] font-bold truncate block max-w-[220px]">
                            {activeItem.auditHash}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handleCopyHash(activeItem.auditHash!)}
                          className="bg-[#1b2b20] hover:bg-[#52b788] text-[#52b788] hover:text-[#0f1511] border border-[#213529] p-3 rounded-xl cursor-pointer transition-all flex items-center justify-center flex-shrink-0 hover:scale-105 active:scale-95"
                        >
                          {copiedStatus ? (
                            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <Copy className="w-4 h-4 stroke-[2]" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Human-friendly Return/Close Button for easy dismiss */}
                  <div className="pt-6">
                    <button 
                      onClick={() => {
                        setLightboxIndex(null);
                        setZoomLevel(1);
                        setPanCoords({ x: 0, y: 0 });
                      }}
                      className="w-full bg-[#1b2b20] hover:bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/30 hover:border-[#52b788]/50 py-3.5 rounded-2xl cursor-pointer text-xs font-bold font-manrope uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Back to Gallery</span>
                    </button>
                  </div>

                </div>

                {/* Verified brand certification badge */}
                <div className="mt-8 pt-8 border-t border-[#213529]/40 flex items-center justify-between text-xs font-mono text-gray-500">
                  <div className="flex items-center gap-1.5 text-[#52b788] font-bold tracking-widest">
                    <CheckCircle2 className="w-4 h-4 text-[#52b788] stroke-[2]" />
                    <span>CNC REGISTERED</span>
                  </div>
                  <span>ITEM {lightboxIndex !== null ? lightboxIndex + 1 : 1} OF {filteredData.length}</span>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
