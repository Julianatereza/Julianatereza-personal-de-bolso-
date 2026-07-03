export type ScreenId = 
  | 'splash'
  | 'onboarding'
  | 'dashboard'
  | 'checkin'
  | 'ai-response'
  | 'workout-active'
  | 'ai-chat'
  | 'evolution'
  | 'profile';

export interface UserProfile {
  name: string;
  age: number;
  gender: 'MASC' | 'FEM' | 'OUTRO';
  height: number; // cm
  weight: number; // kg
  goals: string[];
  experience: 'Iniciante' | 'Intermediário' | 'Avançado';
  availabilityDays: number;
  preferredTime: string;
  workoutDuration: number; // minutes
  equipment: string[];
  healthRestrictions: string[];
  tier: 'PRO' | 'ELITE';
  avatarUrl: string;
}

export interface VitalMetric {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  statusText: string;
  percentage: number;
  statusColor: 'lime' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple';
  icon: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  imageUrl: string;
  sets: number;
  reps: string;
  restTime: number; // seconds
  aiNote?: string;
}

export interface Workout {
  id: string;
  title: string;
  category: string;
  durationMin: number;
  intensity: 'Baixa' | 'Média' | 'Alta' | 'Regenerativa';
  caloriesEst: number;
  imageUrl: string;
  exercises: Exercise[];
  aiReasoning?: string;
}

export interface CheckInAnswers {
  sleepHours: number;
  energyLevel: number; // 1-10
  alcoholYesterday: boolean;
  muscleSoreness: string[]; // ['OMBROS', 'PEITORAL', 'QUADRÍCEPS', 'COSTAS', 'JOELHO']
  jointSoreness: string[];
  availableTimeMin: number;
  mood: 'Excelente' | 'Positivo' | 'Estável' | 'Cansado' | 'Estressado';
  stressLevel: number; // 1-10
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionCard?: {
    type: 'workout-change' | 'recovery-tip' | 'exercise-swap';
    title: string;
    description: string;
    buttonText?: string;
    targetScreen?: ScreenId;
  };
}

export interface EvolutionChartPoint {
  day: string;
  score: number;
  status: 'completo' | 'parcial' | 'repouso';
}
