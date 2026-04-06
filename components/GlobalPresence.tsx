import { useEffect, useRef, useState } from 'react';
import { MapPin, Building2, Users as Users2, Award, Globe2 } from 'lucide-react';

interface GlobalPresenceProps {
  isNight: boolean;
}

const stats = [
  { icon: MapPin, value: '150+', label: 'Countries Served' },
  { icon: Building2, value: '2,500+', label: 'Global Partners' },
  { icon: Users2, value: '45K+', label: 'Team Members' },
  { icon: Award, value: '250+', label: 'Industry Awards' },
];

export default function GlobalPresence({ isNight }: GlobalPresenceProps) {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            const target = parseInt(stat.value.replace(/\D/g, ''));
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[index] = target;
                  return newCounts;
                });
                clearInterval(timer);
              } else {
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.floor(current);
                  return newCounts;
                });
              }
            }, duration / steps);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const theme = {
    bg: isNight ? 'bg-[#050505]' : 'bg-[#f5f5f7]',
    text: isNight ? 'text-white' : 'text-zinc-950',
    card: isNight ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10',
    accent: 'text-blue-600',
  };

  return (
    <section 
      id="global" 
      ref={sectionRef} 
      className={`py-24 lg:py-40 transition-colors duration-1000 ${theme.bg} ${theme.text} relative overflow-hidden`}
    >
      {/* Elementos de Fundo */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] ${isNight ? 'bg-blue-900/20' : 'bg-blue-200/40'}`} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Minimalista */}
        <div className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.6em] font-black text-blue-600 mb-4 block">
            Scale & Reach
          </span>
          <h2 className="text-4xl lg:text-7xl font-light tracking-tighter italic uppercase">
            Global <span className="font-black not-italic">Presence</span>
          </h2>
        </div>

        {/* Grid de Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-24">
          {stats.map((stat, index) => (
            <div key={stat.label} className="group">
              <div className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 stroke-[1.5px]" />
              </div>
              <div className="text-4xl lg:text-6xl font-black tracking-tighter mb-2 italic">
                {counts[index]}{stat.value.replace(/\d/g, '')}
              </div>
              <div className="text-[10px] lg:text-[11px] uppercase tracking-[0.3em] font-bold opacity-40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mapa / Área de Operações (Estilo Vidro Industrial) */}
        <div className={`relative h-[400px] lg:h-[500px] rounded-sm overflow-hidden border backdrop-blur-md transition-all duration-1000 ${theme.card}`}>
          
          {/* Overlay de HUD */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
            <Globe2 className="w-4 h-4 animate-spin-slow opacity-50" />
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-50">Real-time Operations Map</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-20">
            {/* Representação Abstrata de Conexões */}
            <div className="relative w-full h-full opacity-40">
               {/* Pontos Pulsantes (Nodes) */}
               <div className="absolute top-[20%] left-[25%] w-2 h-2 bg-blue-600 rounded-full animate-ping" />
               <div className="absolute top-[40%] right-[30%] w-2 h-2 bg-blue-600 rounded-full animate-ping delay-300" />
               <div className="absolute bottom-[30%] left-[45%] w-2 h-2 bg-blue-600 rounded-full animate-ping delay-700" />
               
               {/* SVG de Linhas de Conexão */}
               <svg className="w-full h-full stroke-current opacity-20" fill="none">
                 <path d="M 25% 20% Q 50% 10% 70% 40%" strokeWidth="0.5" />
                 <path d="M 70% 40% Q 60% 60% 45% 70%" strokeWidth="0.5" />
                 <path d="M 45% 70% Q 30% 50% 25% 20%" strokeWidth="0.5" />
               </svg>
            </div>

            {/* Texto Central */}
            <div className="text-center relative z-10">
              <h3 className="text-2xl lg:text-4xl font-light tracking-[0.2em] uppercase mb-4">
                Worldwide <span className="font-black italic">Network</span>
              </h3>
              <p className="text-[10px] lg:text-[12px] uppercase tracking-[0.5em] opacity-40 max-w-md mx-auto leading-relaxed">
                Seamlessly connecting aviation logistics across major global hubs.
              </p>
            </div>
          </div>

          {/* Efeito de Scanner de Radar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full animate-scan pointer-events-none" />
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
      `}</style>
    </section>
  );
}