/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, UserProfile, CheckInAnswers } from './types';
import {
  initialUserProfile,
  initialVitalMetrics,
  recommendedWorkoutToday,
  regenerativeWorkout,
  initialAiMessages,
  evolutionPoints,
} from './data/mockData';

import { TopHeader } from './components/common/TopHeader';
import { Navbar } from './components/common/Navbar';

import { Screen1Splash } from './components/screens/Screen1Splash';
import { Screen2Onboarding } from './components/screens/Screen2Onboarding';
import { Screen3Dashboard } from './components/screens/Screen3Dashboard';
import { Screen4CheckIn } from './components/screens/Screen4CheckIn';
import { Screen5AiResponse } from './components/screens/Screen5AiResponse';
import { Screen6WorkoutActive } from './components/screens/Screen6WorkoutActive';
import { Screen7AiChat } from './components/screens/Screen7AiChat';
import { Screen8Evolution } from './components/screens/Screen8Evolution';
import { Screen9Profile } from './components/screens/Screen9Profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [vitalMetrics] = useState(initialVitalMetrics);
  const [activeWorkout, setActiveWorkout] = useState(recommendedWorkoutToday);
  const [aiMessages, setAiMessages] = useState(initialAiMessages);

  // Quick Demo Screen Switcher toggle
  const [showDemoSwitcher, setShowDemoSwitcher] = useState(false);

  const handleNavigate = (screen: ScreenId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
  };

  const handleOnboardingComplete = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
    handleNavigate('dashboard');
  };

  const handleCheckInComplete = (answers: CheckInAnswers) => {
    // If sleep < 5h or alcohol was consumed, adapt to regenerative workout
    if (answers.sleepHours < 5.5 || answers.alcoholYesterday || answers.energyLevel <= 4) {
      setActiveWorkout(regenerativeWorkout);
    } else {
      setActiveWorkout(recommendedWorkoutToday);
    }
    handleNavigate('ai-response');
  };

  const handleSendMessage = (text: string) => {
    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user' as const,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setAiMessages((prev) => [...prev, userMsg]);

    // Adaptive AI reply logic
    setTimeout(() => {
      let replyText =
        'Analisei sua mensagem em conjunto com os sensores cardiovasculares de hoje. Ajustarei suas próximas 48h de treino de acordo.';
      let actionCard: any = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('joelho') || lower.includes('dor') || lower.includes('fisgada')) {
        replyText =
          'Entendido. Para proteger sua articulação, reescrevi sua série de membros inferiores de hoje para movimentos isométricos e cadeia cinética fechada sem compressão patelar.';
        actionCard = {
          type: 'exercise-swap',
          title: 'Adaptação Articular Ativada',
          description: 'Substituição de agachamento profundo por isometria e mobilidade',
          buttonText: 'Ver Treino Atualizado',
          targetScreen: 'workout-active',
        };
      } else if (lower.includes('trocar') || lower.includes('leg press')) {
        replyText = 'Feito! Troquei o Agachamento Livre pelo Leg Press 45° com cadência 3-1-1 no seu plano de hoje.';
      }

      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: 'ai' as const,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionCard,
      };

      setAiMessages((prev) => [...prev, aiReply]);
    }, 1300);
  };

  const screensList: { id: ScreenId; title: string; num: number }[] = [
    { id: 'splash', title: 'Tela 1 - Splash Screen', num: 1 },
    { id: 'onboarding', title: 'Tela 2 - Onboarding (6 Etapas)', num: 2 },
    { id: 'dashboard', title: 'Tela 3 - Dashboard Principal', num: 3 },
    { id: 'checkin', title: 'Tela 4 - Check-in Diário', num: 4 },
    { id: 'ai-response', title: 'Tela 5 - Resposta da IA', num: 5 },
    { id: 'workout-active', title: 'Tela 6 - Treino (Execução Ativa)', num: 6 },
    { id: 'ai-chat', title: 'Tela 7 - Chat com IA Personal', num: 7 },
    { id: 'evolution', title: 'Tela 8 - Evolução & Biometria', num: 8 },
    { id: 'profile', title: 'Tela 9 - Perfil do Usuário', num: 9 },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e5e2e1] font-sans selection:bg-[#bef500] selection:text-[#151f00]">
      {/* Top Header for non-splash and non-onboarding screens */}
      {currentScreen !== 'splash' && currentScreen !== 'onboarding' && (
        <TopHeader user={user} currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}

      {/* Main Screen Container */}
      <main className="max-w-xl mx-auto min-h-screen px-4 pb-24">
        {currentScreen === 'splash' && <Screen1Splash onStart={handleNavigate} />}

        {currentScreen === 'onboarding' && (
          <Screen2Onboarding
            initialProfile={user}
            onComplete={handleOnboardingComplete}
            onBackToSplash={() => handleNavigate('splash')}
          />
        )}

        {currentScreen === 'dashboard' && (
          <Screen3Dashboard
            user={user}
            vitalMetrics={vitalMetrics}
            recommendedWorkout={activeWorkout}
            evolutionPoints={evolutionPoints}
            onStartWorkout={() => handleNavigate('workout-active')}
            onAdaptWorkout={() => handleNavigate('checkin')}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'checkin' && <Screen4CheckIn onGenerateRecommendation={handleCheckInComplete} />}

        {currentScreen === 'ai-response' && (
          <Screen5AiResponse
            workout={activeWorkout}
            onAcceptWorkout={() => handleNavigate('workout-active')}
            onGenerateAlternative={() => setActiveWorkout(regenerativeWorkout)}
          />
        )}

        {currentScreen === 'workout-active' && (
          <Screen6WorkoutActive
            workout={activeWorkout}
            onFinishWorkout={() => handleNavigate('evolution')}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'ai-chat' && (
          <Screen7AiChat messages={aiMessages} onSendMessage={handleSendMessage} onNavigate={handleNavigate} />
        )}

        {currentScreen === 'evolution' && <Screen8Evolution user={user} evolutionPoints={evolutionPoints} />}

        {currentScreen === 'profile' && <Screen9Profile user={user} onNavigate={handleNavigate} />}
      </main>

      {/* Bottom Navbar for standard dashboard/app screens */}
      {currentScreen !== 'splash' && currentScreen !== 'onboarding' && (
        <Navbar currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}

      {/* Quick Demo Switcher Button (Floating at Bottom Right for Evaluators) */}
      <div className="fixed bottom-24 right-4 z-50">
        <button
          onClick={() => setShowDemoSwitcher(!showDemoSwitcher)}
          className="px-3.5 py-2 rounded-full bg-[#00daf3] text-[#001f26] font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,218,243,0.6)] hover:scale-105 transition-all flex items-center gap-1.5"
          title="Navegar por todas as 9 telas do aplicativo"
        >
          <span>📱 Navegar 9 Telas</span>
        </button>

        {showDemoSwitcher && (
          <div className="absolute bottom-12 right-0 w-64 bg-[#1a1a1c] border border-white/20 rounded-2xl p-3 shadow-2xl space-y-1 z-50 max-h-80 overflow-y-auto">
            <div className="flex justify-between items-center pb-1.5 border-b border-white/10 px-1">
              <span className="text-[11px] font-mono text-[#bef500] font-bold">SELECIONAR TELA</span>
              <button
                onClick={() => setShowDemoSwitcher(false)}
                className="text-xs text-gray-400 hover:text-white font-mono"
              >
                ✕
              </button>
            </div>
            {screensList.map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  handleNavigate(sc.id);
                  setShowDemoSwitcher(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                  currentScreen === sc.id
                    ? 'bg-[#bef500] text-[#151f00] font-bold'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <span className="truncate">{sc.title}</span>
                <span className="text-[10px] opacity-70">#{sc.num}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
