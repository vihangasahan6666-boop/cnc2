import { ArrowRight } from 'lucide-react';
import { ViewType } from '../types';

interface HeroProps {
  setActiveTab: (tab: ViewType) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const handleConsultationClick = () => {
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

        {/* Golden Badge Cutout inside the hero bottom right */}
        <div 
          className="absolute bottom-0 right-0 p-4 rounded-tl-4xl rounded-br-[2rem] hidden sm:block" 
          style={{ backgroundColor: 'rgba(15, 21, 17, 1)' }}
        >
          <button
            onClick={handleConsultationClick}
            className="py-5 px-16 bg-[#ffd700] hover:bg-[#e6c200] active:scale-98 transition-all rounded-full flex items-center justify-center shadow-lg font-bold text-black text-sm uppercase tracking-wider group cursor-pointer"
          >
            <span className="px-4">Schedule a Free Consultation</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Mobile Consultation CTA Banner below Hero on small screens */}
      <div className="block sm:hidden mt-4">
        <button
          onClick={handleConsultationClick}
          className="w-full py-4 bg-[#ffd700] hover:bg-[#e6c200] transition-all rounded-2xl flex items-center justify-center shadow-md font-bold text-black text-sm uppercase tracking-wider cursor-pointer"
        >
          <span>Free Consultation</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </section>
  );
}
