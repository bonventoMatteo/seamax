'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import Fleet from '@/components/Fleet';
import Innovation from '@/components/Innovation';
import GlobalPresence from '@/components/GlobalPresence';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import Configure from '@/components/Configure'; // Importe o novo componente

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isNight, setIsNight] = useState(false);

  // 1. Estado para controlar se estamos no Home ou no Configurador
  const [view, setView] = useState<'home' | 'configure'>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para voltar ao topo e trocar de tela
  const handleViewChange = (newView: 'home' | 'configure') => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView(newView);
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isNight ? 'bg-zinc-950' : 'bg-white'}`}>

      {/* 2. Só mostramos a Navigation se estivermos na Home */}
      {view === 'home' && (
        <Navigation
          scrolled={scrolled}
          isNight={isNight}
          setIsNight={setIsNight}
        />
      )}

      {/* 3. Lógica Condicional de Telas */}
      {view === 'home' ? (
        <>
          {/* Passamos a função handleViewChange para o Hero abrir o configurador */}
          <Hero
            isNight={isNight}
            onConfigure={() => handleViewChange('configure')}
          />

          <Fleet />
          <Innovation isNight={isNight} />
          <GlobalPresence isNight={isNight} />
          <Contact isNight={isNight} />
        </>
      ) : (
        /* 4. Tela de Configuração */
        <Configure
          isNight={isNight}
          onBack={() => handleViewChange('home')}
        />
      )}
    </div>
  );
}

export default App;