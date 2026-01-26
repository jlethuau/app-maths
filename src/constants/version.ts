// Version de l'application - SOURCE UNIQUE DE VÉRITÉ
// Synchronisée automatiquement avec package.json lors du build

import packageJson from '../../package.json';

export const APP_VERSION = packageJson.version;
