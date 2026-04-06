import { useEffect, useRef, useState } from 'react';
import { Plane, Gauge, Users, Globe, Target, Radio, ChevronRight, Activity } from 'lucide-react';

const aircraft = [
  {
    id: 'AT-1000',
    name: 'AT-1000 Executive',
    category: 'Ultra Long Range',
    specs: [
      { icon: Gauge, label: 'Cruise Speed', value: '0.925 Mach' },
      { icon: Users, label: 'Configuration', value: '16 VIP' },
      { icon: Globe, label: 'Range Capacity', value: '7,500 nm' },
    ],
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200',
    coord: '40.7128° N, 74.0060° W'
  },
  {
    id: 'AT-2500',
    name: 'AT-2500 Regional',
    category: 'Corporate Airliner',
    specs: [
      { icon: Gauge, label: 'Cruise Speed', value: '0.82 Mach' },
      { icon: Users, label: 'Configuration', value: '120 Pax' },
      { icon: Globe, label: 'Range Capacity', value: '3,200 nm' },
    ],
    image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1200',
    coord: '34.0522° N, 118.2437° W'
  },
  {
    id: 'AT-5000',
    name: 'AT-5000 Global',
    category: 'Transcontinental',
    specs: [
      { icon: Gauge, label: 'Cruise Speed', value: '0.90 Mach' },
      { icon: Users, label: 'Configuration', value: '220 Pax' },
      { icon: Globe, label: 'Range Capacity', value: '8,500 nm' },
    ],
    image: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1200',
    coord: '51.5074° N, 0.1278° W'
  },
];

export default function Fleet() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          aircraft.forEach((_, i) => {
            setTimeout(() => setVisibleCards(prev => [...prev, i]), i * 200);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    // No MouseEvent, clientX e clientY existem na raiz
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden text-zinc-950">

      {/* BACKGROUND EXECUTIVO SUTIL */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER MINIMALISTA */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-zinc-100 pb-12">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 mb-4">
              <Activity className="w-3 h-3 text-blue-600" />
              <span className="text-[10px] tracking-[0.5em] font-bold uppercase">Fleet Management System</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
              SELECT<span className="text-blue-600 font-light italic">FLEET</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-[200px] leading-relaxed font-medium uppercase tracking-tighter">
            Análise técnica de performance e autonomia de voo em tempo real.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {aircraft.map((plane, index) => (
            <div
              key={plane.id}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`relative transition-all duration-1000 ease-out ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
            >
              <div className="relative bg-white border border-zinc-100 shadow-[0_10px_50px_rgba(0,0,0,0.04)] overflow-hidden group">

                {/* Image Display */}
                <div className="relative h-64 overflow-hidden bg-zinc-100">
                  <img
                    src={plane.image}
                    alt={plane.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-colors duration-500" />

                  {/* HUD Overlays (Light Version) */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                      <div className="bg-white/90 backdrop-blur-md text-[9px] px-3 py-1 font-bold tracking-widest border border-zinc-200 shadow-sm text-zinc-800 uppercase">
                        Unit_{plane.id}
                      </div>
                      <Target className="w-4 h-4 text-white drop-shadow-md animate-pulse" />
                    </div>
                  </div>

                  {/* Scanning Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-transparent h-1/3 w-full -translate-y-full group-hover:animate-scanVertical pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-2 block">
                    {plane.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-8 tracking-tight text-zinc-800">
                    {plane.name}
                  </h3>

                  <div className="space-y-6 mb-10">
                    {plane.specs.map((spec) => (
                      <div key={spec.label} className="group/spec">
                        <div className="flex justify-between items-end mb-2">
                          <div className="flex items-center gap-3">
                            <spec.icon className="w-4 h-4 text-zinc-300" />
                            <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">{spec.label}</span>
                          </div>
                          <span className="text-sm font-bold text-zinc-800 italic">{spec.value}</span>
                        </div>
                        <div className="w-full h-[1px] bg-zinc-100 overflow-hidden">
                          <div className="h-full bg-blue-600 w-0 group-hover:w-full transition-all duration-1000" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full group/btn relative py-4 bg-zinc-950 text-white text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all shadow-xl shadow-zinc-200">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Dossier <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-blue-700 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                  </button>
                </div>

                {/* Technical Coordinates Decor */}
                <div className="px-8 py-3 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center text-[8px] font-mono text-zinc-400">
                  <span>REF_POS: {plane.coord}</span>
                  <span className="flex items-center gap-1 italic"><Radio className="w-2 h-2 text-blue-500" /> SIGNAL_LINKED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scanVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .animate-scanVertical { animation: scanVertical 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>
    </section>
  );
}