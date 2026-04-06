import { useEffect, useState } from 'react';

interface HeroProps {
  isNight: boolean;
  onConfigure: () => void;
}

export default function Hero({ isNight, onConfigure }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 500);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className={`relative h-screen w-full overflow-hidden transition-colors duration-[1500ms] ease-in-out font-sans ${isNight ? 'bg-[#020617] text-white' : 'bg-[#87CEEB] text-zinc-950'}`}>

      {/* 1. CONTAINER DE BACKGROUNDS DINÂMICOS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* MODO DIA (CÉU, SOL E NUVENS) */}
        <div
          className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${isNight ? 'opacity-0' : 'opacity-100'}`}
          style={{ transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)` }}
        >
          {/* Gradiente do Céu */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#4facfe] to-[#00f2fe] opacity-80" />
          
          {/* O SOL */}
          <div 
            className="absolute top-[10%] right-[15%] w-64 h-64 bg-white rounded-full blur-[80px] opacity-60 animate-pulse"
            style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
          />
          <div className="absolute top-[5%] right-[10%] w-32 h-32 bg-yellow-100 rounded-full blur-[40px] opacity-40" />

          {/* NUVENS DE DIA */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen bg-cover bg-no-repeat animate-cloudMoveSlow"
            style={{ backgroundImage: `url('https://www.transparentpng.com/download/cloud/blue-sky-white-clouds-png-images-21.png')`, backgroundSize: '150% auto' }}
          />
          <div
            className="absolute inset-0 opacity-30 mix-blend-screen bg-cover bg-no-repeat animate-cloudMoveFast"
            style={{ backgroundImage: `url('https://www.transparentpng.com/download/cloud/blue-sky-white-clouds-png-images-21.png')`, backgroundSize: '120% auto', filter: 'brightness(1.2)' }}
          />
        </div>

        {/* MODO NOITE (ESPAÇO E ESTRELAS) */}
        <div
          className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out bg-gradient-to-b from-[#0f172a] via-[#020617] to-[#020617] ${isNight ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
        >
          <div className="absolute inset-0">
            <div className="stars-small absolute inset-0"></div>
            <div className="stars-medium absolute inset-0"></div>
          </div>
          <div
            className="absolute inset-0 opacity-30 mix-blend-screen bg-cover bg-no-repeat animate-cloudMoveSlow"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1599045151332-ff2587f03eb2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
          />
        </div>
      </div>

      {/* 2. TÍTULO GIGANTE EM BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <h1
          className={`text-[18vw] md:text-[15vw] font-black tracking-tighter select-none transition-all duration-[2000ms] text-center ${isNight ? 'text-white/[0.03]' : 'text-white/20'} ${isRevealed ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
          style={{ transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px)` }}
        >
          BEYOND
        </h1>
      </div>

      {/* 3. AVIÃO */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-[1500ms] delay-300 ${isRevealed ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-xl translate-y-10'}`}
        style={{ transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px)` }}
      >
        <img
          src="/jatoexecutivo.webp"
          alt="Executive Jet"
          className={`w-[90vw] md:w-full md:max-w-[70vw] h-auto object-contain animate-float transition-all duration-1000 ${isNight ? 'brightness-75 contrast-110' : 'brightness-110 contrast-100 drop-shadow-[0_50px_40px_rgba(0,0,0,0.1)]'}`}
        />
      </div>

      {/* 4. INTERFACE UI */}
      <div className="relative z-30 h-full w-full flex flex-col justify-end md:justify-between p-6 md:p-16">
        <div className="hidden md:block"></div>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 pb-8 text-center md:text-left">
          
          <div className={`max-w-xs transition-all duration-1000 delay-1000 ${isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className={`hidden md:block w-12 h-[2px] mb-6 transition-colors duration-1000 ${isNight ? 'bg-blue-600 shadow-[0_0_15px_#2563eb]' : 'bg-white'}`} />
            <h3 className={`text-3xl md:text-4xl font-light tracking-tighter leading-none mb-4 ${!isNight && 'text-white text-shadow-sm'}`}>
              THE NEW <span className={`font-bold transition-colors ${isNight ? 'text-zinc-100' : 'text-white'}`}>STANDARD.</span>
            </h3>
            <p className={`text-[10px] uppercase tracking-widest leading-relaxed font-medium ${isNight ? 'text-zinc-400' : 'text-white/80'}`}>
              Performance sem precedentes. O futuro da aviação executiva.
            </p>
          </div>

          <div className={`transition-all duration-1000 delay-[1200ms] ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={onConfigure}
              className={`group relative px-10 md:px-12 py-5 md:py-6 text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-1000 
                ${isNight 
                  ? 'bg-white text-zinc-950 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                  : 'bg-white text-blue-600 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]'
                }`}
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                Configure Jet
              </span>
              <div className={`absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out
                ${isNight ? 'bg-blue-600' : 'bg-blue-500'}`} 
              />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-0.5deg); }
        }
        @keyframes cloudMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-cloudMoveSlow { animation: cloudMove 120s linear infinite; }
        .animate-cloudMoveFast { animation: cloudMove 80s linear reverse infinite; }
        .stars-small {
          box-shadow: 15vw 10vh #fff, 25vw 30vh #fff, 35vw 70vh #fff, 50vw 20vh #fff, 65vw 80vh #fff, 80vw 40vh #fff, 90vw 60vh #fff, 10vw 90vh #fff, 45vw 50vh #fff, 75vw 15vh #fff, 20vw 55vh #87ceeb, 60vw 35vh #fff, 85vw 85vh #fff, 5vw 25vh #fff, 95vw 10vh #fff, 40vw 10vh #fff, 55vw 75vh #fff, 70vw 60vh #fff, 30vw 45vh #87ceeb, 2vw 80vh #fff;
          opacity: 0.4;
        }
        .stars-medium {
          box-shadow: 12vw 15vh #fff, 42vw 28vh #fff, 72vw 68vh #fff, 92vw 32vh #fff, 22vw 82vh #fff, 55vw 12vh #87ceeb, 82vw 52vh #fff, 32vw 92vh #fff, 62vw 42vh #fff, 2vw 22vh #fff;
          opacity: 0.3;
        }
      `}</style>
    </section>
  );
}