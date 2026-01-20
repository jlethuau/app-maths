import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/globals.css';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // eslint-disable-next-line no-console
        console.log('✅ Service Worker enregistré:', registration.scope);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('❌ Échec Service Worker:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
