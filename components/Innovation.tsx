import { useEffect, useRef, useState } from 'react';
import { Zap, Shield, Cpu, Wind } from 'lucide-react';

interface InnovationProps {
  isNight: boolean;
}

const innovations = [
  {
    icon: Zap,
    title: 'Hybrid Propulsion',
    description: 'Revolutionary hybrid-electric engines reducing emissions by 40%.',
    stat: '40%',
    label: 'Reduction',
  },
  {
    icon: Shield,
    title: 'Advanced Safety',
    description: 'AI-powered predictive maintenance and collision avoidance systems.',
    stat: '99.9%',
    label: 'Safety Rating',
  },
  {
    icon: Cpu,
    title: 'Smart Avionics',
    description: 'Next-gen flight systems with quantum computing integration.',
    stat: '10x',
    label: 'Processing',
  },
  {
    icon: Wind,
    title: 'Aerodynamics',
    description: 'Biomimetic wing design inspired by nature for optimal efficiency.',
    stat: '25%',
    label: 'Efficiency',
  },
];

export default function Innovation({ isNight }: InnovationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Definição dinâmica de temas
  const theme = {
    bg: isNight ? 'bg-[#050505]' : 'bg-[#f5f5f7]',
    text: isNight ? 'text-white' : 'text-zinc-950',
    cardBg: isNight ? 'bg-[#0a0a0a]' : 'bg-white',
    border: isNight ? 'border-white/5' : 'border-black/5',
    gridLine: isNight ? 'bg-white/10' : 'bg-black/10',
    mutedText: isNight ? 'opacity-50' : 'opacity-60',
    statSub: isNight ? 'opacity-40' : 'opacity-50',
  };

  return (
    <section 
      id="innovation" 
      ref={sectionRef} 
      className={`py-24 lg:py-40 ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-1000`}
    >
      {/* Background Decorativo Adaptativo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className={`absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000 
          ${isNight ? 'bg-blue-600/10 opacity-100' : 'bg-blue-400/5 opacity-50'}`} 
        />
        <div className={`absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-1000
          ${isNight ? 'bg-zinc-500/10 opacity-100' : 'bg-zinc-300/10 opacity-50'}`} 
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header da Seção */}
        <div className="mb-20 lg:mb-32">
          <span className={`text-[10px] uppercase tracking-[0.6em] font-black mb-4 block transition-all duration-1000 text-blue-600 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Engineering Tomorrow
          </span>
          <h2 className={`text-4xl lg:text-7xl font-light tracking-tighter italic mb-8 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Innovation <span className="font-black not-italic">in Flight</span>
          </h2>
          <div className={`h-[1px] w-full transition-all duration-1000 delay-300 origin-left ${theme.gridLine} ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} />
        </div>

        {/* Grid de Inovação */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px ${theme.gridLine} border transition-all duration-1000 ${theme.border}`}>
          {innovations.map((item, index) => (
            <div
              key={item.title}
              className={`group relative p-8 lg:p-12 transition-all duration-1000 ${theme.cardBg} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Efeito de Hover: Azul no Night / Preto no Day */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 
                ${isNight ? 'bg-blue-600' : 'bg-zinc-900'}`} 
              />
              
              <div className="relative z-10 group-hover:text-white transition-colors duration-500">
                <div className="mb-12">
                  <item.icon className="w-6 h-6 lg:w-8 lg:h-8 font-light stroke-[1px] group-hover:scale-110 transition-transform duration-500" />
                </div>

                <h3 className={`text-[11px] uppercase tracking-[0.4em] font-black mb-4 transition-opacity ${theme.mutedText} group-hover:opacity-100`}>
                  {item.title}
                </h3>

                <p className="text-lg lg:text-xl font-light tracking-tight leading-snug mb-16 h-24">
                  {item.description}
                </p>

                <div className="flex items-end gap-3">
                  <span className="text-4xl lg:text-5xl font-black tracking-tighter italic">
                    {item.stat}
                  </span>
                  <span className={`text-[8px] uppercase tracking-[0.3em] mb-2 transition-opacity ${theme.statSub} group-hover:text-white/60`}>
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Linha Decorativa Inferior */}
              <div className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-700 delay-100 
                ${isNight ? 'bg-white' : 'bg-blue-500'} group-hover:w-full`} 
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-20 flex justify-center lg:justify-end transition-all duration-1000 delay-700 ${isVisible ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold">
            All systems certified by EASA/FAA Grade A+
          </p>
        </div>
      </div>
    </section>
  );
}