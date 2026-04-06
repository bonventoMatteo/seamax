import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

interface ContactProps {
  isNight: boolean;
}

export default function Contact({ isNight }: ContactProps) {
  const theme = {
    bg: isNight ? 'bg-[#050505]' : 'bg-[#f5f5f7]',
    text: isNight ? 'text-white' : 'text-zinc-950',
    input: isNight ? 'border-white/10 focus:border-blue-500' : 'border-black/10 focus:border-blue-600',
    formBg: isNight ? 'bg-white/[0.02]' : 'bg-black/[0.02]',
  };

  return (
    <section 
      id="contact" 
      className={`py-24 lg:py-40 transition-colors duration-1000 ${theme.bg} ${theme.text} relative overflow-hidden`}
    >
      {/* Background Decorativo Sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] transition-opacity duration-1000 ${isNight ? 'bg-blue-600/10 opacity-100' : 'bg-blue-400/5 opacity-50'}`} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 lg:mb-32">
          <span className="text-[10px] uppercase tracking-[0.6em] font-black text-blue-600 mb-4 block">
            Next Steps
          </span>
          <h2 className="text-4xl lg:text-7xl font-light tracking-tighter italic uppercase leading-none">
            Let's <span className="font-black not-italic">Connect</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          
          {/* Informações de Contato (Esquerda) */}
          <div className="flex flex-col justify-between py-2">
            <div className="space-y-12">
              <h3 className="text-xl lg:text-2xl font-light tracking-tight max-w-sm">
                Ready to elevate your aviation experience? Our specialists are available for private consultations.
              </h3>

              <div className="space-y-8">
                {[
                  { icon: Mail, label: 'Inquiries', value: 'concierge@aerotech.com' },
                  { icon: Phone, label: 'Direct Line', value: '+1 (555) 888-0199' },
                  { icon: MapPin, label: 'Global HQ', value: 'Seattle, Washington, USA' },
                ].map((item) => (
                  <div key={item.label} className="group flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full border border-current/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-500">
                      <item.icon className="w-4 h-4 stroke-[1.5px]" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1">{item.label}</p>
                      <p className="text-lg font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-300">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 lg:mt-0 pt-12 border-t border-current/10">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 leading-loose">
                AeroTech Aviation Group<br />
                Engineering Excellence Since 1985
              </p>
            </div>
          </div>

          {/* Formulário High-End (Direita) */}
          <div className={`relative p-8 lg:p-12 border border-current/5 ${theme.formBg} backdrop-blur-md rounded-sm`}>
            <form className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="relative group">
                  <input type="text" placeholder=" " className={`peer w-full bg-transparent border-b py-3 outline-none transition-all ${theme.input}`} />
                  <label className="absolute left-0 top-3 text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 transition-all peer-focus:-top-4 peer-focus:text-blue-600 peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:-top-4">
                    First Name
                  </label>
                </div>
                <div className="relative group">
                  <input type="text" placeholder=" " className={`peer w-full bg-transparent border-b py-3 outline-none transition-all ${theme.input}`} />
                  <label className="absolute left-0 top-3 text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 transition-all peer-focus:-top-4 peer-focus:text-blue-600 peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:-top-4">
                    Last Name
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input type="email" placeholder=" " className={`peer w-full bg-transparent border-b py-3 outline-none transition-all ${theme.input}`} />
                <label className="absolute left-0 top-3 text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 transition-all peer-focus:-top-4 peer-focus:text-blue-600 peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:-top-4">
                  Professional Email
                </label>
              </div>

              <div className="relative group">
                <textarea rows={3} placeholder=" " className={`peer w-full bg-transparent border-b py-3 outline-none transition-all resize-none ${theme.input}`} />
                <label className="absolute left-0 top-3 text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 transition-all peer-focus:-top-4 peer-focus:text-blue-600 peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:-top-4">
                  Inquiry Details
                </label>
              </div>

              <button
                type="submit"
                className="group w-full py-5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] uppercase tracking-[0.5em] font-black transition-all flex items-center justify-center gap-4"
              >
                Request Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Minimalista */}
        <div className="mt-32 pt-8 border-t border-current/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <p className="text-[9px] uppercase tracking-[0.3em]">© 2026 AeroTech. All rights reserved.</p>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  );
} 