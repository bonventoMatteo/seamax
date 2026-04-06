import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ShieldCheck, ArrowDown, Globe, Gauge } from 'lucide-react';

interface ModelsProps {
  isNight: boolean;
  onBack: () => void;
}

const JET_MODELS = [
  {
    id: 'g700',
    name: 'Beyond G700',
    tagline: 'The Zenith of Aviation',
    speed: 'Mach 0.925',
    range: '7,500 NM',
    altitude: '51,000 FT',
    bgText: 'ULTIMATE'
  },
  {
    id: 'vortex',
    name: 'Vortex S1',
    tagline: 'Supersonic Efficiency',
    speed: 'Mach 1.2',
    range: '5,200 NM',
    altitude: '60,000 FT',
    bgText: 'VELOCITY'
  },
  {
    id: 'lumen',
    name: 'Lumen Air',
    tagline: 'Pure Electric Silence',
    speed: 'Mach 0.75',
    range: '2,800 NM',
    altitude: '35,000 FT',
    bgText: 'SILENT'
  }
];

export default function ModelsShowroom({ isNight, onBack }: ModelsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return; // Desativa parallax no mobile para performance
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const newIndex = Math.min(
        JET_MODELS.length - 1,
        Math.floor((scrollY + windowHeight / 3) / windowHeight)
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const themeClass = isNight ? 'bg-[#050505] text-white' : 'bg-[#f5f5f7] text-zinc-950';
  const currentModel = JET_MODELS[activeIndex];

  return (
    <div className={`transition-colors duration-1000 ${themeClass} font-sans antialiased`}>
      
      {/* BACKGROUND LAYER - FIXED */}
      <div className="fixed inset-0 w-full h-screen flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-[0.03] lg:opacity-[0.05] select-none italic transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px)` }}
        >
          <span className="text-[35vw] font-black tracking-tighter uppercase whitespace-nowrap">
            {currentModel.bgText}
          </span>
        </div>

        {/* JET IMAGE CONTAINER */}
        <div 
          className="relative w-full max-w-[90vw] lg:max-w-6xl transition-transform duration-500 ease-out flex items-center justify-center"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          <img 
            key={currentModel.id}
            src="/jatoexecutivo.webp" 
            alt={currentModel.name}
            className="w-full h-auto max-h-[50vh] lg:max-h-screen object-contain animate-modelEnter drop-shadow-2xl transition-all duration-1000"
            style={{
                filter: activeIndex === 1 ? 'hue-rotate(150deg)' : activeIndex === 2 ? 'hue-rotate(280deg)' : 'none'
            }}
          />
          <div className={`absolute bottom-0 w-full h-8 lg:h-12 blur-[60px] lg:blur-[100px] rounded-full transition-colors duration-1000 ${isNight ? 'bg-blue-500/20' : 'bg-black/10'}`} />
        </div>
      </div>

      {/* NAVIGATION - FIXED */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 lg:px-12 lg:py-10 flex justify-between items-center mix-blend-difference">
        <button onClick={onBack} className="flex items-center gap-3 lg:gap-4 group">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
          </div>
          <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.4em] font-bold text-white">Fleet</span>
        </button>

        <div className="flex gap-2">
          {JET_MODELS.map((_, i) => (
            <div key={i} className={`h-[2px] transition-all duration-500 ${activeIndex === i ? 'w-8 lg:w-12 bg-white' : 'w-2 lg:w-4 bg-white/20'}`} />
          ))}
        </div>
      </nav>

      {/* PERFORMANCE HUD - DESKTOP ONLY SIDEBAR */}
      <div className="fixed left-6 lg:left-12 bottom-12 z-30 hidden md:flex flex-col gap-10 border-l border-current/10 pl-8">
        {[
          { label: 'Velocity', val: currentModel.speed, icon: Gauge },
          { label: 'Range', val: currentModel.range, icon: Globe },
          { label: 'Safety', val: 'Elite', icon: ShieldCheck },
        ].map((stat, i) => (
          <div key={i} className="animate-statsFade transition-all duration-500">
            <p className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1">{stat.label}</p>
            <p className="text-xl lg:text-2xl font-light tracking-tighter">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* SCROLLABLE CONTENT SECTIONS */}
      <main className="relative z-10">
        {JET_MODELS.map((model, index) => (
          <section 
            key={model.id} 
            className="h-screen w-full flex flex-col justify-end lg:justify-center items-center lg:items-end px-6 lg:px-24 pb-20 lg:pb-0"
          >
            <div className={`w-full max-w-lg transition-all duration-1000 transform ${activeIndex === index ? 'opacity-100 translate-y-0 lg:translate-x-0' : 'opacity-0 translate-y-10 lg:translate-x-20'}`}>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

                
                <h2 className="text-5xl lg:text-8xl font-black tracking-tighter mb-4 italic uppercase leading-none">
                  {model.name.split(' ')[1]}
                </h2>
                
                <p className="text-sm lg:text-base opacity-70 font-medium leading-relaxed mb-8 max-w-[280px] lg:max-w-md uppercase tracking-wider">
                  {model.tagline}. Redefining aerospace engineering with high-performance propulsion.
                </p>

                {/* MOBILE ONLY STATS HUD */}
                <div className="flex md:hidden gap-6 mb-8 border-y border-current/10 py-4 w-full justify-center">
                   <div className="text-center">
                      <p className="text-[8px] uppercase opacity-50 mb-1">Speed</p>
                      <p className="text-xs font-bold">{model.speed}</p>
                   </div>
                   <div className="text-center">
                      <p className="text-[8px] uppercase opacity-50 mb-1">Range</p>
                      <p className="text-xs font-bold">{model.range}</p>
                   </div>
                </div>

                <button className={`group flex items-center justify-center gap-4 py-4 px-10 border border-current hover:bg-current transition-all duration-500 w-full lg:w-auto`}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] group-hover:invert">Customize</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform group-hover:invert" />
                </button>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* FOOTER SCROLL INDICATOR */}
      <div className="fixed bottom-6 lg:bottom-10 right-6 lg:left-1/2 lg:-translate-x-1/2 z-30 flex flex-col items-center opacity-40">
        <div className="hidden lg:block w-[1px] h-12 bg-current animate-pulse" />
        <span className="text-[8px] uppercase tracking-[0.4em] font-bold mt-2 lg:rotate-0 rotate-90">Scroll</span>
      </div>

      <style>{`
        @keyframes modelEnter {
          from { opacity: 0; transform: scale(1.05) translateY(20px); filter: blur(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        .animate-modelEnter { animation: modelEnter 1.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-statsFade { animation: statsFade 0.6s ease-out forwards; }
        @keyframes statsFade {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}