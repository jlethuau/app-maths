// Clés de stockage pour LocalStorage

export const STORAGE_KEYS = {
  USER_PROGRESS: 'app-maths:user-progress',
  SETTINGS: 'app-maths:settings',
  GAME_SESSION: 'app-maths:game-session',
} as const;

export const APP_STORAGE_PREFIX = 'app-maths:' as const;
export const APP_CACHE_PREFIX = 'app-maths-' as const;

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

/**
 * Supprime uniquement les données de cette app sur l'appareil (sans toucher d'autres apps).
 * - LocalStorage: suppression des clés préfixées `app-maths:`
 * - Cache Storage: suppression des caches préfixés `app-maths-`
 * - Service Worker: désinscription ciblée de `sw.js` (si présent)
 * - Puis recharge de la page
 */
export async function resetAppDataOnDevice(): Promise<void> {
  // 1) LocalStorage (ciblé par préfixe)
  try {
    const keys = Array.from({ length: window.localStorage.length }, (_, i) =>
      window.localStorage.key(i)
    ).filter((k): k is string => Boolean(k));

    keys.forEach((key) => {
      if (key.startsWith(APP_STORAGE_PREFIX)) {
        window.localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing app localStorage:', error);
  }

  // 2) Cache Storage (ciblé par préfixe)
  try {
    if ('caches' in window) {
      const cacheNames = await window.caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith(APP_CACHE_PREFIX))
          .map((name) => window.caches.delete(name))
      );
    }
  } catch (error) {
    console.error('Error clearing app caches:', error);
  }

  // 3) Service Worker (désinscription ciblée sur sw.js)
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        regs.map(async (reg) => {
          const scriptUrl =
            reg.active?.scriptURL ??
            reg.waiting?.scriptURL ??
            reg.installing?.scriptURL ??
            null;

          if (!scriptUrl) return;

          // Cible uniquement notre SW
          const isOurSw = scriptUrl.endsWith('/sw.js') || scriptUrl.includes('/sw.js?');
          if (!isOurSw) return;

          const scriptOrigin = new URL(scriptUrl).origin;
          if (scriptOrigin !== window.location.origin) return;

          await reg.unregister();
        })
      );
    }
  } catch (error) {
    console.error('Error unregistering service worker:', error);
  }

  // 4) Recharge
  window.location.reload();
}
