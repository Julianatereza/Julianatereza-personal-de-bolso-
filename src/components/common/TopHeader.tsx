import React from 'react';
import { ArrowLeft, Bell, Activity, Sparkles } from 'lucide-react';
import { UserProfile, ScreenId } from '../../types';

interface TopHeaderProps {
  user: UserProfile;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onToggleUser?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ user, currentScreen, onNavigate }) => {
  const isSubScreen = ['checkin', 'ai-response', 'workout-active'].includes(currentScreen);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'checkin':
        return 'Check-in Diário';
      case 'ai-response':
        return 'Recomendação IA';
      case 'workout-active':
        return 'Treino em Execução';
      case 'ai-chat':
        return 'Personal AI Coach';
      case 'evolution':
        return 'Biometria & Evolução';
      case 'profile':
        return 'Seu Perfil';
      default:
        return 'Personal de Bolso';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#131313]/85 backdrop-blur-xl border-b border-white/10 px-4 py-3 max-w-xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        {isSubScreen ? (
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="relative cursor-pointer group" onClick={() => onNavigate('profile')}>
            <div className="w-10 h-10 rounded-full border-2 border-[#bef500] overflow-hidden p-0.5 shadow-[0_0_12px_rgba(190,245,0,0.3)]">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00daf3] rounded-full border-2 border-[#131313] animate-pulse" />
          </div>
        )}

        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold text-white tracking-tight">{getScreenTitle()}</h1>
            {!isSubScreen && (
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-[#00daf3]/15 text-[#00daf3] border border-[#00daf3]/30 rounded">
                {user.tier}
              </span>
            )}
          </div>
          <p className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#bef500]" />
            IA Adaptativa Ativa
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate('ai-chat')}
          className="px-2.5 py-1.5 rounded-full bg-[#bef500]/10 border border-[#bef500]/30 text-[#bef500] text-xs font-mono font-semibold flex items-center gap-1.5 hover:bg-[#bef500]/20 transition-all"
        >
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>LIVE</span>
        </button>

        <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors relative">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ffb4ab] rounded-full shadow-[0_0_8px_#ffb4ab]" />
        </button>
      </div>
    </header>
  );
};
