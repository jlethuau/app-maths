import { createContext, useContext, FC, ReactNode, useCallback } from 'react';
import { UserProgress, UserSettings, Badge } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { GAME_CONSTANTS } from '@/constants/game';

interface AppContextType {
  userProgress: UserProgress;
  settings: UserSettings;
  updateProgress: (updates: Partial<UserProgress>) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  addPoints: (points: number) => void;
  unlockBadge: (badge: Badge) => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Valeurs par défaut
const defaultSettings: UserSettings = {
  soundEnabled: true,
  timePerQuestion: GAME_CONSTANTS.DEFAULT_TIME_PER_QUESTION,
  animationsEnabled: true,
};

const defaultUserProgress: UserProgress = {
  id: `user-${Date.now()}`,
  totalPoints: 0,
  level: 1,
  unlockedTables: [...GAME_CONSTANTS.INITIAL_UNLOCKED_TABLES],
  badges: [],
  statistics: {
    totalGamesPlayed: 0,
    totalQuestionsAnswered: 0,
    totalCorrectAnswers: 0,
    averageAccuracy: 0,
    fastestTime: 0,
    highestCombo: 0,
    totalPointsEarned: 0,
    tableStats: {},
  },
  settings: defaultSettings,
  lastPlayed: new Date(),
  createdAt: new Date(),
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>(
    STORAGE_KEYS.USER_PROGRESS,
    defaultUserProgress
  );

  const [settings, setSettings] = useLocalStorage<UserSettings>(
    STORAGE_KEYS.SETTINGS,
    defaultSettings
  );

  // Mettre à jour la progression utilisateur
  const updateProgress = useCallback(
    (updates: Partial<UserProgress>) => {
      setUserProgress((prev) => ({
        ...prev,
        ...updates,
        lastPlayed: new Date(),
      }));
    },
    [setUserProgress]
  );

  // Mettre à jour les paramètres
  const updateSettings = useCallback(
    (updates: Partial<UserSettings>) => {
      const newSettings = { ...settings, ...updates };
      setSettings(newSettings);
      
      // Synchroniser avec userProgress
      setUserProgress((prev) => ({
        ...prev,
        settings: newSettings,
      }));
    },
    [settings, setSettings, setUserProgress]
  );

  // Ajouter des points et calculer le niveau
  const addPoints = useCallback(
    (points: number) => {
      setUserProgress((prev) => {
        const newTotalPoints = prev.totalPoints + points;
        const newLevel = Math.floor(newTotalPoints / GAME_CONSTANTS.POINTS_PER_LEVEL) + 1;
        
        return {
          ...prev,
          totalPoints: newTotalPoints,
          level: Math.min(newLevel, GAME_CONSTANTS.MAX_LEVEL),
          statistics: {
            ...prev.statistics,
            totalPointsEarned: newTotalPoints,
          },
          lastPlayed: new Date(),
        };
      });
    },
    [setUserProgress]
  );

  // Débloquer un badge
  const unlockBadge = useCallback(
    (badge: Badge) => {
      setUserProgress((prev) => {
        // Vérifie si le badge n'est pas déjà débloqué
        const alreadyUnlocked = prev.badges.some((b) => b.id === badge.id);
        if (alreadyUnlocked) return prev;

        return {
          ...prev,
          badges: [
            ...prev.badges,
            {
              ...badge,
              unlockedAt: new Date(),
            },
          ],
          lastPlayed: new Date(),
        };
      });
    },
    [setUserProgress]
  );

  // Réinitialiser la progression
  const resetProgress = useCallback(() => {
    setUserProgress(defaultUserProgress);
    setSettings(defaultSettings);
  }, [setUserProgress, setSettings]);

  const value: AppContextType = {
    userProgress,
    settings,
    updateProgress,
    updateSettings,
    addPoints,
    unlockBadge,
    resetProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
// eslint-disable-next-line react-refresh/only-export-components
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
