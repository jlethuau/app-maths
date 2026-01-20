// Clés de stockage pour LocalStorage

export const STORAGE_KEYS = {
  USER_PROGRESS: 'app-maths:user-progress',
  SETTINGS: 'app-maths:settings',
  GAME_SESSION: 'app-maths:game-session',
} as const;

/**
 * Utilitaires pour gérer le localStorage de manière sécurisée
 */

export const storage = {
  /**
   * Récupère et parse une valeur du localStorage
   */
  get: <T>(key: string): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },

  /**
   * Sauvegarde une valeur dans le localStorage
   */
  set: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  },

  /**
   * Supprime une clé du localStorage
   */
  remove: (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },

  /**
   * Vide complètement le localStorage de l'application
   */
  clear: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        window.localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
