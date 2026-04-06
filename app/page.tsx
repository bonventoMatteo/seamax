'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import Fleet from '@/components/Fleet';
import Innovation from '@/components/Innovation';
import GlobalPresence from '@/components/GlobalPresence';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import Configure from '@/components/Configure';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isNight, setIsNight] = useState(false);
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
    // Reset de scroll para a nova "página"
    window.scrollTo({ top: 0, behavior: 'instant' });
    setView(newView);
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isNight ? 'bg-zinc-950' : 'bg-white'}`}>

      {/* 1. Navegação fixa (opcional: pode sumir no configurador se desejar) */}
      <Navigation
        scrolled={scrolled}
        isNight={isNight}
        setIsNight={setIsNight}
      />

      {/* 2. Lógica Condicional de Telas */}
      {view === 'home' ? (
        <main>
          {/* O Hero precisa receber a função de mudança de view para o botão funcionar */}
          <Hero
            isNight={isNight}
            onConfigure={() => handleViewChange('configure')}
          />

          <Innovation isNight={isNight} />
          {/* Fleet também precisa do isNight para os cards e scrollbar */}
          <Fleet isNight={isNight} />

          <GlobalPresence isNight={isNight} />

          <Contact isNight={isNight} />
        </main>
      ) : (
        /* 3. Tela de Configuração */
        <Configure
          isNight={isNight}
          onBack={() => handleViewChange('home')}
        />
      )}
    </div>
  );
}

export default App;