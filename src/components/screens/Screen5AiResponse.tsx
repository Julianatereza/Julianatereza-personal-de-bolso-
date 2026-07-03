import React, { useState } from 'react';
import { Bot, Play, RefreshCw, Clock, Zap, ChevronRight, ShieldCheck, Flame } from 'lucide-react';
import { Workout } from '../../types';

interface Screen5AiResponseProps {
  workout: Workout;
  onAcceptWorkout: () => void;
  onGenerateAlternative: () => void;
}

export const Screen5AiResponse: React.FC<Screen5AiResponseProps> = ({
  workout,
  onAcceptWorkout,
  onGenerateAlternative,
}) => {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleAlternative = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      onGenerateAlternative();
    }, 800);
  };

  return (
    <div className="space-y-6 pt-4 pb-8">
      {/* AI Insight Banner */}
      <div className="relative p-5 rounded-3xl glass-card border border-[#00daf3]/40 shadow-[0_0_30px_rgba(0,218,243,0.15)] overflow-hidden">
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#00daf3]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 rounded-2xl bg-[#00daf3]/20 text-[#00daf3] shrink-0 border border-[#00daf3]/30 shadow-sm">
            <Bot className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-[#00daf3] tracking-wider uppercase">
              ANÁLISE BIOMÉTRICA CONCLUÍDA
            </span>
            <p className="text-base text-gray-100 font-normal leading-relaxed">
              {workout.aiReasoning ||
                'Você dormiu apenas 4 horas e relatou consumo de álcool. Recomendamos reduzir a intensidade do treino para preservar o sistema nervoso central.'}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Recovery Score Gauge Card */}
        <div className="glass-card p-5 rounded-3xl flex flex-col items-center justify-center space-y-2 text-center relative overflow-hidden">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">RECOVERY SCORE</span>
          <div className="relative flex items-center justify-center my-2">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="#ffb4ab"
                strokeWidth="8"
                strokeDasharray="289"
                strokeDashoffset={289 - (289 * 42) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-[#ffb4ab]">42%</span>
            </div>
          </div>
          <span className="text-xs font-mono text-[#ffb4ab] bg-[#ffb4ab]/10 px-2.5 py-1 rounded-full border border-[#ffb4ab]/20">
            Recuperação Insuficiente
          </span>
        </div>

        {/* Recommendation Summary Card */}
        <div className="glass-card p-5 rounded-3xl flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1">
              RECOMENDAÇÃO ATIVA
            </span>
            <h3 className="text-2xl font-extrabold text-[#bef500] leading-tight">{workout.title}</h3>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4 text-[#00daf3]" />
              <span className="text-xs font-mono">{workout.durationMin} MINUTOS</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Zap className="w-4 h-4 text-[#bef500]" />
              <span className="text-xs font-mono uppercase">{workout.intensity} INTENSIDADE</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Flame className="w-4 h-4 text-[#ffb4ab]" />
              <span className="text-xs font-mono">~{workout.caloriesEst} KCAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-3">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-xl font-bold text-white tracking-tight">Sugestões de Hoje</h3>
          <span className="text-xs font-mono text-gray-400">{workout.exercises.length} EXERCÍCIOS</span>
        </div>

        <div className="space-y-2.5">
          {workout.exercises.map((ex, idx) => (
            <div
              key={ex.id}
              className="glass-card p-3.5 rounded-2xl flex items-center gap-4 hover:border-white/25 transition-all group"
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                <img src={ex.imageUrl} alt={ex.name} className="w-full h-full object-cover" />
                <div className="absolute top-1 left-1 w-5 h-5 rounded bg-black/70 backdrop-blur-md flex items-center justify-center text-[10px] font-mono font-bold text-[#bef500]">
                  {idx + 1}
                </div>
              </div>

              <div className="flex-grow min-w-0">
                <h4 className="text-base font-bold text-white truncate">{ex.name}</h4>
                <p className="text-xs font-mono text-[#00daf3] mt-0.5">
                  {ex.sets} SÉRIES • {ex.reps}
                </p>
                {ex.aiNote && <p className="text-[11px] text-gray-400 mt-1 italic truncate">"{ex.aiNote}"</p>}
              </div>

              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#bef500] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onAcceptWorkout}
          className="w-full h-16 bg-[#bef500] hover:bg-[#cbf733] active:scale-[0.98] text-[#151f00] font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(190,245,0,0.35)] transition-all"
        >
          <Play className="w-6 h-6 fill-current" />
          <span>Aceitar Treino Adaptado</span>
        </button>

        <button
          onClick={handleAlternative}
          disabled={isRegenerating}
          className="w-full py-4 bg-black/60 hover:bg-white/10 border border-white/20 active:scale-[0.98] text-white font-semibold text-sm rounded-2xl flex items-center justify-center gap-2.5 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4.5 h-4.5 text-[#00daf3] ${isRegenerating ? 'animate-spin' : ''}`} />
          <span>{isRegenerating ? 'Recalculando sinapses de treino...' : 'Gerar Alternativa Expressa (15 min)'}</span>
        </button>
      </div>
    </div>
  );
};
