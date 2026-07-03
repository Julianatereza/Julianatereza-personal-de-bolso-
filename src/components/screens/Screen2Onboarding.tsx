import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles, Activity, ShieldAlert, Dumbbell, Clock, Home } from 'lucide-react';
import { UserProfile, ScreenId } from '../../types';

interface Screen2OnboardingProps {
  initialProfile: UserProfile;
  onComplete: (updatedProfile: UserProfile) => void;
  onBackToSplash: () => void;
}

export const Screen2Onboarding: React.FC<Screen2OnboardingProps> = ({
  initialProfile,
  onComplete,
  onBackToSplash,
}) => {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBackToSplash();
    }
  };

  const toggleArrayItem = (list: string[], item: string): string[] => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Informações Pessoais</h2>
              <p className="text-sm text-gray-400 mt-1">
                Nossa IA utiliza esses dados para calcular sua taxa metabólica basal e cargas ideais.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                  Como devemos te chamar?
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00daf3] transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                    Idade
                  </label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                    className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00daf3]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                    Sexo Biológico
                  </label>
                  <div className="flex bg-[#1c1b1b] border border-white/10 rounded-xl p-1">
                    {(['FEM', 'MASC'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setProfile({ ...profile, gender: g })}
                        className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
                          profile.gender === g
                            ? 'bg-[#bef500] text-[#151f00] shadow-sm'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {g === 'FEM' ? 'FEM' : 'MASC'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                    Altura (cm)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={profile.height}
                      onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })}
                      className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00daf3]"
                    />
                    <span className="absolute right-4 top-3.5 text-xs font-mono text-gray-500">cm</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                    Peso (kg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      value={profile.weight}
                      onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
                      className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00daf3]"
                    />
                    <span className="absolute right-4 top-3.5 text-xs font-mono text-gray-500">kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        const goalOptions = [
          { id: 'Emagrecer', label: 'Emagrecer & Definição', desc: 'Queima calórica e déficit otimizado' },
          { id: 'Ganhar massa muscular', label: 'Ganhar Massa Muscular', desc: 'Hipertrofia e progressão de carga' },
          { id: 'Condicionamento físico', label: 'Condicionamento Físico', desc: 'Resistência cardiovascular e agilidade' },
          { id: 'Saúde', label: 'Saúde & Longevidade', desc: 'Metabolismo, energia diária e vitalidade' },
          { id: 'Performance', label: 'Alta Performance Esportiva', desc: 'Potência, força máxima e explosão' },
        ];
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Quais são seus objetivos?</h2>
              <p className="text-sm text-gray-400 mt-1">Selecione todos que se aplicam a você no momento.</p>
            </div>

            <div className="space-y-3">
              {goalOptions.map((opt) => {
                const selected = profile.goals.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setProfile({ ...profile, goals: toggleArrayItem(profile.goals, opt.id) })}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between ${
                      selected
                        ? 'bg-[#0a2e36] border-[#00daf3] shadow-[0_0_20px_rgba(0,218,243,0.15)]'
                        : 'bg-[#1c1b1b] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <p className={`font-semibold text-base ${selected ? 'text-white' : 'text-gray-200'}`}>
                        {opt.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        selected ? 'bg-[#00daf3] text-[#001f26]' : 'border border-white/20 bg-black/40'
                      }`}
                    >
                      {selected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        const expOptions: Array<{ level: 'Iniciante' | 'Intermediário' | 'Avançado'; desc: string; freq: string }> = [
          { level: 'Iniciante', desc: 'Nunca treinei ou parei há mais de 1 ano. Foco na execução correta.', freq: 'Adaptação muscular' },
          { level: 'Intermediário', desc: 'Treino regularmente há meses, conheço a maioria dos aparelhos.', freq: 'Intensidade intermediária' },
          { level: 'Avançado', desc: 'Anos de consistência. Busco periodização fina, drop sets e alta carga.', freq: 'Treinos de elite' },
        ];
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Nível de Experiência</h2>
              <p className="text-sm text-gray-400 mt-1">Para que a IA calibre o volume e complexidade das séries.</p>
            </div>

            <div className="space-y-4">
              {expOptions.map((opt) => {
                const selected = profile.experience === opt.level;
                return (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setProfile({ ...profile, experience: opt.level })}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${
                      selected
                        ? 'bg-[#bef500]/15 border-[#bef500] shadow-[0_0_25px_rgba(190,245,0,0.15)]'
                        : 'bg-[#1c1b1b] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-bold text-lg ${selected ? 'text-[#bef500]' : 'text-white'}`}>
                        {opt.level}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase">
                        {opt.freq}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Sua Disponibilidade</h2>
              <p className="text-sm text-gray-400 mt-1">A IA ajusta a divisão muscular conforme seus dias livres.</p>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono text-gray-400 uppercase">Quantos dias por semana?</label>
                  <span className="text-xl font-bold text-[#bef500] font-mono">{profile.availabilityDays} dias</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {[2, 3, 4, 5, 6, 7].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setProfile({ ...profile, availabilityDays: d })}
                      className={`h-12 rounded-xl font-mono font-bold text-base transition-all ${
                        profile.availabilityDays === d
                          ? 'bg-[#bef500] text-[#151f00] shadow-md scale-105'
                          : 'bg-[#1c1b1b] text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {d}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl space-y-3">
                <label className="text-xs font-mono text-gray-400 uppercase block">Tempo disponível por treino</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { min: 30, label: '30 min', desc: 'Expresso' },
                    { min: 45, label: '45 min', desc: 'Ideal' },
                    { min: 60, label: '60+ min', desc: 'Completo' },
                  ].map((t) => (
                    <button
                      key={t.min}
                      type="button"
                      onClick={() => setProfile({ ...profile, workoutDuration: t.min })}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        profile.workoutDuration === t.min
                          ? 'bg-[#00daf3]/15 border-[#00daf3] text-[#00daf3]'
                          : 'bg-[#1c1b1b] border-white/10 text-gray-300'
                      }`}
                    >
                      <Clock className="w-5 h-5 mb-1 opacity-80" />
                      <span className="font-bold text-base">{t.label}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        const equipOptions = [
          { id: 'Academia', label: 'Academia Completa', icon: Dumbbell, desc: 'Máquinas, polias, barras olímpicas e halteres pesados.' },
          { id: 'Casa', label: 'Casa (Halteres & Elásticos)', icon: Home, desc: 'Equipamento básico residencial e peso corporal.' },
          { id: 'Condomínio', label: 'Academia de Condomínio', icon: Dumbbell, desc: 'Esteiras, estações multiuso e halteres até 20kg.' },
          { id: 'Ar livre', label: 'Ar Livre / Calistenia', icon: Activity, desc: 'Barras fixas, parques, corrida e peso do corpo.' },
        ];
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Estrutura Disponível</h2>
              <p className="text-sm text-gray-400 mt-1">Onde você vai treinar a maior parte do tempo?</p>
            </div>

            <div className="space-y-3">
              {equipOptions.map((eq) => {
                const Icon = eq.icon;
                const selected = profile.equipment.includes(eq.id);
                return (
                  <button
                    key={eq.id}
                    type="button"
                    onClick={() => setProfile({ ...profile, equipment: toggleArrayItem(profile.equipment, eq.id) })}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                      selected
                        ? 'bg-[#0a2e36] border-[#00daf3] shadow-[0_0_20px_rgba(0,218,243,0.15)]'
                        : 'bg-[#1c1b1b] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${selected ? 'bg-[#00daf3] text-[#001f26]' : 'bg-white/5 text-gray-400'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <p className={`font-semibold text-base ${selected ? 'text-white' : 'text-gray-200'}`}>
                        {eq.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{eq.desc}</p>
                    </div>
                    {selected && <Check className="w-5 h-5 text-[#00daf3] stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 6:
        const healthIssues = [
          { id: 'Nenhuma', label: 'Nenhuma restrição', desc: '100% apto para treinos de alta intensidade' },
          { id: 'Lesão no Joelho', label: 'Problemas no Joelho / Menisco', desc: 'Evitar impactos altos e agachamento profundo' },
          { id: 'Lombar / Hérnia', label: 'Dor Lombar / Hérnia de Disco', desc: 'Proteger coluna vertebral em remadas e agachamento' },
          { id: 'Ombro / Coifa', label: 'Lesão no Ombro / Manguito', desc: 'Adaptar supinos e rotações externas' },
          { id: 'Hipertensão', label: 'Hipertensão Arterial', desc: 'Monitoramento de picos e controle de apneia' },
        ];
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Restrições & Saúde</h2>
              <p className="text-sm text-gray-400 mt-1">Sua segurança é prioridade número um para nossa IA.</p>
            </div>

            <div className="space-y-3">
              {healthIssues.map((issue) => {
                const selected =
                  issue.id === 'Nenhuma'
                    ? profile.healthRestrictions.length === 0 || profile.healthRestrictions.includes('Nenhuma')
                    : profile.healthRestrictions.includes(issue.id);

                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => {
                      if (issue.id === 'Nenhuma') {
                        setProfile({ ...profile, healthRestrictions: [] });
                      } else {
                        const filtered = profile.healthRestrictions.filter((i) => i !== 'Nenhuma');
                        setProfile({ ...profile, healthRestrictions: toggleArrayItem(filtered, issue.id) });
                      }
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between ${
                      selected
                        ? 'bg-[#93000a]/20 border-[#ffb4ab] text-white shadow-[0_0_20px_rgba(255,180,171,0.15)]'
                        : 'bg-[#1c1b1b] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <ShieldAlert className={`w-5 h-5 mt-0.5 ${selected ? 'text-[#ffb4ab]' : 'text-gray-500'}`} />
                      <div>
                        <p className={`font-semibold text-base ${selected ? 'text-white' : 'text-gray-200'}`}>
                          {issue.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{issue.desc}</p>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        selected ? 'bg-[#ffb4ab] text-[#690005]' : 'border border-white/20 bg-black/40'
                      }`}
                    >
                      {selected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e5e2e1] px-5 py-6 max-w-xl mx-auto flex flex-col justify-between">
      {/* Top Bar & Step Progress */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 text-sm font-mono text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
          <span className="text-xs font-mono font-bold text-[#bef500] bg-[#bef500]/10 px-3 py-1 rounded-full border border-[#bef500]/20">
            PASSO {step} DE {totalSteps}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#201f1f] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00daf3] to-[#bef500] transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Form Area */}
      <div className="my-auto py-6">{renderStepContent()}</div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-white/5 space-y-3">
        <button
          onClick={handleNext}
          className="w-full h-14 bg-[#bef500] hover:bg-[#cbf733] active:scale-[0.99] text-[#151f00] font-bold text-base rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(190,245,0,0.3)] transition-all"
        >
          <span>{step === totalSteps ? 'Criar meu plano personalizado' : 'Próximo'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-center font-mono text-gray-500 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#00daf3]" />
          Cálculo neural de volume calórico & recuperação adaptativa
        </p>
      </div>
    </div>
  );
};
