import React, { useState } from 'react';
import { Bot, Sparkles, Moon, BatteryCharging, Flame, Clock, Smile, HeartPulse } from 'lucide-react';
import { CheckInAnswers } from '../../types';

interface Screen4CheckInProps {
  onGenerateRecommendation: (answers: CheckInAnswers) => void;
}

export const Screen4CheckIn: React.FC<Screen4CheckInProps> = ({ onGenerateRecommendation }) => {
  const [answers, setAnswers] = useState<CheckInAnswers>({
    sleepHours: 4.5,
    energyLevel: 4,
    alcoholYesterday: true,
    muscleSoreness: ['QUADRÍCEPS'],
    jointSoreness: ['JOELHO'],
    availableTimeMin: 30,
    mood: 'Cansado',
    stressLevel: 7,
  });

  const toggleSoreness = (group: string, list: string[], key: 'muscleSoreness' | 'jointSoreness') => {
    const updated = list.includes(group) ? list.filter((item) => item !== group) : [...list, group];
    setAnswers({ ...answers, [key]: updated });
  };

  const muscleGroups = ['OMBROS', 'PEITORAL', 'QUADRÍCEPS', 'POSTERIOR', 'COSTAS', 'GLÚTEO'];
  const jointGroups = ['JOELHO', 'LOMBAR', 'OMBRO', 'TORNOZELO', 'NENHUM'];

  return (
    <div className="space-y-6 pt-4 pb-8">
      {/* Introduction Header */}
      <div className="glass-card p-5 rounded-3xl border border-[#00daf3]/30 bg-gradient-to-br from-[#0a2e36]/40 to-black/60 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[#00daf3]/15 text-[#00daf3] border border-[#00daf3]/30">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#bef500] uppercase tracking-wider block">
              DIAGNÓSTICO NEURAL DIÁRIO
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">Calibragem Pré-Treino</h2>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              Responda em 30 segundos para que a IA adapte volume, carga e padrão de movimento à sua fisiologia de hoje.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Sleep Slider */}
      <div className="glass-card p-5 rounded-3xl space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-gray-400 uppercase flex items-center gap-1.5">
            <Moon className="w-4 h-4 text-[#00daf3]" />
            Sono da Última Noite
          </span>
          <span className="text-2xl font-mono font-bold text-[#bef500]">{answers.sleepHours}h</span>
        </div>
        <h3 className="text-base font-semibold text-white">Quantas horas você dormiu?</h3>
        <input
          type="range"
          min="3"
          max="11"
          step="0.5"
          value={answers.sleepHours}
          onChange={(e) => setAnswers({ ...answers, sleepHours: Number(e.target.value) })}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#bef500]"
        />
        <div className="flex justify-between text-[10px] font-mono text-gray-500">
          <span>Privação (3h)</span>
          <span>Ideal (8h+)</span>
          <span>Regenerado (11h)</span>
        </div>
      </div>

      {/* 2. Energy Scale 1-10 */}
      <div className="glass-card p-5 rounded-3xl space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-gray-400 uppercase flex items-center gap-1.5">
            <BatteryCharging className="w-4 h-4 text-[#bef500]" />
            Disposição Atual
          </span>
          <span className="text-xl font-mono font-bold text-white">{answers.energyLevel} / 10</span>
        </div>
        <h3 className="text-base font-semibold text-white">Como está sua energia hoje?</h3>
        <div className="grid grid-cols-10 gap-1 sm:gap-1.5 pt-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setAnswers({ ...answers, energyLevel: num })}
              className={`h-11 rounded-xl font-mono font-bold text-xs sm:text-sm transition-all flex items-center justify-center ${
                answers.energyLevel === num
                  ? 'bg-[#bef500] text-[#151f00] scale-110 shadow-[0_0_15px_#bef500]'
                  : 'bg-white/5 text-gray-400 hover:bg-white/15'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Alcohol Toggle */}
      <div className="glass-card p-5 rounded-3xl flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-gray-400 uppercase flex items-center gap-1.5 mb-0.5">
            <Flame className="w-4 h-4 text-[#ffb4ab]" />
            Metabolismo
          </span>
          <h3 className="text-base font-semibold text-white">Consumiu álcool ontem?</h3>
          <p className="text-xs text-gray-400">Afeta hidratação celular e tônus cardíaco.</p>
        </div>
        <div className="flex bg-black/60 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setAnswers({ ...answers, alcoholYesterday: true })}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              answers.alcoholYesterday ? 'bg-[#ffb4ab] text-[#690005] shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            SIM
          </button>
          <button
            type="button"
            onClick={() => setAnswers({ ...answers, alcoholYesterday: false })}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              !answers.alcoholYesterday ? 'bg-[#bef500] text-[#151f00] shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            NÃO
          </button>
        </div>
      </div>

      {/* 4. Muscle Soreness Map */}
      <div className="glass-card p-5 rounded-3xl space-y-3">
        <span className="text-xs font-mono text-gray-400 uppercase">Fadiga Muscular</span>
        <h3 className="text-base font-semibold text-white">Está com dor muscular excessiva?</h3>
        <div className="flex flex-wrap gap-2 pt-1">
          {muscleGroups.map((group) => {
            const selected = answers.muscleSoreness.includes(group);
            return (
              <button
                key={group}
                type="button"
                onClick={() => toggleSoreness(group, answers.muscleSoreness, 'muscleSoreness')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all border ${
                  selected
                    ? 'bg-[#bef500]/20 border-[#bef500] text-[#bef500]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {selected ? '✓ ' : '+ '}
                {group}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Joint Discomfort */}
      <div className="glass-card p-5 rounded-3xl space-y-3">
        <span className="text-xs font-mono text-gray-400 uppercase">Proteção Articular</span>
        <h3 className="text-base font-semibold text-white">Sente incômodo em alguma articulação?</h3>
        <div className="flex flex-wrap gap-2 pt-1">
          {jointGroups.map((joint) => {
            const selected = answers.jointSoreness.includes(joint);
            return (
              <button
                key={joint}
                type="button"
                onClick={() => toggleSoreness(joint, answers.jointSoreness, 'jointSoreness')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all border ${
                  selected
                    ? 'bg-[#ffb4ab]/20 border-[#ffb4ab] text-[#ffb4ab]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {selected ? '⚠️ ' : ''}
                {joint}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Available Time */}
      <div className="glass-card p-5 rounded-3xl space-y-3">
        <span className="text-xs font-mono text-gray-400 uppercase flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#00daf3]" />
          Janela de Treino
        </span>
        <h3 className="text-base font-semibold text-white">Quanto tempo você possui hoje?</h3>
        <div className="grid grid-cols-3 gap-3 pt-1">
          {[
            { min: 15, label: "15'", sub: 'EXPRESSO' },
            { min: 30, label: "30'", sub: 'REGENERATIVO' },
            { min: 45, label: "45'", sub: 'COMPLETO' },
          ].map((t) => (
            <button
              key={t.min}
              type="button"
              onClick={() => setAnswers({ ...answers, availableTimeMin: t.min })}
              className={`py-4 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                answers.availableTimeMin === t.min
                  ? 'bg-[#bef500] text-[#151f00] border-[#bef500] shadow-[0_0_20px_rgba(190,245,0,0.3)] font-bold'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              <span className="text-2xl font-extrabold">{t.label}</span>
              <span className="text-[10px] font-mono mt-0.5 opacity-80">{t.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 7. Mood & Stress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card p-5 rounded-3xl space-y-3">
          <span className="text-xs font-mono text-gray-400 uppercase flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-[#00daf3]" />
            Estado Mental
          </span>
          <h3 className="text-sm font-semibold text-white">Seu Humor</h3>
          <div className="flex flex-wrap gap-1.5">
            {(['Excelente', 'Positivo', 'Estável', 'Cansado', 'Estressado'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setAnswers({ ...answers, mood: m })}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  answers.mood === m
                    ? 'bg-[#00daf3] text-[#001f26] font-bold shadow'
                    : 'bg-white/5 text-gray-300 hover:bg-white/15'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-gray-400 uppercase flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-[#ffb4ab]" />
              Nível de Estresse
            </span>
            <span className="text-base font-mono font-bold text-white">{answers.stressLevel} / 10</span>
          </div>
          <h3 className="text-sm font-semibold text-white">Estresse Laboral/Rotina</h3>
          <input
            type="range"
            min="1"
            max="10"
            value={answers.stressLevel}
            onChange={(e) => setAnswers({ ...answers, stressLevel: Number(e.target.value) })}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ffb4ab]"
          />
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={() => onGenerateRecommendation(answers)}
        className="w-full h-16 bg-[#bef500] hover:bg-[#cbf733] active:scale-[0.99] text-[#151f00] font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(190,245,0,0.4)] transition-all"
      >
        <Sparkles className="w-6 h-6 fill-current animate-pulse" />
        <span>Gerar Recomendação Adaptada</span>
      </button>
    </div>
  );
};
