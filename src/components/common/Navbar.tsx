import React from 'react';
import { Home, Dumbbell, Bot, TrendingUp, User } from 'lucide-react';
import { ScreenId } from '../../types';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate }) => {
  // Map active screen to tab
  const getActiveTab = (): string => {
    if (currentScreen === 'dashboard' || currentScreen === 'checkin' || currentScreen === 'ai-response') {
      return 'home';
    }
    if (currentScreen === 'workout-active') {
      return 'treinos';
    }
    if (currentScreen === 'ai-chat') {
      return 'ia';
    }
    if (currentScreen === 'evolution') {
      return 'evolucao';
    }
    if (currentScreen === 'profile') {
      return 'perfil';
    }
    return 'home';
  };

  const activeTab = getActiveTab();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, target: 'dashboard' as ScreenId },
    { id: 'treinos', label: 'Treinos', icon: Dumbbell, target: 'workout-active' as ScreenId },
    { id: 'ia', label: 'IA Coach', icon: Bot, target: 'ai-chat' as ScreenId, highlight: true },
    { id: 'evolucao', label: 'Evolução', icon: TrendingUp, target: 'evolution' as ScreenId },
    { id: 'perfil', label: 'Perfil', icon: User, target: 'profile' as ScreenId },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#131313]/90 backdrop-blur-xl border-t border-white/10 px-3 py-2 pb-5 max-w-xl mx-auto shadow-[0_-10px_25px_rgba(0,0,0,0.7)]">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.target)}
                className="flex flex-col items-center justify-center -mt-6 group focus:outline-none"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isActive
                      ? 'bg-[#bef500] text-[#151f00] scale-110 shadow-[0_0_20px_rgba(190,245,0,0.5)]'
                      : 'bg-[#1e2e33] text-[#00daf3] hover:scale-105 border border-[#00daf3]/40 shadow-[0_0_15px_rgba(0,218,243,0.2)]'
                  }`}
                >
                  <Icon className="w-7 h-7" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span
                  className={`text-[11px] font-mono mt-1 font-semibold tracking-wider transition-colors ${
                    isActive ? 'text-[#bef500]' : 'text-gray-400 group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.target)}
              className="flex flex-col items-center justify-center py-1 px-2 rounded-lg group focus:outline-none transition-all"
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-transform duration-200 ${
                    isActive ? 'text-[#bef500] scale-110' : 'text-gray-400 group-hover:text-gray-200'
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#bef500] shadow-[0_0_8px_#bef500]" />
                )}
              </div>
              <span
                className={`text-[11px] font-mono mt-1.5 transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-gray-400 group-hover:text-gray-300'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
