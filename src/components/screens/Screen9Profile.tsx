import React from 'react';
import { UserProfile, ScreenId } from '../../types';
import { ShieldCheck, Dumbbell, Home, Activity, Settings, CreditCard, LogOut, ChevronRight, Edit3, HeartPulse, Clock, Zap } from 'lucide-react';

interface Screen9ProfileProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onEditProfile?: () => void;
}

export const Screen9Profile: React.FC<Screen9ProfileProps> = ({ user, onNavigate }) => {
  return (
    <div className="space-y-6 pt-4 pb-8">
      {/* Profile Hero Card */}
      <div className="glass-card p-6 rounded-3xl text-center flex flex-col items-center relative overflow-hidden border border-white/15">
        <div className="absolute -left-12 -top-12 w-40 h-40 bg-[#00daf3]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mb-3">
          <div className="w-28 h-28 rounded-full border-4 border-[#bef500] overflow-hidden p-0.5 shadow-[0_0_25px_rgba(190,245,0,0.3)]">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="absolute bottom-1 right-1 bg-[#bef500] text-[#151f00] rounded-full p-1.5 border-4 border-[#131313] shadow">
            <ShieldCheck className="w-4.5 h-4.5 stroke-[2.5]" />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-white">{user.name}</h2>
        <p className="text-xs font-mono text-[#00daf3] uppercase tracking-widest mt-0.5">
          MEMBRO {user.tier} • {user.experience}
        </p>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-4 gap-2.5 w-full mt-6 pt-4 border-t border-white/10">
          <div className="bg-white/5 p-2 rounded-xl">
            <p className="text-[10px] font-mono text-gray-400">PESO</p>
            <p className="text-sm font-bold text-white mt-0.5">{user.weight} kg</p>
          </div>
          <div className="bg-white/5 p-2 rounded-xl">
            <p className="text-[10px] font-mono text-gray-400">ALTURA</p>
            <p className="text-sm font-bold text-white mt-0.5">{user.height} cm</p>
          </div>
          <div className="bg-white/5 p-2 rounded-xl">
            <p className="text-[10px] font-mono text-gray-400">IDADE</p>
            <p className="text-sm font-bold text-white mt-0.5">{user.age} anos</p>
          </div>
          <div className="bg-[#bef500]/15 p-2 rounded-xl border border-[#bef500]/30">
            <p className="text-[10px] font-mono text-[#bef500]">STREAK</p>
            <p className="text-sm font-bold text-[#bef500] mt-0.5">14 dias</p>
          </div>
        </div>
      </div>

      {/* Objetivos Ativos */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">OBJETIVOS CADASTRADOS</span>
          <button
            onClick={() => onNavigate('onboarding')}
            className="text-xs font-mono text-[#00daf3] hover:underline flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.goals.map((g, i) => (
            <span
              key={i}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-mono text-white font-medium"
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Histórico Médico */}
      <div className="space-y-2.5">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider px-1">HISTÓRICO MÉDICO & SAÚDE</span>
        <div className="glass-card rounded-2xl divide-y divide-white/10 overflow-hidden">
          <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#00daf3]/15 text-[#00daf3]">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Condições Atuais</p>
                <p className="text-xs text-gray-400">
                  {user.healthRestrictions.length > 0 ? user.healthRestrictions.join(', ') : 'Nenhuma restrição ativa'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#bef500]/15 text-[#bef500]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Exames de Sangue & Hormônios</p>
                <p className="text-xs text-gray-400">Última sync com Apple Health: Hoje</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>

      {/* Preferências de Treino */}
      <div className="space-y-2.5">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider px-1">PREFERÊNCIAS DE TREINO</span>
        <div className="glass-card rounded-2xl divide-y divide-white/10 overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/10 text-gray-300">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Duração Média Alvo</p>
                <p className="text-xs text-gray-400">{user.workoutDuration} minutos / {user.availabilityDays}x semana</p>
              </div>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/10 text-gray-300">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Foco Fisiológico</p>
                <p className="text-xs text-gray-400">Alta densidade e tempo de tensão</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipamentos Disponíveis */}
      <div className="space-y-2.5">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider px-1">ESTRUTURA DE TREINO</span>
        <div className="grid grid-cols-2 gap-2.5">
          {user.equipment.map((eq, i) => (
            <div key={i} className="glass-card p-3.5 rounded-2xl border-l-4 border-l-[#bef500] flex items-center gap-3">
              {eq === 'Academia' ? <Dumbbell className="w-5 h-5 text-[#bef500]" /> : <Home className="w-5 h-5 text-[#00daf3]" />}
              <div>
                <p className="text-sm font-bold text-white">{eq}</p>
                <p className="text-[10px] text-gray-400 font-mono">Disponível</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configurações da Conta */}
      <div className="space-y-2.5">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider px-1">CONFIGURAÇÕES</span>
        <div className="glass-card rounded-2xl divide-y divide-white/10 overflow-hidden">
          <button className="w-full text-left p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-3.5">
              <Settings className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-white">Preferências do Aplicativo</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-transform" />
          </button>

          <button className="w-full text-left p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-3.5">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-white">Plano e Faturamento</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#bef500] text-[#151f00] font-mono text-[10px] font-bold">
                {user.tier}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('splash')}
            className="w-full text-left p-4 flex items-center gap-3.5 hover:bg-[#ffb4ab]/10 transition-colors text-[#ffb4ab]"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-semibold">Sair ou Mudar de Usuário</span>
          </button>
        </div>
      </div>
    </div>
  );
};
