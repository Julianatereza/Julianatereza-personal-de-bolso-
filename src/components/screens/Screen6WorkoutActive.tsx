import React, { useState, useEffect } from 'react';
import { CheckCircle2, SkipForward, Volume2, Bot, Sparkles, Trophy, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';
import { Workout, ScreenId } from '../../types';

interface Screen6WorkoutActiveProps {
  workout: Workout;
  onFinishWorkout: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen6WorkoutActive: React.FC<Screen6WorkoutActiveProps> = ({
  workout,
  onFinishWorkout,
  onNavigate,
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restSecondsLeft, setRestSecondsLeft] = useState(45);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentExercise = workout.exercises[currentExerciseIndex] || workout.exercises[0];

  // Rest Timer countdown
  useEffect(() => {
    let interval: any;
    if (isResting && !isTimerPaused && restSecondsLeft > 0) {
      interval = setInterval(() => {
        setRestSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (restSecondsLeft === 0 && isResting) {
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [isResting, isTimerPaused, restSecondsLeft]);

  const handleCompleteSet = () => {
    const nextSet = completedSets + 1;
    if (nextSet >= currentExercise.sets) {
      // Finished all sets for this exercise
      if (currentExerciseIndex + 1 < workout.exercises.length) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCompletedSets(0);
        setIsResting(true);
        setRestSecondsLeft(currentExercise.restTime || 45);
      } else {
        // Finished workout!
        setIsCompleted(true);
      }
    } else {
      setCompletedSets(nextSet);
      setIsResting(true);
      setRestSecondsLeft(currentExercise.restTime || 45);
    }
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex + 1 < workout.exercises.length) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCompletedSets(0);
      setIsResting(false);
    } else {
      setIsCompleted(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isCompleted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-6 pt-8 pb-12">
        <div className="w-28 h-28 rounded-full bg-[#bef500]/20 border-2 border-[#bef500] flex items-center justify-center shadow-[0_0_50px_rgba(190,245,0,0.4)] animate-bounce">
          <Trophy className="w-14 h-14 text-[#bef500]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-[#00daf3] uppercase tracking-widest">
            SESSÃO DE TREINO FINALIZADA
          </span>
          <h2 className="text-3xl font-extrabold text-white">{workout.title} Concluído!</h2>
          <p className="text-sm text-gray-300 max-w-sm mx-auto">
            Sua bio-frequência e calorias (~{workout.caloriesEst} kcal) foram sincronizadas com sucesso ao seu histórico neural.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl w-full grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[10px] font-mono text-gray-400">DURAÇÃO</p>
            <p className="text-xl font-bold text-white mt-0.5">{workout.durationMin}m</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-gray-400">CALORIAS</p>
            <p className="text-xl font-bold text-[#ffb4ab] mt-0.5">{workout.caloriesEst}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-gray-400">RECUPERAÇÃO</p>
            <p className="text-xl font-bold text-[#bef500] mt-0.5">+14%</p>
          </div>
        </div>

        <button
          onClick={onFinishWorkout}
          className="w-full h-16 bg-[#bef500] hover:bg-[#cbf733] text-[#151f00] font-bold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(190,245,0,0.3)] transition-all"
        >
          <span>Ver Evolução Diária</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 pt-3 pb-8">
      {/* Top Exercise Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-[#00daf3]">
            EXERCÍCIO {currentExerciseIndex + 1} DE {workout.exercises.length}
          </span>
          <span className="text-gray-400">
            Série {completedSets + 1} de {currentExercise.sets}
          </span>
        </div>
        <div className="flex gap-1.5">
          {workout.exercises.map((_, idx) => (
            <div key={idx} className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  idx < currentExerciseIndex
                    ? 'bg-[#bef500] w-full'
                    : idx === currentExerciseIndex
                    ? 'bg-[#00daf3]'
                    : 'bg-transparent'
                }`}
                style={{
                  width: idx === currentExerciseIndex ? `${((completedSets + 1) / currentExercise.sets) * 100}%` : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Media Card */}
      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden glass-card border border-white/15 shadow-2xl group">
        <img src={currentExercise.imageUrl} alt={currentExercise.name} className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent" />

        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#bef500] font-mono text-xs font-bold border border-[#bef500]/30">
            {currentExercise.muscleGroup}
          </span>
          <button className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white border border-white/10">
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
            {currentExercise.name}
          </h2>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">SÉRIES</span>
          <span className="text-2xl font-extrabold text-white mt-0.5">
            {completedSets + 1}
            <span className="text-sm text-gray-400 font-normal">/{currentExercise.sets}</span>
          </span>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center border-b-2 border-b-[#00daf3]">
          <span className="text-[10px] font-mono text-gray-400 uppercase">REPETIÇÕES</span>
          <span className="text-xl font-extrabold text-[#00daf3] mt-0.5">{currentExercise.reps}</span>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">DESCANSO</span>
          <span className="text-2xl font-extrabold text-white mt-0.5">{currentExercise.restTime || 45}s</span>
        </div>
      </div>

      {/* Rest Timer Panel (Appears when Resting) */}
      {isResting ? (
        <div className="glass-card p-6 rounded-3xl border border-[#00daf3]/50 bg-[#0a2e36]/40 text-center space-y-4 shadow-[0_0_30px_rgba(0,218,243,0.2)]">
          <span className="text-xs font-mono text-[#00daf3] uppercase tracking-widest block">
            INTERVALO DE RECUPERAÇÃO ATIVO
          </span>
          <div className="text-6xl font-mono font-extrabold text-white tracking-tight drop-shadow-[0_0_20px_rgba(0,218,243,0.5)]">
            {formatTime(restSecondsLeft)}
          </div>
          <div className="flex justify-center gap-3 pt-1">
            <button
              onClick={() => setIsTimerPaused(!isTimerPaused)}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              {isTimerPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
              <span>{isTimerPaused ? 'RETOMAR' : 'PAUSAR'}</span>
            </button>
            <button
              onClick={() => setIsResting(false)}
              className="px-5 py-2.5 rounded-xl bg-[#bef500] text-[#151f00] text-xs font-mono font-bold transition-all hover:bg-[#cbf733]"
            >
              PULAR DESCANSO →
            </button>
          </div>
        </div>
      ) : (
        /* Floating Real-time AI Coach Feedback */
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-[#bef500] bg-black/60 flex items-start gap-3 shadow-lg">
          <div className="p-2 rounded-xl bg-[#bef500]/15 text-[#bef500] shrink-0 mt-0.5">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold text-[#bef500] uppercase">DICA EM TEMPO REAL DA IA</span>
            </div>
            <p className="text-sm text-gray-200 mt-0.5 font-normal leading-relaxed">
              "{currentExercise.aiNote || 'Mantenha a respiração estável e cadência controlada na fase excêntrica.'}"
            </p>
          </div>
        </div>
      )}

      {/* Main Actions */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleCompleteSet}
          className="w-full h-16 bg-[#bef500] hover:bg-[#cbf733] active:scale-[0.98] text-[#151f00] font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(190,245,0,0.35)] transition-all"
        >
          <span>
            {completedSets + 1 >= currentExercise.sets ? 'Concluir Última Série' : `Concluir Série ${completedSets + 1}`}
          </span>
          <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={handleSkipExercise}
          className="w-full py-3.5 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white text-xs font-mono rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Pular exercício para o próximo</span>
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
