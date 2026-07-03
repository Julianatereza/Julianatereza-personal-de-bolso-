import React from 'react';
import { Play, Sliders, TrendingUp, Moon, BatteryCharging, Activity, Smile, HeartPulse, Droplet, Clock, Flame, Zap } from 'lucide-react';
import { UserProfile, VitalMetric, Workout, EvolutionChartPoint, ScreenId } from '../../types';

interface Screen3DashboardProps {
  user: UserProfile;
  vitalMetrics: VitalMetric[];
  recommendedWorkout: Workout;
  evolutionPoints: EvolutionChartPoint[];
  onStartWorkout: () => void;
  onAdaptWorkout: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen3Dashboard: React.FC<Screen3DashboardProps> = ({
  user,
  vitalMetrics,
  recommendedWorkout,
  evolutionPoints,
  onStartWorkout,
  onAdaptWorkout,
  onNavigate,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon':
        return <Moon className="w-5 h-5 text-[#00daf3]" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-5 h-5 text-[#bef500]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#bef500]" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-[#00daf3]" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-[#ffb4ab]" />;
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-[#00daf3]" />;
      default:
        return <Activity className="w-5 h-5 text-[#bef500]" />;
    }
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Hero Recommended Workout Card */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-white/15 shadow-2xl group">
        <div className="absolute inset-0 z-0">
          <img
            src={recommendedWorkout.imageUrl}
            alt={recommendedWorkout.title}
            className="w-full h-full object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
        </div>

        <div className="relative z-10 p-6 space-y-5">
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 rounded-full bg-[#bef500] text-[#151f00] font-mono font-bold text-xs shadow-[0_0_15px_rgba(190,245,0,0.5)]">
              {recommendedWorkout.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-mono text-[#00daf3] bg-black/40 px-2.5 py-1 rounded-full border border-[#00daf3]/30">
              <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
              <span>Calibrado para você</span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
              {recommendedWorkout.title}
            </h2>
            <p className="text-xs font-mono text-gray-300 mt-1">Foco muscular: Quadríceps, Glúteo & Cárdio</p>
          </div>

          {/* Workout specs pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-mono text-white border border-white/10">
              <Clock className="w-4 h-4 text-[#00daf3]" />
              <span>{recommendedWorkout.durationMin} MIN</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-mono text-white border border-white/10">
              <Zap className="w-4 h-4 text-[#bef500]" />
              <span className="uppercase">{recommendedWorkout.intensity} INTENSIDADE</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-mono text-white border border-white/10">
              <Flame className="w-4 h-4 text-[#ffb4ab]" />
              <span>~{recommendedWorkout.caloriesEst} KCAL</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={onStartWorkout}
              className="w-full h-13 py-3.5 bg-[#bef500] hover:bg-[#cbf733] active:scale-[0.98] text-[#151f00] font-bold text-base rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(190,245,0,0.3)] transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Iniciar Treino</span>
            </button>

            <button
              onClick={onAdaptWorkout}
              className="w-full py-3.5 bg-black/60 hover:bg-white/10 border border-white/20 active:scale-[0.98] text-white font-semibold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              <Sliders className="w-4.5 h-4.5 text-[#00daf3]" />
              <span>Check-in & Adaptar Treino</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vital Metrics Bento Grid */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>Métricas Vitais em Tempo Real</span>
          </h3>
          <span className="text-[10px] font-mono text-[#00daf3] uppercase tracking-wider bg-[#00daf3]/10 px-2 py-0.5 rounded border border-[#00daf3]/20">
            Última sync 06:14
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {vitalMetrics.map((metric) => (
            <div
              key={metric.id}
              onClick={() => {
                if (metric.id === 'recuperacao' || metric.id === 'sono') {
                  onNavigate('evolution');
                }
              }}
              className="glass-card glass-card-hover p-4 rounded-2xl flex flex-col justify-between cursor-pointer space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">{getIcon(metric.icon)}</div>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    metric.statusColor === 'lime' || metric.statusColor === 'emerald'
                      ? 'bg-[#bef500]/15 text-[#bef500]'
                      : 'bg-[#00daf3]/15 text-[#00daf3]'
                  }`}
                >
                  {metric.statusText}
                </span>
              </div>

              <div>
                <p className="text-[10px] font-mono text-gray-400 tracking-wider">{metric.title}</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-extrabold text-white tracking-tight">{metric.value}</span>
                  {metric.unit && <span className="text-xs font-mono text-gray-400">{metric.unit}</span>}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    metric.statusColor === 'lime' || metric.statusColor === 'emerald'
                      ? 'bg-[#bef500]'
                      : 'bg-[#00daf3]'
                  }`}
                  style={{ width: `${metric.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Evolution Section */}
      <div className="glass-card p-5 rounded-3xl space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase">ADERÊNCIA DO CICLO</span>
            <h3 className="text-xl font-bold text-white tracking-tight">Evolução da Semana</h3>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bef500]/15 text-[#bef500] text-xs font-mono font-bold border border-[#bef500]/30">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12% CONSISTÊNCIA</span>
          </div>
        </div>

        {/* Interactive Bars */}
        <div className="flex items-end justify-between h-36 pt-4 gap-2">
          {evolutionPoints.map((point) => {
            const isToday = point.day === 'QUI';
            const heightPct = point.score === 0 ? 8 : point.score;

            return (
              <div key={point.day} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full relative flex flex-col items-center justify-end h-28 bg-white/5 rounded-xl overflow-hidden p-1">
                  {point.score > 0 && (
                    <div
                      className={`w-full rounded-lg transition-all duration-500 ${
                        isToday
                          ? 'bg-[#bef500] shadow-[0_0_15px_#bef500]'
                          : point.status === 'parcial'
                          ? 'bg-[#00daf3]/60'
                          : 'bg-white/20 group-hover:bg-white/40'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  )}
                  {point.score === 0 && <span className="text-[9px] font-mono text-gray-500 my-auto">OFF</span>}
                </div>
                <span
                  className={`text-xs font-mono font-bold ${
                    isToday ? 'text-[#bef500] underline underline-offset-4' : 'text-gray-400'
                  }`}
                >
                  {point.day}
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => onNavigate('evolution')}
          className="w-full py-2.5 text-center text-xs font-mono text-[#00daf3] hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-xl"
        >
          Ver relatório de bio-frequência e IMC completo →
        </button>
      </div>
    </div>
  );
};
