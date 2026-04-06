import { Plane, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface NavigationProps {
  scrolled: boolean;
  isNight: boolean;
  setIsNight: (val: boolean) => void;
}

export default function Navigation({ scrolled, isNight, setIsNight }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ['Fleet', 'Innovation', 'Global', 'Contact'];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? isNight
              ? 'bg-zinc-950/90 backdrop-blur-md border-b border-white/5 py-3'
              : 'bg-white/80 backdrop-blur-md border-b border-zinc-100 py-3'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <div className={`relative transition-all duration-500 w-32 md:w-40 ${isNight ? 'brightness-0 invert' : ''}`}>
              <Image 
                src="/logo.webp" 
                width={160} 
                height={45} 
                alt="Logotipo" 
                className="object-contain"
                priority
              />
            </div>

            {/* DESKTOP MENU & CONTROLS */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-10 border-r border-zinc-200/20 pr-8">
                {navLinks.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 relative group ${
                      isNight ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-950'
                    }`}
                  >
                    {item}
                    <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-500 ${
                      isNight ? 'bg-white group-hover:w-full' : 'bg-zinc-950 group-hover:w-full'
                    }`} />
                  </a>
                ))}
              </div>

              {/* TOGGLE NIGHT MODE */}
              <button
                onClick={() => setIsNight(!isNight)}
                className={`relative flex items-center w-14 h-7 rounded-full border transition-all duration-500 ${
                  isNight ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-200 bg-zinc-50'
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full transition-transform duration-500 flex items-center justify-center shadow-sm ${
                  isNight ? 'translate-x-7 bg-blue-600' : 'translate-x-1 bg-white'
                }`}>
                  {isNight ? <Moon size={10} fill="white" className="text-white" /> : <Sun size={10} fill="#f97316" className="text-orange-500" />}
                </div>
              </button>

              <button className={`px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold border transition-all duration-500 ${
                isNight ? 'bg-white text-zinc-950 border-white' : 'bg-zinc-950 text-white border-zinc-950'
              }`}>
                Book Now
              </button>
            </div>

            {/* MOBILE CONTROLS */}
            <div className="flex md:hidden items-center gap-4">
              {/* Toggle Noite sempre visível no Mobile */}
              <button
                onClick={() => setIsNight(!isNight)}
                className={`relative flex items-center w-12 h-6 rounded-full border transition-all duration-500 ${
                  isNight ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-200 bg-zinc-100'
                }`}
              >
                <div className={`absolute w-4 h-4 rounded-full transition-transform duration-500 flex items-center justify-center ${
                  isNight ? 'translate-x-6 bg-blue-600' : 'translate-x-1 bg-white'
                }`}>
                  {isNight ? <Moon size={8} fill="white" /> : <Sun size={8} fill="#f97316" />}
                </div>
              </button>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={isNight ? 'text-white' : 'text-zinc-950'}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`absolute top-full left-0 w-full transition-all duration-500 overflow-hidden bg-white border-b border-zinc-100 md:hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } ${isNight ? 'bg-zinc-950 border-white/5' : 'bg-white border-zinc-100'}`}>
          <div className="flex flex-col p-8 gap-6">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs uppercase tracking-[0.4em] font-black ${
                  isNight ? 'text-white' : 'text-zinc-950'
                }`}
              >
                {item}
              </a>
            ))}
            <button className={`w-full py-4 text-[10px] uppercase tracking-widest font-bold border mt-4 ${
              isNight ? 'bg-white text-zinc-950 border-white' : 'bg-zinc-950 text-white border-zinc-950'
            }`}>
              Book Now
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}