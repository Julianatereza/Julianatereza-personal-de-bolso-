import React, { useState } from 'react';
import { TrendingUp, Award, Flame, Clock, BatteryCharging, Sparkles, Calendar, ChevronDown } from 'lucide-react';
import { UserProfile, EvolutionChartPoint } from '../../types';

interface Screen8EvolutionProps {
  user: UserProfile;
  evolutionPoints: EvolutionChartPoint[];
}

export const Screen8Evolution: React.FC<Screen8EvolutionProps> = ({ user, evolutionPoints }) => {
  const [period, setPeriod] = useState<'30d' | '90d' | '1a'>('30d');

  const imc = (user.weight / Math.pow(user.height / 100, 2)).toFixed(1);

  return (
    <div className="space-y-6 pt-4 pb-8">
      {/* Hero Consistency Score */}
      <div className="glass-card p-6 rounded-3xl relative overflow-hidden border border-white/15 shadow-2xl">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#bef500]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              PONTUAÇÃO DE CONSTÂNCIA
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#bef500]/15 text-[#bef500] font-mono font-bold text-xs border border-[#bef500]/30 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              ELITE TIER
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-extrabold text-[#bef500] tracking-tight">94</span>
            <span className="text-2xl font-mono text-gray-400">/100</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <TrendingUp className="w-4 h-4 text-[#00daf3]" />
            <p className="text-xs font-mono text-gray-300">
              <span className="text-[#00daf3] font-bold">+12% vs. mês anterior</span> • 14 dias em sequência ativa
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00daf3] to-[#bef500] rounded-full" style={{ width: '94%' }} />
          </div>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="glass-card p-5 rounded-3xl flex flex-col justify-between space-y-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 w-fit">
            <Clock className="w-5 h-5 text-[#00daf3]" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">TEMPO TOTAL TREINADO</span>
            <p className="text-2xl font-extrabold text-white mt-0.5">42h 15m</p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl flex flex-col justify-between space-y-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 w-fit">
            <Flame className="w-5 h-5 text-[#ffb4ab]" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">CALORIAS QUEIMADAS</span>
            <p className="text-2xl font-extrabold text-white mt-0.5">18.4k kcal</p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl col-span-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#bef500]/15 text-[#bef500] border border-[#bef500]/30">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">MÉDIA DE RECUPERAÇÃO</span>
              <p className="text-xl font-bold text-white">82% Pronto para treinar</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white font-semibold">ÓTIMA</span>
        </div>
      </div>

      {/* Weight & BMI Section */}
      <div className="glass-card p-6 rounded-3xl space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase">EVOLUÇÃO BIOMÉTRICA</span>
            <h3 className="text-xl font-bold text-white">Peso & IMC</h3>
          </div>
          <div className="flex bg-black/50 p-1 rounded-xl border border-white/10">
            {(['30d', '90d', '1a'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                  period === p ? 'bg-[#00daf3] text-[#001f26]' : 'text-gray-400 hover:text-white'
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Simulated Smooth Spline Chart */}
        <div className="h-44 w-full relative pt-4 pb-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 140" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00daf3" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#00daf3" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area under curve */}
            <path
              d="M0,90 Q80,110 160,85 T300,50 L400,60 L400,140 L0,140 Z"
              fill="url(#curveGradient)"
            />
            {/* Spline line */}
            <path
              d="M0,90 Q80,110 160,85 T300,50 L400,60"
              fill="none"
              stroke="#00daf3"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Active Data point */}
            <circle cx="300" cy="50" r="6" fill="#bef500" stroke="#0f0f0f" strokeWidth="3" />
            <circle cx="300" cy="50" r="12" fill="#bef500" fillOpacity="0.3" className="animate-ping" />
          </svg>

          {/* Floating marker tag */}
          <div className="absolute top-2 right-16 bg-black/90 border border-[#bef500]/50 px-2.5 py-1 rounded-lg text-center shadow-lg">
            <span className="text-xs font-mono font-bold text-[#bef500]">{user.weight} kg</span>
          </div>
        </div>

        {/* Weight Stats Footer */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10 text-center">
          <div>
            <p className="text-[10px] font-mono text-gray-400 uppercase">PESO ATUAL</p>
            <p className="text-lg font-bold text-white mt-0.5">{user.weight} kg</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-gray-400 uppercase">META OBJETIVO</p>
            <p className="text-lg font-bold text-[#bef500] mt-0.5">60.0 kg</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-gray-400 uppercase">IMC ATUAL</p>
            <p className="text-lg font-bold text-[#00daf3] mt-0.5">{imc}</p>
          </div>
        </div>
      </div>

      {/* Weekly Frequency */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Frequência Semanal</h3>
          <span className="text-xs font-mono text-[#bef500] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#bef500]" />
            Meta 5x / Semana
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {evolutionPoints.map((point) => (
            <div
              key={point.day}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border ${
                point.score > 0
                  ? 'bg-[#bef500]/15 border-[#bef500]/40 text-white'
                  : 'bg-white/5 border-white/5 text-gray-500'
              }`}
            >
              <span className="text-xs font-mono font-bold">{point.day}</span>
              <span
                className={`w-3 h-3 rounded-full ${
                  point.score > 80
                    ? 'bg-[#bef500]'
                    : point.score > 0
                    ? 'bg-[#00daf3]'
                    : 'bg-gray-600'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* AI Adaptive Insight Box */}
      <div className="glass-card p-5 rounded-3xl border border-[#00daf3]/30 bg-gradient-to-r from-[#0a2e36]/50 to-black/60 flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-[#00daf3]/20 text-[#00daf3] shrink-0 border border-[#00daf3]/30">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white">Insight Neural da IA</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Sua taxa de consistência subiu 12% nas últimas 4 semanas. A recuperação muscular melhorou substancialmente com a nova janela de sono, permitindo que aumentemos em 5kg a carga do agachamento no próximo ciclo.
          </p>
        </div>
      </div>
    </div>
  );
};
