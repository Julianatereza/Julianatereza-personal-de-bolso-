import React from 'react';
import { Activity, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { ScreenId } from '../../types';

interface Screen1SplashProps {
  onStart: (target: ScreenId) => void;
}

export const Screen1Splash: React.FC<Screen1SplashProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e5e2e1] flex flex-col justify-between items-center px-6 py-12 relative overflow-hidden max-w-xl mx-auto">
      {/* Ambient glowing background orbs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#00daf3]/15 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 rounded-full bg-[#bef500]/12 blur-[100px] pointer-events-none" />

      {/* Top Tag */}
      <div className="w-full flex justify-between items-center pt-2 z-10">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00daf3]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI DRIVEN PERFORMANCE</span>
        </div>
        <span className="text-xs font-mono text-gray-500">v2.4 ELITE</span>
      </div>

      {/* Center Logo and Branding */}
      <div className="flex flex-col items-center text-center my-auto z-10 space-y-6">
        {/* Animated Icon */}
        <div className="relative">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-[#0a2e36] via-[#13353d] to-[#1e4d58] border border-[#00daf3]/40 flex items-center justify-center shadow-[0_0_50px_rgba(0,218,243,0.3)] group transform hover:scale-105 transition-transform duration-500">
            <Activity className="w-14 h-14 text-[#bef500] animate-pulse" strokeWidth={2.2} />
          </div>
          <div className="absolute -top-2 -right-2 bg-[#bef500] text-[#151f00] font-mono font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md">
            AI CORE
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Personal de <span className="text-[#bef500] drop-shadow-[0_0_20px_rgba(190,245,0,0.4)]">Bolso</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xs mx-auto font-normal leading-relaxed">
            Seu treino adaptado ao seu corpo, todos os dias.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-4 max-w-sm">
          <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#bef500]" />
            Recuperação em tempo real
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00daf3]" />
            Ajuste neural diário
          </span>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="w-full space-y-4 z-10 pt-6">
        <button
          onClick={() => onStart('onboarding')}
          className="w-full h-16 bg-[#bef500] hover:bg-[#cbf733] active:scale-[0.98] transition-all duration-200 text-[#151f00] font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(190,245,0,0.3)] group"
        >
          <span>Começar</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => onStart('dashboard')}
          className="w-full py-3 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white text-xs font-mono rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <ShieldCheck className="w-4 h-4 text-[#00daf3]" />
          Pular Onboarding (Ver Demonstração Pronta)
        </button>
      </div>
    </div>
  );
};
